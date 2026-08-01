---
title: Testing Flutter Apps
description: Unit, widget and integration tests — and which failures each can actually catch
---

# Testing Flutter Apps

The three levels Flutter gives you, what each is good at, and how to write tests
that fail when the product is broken and not when a widget moved.

**Why it matters.** The value of a test is the bug it catches minus the time it
costs. A suite full of tests asserting the current implementation costs a lot
and catches little; it makes refactoring harder, which is the opposite of what
tests are for.

## What to understand

- What this test would catch that nothing else would
- Whether it tests behaviour or implementation
- What is faked, and whether the fake still resembles reality
- Why it is slow, if it is
- Whether a failure tells you what is wrong

## Core topics

### The levels

- Unit tests: pure logic, milliseconds, most of the suite
- Widget tests: one widget or screen with a real tree, no device
- Integration tests: the whole app on a device or emulator
- Golden tests for rendering, and their maintenance cost

### Widget testing

- `pumpWidget`, `pump` and `pumpAndSettle` — and what each actually does
- Finders, and why finding by semantics beats finding by type
- Time: fake async, timers, and animations that never settle
- Faking dependencies at the right seam
- Testing loading, error and empty as first-class cases

### Making code testable

- Injecting dependencies rather than reaching for globals
- Keeping logic out of widgets, so most of it needs no widget test
- Seams for network, storage, time and randomness
- Fakes over mocks where a fake is simple

### The suite

- Speed, because a slow suite stops being run
- Flakiness as a bug, not a fact of life
- Coverage as a hint, never a target
- What runs on every commit, and what runs nightly

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Writes unit tests for functions and follows existing widget-test patterns. |
| Middle | Chooses the right level, fakes dependencies at sensible seams, tests states rather than happy paths, fixes flakes. |
| Senior | Shapes a suite that is fast and trustworthy, keeps tests behavioural so refactoring stays cheap, and knows what not to test. |

## Practice

### Starting out

- **Test the states**
  Write widget tests for the loading, empty and error states of a screen, not
  just success.

- **Kill a `pumpAndSettle`**
  Find one that hangs on a repeating animation and replace it with explicit pumps.

- **Fake the clock**
  Test something time-dependent without `sleep`.

### Going deeper

- **Test behaviour, not structure**
  Take a test that breaks on every refactor and rewrite it against behaviour.

- **Fix a flake**
  Find an intermittent test, diagnose the actual race, and fix the cause.

- **Add one integration test**
  Cover your single most important flow end to end, and run it in CI.

## Check yourself

- Which of your tests would still pass if the feature were broken?
- Which break every time you refactor without changing behaviour?
- How long does your suite take, and when did anyone last care?
- What is faked in your widget tests, and does the fake still match reality?
- Which flow would hurt most if it broke, and is it tested end to end?
- What are you deliberately not testing, and why?

## Resources

- **[Testing Flutter apps](https://docs.flutter.dev/testing/overview)** — the
  official overview of the three levels and when each applies.
- **[Widget testing introduction](https://docs.flutter.dev/cookbook/testing/widget/introduction)** —
  the practical starting point, including finders and the pump family.
- **[flutter_test API](https://api.flutter.dev/flutter/flutter_test/flutter_test-library.html)** —
  worth skimming once; `WidgetTester` has considerably more than the tutorials
  use.
- **[Test Desiderata](https://kentbeck.github.io/TestDesiderata/)** — Kent Beck
  on the twelve properties a good test has. The clearest framework for judging
  whether a test is worth its cost.
- **[mocktail](https://pub.dev/packages/mocktail)** — null-safe faking without
  code generation, and documentation that is honest about when a fake beats a
  mock.
