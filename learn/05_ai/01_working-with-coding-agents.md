---
title: Working with Coding Agents
description: Using an agent as a fast collaborator that has never seen your product
---

# Working with Coding Agents

Getting real work out of an AI coding assistant: what to delegate, how to frame
it, and what you remain responsible for. This is a skill with technique, and the
gap between developers who have it and developers who do not is already large.

**Why it matters.** An agent can produce a week of plausible code in an hour. If
the direction is right that is leverage; if it is wrong it is a week of plausible
code to unpick. The skill is not prompting — it is deciding what to hand over and
staying in control of the result.

## What to understand

- What the agent can see, and what it is confidently guessing
- Which tasks it is genuinely good at, and which it will fail convincingly
- How much to ask for at once
- How you will verify the result, decided before it is produced
- What you would have to understand anyway, and therefore should not delegate

## Core topics

### What to delegate

- Mechanical change across many files, where correctness is checkable
- Boilerplate that follows an existing pattern
- Tests for behaviour you can describe
- Exploration: how does this library work, what does this code do
- The first draft of something you will heavily edit

### What to keep

- Decisions with long-lived consequences
- Anything where you cannot tell right from plausible
- Work whose value is that you now understand it
- Security-sensitive logic, until you have reviewed it as if it were hostile

### Framing the task

- Goal and constraints, not step-by-step instructions
- Pointing at the existing code that sets the pattern
- Saying what done looks like and how it will be checked
- Small enough to verify, then iterate

### Staying in control

- Reviewing every diff, not the summary of it
- Running it, because compiling is not working
- Stopping when the direction is wrong instead of steering with corrections
- Keeping changes in small commits so any of them can be dropped

### The failure modes

- Confident invention of APIs that do not exist
- Following a pattern from a different framework
- Solving the stated problem while missing the actual one
- Producing volume that is expensive to review

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uses completions and asks questions. Accepts output that compiles. |
| Middle | Delegates well-scoped tasks with context, reviews every change, verifies by running rather than reading. |
| Senior | Decides what should and should not be delegated, sets up the project so agents work well in it, and stays accountable for everything merged. |

## Practice

### Starting out

- **Delegate something verifiable**
  Pick a task where correctness is objectively checkable and hand it over
  completely.

- **Review as a stranger**
  Take a generated change and review it as if from an unknown contributor.

- **Catch an invention**
  Ask about an unfamiliar library and check every API mentioned against its
  documentation.

### Going deeper

- **Compare framings**
  Give the same task twice — once as steps, once as goal and constraints — and
  compare.

- **Delegate a refactor**
  Hand over a mechanical change across twenty files, with a plan for verifying
  it.

- **Find the limit**
  Deliberately give a task too large, and notice where the output stops being
  reviewable.

## Check yourself

- Which of your tasks are genuinely better done by an agent?
- How do you verify generated code beyond it compiling?
- When did an agent last produce something confidently wrong, and what caught it?
- What would you never delegate, and why?
- Are you reviewing diffs, or reading summaries of them?
- Does using an agent leave you understanding your codebase better or worse?

## Resources

- **[Claude Code documentation](https://docs.claude.com/en/docs/claude-code/overview)** —
  how an agentic coding tool actually works, including project context and
  permissions. Reading the model rather than guessing at it changes how you use
  it.
- **[GitHub Copilot best practices](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot)** —
  practical guidance on scoping requests and reviewing output, applicable well
  beyond Copilot.
- **[Prompt engineering overview](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)** —
  the techniques that measurably change output quality, from people who
  benchmark them.
- **[AI and the future of coding](https://martinfowler.com/articles/exploring-gen-ai.html)** —
  Martin Fowler's ongoing series of practitioner reports. Unusually free of both
  hype and dismissal.
- **[Stack Overflow Developer Survey](https://survey.stackoverflow.co/)** — the
  AI sections, for how working developers actually use these tools and where
  trust sits.
