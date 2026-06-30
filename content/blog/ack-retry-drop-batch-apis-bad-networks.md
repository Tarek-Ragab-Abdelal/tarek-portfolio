---
title: "ACK, RETRY, DROP: Designing Batch APIs That Survive Bad Networks"
excerpt: "All-or-nothing batch endpoints fail badly on mobile and event ingestion. Per-item results - acknowledge, retry, or drop - make clients resilient."
date: "2026-06-22"
tags: ["APIs", "Architecture", "Reliability", "SDK"]
---

If you are designing a batch endpoint - one request that carries many events or items - the single most important decision you will make is not the payload format or the compression scheme. It is what the response says about each individual item. A batch API that returns one status for the whole batch is broken by design the moment a client runs on a flaky network, and most of the clients that need batching are exactly the ones on flaky networks: mobile apps, SDKs, IoT devices, anything ingesting events over a connection that drops mid-flight. The fix is a per-item result contract with three outcomes the client can act on without guessing: ACK, RETRY, and DROP.

I have spent a fair amount of time building SDKs and event-ingestion paths that have to keep working when the radio comes and goes. The pattern below is what I keep coming back to, because it is the only one that lets a client empty its local buffer correctly.

## Why all-or-nothing fails

The naive batch endpoint accepts an array and returns a single status code. 200 means "everything worked," some 4xx or 5xx means "it didn't." This feels clean and it is a trap.

The problem is that a batch is heterogeneous. You send 200 events. Item 47 has a malformed timestamp. Item 130 references a campaign that was deleted. The other 198 are perfectly valid. What does the server return?

- If it rejects the whole batch with a 400, you have just let one bad item block 199 good ones. The client resends, the bad item is still bad, and the batch fails forever. That is a poisoned queue. On a device with a bounded local buffer, that buffer fills up and you start dropping good data on the floor.
- If it accepts the whole batch with a 200 and silently discards the bad items, the client thinks everything is stored. It clears its buffer. The bad items are gone, but so is any chance of the client knowing item 47 had a fixable problem, and you have no backpressure signal at all.

Neither answer is right because the question - "did the batch succeed?" - is the wrong question. The right question is "what happened to each item?"

## The "best effort 200" is not better

A common second attempt is to always return 200 and stuff a summary in the body: `{"accepted": 198, "rejected": 2}`. This is worse than it looks. The client knows two items failed but not *which two*. It cannot remove the successful 198 from its buffer with any confidence, because it does not know if the two failures are at the front, the back, or scattered. So it either resends all 200 (double-counting the 198) or clears all 200 (losing the 2). You have reintroduced exactly the ambiguity batching was supposed to remove.

The client needs to reconcile its local buffer against the server's outcome item by item. To do that, the response has to be keyed by something the client already knows.

## The response shape

Two requirements drive the design. First, every item the client sends carries a **client-supplied id** - not a server id, because the server has not seen the item yet. Second, the response is an array of per-item results keyed by that id, each with a status the client knows how to handle.

```json
{
  "results": [
    { "id": "evt_a1b2", "status": "ack" },
    { "id": "evt_c3d4", "status": "ack" },
    {
      "id": "evt_e5f6",
      "status": "retry",
      "reason": "storage_unavailable",
      "retry_after_ms": 2000
    },
    {
      "id": "evt_g7h8",
      "status": "drop",
      "reason": "validation_failed",
      "detail": "timestamp older than 7d"
    }
  ]
}
```

The three statuses map to the three things a client can actually do with an item in its buffer:

- **ACK** - the server has durably stored it. The client deletes it from the local buffer. Done, never send it again.
- **RETRY** - a transient failure: storage was briefly unavailable, a downstream dependency timed out, the server is shedding load. The item is fine; the server just could not take it right now. The client keeps it and resends later with backoff.
- **DROP** - a permanent failure: validation error, schema mismatch, the event is too old to matter, it violates a quota that will not reset usefully. Resending will never succeed. The client discards it so it can never block the queue.

That DROP category is the one people forget, and it is what keeps a buffer from poisoning itself. A permanently-bad item must be removable *without* being stored, or it sits at the head of the queue forever. Returning a clear DROP - ideally with a reason the client can log - is how you tell the client "stop trying, this one is never going to work."

The HTTP status of the overall request becomes almost boring at this point: 200 if the server processed the batch and is returning per-item results, 5xx only if it could not even read the batch (in which case the client retries the whole thing). The interesting information lives in the body.

## How the client reacts

The client side is a loop over the results. Each branch does exactly one thing to the buffer.

```
for result in response.results:
    item = buffer.find(result.id)
    if item is None:
        continue  # already handled; ignore duplicates

    if result.status == "ack":
        buffer.remove(item)

    elif result.status == "drop":
        log.warn("dropping item", id=item.id, reason=result.reason)
        buffer.remove(item)

    elif result.status == "retry":
        item.attempts += 1
        item.next_attempt_at = now() + backoff(item.attempts, result.retry_after_ms)
        # leave it in the buffer

metrics.incr("batch.ack",   count_of("ack"))
metrics.incr("batch.retry", count_of("retry"))
metrics.incr("batch.drop",  count_of("drop"))
```

Two subtleties matter here. Any item the client sent but does *not* see in the results should be treated as RETRY, not ACK - if the response was truncated or the connection died after the server committed but before the client read the body, assuming ACK loses data. Assuming RETRY at worst re-sends, which is safe if you have idempotency. And RETRY should respect a cap: after N attempts an item that keeps coming back as RETRY is effectively DROP, or it lives in a dead-letter buffer you inspect later. Infinite retry is just a slow poison.

## Idempotency, because RETRY means resend

The whole model leans on resending, so the server must be able to recognize an item it has already stored. This is where the client-supplied id earns its keep a second time: it is the idempotency key.

When the connection drops after the server commits but before the client gets the ACK, the client resends. The server sees `evt_a1b2` again, recognizes it as already stored, and returns ACK without writing it twice. The client clears it, no double-counting. Without per-item idempotency keys, every retry inflates your numbers and you cannot tell real events from network echoes.

A practical note: the dedup window has to outlive your retry window. If the server forgets ids after an hour but a device can be offline for a day, a resend after reconnect looks new and gets stored twice. Size the dedup store against your worst realistic offline duration, not your average one.

## Ordering and back-pressure

Two things teams ask about once the basics work.

**Ordering.** Batches and strict ordering fight each other, because a RETRY pulls one item out of sequence while its neighbors get ACKed. If you genuinely need ordering, do not interleave - fail the rest of the batch after the first non-ACK so the client resends a contiguous tail, and accept the throughput hit. Most event pipelines do not need global order; they need a timestamp on each event and idempotent storage, which the model above already provides.

**Back-pressure.** RETRY is your throttle. When the server is overloaded it returns RETRY with a `retry_after_ms`, and a well-behaved client backs off instead of hammering. This is far better than a blunt 429 on the whole batch, because you can ACK what you have capacity to store and RETRY the rest - partial progress under load instead of all-or-nothing rejection. Pair it with jitter on the client so a fleet of devices does not reconnect in a synchronized thundering herd.

## Observability

Because every item resolves to one of three outcomes, your metrics fall out for free. Emit counts per outcome on both sides:

- **ACK rate** is your healthy baseline.
- **RETRY rate** climbing means the server is struggling or a dependency is degraded - an early warning before anything actually errors out.
- **DROP rate** climbing means clients are sending bad data - a schema drift, an SDK bug, clock skew producing "too old" events. A DROP spike is almost always a code problem upstream, not an infrastructure problem.

Tagging counts by `reason` turns the DROP bucket into a debugging tool: "validation_failed on timestamp" pointing at a specific client version tells you exactly where to look. You get this for nothing simply because the contract forced the server to name each outcome.

## The short version

- One status for a whole batch is wrong on bad networks: one poison item blocks the batch, and a "best effort 200" leaves the client unsure what to resend.
- Return per-item results keyed by a **client-supplied id**, each with one of three statuses.
- **ACK** = stored, remove from buffer. **RETRY** = transient, keep and resend with backoff. **DROP** = permanent, discard so it never blocks the queue.
- Treat missing results as RETRY, never ACK, and cap retries so a stuck item becomes DROP or dead-letter.
- The client-supplied id doubles as an idempotency key so resends are not double-counted; size the dedup window to your worst offline duration.
- Use RETRY + `retry_after_ms` as back-pressure; skip interleaving only when you truly need ordering.
- Counts per outcome give you free observability: RETRY spikes warn of server strain, DROP spikes point at bad client data.
