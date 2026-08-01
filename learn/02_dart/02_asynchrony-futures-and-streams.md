---
title: Asynchrony, Futures and Streams
description: Single-threaded concurrency, and the ordering bugs that come with it
---

# Asynchrony, Futures and Streams

Dart runs your code on one thread and interleaves it. `Future` is one value that
arrives later; `Stream` is many. Understanding the event loop underneath is what
separates "await it and hope" from knowing what runs when.

**Why it matters.** Almost every intermittent bug in a Flutter app is an
ordering bug: something completed after the screen was disposed, two requests
raced, a subscription outlived its widget. None of them reproduce reliably, and
all of them come from asynchrony that was never reasoned about.

## What to understand

- What is running while you `await` — and what is not
- Whether an operation still matters by the time it finishes
- Who owns a subscription, and who closes it
- Whether two things that can overlap actually may
- Where an error goes when nobody is awaiting

## Core topics

### The event loop

- Microtasks and events, and why order surprises people
- What `await` really does: suspend here, resume later, same thread
- Blocking the loop — and why heavy synchronous work freezes the UI

### Futures

- Creating, chaining, and the difference between returning and awaiting
- `Future.wait` for parallel work, and its all-or-nothing failure
- Errors: try/catch around `await`, `catchError`, and unhandled rejections
- Timeouts and cancellation, which Dart does not give you for free

### Streams

- Single-subscription versus broadcast, and choosing wrong
- Transformations: `map`, `where`, `asyncMap`, `distinct`, `debounce` via packages
- Backpressure — a fast producer and a slow consumer
- `StreamController`, and closing it
- Subscriptions as a resource with a lifetime

### Common failure modes

- Work completing after the widget is gone
- Two in-flight requests resolving out of order
- Leaked subscriptions
- `async` in a place that cannot await it, so errors vanish

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uses `async`/`await` correctly for straightforward calls and handles errors around them. |
| Middle | Chooses between futures and streams deliberately, cancels subscriptions, handles races and timeouts. |
| Senior | Reasons about ordering across a whole feature. Designs stream pipelines with backpressure and cleanup, and can explain a heisenbug from first principles. |

## Practice

### Starting out

- **Handle a failure properly**
  Take an `await` with no error handling and give it distinct behaviour for
  failure and timeout.

- **Run two calls in parallel**
  Replace two sequential awaits with `Future.wait`, then decide what should
  happen if one fails.

- **Close a subscription**
  Find a `listen` with no matching `cancel` and fix the lifecycle.

### Going deeper

- **Win the race**
  Make a search-as-you-type field where a slow earlier response cannot overwrite
  a fast later one.

- **Build a pipeline**
  Compose a stream with debounce, deduplication and error recovery, and test it.

- **Find the microtask**
  Write code whose output order surprises you, then explain it with the event
  loop.

## Check yourself

- What happens in your app if a response arrives after the user has left the screen?
- Which of your streams are broadcast, and did you choose that?
- Where could two requests race, and who wins today?
- What happens to an exception thrown inside an `async` function nobody awaits?
- How do you cancel work that is no longer needed?
- What in your app could block the event loop long enough to drop a frame?

## Resources

- **[Asynchronous programming: futures, async, await](https://dart.dev/libraries/async/async-await)** —
  the official codelab, and the right place to fix a shaky mental model of
  `await` before reading anything else.
- **[Concurrency in Dart](https://dart.dev/language/concurrency)** — the event
  loop, isolates, and what "single-threaded" actually means. Short and load-bearing.
- **[Using streams](https://dart.dev/libraries/async/using-streams)** — consuming
  and transforming, including the error handling that most tutorials skip.
- **[Stream class reference](https://api.dart.dev/stable/dart-async/Stream-class.html)** —
  worth reading top to bottom once. Most of what people write by hand is already
  a method here.
- **[Dart asynchronous programming: isolates and event loops](https://medium.com/dartlang/dart-asynchronous-programming-isolates-and-event-loops-bffc3e296a6a)** —
  from the Dart team, and the clearest walkthrough of the loop's actual mechanics.
