---
title: APIs and Contracts
description: Designing the boundary between client and server so it can change without breaking
---

# APIs and Contracts

The agreement between the app and the server: what can be asked, what comes
back, what the errors mean, and what is guaranteed to keep working tomorrow. An
API is a promise, and old versions of your app hold you to it.

**Why it matters.** You cannot force everyone to update. Whatever you shipped
last year is still running on someone's phone, and it will call your server
today. Every contract decision is therefore close to permanent.

## What to understand

- What the client actually needs, versus what the database happens to hold
- What a caller can rely on, and what you may change freely
- What an error tells the client to *do*, not just what went wrong
- How a change reaches old clients
- Who is the source of truth for the shape — a schema, or two implementations that agree by luck

## Core topics

### Designing the surface

- Resources and operations, and naming that survives translation
- Granularity: chatty round trips against payloads nobody reads
- Pagination, filtering and sorting, decided once rather than per endpoint
- Consistency across the API, which matters more than any single choice

### The contract

- Generated clients versus hand-written ones
- Schemas as the source of truth — OpenAPI, or a generator that owns both sides
- Nullability, defaults, and unknown fields
- Enums, and the client that meets a value added after it shipped

### Errors

- Status codes that mean something specific
- Machine-readable error bodies, so the app can branch
- Validation errors that identify the field
- Distinguishing "you did it wrong" from "we are broken" from "try later"

### Change over time

- Additive change as the default, and what counts as additive
- Deprecation with a timeline and measurement
- Versioning, and why the best version strategy is rarely needing one
- Supporting the oldest client still in the wild

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Consumes and adds endpoints following existing patterns. |
| Middle | Designs a coherent surface, returns actionable errors, and keeps changes backward compatible. |
| Senior | Treats the contract as long-lived: plans deprecations, measures old-client traffic, and shapes the API around what clients need rather than what the schema looks like. |

## Practice

### Starting out

- **Make one error actionable**
  Take a generic 400 and return something the app can branch on and show the user.

- **Paginate consistently**
  Give a list endpoint the same pagination shape as the rest of the API.

- **Handle the unknown enum**
  Send a value the client has never seen and make it degrade instead of crash.

### Going deeper

- **Add a field additively**
  Change the response so a year-old client still works, and prove it.

- **Deprecate something**
  Mark an endpoint deprecated, measure who still calls it, and plan its removal.

- **Design from the screen**
  Take a screen making four calls and design one endpoint for it, then argue both
  sides.

## Check yourself

- What is the oldest version of your app still calling your server?
- Which of your API changes in the last year were technically breaking?
- Can your app tell a validation failure from a server fault from a rate limit?
- What happens on the client when the server adds an enum value?
- Who owns the shape of your API — a schema, or two codebases that happen to agree?
- Which endpoint exists because of the database rather than because of a screen?

## Resources

- **[Google API Design Guide](https://cloud.google.com/apis/design)** — the most
  complete public guide to designing a coherent API surface, including naming,
  errors and the standard methods. Opinionated in a useful way.
- **[RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)** —
  what the methods and status codes actually mean. The place to settle an
  argument about 404 versus 409.
- **[OpenAPI Specification](https://swagger.io/specification/)** — worth knowing
  even if you generate clients another way, because it is the vocabulary
  everyone else uses for describing a contract.
- **[Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)** —
  Martin Fowler on what "REST" is usually taken to mean and what it originally
  meant. Short, and clarifies a lot of muddled discussion.
- **[Serverpod: working with endpoints](https://docs.serverpod.dev/concepts/working-with-endpoints)** —
  how the contract is expressed and generated when both sides are Dart.
