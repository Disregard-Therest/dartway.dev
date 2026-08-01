---
title: AI in Review and Testing
description: Using assistance on the checking side, where a second reader is cheap
---

# AI in Review and Testing

Pointing AI at the work of verification rather than production: reviewing
changes, generating test cases, hunting edge cases, and reading code nobody on
the team wrote.

**Why it matters.** This is where the economics are best. Review capacity is
scarce, tests are the first thing dropped under deadline, and both are tasks
where a fast, tireless second reader adds value even when it is sometimes wrong —
because a false positive costs a minute and a missed bug costs a release.

## What to understand

- What a machine reviewer can see that a human misses, and the reverse
- Whether a generated test asserts behaviour or restates the implementation
- What "it found nothing" is worth
- Where this augments a human and where it must not replace one
- What you are sending to a third party when you use it

## Core topics

### Assisted review

- A first pass before a human: obvious problems, omissions, inconsistencies
- Reviewing your own change before anyone else sees it
- Explaining unfamiliar code, and checking the explanation
- Security and edge-case passes as separate, focused questions
- Noise, and why an unfiltered reviewer gets ignored like a bad linter

### Test generation

- Enumerating cases from a description, which humans do incompletely
- Boundaries, empty input, error paths — the ones people skip
- The trap: tests written from the implementation, which pass by construction
- Describing behaviour first, then generating against the description
- Reviewing generated tests as carefully as generated code

### Investigation

- Reading a crash report and proposing hypotheses
- Explaining an unfamiliar dependency's behaviour
- Reconstructing intent from history
- Suggesting where to add logging

### Boundaries

- Approval remains a human act
- Not the sole reviewer of security-sensitive changes
- Coverage that looks complete while asserting nothing
- What may leave your machine, and what may not

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Asks for explanations of code and generates simple test cases. |
| Middle | Uses it as a structured first-pass reviewer and to enumerate edge cases, then reviews what it produced. |
| Senior | Integrates it into the workflow where it demonstrably helps, keeps human judgement on approval, and measures whether it is finding real problems. |

## Practice

### Starting out

- **Self-review first**
  Run your next change past an assistant before requesting human review, and note
  what it caught.

- **Enumerate the cases**
  Describe a function's behaviour and ask for the cases to test. Compare with
  your own list.

- **Explain unfamiliar code**
  Have it explain a file nobody understands, then verify the explanation by
  reading.

### Going deeper

- **Test from behaviour**
  Write the description first, generate tests against it, and check none simply
  mirror the code.

- **Run a security pass**
  Ask specifically for authorization and input-handling problems in a change, and
  verify each finding.

- **Measure it**
  Over a month, count how many real problems it found and how much noise. Decide
  whether it stays.

## Check yourself

- What has assisted review actually caught on your project?
- How many of its findings are noise, and at what point would you stop reading?
- Do your generated tests assert behaviour or implementation?
- What would you never let it be the only reviewer of?
- What code are you sending to a third party, and is that allowed?
- Has it made your team's reviews better, or just faster?

## Resources

- **[Google's Code Review Developer Guide](https://google.github.io/eng-practices/review/)** —
  the standard to hold an assisted review against, and the reminder of what
  review is for beyond finding defects.
- **[Test Desiderata](https://kentbeck.github.io/TestDesiderata/)** — the
  criteria for judging generated tests. Most of them fail on "behaviour, not
  structure".
- **[Property-based testing](https://hypothesis.works/articles/what-is-property-based-testing/)** —
  a complementary way to reach the cases people forget, and often a better fit
  than more example tests.
- **[OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)** —
  what a security pass should cover, so you can ask for something specific rather
  than "check for problems".
- **[Exploring Generative AI](https://martinfowler.com/articles/exploring-gen-ai.html)** —
  includes concrete accounts of using assistance for testing and review, with
  what worked and what did not.
