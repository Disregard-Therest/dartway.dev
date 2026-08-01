---
title: Architecture and Code Organization
description: Deciding where code lives and what is allowed to depend on what
---

# Architecture and Code Organization

Deciding where a piece of code belongs, what it is allowed to know about, and
where the seams are. Less about diagrams than about the boundaries a codebase
holds when six people change it over two years.

**Why it matters.** Architecture rarely fails loudly. It fails as a slow
increase in the cost of every change, until a one-line feature touches nine
files and nobody can say why.

## What to understand

- What this piece of code is responsible for, stated in one sentence
- What it is allowed to depend on, and what must never depend on it
- Which decisions are expensive to reverse, and which are not
- Whether an abstraction is paying for itself or just adding a layer
- What a newcomer would guess, and whether the structure rewards that guess

## Core topics

### Responsibility and boundaries

A unit of code does one thing and names it honestly.

- Single responsibility, in practice rather than as a slogan
- Public surface versus internals
- What crossing a boundary should cost

### Dependencies

Direction matters more than count.

- Dependency direction and why it should point one way
- Inversion — depending on an interface, not an implementation
- Cycles, and why they are the first sign of a missing boundary

### Structure

- Feature-first versus layer-first, and what each optimises for
- Where shared code goes, and when "shared" becomes a dumping ground
- Module and package boundaries as enforcement, not suggestion

### Restraint

The principles worth actually applying.

- KISS — the simplest thing that survives the next change
- DRY, and the more common mistake of applying it to things that only look alike
- YAGNI — abstraction added for a future that never arrives

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Follows the structure that exists. Puts new code where similar code already lives. |
| Middle | Notices when a file or a feature has grown two responsibilities and splits it. Argues about dependency direction with reasons. |
| Senior | Sets the structure for a new codebase and can say what it optimises for and what it sacrifices. Knows which decisions to defer. |

## Practice

### Starting out

- **Name the responsibility**
  Take a file over three hundred lines and write one sentence for what it is
  for. If you need "and", split it.

- **Follow a dependency**
  Pick a feature and draw what it imports. Look for anything pointing the wrong
  way.

- **Delete an abstraction**
  Find an interface with exactly one implementation and inline it. Notice whether
  anything got worse.

### Going deeper

- **Extract a module**
  Take a feature entangled with the rest of the app and give it a real boundary
  with one entry point.

- **Break a cycle**
  Find two parts that import each other and remove the cycle without a
  workaround.

- **Write the rule down**
  Turn a convention your team keeps repeating in review into something enforced
  by tooling.

## Check yourself

- How do you tell a useful abstraction from a layer that only adds indirection?
- When you find duplicated code, how do you decide whether to unify it?
- What tells you a file is doing too much, before it becomes obvious?
- Which decisions in your current project would be expensive to reverse?
- How would you explain your project's structure to someone joining tomorrow?
- When has following a principle made your code worse?

## Resources

- **[A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/book.php)** —
  John Ousterhout on complexity as the thing you are actually fighting. Short,
  opinionated, and disagrees with several things everyone repeats.
- **[Martin Fowler on software architecture](https://martinfowler.com/architecture/)** —
  the collected essays, including what architecture even means and why it is
  worth paying for. Start with *Who Needs an Architect?*
- **[Refactoring](https://refactoring.com/)** — the catalogue of how to change
  structure safely. The point is less the individual moves than the habit of
  changing shape in small, reversible steps.
- **[Domain-Driven Design Reference](https://www.domainlanguage.com/ddd/reference/)** —
  Eric Evans' own condensed summary, free. Useful even if you never adopt DDD
  wholesale: bounded contexts are the clearest statement of why boundaries exist.
- **[Guide to app architecture](https://docs.flutter.dev/app-architecture)** —
  Flutter's own take, which is worth reading precisely because it is opinionated
  about a specific stack rather than about software in general.
