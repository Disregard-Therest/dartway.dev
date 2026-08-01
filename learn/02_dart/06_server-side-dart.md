---
title: Server-Side Dart
description: Running the backend in the same language as the app, and what that changes
---

# Server-Side Dart

Writing the backend in Dart, usually with Serverpod. One language across client
and server, one set of models, and generated client code instead of a
hand-written API layer.

**Why it matters.** Most bugs at the client/server seam are translation bugs — a
field renamed on one side, a nullable that is not, an enum with a value the app
has never heard of. Sharing the language and generating the client removes the
translation step rather than making it safer.

## What to understand

- What runs where, and what the client can and cannot be trusted with
- How a request travels from the app to the database and back
- Where configuration and secrets come from in each environment
- What is shared state on a server, and what that means for correctness
- What happens under two instances instead of one

## Core topics

### The shape of a server

- Entry point, initialisation, and startup order
- Endpoints, sessions, and the request lifecycle
- Configuration per environment, and secrets that are not in the repository
- Structured logging, and what to log at each level

### Serverpod specifically

- Models defined once, generating server, client and protocol
- Generated client calls instead of hand-written HTTP
- Serialisation across the boundary, including enums and dates
- Migrations as part of the workflow

### Correctness on a server

- Transactions, and what happens when two requests race
- Idempotency for anything a client may retry
- Locking when there is no row to lock
- Statelessness, so a second instance changes nothing

### Operating it

- Local development with Docker, and matching production closely enough
- Health checks and readiness
- Deployment, and what happens to in-flight requests during one

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Adds an endpoint and a model, runs the generator, gets data to the app. |
| Middle | Handles transactions, validation and errors properly. Manages configuration and migrations across environments. |
| Senior | Designs for concurrency and retries, keeps the server stateless, and can reason about behaviour under load and during deploys. |

## Practice

### Starting out

- **End to end**
  Add a model, generate, and read it in the app without writing HTTP by hand.

- **Separate the environments**
  Move a hardcoded value into configuration and give it different values locally
  and in production.

- **Log usefully**
  Take a failure that logs nothing and make its cause visible from the logs alone.

### Going deeper

- **Make an operation idempotent**
  Take something that must not run twice and make a retry safe.

- **Handle a race**
  Find two requests that can conflict and resolve it in a transaction.

- **Run two instances**
  Start a second instance and find what breaks — anything in memory will.

## Check yourself

- What in your server would break if a second instance started right now?
- Which operations are unsafe if the client retries them?
- Where do secrets come from in each environment, and who can read them?
- What does a failing request leave behind in the logs?
- How does a migration reach production, and what happens if it fails halfway?
- Which validation exists on the server, and which only in the app?

## Resources

- **[Serverpod documentation](https://docs.serverpod.dev/)** — the framework
  most Dart backends use. The concepts section is the part to read properly
  before writing anything.
- **[The Twelve-Factor App](https://12factor.net/)** — old, still correct, and
  the fastest way to see why configuration, statelessness and logging are
  architecture rather than housekeeping.
- **[Idempotency keys](https://brandur.org/idempotency-keys)** — Brandur
  Leach, from building Stripe's API. The clearest treatment of making retries
  safe, which is the thing servers most often get wrong.
- **[Effective Dart](https://dart.dev/effective-dart)** — the style guidance
  applies on the server too, and server code lives longer than UI code.
- **[dart:io](https://api.dart.dev/stable/dart-io/dart-io-library.html)** — what
  Dart offers without a framework. Worth knowing so you can tell what the
  framework is doing for you.
