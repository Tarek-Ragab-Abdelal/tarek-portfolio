---
title: 'Why "Rules Evaluated: 0" Is an Architecture Smell'
excerpt: "Decision systems need explainability: audit logs, rule traces, and counters. When you cannot tell why the answer was what it was, that is the real bug."
date: "2026-06-29"
tags: ["Observability", "Architecture", "Debugging", "Systems Design"]
---

A log line that reads `Rules evaluated: 0` is not a bug report. It is the absence of one. It tells you the engine ran and produced an outcome, but it tells you nothing about whether that outcome was correct, accidental, or catastrophic. My thesis is simple: when a decision system returns an answer and you cannot reconstruct *why*, the opacity itself is the defect. The wrong price, the unexpected block, the misrouted request, those are symptoms. The real architecture smell is that the system cannot explain itself.

I have spent a fair amount of time building reporting pipelines and decision/automation systems, and the pattern repeats everywhere. Teams pour effort into the logic that produces a verdict and almost none into making that verdict accountable after the fact. Then production happens, support tickets arrive, and someone is staring at a dashboard trying to guess what the engine was thinking three hours ago. You cannot guess your way out of that. You either captured the reasoning or you did not.

## Decision systems are not CRUD

Most of our instincts about logging come from CRUD applications. In CRUD, the state is the truth. If a row says `status = shipped`, you trust it, and if you want to know what happened, you read the row. The output is the data.

Decision systems are different. Their output is a *judgment*: this customer is eligible, this order costs $42.18, this request goes to the EU cluster, this transaction is fraud. The judgment is derived from inputs and logic that no longer exist by the time anyone asks about it. The inputs have changed, the rule set has been redeployed twice, and the feature flags are different. Reading the current state tells you nothing about the decision that was made under yesterday's conditions.

That is the core asymmetry. In CRUD, "what happened" is stored. In decision systems, "what happened" must be *reconstructable*, and reconstructability is a design property you either build in or do not have. `Rules evaluated: 0` is what it looks like when you did not.

## The three things every decision must emit

If a decision is going to be accountable, the engine has to emit three things as part of producing the answer, not as a side channel:

- **The inputs it saw.** Not the raw request, the normalized inputs the engine actually evaluated against, after defaults, coercion, and enrichment. Half of all "the engine is wrong" incidents are really "the engine never received what you think it received."
- **The candidates it considered.** Every rule, branch, or strategy that was in scope for this evaluation, and for each one, whether it matched, was skipped, or errored. This is the part everyone omits and the part that matters most.
- **Which one won, and why.** The selected outcome plus the specific reason it was selected: highest priority match, first match, default fallback, explicit override.

Put together, that is a *decision trace*. With it, `Rules evaluated: 0` becomes legible. It could mean the rule set loaded empty (a deploy problem), no rule's predicate matched (a logic or data problem), or the input shape was wrong so nothing was even comparable (an integration problem). Those are three completely different incidents with three different owners. Without the trace, they all look identical, and your debugging is reduced to redeploying and praying.

## Audit logs, debug logs, and metrics are not the same thing

These three get conflated constantly, and the conflation is why decision systems end up unaccountable.

- **Debug logs** are for engineers, ephemeral, often sampled, and frequently disabled in production. Useful, but you cannot build accountability on something you turn off to save money.
- **Metrics** are aggregates. They tell you *that* something is happening at scale, not *why* any single decision came out the way it did. Great for alerting, useless for explaining one customer's charge.
- **Audit logs** are durable, decision-scoped records meant to answer "what did the system decide for this entity, when, and on what basis." They are not best-effort. If you make operator-facing or customer-affecting decisions, the trace for each one needs to be a durable audit record with the same reliability expectations as the decision itself.

The trap is treating the decision trace as a debug log: nice when present, gone when you need it. If a decision touches money, access, or compliance, its trace is part of the product, not part of the logging budget.

## Explainability is a user-facing feature

"Why was I charged this?" "Why was my application declined?" "Why did my request land in the slow region?" Support cannot answer these from the database, because the database holds the *result*, not the reasoning. So the question escalates to engineering, who reverse-engineer it from code and partial logs, which is slow, expensive, and often inconclusive.

A stored decision trace collapses that whole chain. Support pulls up the decision by id and sees: these inputs, these rules considered, this one won because it had the highest priority. No engineer required. Explainability stops being a forensic exercise and becomes a lookup. That is the difference between a system that merely decides and one that can stand behind its decisions.

## Counters that catch silent failures

`evaluated = 0` should almost never be normal. If your engine routinely has rules to evaluate, then zero is a signal that something upstream broke: an empty rule set, a failed config load, a malformed input that short-circuited evaluation. Emit it as a counter and alert on it.

This is the cheapest, highest-leverage instrumentation you can add. A handful of counters per engine catches an entire class of silent failures:

- `rules_loaded` (alert when it drops to zero or changes unexpectedly after a deploy)
- `rules_evaluated` per request (alert on a spike of zeros)
- `decisions_by_outcome` (a sudden swing toward the default usually means matching quietly broke)
- `evaluation_errors` (rules that threw and were skipped)

The failure mode these guard against is the worst kind: the system keeps returning answers, nothing crashes, dashboards look green, and every answer is the silent default because the rule set never loaded. No exception will save you there. Only a counter that knows zero is abnormal.

## Design the trace as a first-class output

Here is the shift that makes all of this stick: the trace is part of what the engine *returns*, not something logging code reconstructs from the outside. The function signature itself should hand back the verdict and the reasoning together.

```
DecisionResult {
  outcome:        the verdict (price, allow/deny, route, ...)
  decision_id:    stable id for lookup and correlation
  inputs:         the normalized inputs evaluated
  trace: [
    { rule_id, matched: bool, reason, priority }   // every candidate, not just the winner
  ]
  selected_rule:  which entry won
  selection:      why it won (first-match | highest-priority | default)
  engine_version: rule set / code version
  evaluated_at:   timestamp
}
```

When the trace is a return value, it cannot drift from the logic, because it *is* the logic's output. Bolted-on logging always drifts: someone adds a branch and forgets to log it, and now your trace lies. A first-class trace stays honest by construction. You then choose where it goes, the audit store, the response payload, both, but you never have to wonder whether it reflects what actually happened.

## Replay turns a trace into a debugger

Once traces are durable and structured, you get debugging that decision systems almost never have. Because the trace captured the exact normalized inputs and the engine version, you can replay a past decision against the current rule set and diff the outcomes. "This decision came out as deny; under today's rules it would be allow," and the trace shows you precisely which rule changed the verdict.

That capability is the difference between "we think the fix works" and "we replayed last week's failing decisions and confirmed they now pass." It turns regression testing for your logic into something you run against real history instead of hand-written fixtures. None of it is possible without a stored, structured trace, which is exactly why the trace has to be designed in rather than discovered later.

## The short version

- In decision systems the output is a judgment, so "what happened" must be reconstructable, not just stored.
- Every decision should emit the inputs it saw, the candidates it considered, and which one won and why.
- Audit logs, debug logs, and metrics are different tools; durable decision traces are audit records, not best-effort debug output.
- Explainability is a user-facing feature: a stored trace turns "why was I charged?" into a lookup instead of an engineering investigation.
- Counters like `rules_evaluated = 0` catch silent failures where the system happily returns the default forever.
- Make the trace a first-class return value of the engine so it cannot drift from the logic.
- Durable structured traces unlock replay, so you can debug and regression-test against real history.
- `Rules evaluated: 0` is not the bug. Not being able to tell what it means is the bug.
