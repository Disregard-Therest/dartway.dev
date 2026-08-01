---
title: Isolates and Concurrency
description: Real parallelism in Dart, and when moving work off the main thread is worth it
---

# Isolates and Concurrency

Async code is concurrent but not parallel — it all runs on one thread. Isolates
are Dart's actual parallelism: separate memory, separate event loop, messages
instead of shared state. The model that makes data races structurally impossible
also makes sharing awkward on purpose.

**Why it matters.** Anything CPU-heavy on the main isolate freezes the UI, and
users read a frozen UI as a crash. Parsing a large response, resizing an image,
or a cryptographic operation is enough.

## What to understand

- Whether the slow thing is waiting or computing — only computing needs an isolate
- What crossing an isolate boundary costs, and whether the work is worth it
- What can be sent in a message, and what cannot
- Who owns state when nothing is shared
- Whether the answer is still wanted by the time it arrives

## Core topics

### The model

- Isolate as memory plus event loop, with no shared mutable state
- Message passing, and copying versus transferring
- Why this eliminates locks, and what it costs instead

### Doing it

- `Isolate.run` for one-off work — the common case, and usually enough
- Long-lived isolates and ports for repeated work
- `compute` in Flutter, and what it wraps
- What is sendable, and the errors you get when something is not

### Deciding

- Measuring first: is this actually CPU-bound?
- Spawn cost against work size
- Batching many small jobs instead of paying setup per job
- Where the platform already does it for you

### Related

- Concurrency on the server, where the constraint is different
- Web, where isolates map to workers and the rules change

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Knows async does not mean parallel. Uses `compute` when told to. |
| Middle | Identifies CPU-bound work by profiling and moves it off the main isolate, handling the failure paths. |
| Senior | Designs work distribution — pooling, batching, cancellation — and knows when an isolate makes things slower. |

## Practice

### Starting out

- **Find the jank**
  Profile a screen that stutters and determine whether the cost is waiting or
  computing.

- **Move one job**
  Take a heavy parse or transform and run it with `Isolate.run`, then measure the
  difference.

- **Break the boundary on purpose**
  Try to send something non-sendable and read the error properly.

### Going deeper

- **Keep an isolate alive**
  Replace repeated spawns with a long-lived isolate and a port, and measure.

- **Cancel work in flight**
  Make a background job abandonable when the user leaves the screen.

- **Decide with numbers**
  Find a case where the isolate is slower than doing it inline, and explain why.

## Check yourself

- How do you tell CPU-bound work from IO-bound work in your app?
- What is the largest synchronous operation on your main isolate today?
- What does it cost to send a large object to another isolate?
- When is spawning an isolate more expensive than the work itself?
- How does a background job know it is no longer needed?
- What changes about all of this on the web?

## Resources

- **[Isolates](https://dart.dev/language/isolates)** — the official guide,
  including `Isolate.run`, ports, and exactly what may cross a boundary.
- **[Concurrency in Dart](https://dart.dev/language/concurrency)** — the model
  behind isolates and why Dart chose message passing over shared memory. Read
  before the API reference, not after.
- **[Flutter performance profiling](https://docs.flutter.dev/perf/ui-performance)** —
  how to establish that you have a CPU problem at all, which is the step people
  skip on the way to reaching for an isolate.
- **[compute](https://api.flutter.dev/flutter/foundation/compute.html)** —
  Flutter's wrapper, and worth reading to see how thin it is.
- **[Introducing isolate groups](https://medium.com/dartlang/better-performance-and-more-a4f7a844e6e5)** —
  from the Dart team, on why spawning became cheap enough to use casually.
