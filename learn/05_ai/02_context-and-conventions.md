---
title: Context and Conventions for AI
description: Making a codebase one an agent can work in without being told everything twice
---

# Context and Conventions for AI

Shaping a project so an assistant produces code that fits: written conventions,
consistent patterns, and machine-readable instructions that travel with the
repository.

**Why it matters.** An agent infers your conventions from what it can see. A
codebase where the same problem is solved three ways teaches it that all three
are acceptable, and it will invent a fourth. Consistency was always valuable;
now it compounds.

## What to understand

- What the agent can actually see, which is less than the whole repository
- What it will infer from the code, correctly or not
- Which rules exist only in people's heads
- Where instructions live so they are found without being pasted
- Whether the instructions still match the code

## Core topics

### Instructions in the repository

- A project instruction file, and what belongs in it
- Directory-scoped instructions for areas with their own rules
- Keeping it short — instructions nobody follows are instructions too long
- Committing it, so everyone and every agent gets the same rules

### What to write down

- Structure: where things go and what may import what
- Naming and file layout
- The commands that build, test and check
- Patterns to follow and anti-patterns to avoid, with reasons
- What must never be done — the rules with real consequences

### Consistency as context

- One way to do each thing, so the pattern is unambiguous
- Examples that are correct, because they will be copied
- Deleting dead code, which is misleading context
- Types and clear signatures as machine-readable intent

### Verification as context

- Tests, lints and a type checker as the ground truth an agent can check against
- Fast feedback, so an agent can correct itself
- Making the build fail loudly rather than warn quietly

### Keeping it current

- Instructions rot exactly like documentation
- Updating them in the same change as the code
- Noticing when an agent keeps making the same mistake — that is a missing rule

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Follows the project's conventions and uses its instruction files. |
| Middle | Writes and maintains instructions, keeps patterns consistent, notices where an agent's mistakes reveal a gap. |
| Senior | Designs the project so correctness is machine-checkable, keeps conventions enforced by tooling, and treats instructions as part of the codebase. |

## Practice

### Starting out

- **Write the rules down**
  Create a project instruction file with structure, commands and the three rules
  that matter most.

- **Find the inconsistency**
  Locate a problem solved three different ways in your codebase and unify it.

- **Test the instructions**
  Give an agent a task and see whether it follows them. Fix what it missed.

### Going deeper

- **Scope instructions**
  Add directory-level instructions for an area with rules of its own.

- **Make a rule checkable**
  Turn a written convention into a lint that fails the build.

- **Close a loop**
  Notice a mistake an agent repeats, add the missing rule, and confirm it stops.

## Check yourself

- What would an agent infer about your conventions from your code alone?
- Which of your rules exist only in review comments?
- Do your instruction files still match the codebase?
- What mistake does an assistant keep making in your project?
- How would an agent verify its own work in your repository?
- What dead code is sitting there teaching the wrong pattern?

## Resources

- **[Claude Code memory and CLAUDE.md](https://docs.claude.com/en/docs/claude-code/memory)** —
  how project instructions are loaded and scoped. The clearest model for
  instructions that travel with a repository.
- **[GitHub Copilot custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)** —
  the same idea in a different tool, useful for seeing what generalises.
- **[Effective Dart](https://dart.dev/effective-dart)** — a model for how to
  write conventions: every rule paired with its reason, which is what makes rules
  survive.
- **[llms.txt](https://llmstxt.org/)** — a convention for making a site or
  project readable by models. Relevant if your project is also something others
  build against.
- **[Customizing static analysis](https://dart.dev/tools/analysis)** — because
  the strongest instruction is one the tooling enforces rather than one written
  in prose.
