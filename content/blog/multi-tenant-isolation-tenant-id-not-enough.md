---
title: 'Why "Tenant ID Everywhere" Is Not Enough for Multi-Tenant Isolation'
excerpt: "Adding a tenantId column is the easy part. The real isolation bugs hide in auth context, API keys, background jobs, queues, webhooks, and admin bypasses."
date: "2026-05-25"
tags: ["Multi-Tenancy", "Architecture", "Security", "SaaS"]
---

Every multi-tenant system I have worked on hit the same milestone and mistook it for the finish line: someone added a `tenantId` column to every table, wired a `WHERE tenant_id = ?` into the main query path, and declared isolation "done." It is not done. The column is the easy 20%. The isolation bugs that actually leak one customer's data into another customer's account live everywhere the `tenantId` is *not* automatically present: the request that never had a session, the job that ran an hour after the user logged out, the admin tool built to ignore filters on purpose. This post is about those places, with a concrete way each one breaks and the fix I now reach for by default.

The mental model that helps: a `tenantId` column is a *labeling* mechanism, not an *enforcement* mechanism. Enforcement is about guaranteeing that every code path is forced to supply the correct tenant, and that "no tenant" fails closed instead of returning everything. Most leaks happen because some path forgot to pass the label, and nothing stopped it.

## 1. The auth/request context: derive the tenant, never trust it

The first question is deceptively boring: where does `tenantId` come from on a given request? If the answer is "the client sends it" — a header, a query param, a field in the JSON body — you have a vulnerability, not an architecture.

The failure scenario is trivial. A logged-in user for tenant A changes `X-Tenant-Id: B` (or flips an `org_id` in the request body) and your handler dutifully scopes the query to tenant B. You added the filter; you just let the attacker choose its value.

The fix is to **derive the tenant from the authenticated principal**, server-side, and treat any client-supplied tenant as untrusted input you must *check against* the derived one, never replace it with. The session or token says who the user is; the server resolves which tenant(s) that user belongs to. Then the resolved tenant flows through a single request-scoped context object that the rest of the stack reads from.

```ts
// Resolved once, at the edge, from the verified token — not from the body.
const ctx = {
  userId: token.sub,
  tenantId: token.tenant_id, // signed claim, server-controlled
};
```

If a user can legitimately belong to multiple tenants, the active tenant becomes part of the session state you set on switch and re-verify on every request — still server-side, still checked against membership.

## 2. API keys and service-to-service calls

API keys are where teams quietly reintroduce the "client picks the tenant" bug they just fixed for users. A key is issued, and then some endpoint accepts a tenant identifier *alongside* the key.

The fix is the same principle: the key **is** the tenant scope. When you mint an API key, bind it to a tenant (and ideally a narrow set of scopes) at creation time, and resolve `tenantId` from the key record on every call. Never read it from the request.

Service-to-service is subtler. An internal service calling on behalf of a tenant must *carry* the tenant explicitly — a signed internal token or an explicit parameter — because the callee has no user session to derive from. The trap is a privileged internal service that holds god-mode credentials and accepts an unauthenticated tenant hint from whoever called it. Internal does not mean trusted; propagate tenant as an authenticated, signed part of the call, and have the callee fail closed if it is missing.

## 3. Background jobs and queue messages

This is the leak I see most, because it only shows up *after* the request that looked correct. Your request context has the tenant. You enqueue a job. The worker runs later, in a fresh process, with no request, no session, no context — and your context-based scoping silently evaluates to "no tenant," which in too many query layers means "all tenants."

The classic version:

```ts
// Enqueue time: context exists.
await queue.add("rebuildReport", { reportId });

// Worker, an hour later: no context. tenantId is undefined.
// And "undefined tenant" must NOT mean "every tenant".
```

The fix has two halves. First, **tenant id is part of the job payload, always** — serialize it explicitly, the same way you serialize the entity ids:

```ts
await queue.add("rebuildReport", { tenantId: ctx.tenantId, reportId });
```

Second, the worker rehydrates a real tenant context from that payload before touching the database, so every downstream query is scoped exactly as a request would be. Make `tenantId` a required field on the payload type so a job *cannot* be enqueued without it — the type system catches the omission instead of production catching it.

## 4. Webhooks and inbound callbacks

Inbound webhooks — payment events, third-party callbacks, inbound email — arrive with no session at all. There is no user to derive a tenant from, so people grab whatever tenant-ish field is in the payload and run with it. That means an attacker (or a misconfigured integration) who can POST to your webhook URL can act on an arbitrary tenant.

Two things have to hold. First, **verify the source** — signature validation against the provider's secret, so you know the payload is authentic. Second, **map the external identifier to your tenant through your own records**, not by trusting a tenant field in the body. You stored "this Stripe customer belongs to tenant A" when you set up the integration; resolve the tenant by looking up the verified external id in that mapping. If the lookup misses, reject. The external system's identifiers are the key into *your* tenant resolution, never a substitute for it.

## 5. Admin and impersonation "bypass" paths

Every mature SaaS grows an admin console and a "log in as customer" feature, and both are built to *deliberately* skip the normal tenant filter. That is exactly why they are dangerous: they are the one place where the default-deny is intentionally off.

The failure modes are mundane and severe. An admin list view that forgot to re-scope after a tenant was selected and renders rows across tenants. An impersonation session that grants the *admin's* broad scope instead of pinning to the single impersonated tenant. A support tool whose "show everything" query escapes into a code path a non-admin can reach.

The fixes I insist on:

- Impersonation issues a context scoped to **exactly one** tenant — the impersonated one — not an unscoped god context. Impersonating tenant A should be indistinguishable, query-wise, from being a user of tenant A.
- Cross-tenant reads (genuine platform admin views) go through a **separate, explicitly-named** code path — `unsafeQueryAllTenants()` — that is loud, audited, and unreachable from normal request handlers.
- Every bypass is logged with who, which tenant, and why.

The goal is that "skip the tenant filter" is never the path of least resistance and never silent.

## 6. Caches: a cache key is not a security boundary

Caches re-leak everything the database layer worked to contain. Cache a per-tenant result under a key like `user:42:dashboard` and you have created a brand-new way to serve tenant A's data to tenant B the moment an id collides, a key is reused across tenants, or someone caches a value computed under an admin's broad scope.

The rule: **the tenant id is part of every cache key for tenant-scoped data** — `tenant:A:user:42:dashboard`. But a key alone is not enough, because keys are guessable and a bug can read the wrong one. Treat the cache as untrusted storage: scope the key *and* re-validate tenant ownership on read for anything sensitive, so a wrong-key hit fails closed instead of returning data. A cache is a performance optimization, not an authorization layer; never let it be the only thing standing between two tenants.

## Make the safe path the only path

The thread through all six is the same: scoping that depends on a human remembering to add `WHERE tenant_id = ?` will eventually be forgotten somewhere it matters. The durable fix is structural — a **query layer that requires tenant scope as a non-optional argument** and refuses to run without it. No tenant, no query. Default-deny, enforced by types and a chokepoint, not by discipline. Then the leaky paths above stop being "did someone remember?" and become "the code literally won't compile / will throw" — which is the only kind of guarantee that survives a growing team.

## The short version

- `tenantId` on every table is labeling, not enforcement. Treat the two separately.
- Derive the tenant from the authenticated principal; never trust a client-supplied tenant id, including in API requests.
- Bind API keys to a tenant at creation; for service-to-service calls, propagate tenant as a signed, authenticated value and fail closed when it is missing.
- Put `tenantId` in every job/queue payload and make it a required field; rehydrate real tenant context in the worker.
- Webhooks have no session: verify the signature, then map external ids to your tenant through your own records.
- Scope impersonation to exactly one tenant; route genuine cross-tenant reads through a separate, loud, audited path.
- Cache keys are not a security boundary: include the tenant in the key and re-validate ownership on read.
- The real fix is a query layer that *requires* tenant scope, so "no tenant" fails closed instead of returning everything.
