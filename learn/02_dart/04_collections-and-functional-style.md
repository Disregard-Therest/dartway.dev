---
title: Collections and Functional Style
description: Expressing transformations clearly without hiding what they cost
---

# Collections and Functional Style

Dart's collections and the transformation style built on them — `map`, `where`,
`fold` and the rest. Used well, a pipeline says what it does in one readable
line. Used carelessly, it iterates the same list five times and allocates four
throwaway copies.

**Why it matters.** This is the code developers write most, so its habits
compound. It is also where "readable" and "fast" are usually the same choice,
and where they occasionally are not.

## What to understand

- What the transformation is actually saying, read aloud
- Which operations are lazy and which materialise a new collection
- How many times the data is walked
- Whether the collection type matches the access pattern
- When a plain loop is clearer than a chain

## Core topics

### The types

- `List`, `Set`, `Map`, and choosing by how the data is read
- `Iterable` as a recipe rather than a container
- Growable versus fixed-length, unmodifiable views
- Equality: identity by default, and what that means for `Set` and `Map` keys

### Transformations

- `map`, `where`, `expand`, `fold`, `reduce`, `any`, `every`
- Laziness, and why a chain does nothing until something consumes it
- `toList()` — where it is necessary and where it is a habit
- Sorting, comparators, and stable ordering
- Grouping and indexing, and why a `Map` beats repeated `firstWhere`

### Style

- Chains that read as sentences, and where to stop chaining
- Cascades and the builder pattern
- Immutability as a default, mutation as a decision
- `const` collections, and what they save

### Cost

- Repeated `contains` on a `List` versus a `Set`
- Nested loops disguised as elegant chains
- Allocation in code that runs on every frame

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uses `map`, `where` and `forEach` comfortably. Reaches for `toList()` reflexively. |
| Middle | Picks collection types by access pattern, understands laziness, and avoids walking the same data repeatedly. |
| Senior | Writes pipelines that are both obvious and cheap, and knows exactly when to abandon the style for a loop. |

## Practice

### Starting out

- **Replace a loop with a pipeline**
  Rewrite an imperative accumulation as `where` and `fold`, and keep it readable.

- **Fix a lookup**
  Find a `firstWhere` inside a loop and replace it with a map built once.

- **Choose a set**
  Find a `List.contains` used for membership and switch the type.

### Going deeper

- **Count the passes**
  Take a chain of five operations and work out how many times the data is walked.
  Then reduce it.

- **Make equality work**
  Put a value object in a `Set` and make deduplication behave the way you meant.

- **Know when to stop**
  Find a chain that has become unreadable and rewrite it as a named loop.

## Check yourself

- Which of your collections are the wrong type for how they are read?
- When does `toList()` matter, and when is it noise?
- How many times does your longest chain iterate the data?
- What happens when you put two equal-looking objects into a `Set`?
- Where does a chain stop being clearer than a loop?
- What in your per-frame code allocates and does not need to?

## Resources

- **[Iterable collections codelab](https://dart.dev/codelabs/iterables)** — the
  official interactive walkthrough, including laziness, which is the part most
  developers have wrong.
- **[dart:collection](https://api.dart.dev/stable/dart-collection/dart-collection-library.html)** —
  queues, linked lists, splay trees, unmodifiable views. A surprising amount of
  hand-written code is already here.
- **[Effective Dart: Usage](https://dart.dev/effective-dart/usage)** — the
  collections section in particular, on which idiom to prefer and why.
- **[package:collection](https://pub.dev/packages/collection)** — grouping,
  equality helpers, `firstWhereOrNull`, and the other things everyone reimplements
  slightly wrong.
- **[Dart 3 records and patterns](https://dart.dev/language/patterns)** —
  destructuring changes how transformation code reads, especially when working
  with map entries and tuples of results.
