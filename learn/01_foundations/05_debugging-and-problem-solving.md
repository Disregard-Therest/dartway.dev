---
title: Debugging and Problem Solving
description: Finding the actual cause instead of changing things until it works
---

# Debugging and Problem Solving

Turning "it does not work" into a specific, reproducible statement about what is
happening, and then finding the cause rather than a change that makes the
symptom go away.

**Why it matters.** Debugging is where senior and junior differ most visibly,
and the gap is not knowledge of tools. It is method: one developer forms a
hypothesis and tests it, the other edits code until the error stops, leaving a
bug that will return in a form nobody recognises.

## What to understand

- What exactly happens, versus what you assumed happens
- Whether you can reproduce it on demand — and if not, what varies
- Which layer the problem is in, before looking inside any of them
- What changed, if it used to work
- Whether the fix addresses the cause or hides the symptom

## Core topics

### Method

- Reproduce first; a bug you cannot trigger cannot be verified fixed
- Narrow by halving — bisect the code path, the data, the time range
- One change at a time, so you know what did it
- Question the assumption you are most confident about, because that is where it hides

### Tools

- Breakpoints, conditional breakpoints, and stepping deliberately
- Logging that survives to production, and structured logs over `print`
- Inspecting state: widget trees, network traffic, database contents
- Profilers, for questions about time and memory rather than correctness

### Hard cases

- Intermittent and timing-dependent bugs
- Works on my machine — environment, version and data differences
- Bugs only in release builds
- Reports from users with no reproduction

### After the fix

- A test that would have caught it
- Whether the same mistake exists elsewhere
- Making the failure louder next time

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Reads the error, searches it, tries fixes. Gets there on straightforward bugs. |
| Middle | Reproduces reliably, isolates the layer, uses a debugger and profiler by choice rather than as a last resort. |
| Senior | Diagnoses from incomplete information — a crash report, a user description — and fixes the class of bug rather than the instance. |

## Practice

### Starting out

- **Reproduce on demand**
  Take a bug that happens "sometimes" and find the exact conditions.

- **Use the debugger instead of prints**
  Take your next bug and solve it entirely with breakpoints and inspection.

- **Read a stack trace properly**
  Find the first frame that is your code and explain how it was reached.

### Going deeper

- **Bisect a regression**
  Use `git bisect` to find the commit that introduced a bug.

- **Debug a release-only failure**
  Investigate something that only reproduces in a release build.

- **Diagnose from a crash report**
  Take a production stack trace with no reproduction and work out what happened.

## Check yourself

- What do you do first when something does not work?
- How do you decide which layer the problem is in?
- When did you last fix a symptom and have the bug come back?
- What makes a bug report useful to you, and do yours meet that bar?
- How do you debug something you cannot reproduce?
- After fixing a bug, what do you do so it cannot return silently?

## Resources

- **[Debugging: The 9 Indispensable Rules](https://debuggingrules.com/)** — David
  Agans' book, written from hardware debugging and all the better for it. The
  rules are short enough to remember and specific enough to use.
- **[Flutter DevTools](https://docs.flutter.dev/tools/devtools)** — the inspector,
  the network view, the CPU and memory profilers. Most developers use a fraction
  of this and pay for it.
- **[Debugging Flutter apps](https://docs.flutter.dev/testing/debugging)** — the
  official guide, including the debug flags and assertions that surface problems
  you would otherwise chase.
- **[A debugging manifesto](https://jvns.ca/blog/2022/12/08/a-debugging-manifesto/)** —
  Julia Evans on the attitude that separates people who find bugs from people who
  flail at them. Pair it with her
  [debugging guide zine](https://wizardzines.com/zines/debugging-guide/).
- **[git bisect](https://git-scm.com/docs/git-bisect)** — the official
  documentation, including `run` for automating the search entirely.
