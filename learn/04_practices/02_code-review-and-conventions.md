---
title: Code Review and Conventions
description: Reviews that catch real problems without becoming a bottleneck
---

# Code Review and Conventions

Reading other people's changes before they ship, and agreeing enough conventions
that reviews are about substance rather than formatting.

**Why it matters.** Review is where knowledge spreads through a team and where
the expensive mistakes get caught — the design that will not extend, the
security hole, the case nobody considered. It is also where teams waste the most
time, arguing about things a formatter should have settled.

## What to understand

- What this review is for: correctness, design, knowledge sharing, or all three
- Which comments are blocking and which are suggestions
- What a tool could have caught, so a human does not
- What the author already knows, and what they need
- When a review has stopped being useful and needs a conversation

## Core topics

### Reviewing well

- Reading the description first, then the diff
- Correctness, edge cases and failure paths before style
- Asking rather than asserting when you might be missing context
- Being explicit about severity — blocking, or take it or leave it
- Approving when it is better than what is there, not when it is perfect

### Being reviewed

- Small changes, because reviewers' attention is finite
- A description that says why, and what you considered
- Reviewing your own diff first
- Responding to the point rather than defending

### What tooling should own

- Formatting, settled by a formatter and never discussed
- Lints for the rules a team keeps repeating
- CI as the gate for tests and build, so reviewers do not check them
- Automation for anything mechanical

### Conventions

- Naming, structure and file layout, written down once
- Where the conventions live, and how they change
- Onboarding: a new person should be able to read the rules
- Reviewing the conventions themselves occasionally

### The failure modes

- Review as a bottleneck, with changes sitting for days
- Rubber stamping under time pressure
- Nitpicking that costs more than it saves
- One person as the only reviewer for a whole area

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Submits small, described changes and responds to feedback constructively. |
| Middle | Reviews thoroughly, catches edge cases and design problems, separates blocking from optional clearly. |
| Senior | Shapes review culture, moves mechanical checks into tooling, and uses review to develop people rather than only to gate code. |

## Practice

### Starting out

- **Review your own diff**
  Before requesting review, read your change as a stranger and fix what you find.

- **Split a large change**
  Take a pull request over five hundred lines and break it into reviewable
  pieces.

- **Mark severity**
  On your next review, label each comment blocking or optional.

### Going deeper

- **Automate a recurring comment**
  Find something you have said three times in reviews and turn it into a lint.

- **Measure the wait**
  Find out how long changes sit in review on your team, and fix the worst cause.

- **Write the conventions down**
  Turn the unwritten rules people learn by being corrected into a document.

## Check yourself

- What proportion of your review comments could a tool have made?
- How long does a change wait for review on your team?
- When did you last approve something you had not really read?
- How does a reviewer know which of your comments must be addressed?
- What conventions does your team have that a new person could not discover?
- What was the last real bug caught in review, and what would have caught it earlier?

## Resources

- **[Google's Code Review Developer Guide](https://google.github.io/eng-practices/review/)** —
  the most complete public treatment, covering both sides and the standard for
  approval. The section on what to look for is directly usable.
- **[Conventional Comments](https://conventionalcomments.org/)** — a tiny
  convention for labelling comment severity that removes a surprising amount of
  friction.
- **[Effective Dart: Style](https://dart.dev/effective-dart/style)** — the
  baseline conventions for Dart, so the team argues about something else.
- **[Dart linter rules](https://dart.dev/tools/linter-rules)** — the full list.
  Worth reading through once to find the rules matching your team's recurring
  review comments.
- **[The Human Side of Code Review](https://mtlynch.io/human-code-reviews-1/)** —
  on the tone and psychology, which is what determines whether review helps or
  corrodes a team.
