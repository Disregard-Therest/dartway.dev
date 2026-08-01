---
title: Testing Strategy
description: Deciding what to test, at which level, and what to leave alone
---

# Testing Strategy

Not how to write a test — that is the Flutter testing page — but what the suite
as a whole is for, where to spend effort, and how to keep it worth its cost.

**Why it matters.** Testing effort has sharply diminishing returns, and the
returns depend entirely on where it goes. A team can double its test count and
catch nothing new. The decision of what to test is worth more than the skill of
writing tests.

## What to understand

- What would hurt most if it broke, and whether it is covered
- What each test level can catch that the others cannot
- What a failing test should tell you, immediately
- What the suite costs — time, maintenance, and the changes it discourages
- Which risks are better handled by monitoring than by tests

## Core topics

### Shape

- The pyramid, and why it is a cost argument rather than a rule
- Fast and many at the bottom, slow and few at the top
- Where contract tests fit between client and server
- Manual testing as a deliberate choice for some things

### Choosing

- Risk-based: probability times damage, not coverage percentage
- Testing behaviour at a boundary rather than implementation inside it
- Bug-driven: every production bug leaves a test behind
- What not to test — generated code, framework behaviour, trivia

### Trustworthiness

- Flakiness destroying the value of the whole suite
- Failures that identify the cause without investigation
- Independent tests that can run in any order
- Data setup that does not become its own maintenance burden

### Economics

- Suite duration and the point where people stop running it
- Maintenance cost when tests know too much about implementation
- Coverage as a diagnostic, never a target
- Deleting tests that no longer earn their keep

### In the pipeline

- What runs per commit, per pull request, nightly
- Parallelisation and selective running
- Gating a release on the right subset

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Writes tests for the code they are asked to test. |
| Middle | Chooses the level deliberately, tests behaviour at boundaries, adds a regression test for every bug. |
| Senior | Sets the strategy for a codebase: what is covered, what is not and why, keeps the suite fast and trusted, and knows what monitoring covers better than tests. |

## Practice

### Starting out

- **Cover the critical flow**
  Identify the one flow that must never break and make sure it is tested end to
  end.

- **Turn a bug into a test**
  Take the last production bug and write the test that would have caught it.

- **Time the suite**
  Measure how long tests take, and find what dominates.

### Going deeper

- **Map risk to coverage**
  List what would hurt most if broken, and check what each is covered by. Fix the
  gaps.

- **Delete tests**
  Find tests that only assert implementation and remove them, arguing the case.

- **Split the pipeline**
  Separate fast checks per commit from slow ones nightly, and pick the split
  deliberately.

## Check yourself

- What in your product would be most damaging if it broke, and is it tested?
- What proportion of your test failures are real bugs?
- How long does the suite take before anyone starts avoiding it?
- Which tests break on refactoring that changed no behaviour?
- What are you deliberately not testing, and can you defend that?
- Which risks in your app are better caught by monitoring than by tests?

## Resources

- **[Test Desiderata](https://kentbeck.github.io/TestDesiderata/)** — Kent Beck's
  twelve properties of a good test, with the point that they trade off against
  each other. The best available framework for these decisions.
- **[Testing overview](https://docs.flutter.dev/testing/overview)** — Flutter's
  levels, and where each stops being able to see problems.
- **[Google Testing Blog](https://testing.googleblog.com/)** — particularly the
  Testing on the Toilet series, which is short, specific, and mostly about
  judgement rather than technique.
- **[Software Engineering at Google, chapter 11](https://abseil.io/resources/swe-book/html/ch11.html)** —
  testing at scale, free online. Strong on why tests must be fast and
  deterministic to be worth anything.
- **[The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)** —
  Ham Vocke's long treatment, including contract testing between services.
