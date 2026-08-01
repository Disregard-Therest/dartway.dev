---
title: Code Generation
description: Letting the build produce the boilerplate, without losing the ability to debug it
---

# Code Generation

Serialisation, immutable data classes, dependency wiring and route tables written
by a builder instead of by hand. In Dart this is `build_runner` plus a set of
generators, and it is close to unavoidable in a real project.

**Why it matters.** Hand-written `fromJson` is where quiet data bugs live: a
renamed field, a nullable that was not, a date parsed in the wrong format.
Generated code does not get tired. The tradeoff is a build step, and a class of
error message that means nothing until you have seen it before.

## What to understand

- What is generated, from what, and where the output lives
- Which file is the source of truth — and it is never the generated one
- What a build failure is actually telling you
- What generation costs on every build, and how to keep it bounded
- Whether the generator earns its dependency

## Core topics

### The mechanics

- `build_runner`, builders, and `part` files
- `build`, `watch`, and `--delete-conflicting-outputs`
- Generated files in version control: the argument both ways, and picking one
- Build performance, and why it degrades as the project grows

### What gets generated

- JSON serialisation, and controlling names, defaults and unknown fields
- Immutable data classes: `copyWith`, equality, unions
- Dependency injection and service locators
- Routes and navigation tables
- Localisation
- Mocks for tests

### Living with it

- Reading generated code when something is wrong
- Debugging through a generated layer
- Keeping generators in step across a version bump
- The cost of a generator that stops being maintained

### Alternatives

- Macros and where the language is heading
- Writing it by hand when there are three fields
- A framework that removes the need rather than generating around it

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Runs `build_runner` when told, uses generated models, treats failures as magic. |
| Middle | Configures generators, reads the output when debugging, resolves conflicts and version mismatches. |
| Senior | Decides what should be generated at all, keeps build times sane, and weighs a generator dependency against writing it once. |

## Practice

### Starting out

- **Read the output**
  Open the `.g.dart` for a model you use and follow how one field is parsed.

- **Break it deliberately**
  Rename a field in the API response and watch where the failure surfaces.

- **Control the mapping**
  Make a Dart field name differ from its JSON key, and handle a missing value.

### Going deeper

- **Model a union**
  Generate a sealed union for a response that has genuinely different shapes.

- **Speed up the build**
  Measure `build_runner` time and reduce it — scope the builders, cut what is
  unused.

- **Remove a generator**
  Find one earning less than it costs and replace it with fifteen lines of Dart.

## Check yourself

- Where does generated code live in your project, and is it committed?
- What happens when the API adds a field you do not know about?
- How long does a full build take, and when did you last check?
- When something is wrong in a generated class, how do you debug it?
- Which of your generators would be painful to lose, and is that acceptable?
- What are you generating that would be shorter written by hand?

## Resources

- **[build_runner](https://dart.dev/tools/build_runner)** — the official guide to
  running builders, including watch mode and the conflict flag everyone
  eventually needs.
- **[json_serializable](https://pub.dev/packages/json_serializable)** — the
  standard for serialisation. The README's configuration section is the part
  worth actually reading.
- **[freezed](https://pub.dev/packages/freezed)** — immutable classes, unions and
  `copyWith`. The clearest example of generation buying real modelling power
  rather than just saving typing.
- **[package:build documentation](https://github.com/dart-lang/build/tree/master/docs)** —
  how builders work underneath, needed the day you write or debug one.
- **[Dart macros](https://dart.dev/language/macros)** — where the language is
  going, and worth tracking before committing to a large generated surface.
