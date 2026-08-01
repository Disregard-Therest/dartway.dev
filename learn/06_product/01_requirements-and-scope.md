---
title: Requirements and Scope
description: Understanding what is actually needed before deciding how to build it
---

# Requirements and Scope

Working out what problem a request is really solving, what the edges are, and
what will not be built. The part that happens before any code, and that
determines whether the code was worth writing.

**Why it matters.** The most expensive engineering mistake is building the wrong
thing well. It passes review, it ships, and it is discovered months later when
nobody uses it. No amount of code quality recovers that.

## What to understand

- What problem this solves, for whom, and how you would know it worked
- What was asked for, and what was meant
- Which parts are essential and which arrived as assumptions
- What happens in the cases nobody mentioned
- What is explicitly not in scope, written down

## Core topics

### Understanding the request

- The problem behind the proposed solution
- Who the user is and what they were doing before this existed
- Success as something observable, not "users will like it"
- Constraints that are real versus constraints that are habit

### The edges

- Empty, first-run, one item, ten thousand items
- Failure: no network, no permission, expired session
- Concurrency: two devices, two tabs, two people
- Who may do this, and what happens when they may not
- Migration for data that already exists

### Scope

- The smallest version that delivers the value
- What is deliberately excluded, and saying so out loud
- Scope creep, and noticing it during rather than after
- Trading scope when time is fixed, instead of trading quality

### Writing it down

- Enough that someone else could build it
- Acceptance criteria that can be checked, not admired
- Open questions marked as open rather than guessed
- Keeping it current, or deleting it

### Pushing back

- Saying what a request would cost, in terms the asker cares about
- Offering an alternative that solves the problem more cheaply
- Distinguishing "this is hard" from "this is wrong"

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Implements what is described and asks when it is unclear. |
| Middle | Finds the problem behind the request, identifies edge cases before building, and negotiates scope with reasons. |
| Senior | Shapes what gets built at all, defines success measurably, and can decline work while keeping the relationship. |

## Practice

### Starting out

- **Ask why once more**
  For your next task, find the problem behind the request before writing code.

- **List the edges**
  Before building, write every edge case. Compare with what you find during.

- **Define done**
  Write acceptance criteria that someone else could check.

### Going deeper

- **Halve the scope**
  Take a planned feature and find the version worth half the effort and most of
  the value.

- **Write the non-goals**
  Add an explicit "not building" section, and see how many arguments it prevents.

- **Propose an alternative**
  When asked for something expensive, come back with a cheaper way to solve the
  underlying problem.

## Check yourself

- For your current task, what problem is it solving and for whom?
- What would tell you, in a month, that it worked?
- Which edge cases did you discover only while building?
- When did you last build something nobody used?
- How do you say no to a request without saying no to the person?
- What is explicitly out of scope on your current project?

## Resources

- **[Shape Up](https://basecamp.com/shapeup)** — free online, and strongest on
  shaping: defining a problem at the right level of detail before it becomes
  work, and fixing time rather than scope.
- **[Jobs to be Done](https://hbr.org/2016/09/know-your-customers-jobs-to-be-done)** —
  Christensen in HBR. The framing that separates what someone asked for from what
  they are trying to accomplish.
- **[User Story Mapping](https://www.jpattonassociates.com/user-story-mapping/)** —
  Jeff Patton on seeing the whole flow before slicing it, which is what prevents
  a backlog of pieces that never add up.
- **[Writing good acceptance criteria](https://cucumber.io/docs/bdd/better-gherkin/)** —
  the mechanics of criteria that are checkable, from the tooling built around
  them.
- **[Inspired](https://www.svpg.com/inspired-how-to-create-products-customers-love/)** —
  Marty Cagan on how product decisions are actually made, which is worth reading
  even if you never hold the title.
