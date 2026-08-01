---
title: Reviewing Generated Code
description: Reading a change you did not write, for problems that look like correct code
---

# Reviewing Generated Code

Judging output that is fluent, well-formatted, confidently commented, and
possibly wrong. Reviewing it is a different activity from reviewing a colleague's
work, because the usual signals — hesitation, inconsistency, obviously unfinished
edges — are absent.

**Why it matters.** You are accountable for what you merge, and "the assistant
wrote it" has never been an acceptable answer to a production incident. The
volume makes this harder: it is easy to generate more code than anyone will
genuinely read.

## What to understand

- Whether you understand the change well enough to defend it
- What it does in the cases the prompt did not mention
- Whether every API it uses actually exists and behaves as assumed
- Whether it solves the real problem or the stated one
- Whether it fits this codebase or a generic one

## Core topics

### What to check first

- Existence: does every API, package and option it used actually exist
- Edge cases: empty, null, error, concurrent, very large
- Error handling — the most common thing quietly omitted
- Resource cleanup: subscriptions, controllers, files
- Security: authorization, injection, secrets, logging

### Fit

- Does it follow this project's patterns, or a different framework's
- Does it duplicate something already present
- Does it add a dependency for something you already have
- Is the abstraction level consistent with its surroundings

### The characteristic failures

- Plausible APIs that were never real
- Code that compiles and is subtly wrong
- Over-engineering: layers and options for requirements nobody stated
- Comments describing intent rather than behaviour, hiding the mismatch
- Tests that assert what the code does rather than what it should

### Method

- Run it, always — compiling is not working
- Read the diff, not the summary
- Verify against documentation, not against confidence
- Ask it to explain, then check the explanation
- Reject and reframe rather than patch, when direction is wrong

### Volume

- Keeping changes small enough to review honestly
- Refusing to merge what you have not read
- Noticing when review has become skimming

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Checks that it compiles and does the obvious thing. |
| Middle | Reviews for edge cases, error handling and project fit. Verifies unfamiliar APIs against documentation. |
| Senior | Reads generated code adversarially, spots subtle correctness and security issues, and controls volume so review stays real. |

## Practice

### Starting out

- **Verify every API**
  Take a generated change and check each API call against its documentation.

- **Hunt the edges**
  For a generated function, list the inputs it does not handle. Test them.

- **Explain it back**
  Explain a generated change to someone else without looking at it.

### Going deeper

- **Review adversarially**
  Take a change and actively try to find a case where it is wrong, before
  merging.

- **Check the tests**
  Review generated tests for whether they assert behaviour or implementation.

- **Reject and reframe**
  When output goes the wrong way, discard it and change the framing instead of
  correcting in place.

## Check yourself

- Could you defend every line you merged this week in an incident review?
- When did you last catch a confidently invented API?
- What does a generated change usually omit in your experience?
- Are you reading diffs or reading summaries?
- How much generated code have you merged without running?
- What would make you reject output outright rather than fix it?

## Resources

- **[Google's Code Review Developer Guide](https://google.github.io/eng-practices/review/reviewer/looking-for.html)** —
  what to look for in any change. The checklist applies unchanged to generated
  code, and is a good defence against skimming.
- **[OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)** —
  the security dimension, which is where generated code most often has gaps
  because the prompt did not mention it.
- **[Exploring Generative AI](https://martinfowler.com/articles/exploring-gen-ai.html)** —
  practitioner reports from Thoughtworks on where output goes wrong in real
  codebases, with examples.
- **[Test Desiderata](https://kentbeck.github.io/TestDesiderata/)** — useful for
  judging generated tests, which frequently look thorough while asserting
  nothing that matters.
- **[Anthropic: reducing hallucinations](https://docs.claude.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)** —
  why confident invention happens and what reduces it, which also tells you where
  to look hardest.
