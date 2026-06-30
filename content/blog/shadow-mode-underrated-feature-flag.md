---
title: "Shadow Mode Is the Most Underrated Feature Flag"
excerpt: "Running new logic in monitor-only mode before you enforce it lets you compare outcomes against production safely - the calmest way to ship risky changes."
date: "2026-06-08"
tags: ["Feature Flags", "Architecture", "Reliability", "Rollouts"]
---

The safest way I know to ship a risky change is to run it in production before it does anything. That sounds like a contradiction, but it is the whole idea behind shadow mode: you deploy the new logic, feed it real traffic, compute exactly what it would do, log that decision next to the old one, and then throw the new answer away. Nothing downstream changes. No customer is affected. But you now have a stream of real-world evidence telling you whether your rewrite is correct before you ever let it take the wheel. I have come to think of shadow mode as the most underrated flag in the toolbox, and most teams reach for it far too late.

## What shadow mode actually is

A normal feature flag is binary. Old path or new path. You flip it and the new behavior is live. A percentage rollout is a little gentler - 1%, then 10%, then 50% - but it has the same fundamental property: every request that lands on the new path is *acted on*. If the new logic is wrong for those users, they feel it.

Shadow mode breaks that coupling. You run **both** the old and the new logic on the same input, but only the old result is used. The new result is computed purely to be observed:

- The old path still makes the real decision.
- The new path runs alongside it and produces a "what I would have done" answer.
- You record both, with the inputs, and compare them later.
- The user experiences exactly what they did yesterday.

This is why shadow mode beats a staging environment for confidence. Staging tests your code against the traffic and data *you imagined*. Production shadow tests it against the traffic and data you actually have - the weird edge cases, the malformed inputs, the long-tail customers whose accounts predate three migrations ago. The data distribution in staging is a guess. In shadow mode it is the truth.

## Where it earns its keep

I reach for shadow mode whenever the new logic makes a *decision* and being wrong is expensive or hard to undo. A few concrete cases:

- **A new pricing or eligibility rule.** You rewrote how a discount or a plan tier is calculated. Shadow it and you can answer "for which accounts would the new rule charge a different amount?" before a single invoice changes.
- **A rewritten query or computation.** You replaced a gnarly aggregation with a faster one. Run both, diff the results row by row, and you find the three tenants where the new query quietly drops nulls.
- **A new fraud or validation check.** A stricter check is terrifying to enable because false positives block real users. In shadow mode you measure the false-positive rate against real traffic first, then tune the threshold before it ever rejects anyone.
- **A migration cutover.** Moving reads from an old store to a new one. Shadow the new store's reads, compare against the system of record, and let the agreement rate tell you when the backfill is genuinely complete.

The common thread: the decision is the product, and you want to be confident about the decision *specifically*, not just that the code runs without throwing.

## How to implement it

The mechanics are simpler than people expect. The core is a wrapper that evaluates both paths and emits a comparison record, while structurally guaranteeing that only one of them counts.

```python
def evaluate_with_shadow(inputs, primary, shadow, record):
    decision = primary(inputs)  # the real, acted-on result

    try:
        shadow_decision = shadow(inputs)  # computed, never acted on
        record.emit({
            "inputs": inputs.fingerprint(),
            "decision_old": decision,
            "decision_new": shadow_decision,
            "agree": decision == shadow_decision,
        })
    except Exception as err:
        record.emit_error(inputs.fingerprint(), err)

    return decision  # always the primary
```

Three things matter here. First, the primary decision is computed and returned no matter what - the shadow path is wrapped so that if the new logic throws, the user still gets the old, correct behavior. A bug in your unproven code must never be able to take down the proven path. Second, you record the *inputs* (or a fingerprint of them) alongside both decisions, because an aggregate "87% agreement" number is useless without the ability to pull up the 13% and see what they had in common. Third, the comparison itself - the `agree` field and the diff - is something you should be able to compute offline from the logged records, so you can re-run analysis as your understanding of "what counts as a disagreement" evolves.

From there, push the records into wherever you already do analytics, and alert on the divergence rate crossing a threshold.

## What to measure

Shadow mode only pays off if you actually look at the output. The metrics I care about:

- **Agreement rate.** What fraction of decisions match? A rewrite you expect to be behavior-preserving should be near 100%, and any gap is a bug list. A rule you *intend* to change will diverge on purpose - so segment the disagreements into "expected" and "surprising."
- **Disagreement breakdown.** Not just how often, but *where*. Group divergences by customer segment, input shape, code branch. This is where the real bugs hide.
- **False positives / false negatives.** For anything that blocks, rejects, or flags, the cost of the two error directions is rarely symmetric. Measure them separately.
- **Latency added.** You are now doing two evaluations. Track the shadow path's cost so it does not blow your latency budget - and remember you can sample (shadow 10% of traffic) if it does.

## The graduation path

Shadow mode is the first rung of a ladder, not the destination. Once the data looks right, I walk it up deliberately:

1. **Shadow.** Monitor only, full traffic or a sample. Drive the surprising-disagreement rate down to near zero, or until every remaining divergence is one you understand and accept.
2. **Enforce for internal / dogfood.** Flip the new path on for your own org first. Now you are eating the consequences, not customers.
3. **Percentage rollout.** 1%, 10%, 50%. The shadow comparison can keep running underneath, so you still see divergences on the cohort still on the old path.
4. **Full enforcement,** then delete the old path and the comparison scaffolding. Shadow code that lingers forever becomes its own maintenance tax.

The nice property is that each step is reversible and each one is informed by the previous. By the time you hit 100%, there are no surprises left - you spent them all in shadow.

## The pitfalls (this is the part that bites)

The single rule of shadow mode is: **the shadow path must be pure.** It computes a decision and nothing else. Every painful shadow-mode incident I have seen or heard about comes from a side effect leaking out of a path that was supposed to be invisible:

- The shadow pricing path *also* writes an invoice. Now you double-charge.
- The shadow notification logic *also* sends the email. Now users get two.
- The shadow check *also* increments a usage counter or writes an audit row. Now your metrics and state are corrupted by code that was never supposed to be live.

Guard against this structurally, not with discipline. Run the shadow path with writes disabled - a no-op repository, a fake mailer, a read-only DB role, an injected "dry run" context that makes mutations throw. If the shadow code tries to touch the outside world, you want it to fail loudly in testing, not silently double-act in production. Also watch for shared mutable state: if both paths read from the same cache or object and one of them mutates it, the shadow can poison the primary. Keep inputs immutable, or give the shadow its own copy.

The other subtle trap is **comparing the wrong thing.** Two decisions can be "different" in ways that do not matter - ordering, floating-point noise, a timestamp. Define your equality function as deliberately as you define the logic itself, or you will drown in false divergences and learn to ignore the alert that finally matters.

## The short version

- **Shadow mode runs new logic on real production traffic but never acts on the result** - it computes, logs, and compares while the old path stays in charge.
- It beats staging for confidence because you test against real data distributions and edge cases, not imagined ones.
- Use it for decisions that are expensive to get wrong: pricing and eligibility rules, rewritten queries, new fraud/validation checks, migration cutovers.
- Implement it as a wrapper that returns the primary decision, computes the shadow decision in a try/except, and records `(inputs, decision_old, decision_new)` for offline diffing.
- Measure agreement rate, segmented disagreements, false positive/negative rates, and added latency.
- Graduate deliberately: shadow -> internal enforce -> percentage -> full, then delete the scaffolding.
- Keep the shadow path **pure** - no writes, no sends, no shared mutable state - and define your equality check carefully so you only alert on divergences that actually matter.
