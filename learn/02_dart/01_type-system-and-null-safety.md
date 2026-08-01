---
title: Type System and Null Safety
description: Using Dart's types to make wrong states impossible rather than merely caught
---

# Type System and Null Safety

Dart's type system, and what changes when you treat it as a design tool rather
than as paperwork. Sound null safety means the compiler can prove a value is not
null — but only if you let it, and most codebases spend that guarantee on
`!` within a month.

**Why it matters.** Every state your types allow but your product forbids is a
bug waiting for the right user. A model where "delivered" and "no delivery date"
can both be true will eventually have both.

## What to understand

- What the type is promising, and whether the promise is true
- Why a value is nullable — genuinely optional, or not loaded yet, or lazily built
- Where `!` is a proof you have and the compiler does not, and where it is a hope
- Whether an illegal combination of fields is representable at all
- What `dynamic` costs, and where it sneaks in uninvited

## Core topics

### The type system

- Sound typing, and what soundness buys you
- Generics, and writing code that is generic because it must be
- Variance in one sentence: why a `List<Dog>` is a `List<Animal>` in Dart, and the runtime check that costs
- `dynamic` versus `Object?` — the second one makes you look

### Null safety

- Nullable and non-nullable types, and `late` as a promise with a runtime cost
- The null-aware operators, and which of them hide problems
- `!` — the four honest uses and the many dishonest ones
- Migrating a codebase, and why the ugly intermediate state is temporary

### Modelling with types

- Sealed classes and exhaustive `switch`
- Records for values that travel together without deserving a class
- Pattern matching and destructuring
- Enums with members, replacing scattered `if` chains
- Making illegal states unrepresentable, rather than validating them everywhere

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Writes correct type annotations. Resolves null errors, sometimes with `!`. |
| Middle | Uses generics and sealed classes deliberately. Can explain why a field is nullable, or removes the nullability. |
| Senior | Designs models where wrong states do not compile. Uses exhaustiveness so adding a case breaks the code that must change. |

## Practice

### Starting out

- **Remove the bangs**
  Take a file with several `!` and restructure so most of them are unnecessary.

- **Justify each nullable**
  Go through a model and, for every nullable field, write why. Fix the ones with
  no answer.

- **Replace a string with an enum**
  Find a status held as a `String` and make it an enum, then follow the compiler.

### Going deeper

- **Model a state machine**
  Replace a class with `isLoading`, `error` and `data` fields with a sealed class
  where only valid combinations exist.

- **Use exhaustiveness on purpose**
  Add a case to a sealed type and let the compiler show you everywhere that must
  handle it.

- **Write a real generic**
  Extract a repeated pattern into a generic function or class with a meaningful
  bound.

## Check yourself

- Which nullable fields in your project are nullable only because they are loaded later?
- When you write `!`, what do you know that the compiler does not?
- What combinations of fields does your model allow that the product forbids?
- Where has `dynamic` entered your code without you choosing it?
- How do you find every place that must change when you add a case?
- When is a generic making code reusable, and when is it making it unreadable?

## Resources

- **[The Dart type system](https://dart.dev/language/type-system)** — how
  soundness works, including the parts about generics and inference that most
  people never read and then misdiagnose.
- **[Sound null safety](https://dart.dev/null-safety)** — the official
  explanation, including flow analysis and what `late` actually costs at runtime.
- **[Patterns](https://dart.dev/language/patterns)** — destructuring, switch
  expressions and exhaustiveness. The feature that makes sealed-class modelling
  practical rather than verbose.
- **[Effective Dart: Design](https://dart.dev/effective-dart/design)** — the
  language team's own guidance on types in public APIs. Terse, and every entry
  has a reason attached.
- **[Making illegal states unrepresentable](https://fsharpforfunandprofit.com/posts/designing-with-types-making-illegal-states-unrepresentable/)** —
  written for F#, but it is the clearest statement of the idea, and it transfers
  directly to sealed classes in Dart.
