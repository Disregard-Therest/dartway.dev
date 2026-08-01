---
title: Algorithms and Data Structures
description: Choosing how to store and process data so it still works when there is more of it
---

# Algorithms and Data Structures

The basic ideas that explain why code works, why it becomes slow, and how to
pick a better solution. Not competitive-programming puzzles — the shapes that
show up in ordinary product work: searching a list, grouping records, walking a
tree of categories, deduplicating what came back from an API.

**Why it matters.** Code that is fine with fifty items and unusable with fifty
thousand is the most common performance bug in product development, and it never
appears in testing. It appears on the largest customer.

## What to understand

- What data is stored, and how often it changes versus how often it is read
- What the code does repeatedly, and whether it needs to
- How the solution behaves when the input grows tenfold
- Which tradeoff is acceptable for this task — speed, memory, or simplicity
- When a slower but obvious solution is the right one

## Core topics

### Algorithms

Repeatable steps for solving a problem.

- Searching and filtering
- Sorting and ordering
- Grouping and aggregation
- Traversal of nested structures
- Deduplication

### Data structures

How data is organised determines what is cheap and what is expensive.

- List — ordered, cheap to append, expensive to search
- Map — near-instant lookup by key
- Set — membership and uniqueness
- Queue and stack — order of processing
- Tree and graph — nested and connected data

### Complexity

A way to talk about growth without measuring.

- Constant, linear, and quadratic growth
- Nested loops over the same data
- Repeated work that could be computed once
- Memory as a cost, not only time

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uses lists and maps correctly. Can write a search or a grouping loop that works. |
| Middle | Notices a nested loop over a growing collection and reaches for a map or set instead. Can explain why a screen got slow. |
| Senior | Chooses structures from the access pattern before writing code. Knows when to leave a slow solution alone because the data is bounded. |

## Practice

### Starting out

- **Find one item**
  Look an item up by id, name, or status, and handle "not found" properly.

- **Group a list**
  Group records by category, date, or owner, and render the groups.

- **Remove duplicates**
  Clean a list while keeping a predictable order.

### Going deeper

- **Kill repeated work**
  Find a calculation running on every rebuild and compute it once instead.

- **Change the structure**
  Replace a linear search inside a loop with a map lookup, and measure both.

- **Walk a tree**
  Process nested data — comments, categories, a menu, a route table — without
  recursion getting away from you.

## Check yourself

- How do you decide a simple loop is good enough?
- When does a list stop being convenient and a map or set become better?
- What tells you code is doing the same work more than once?
- How do you check a solution still holds with a hundred times more data?
- When is a slower but simpler solution the right call?
- How do you explain an algorithmic tradeoff to someone who does not want to hear it?

## Resources

- **[Grokking Algorithms](https://www.manning.com/books/grokking-algorithms-second-edition)** —
  the one book to read if this material never stuck. Illustrated, short, and
  aimed at working developers rather than exam candidates.
- **[Big-O Cheat Sheet](https://www.bigocheatsheet.com/)** — the complexity of
  every common structure and sorting algorithm on one page. Worth keeping open
  while you decide.
- **[dart:collection](https://api.dart.dev/stable/dart-collection/dart-collection-library.html)** —
  what Dart actually gives you beyond `List` and `Map`: linked lists, queues,
  splay trees, unmodifiable views.
- **[Iterable collections codelab](https://dart.dev/codelabs/iterables)** — the
  official walkthrough of Dart's collection operations, including the lazy ones
  that quietly avoid a second pass. Runnable in the browser.
- **[Data Structure Visualizations](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)** —
  step-by-step animations from the University of San Francisco. The fastest way
  to build intuition for how a tree or a hash table behaves.
