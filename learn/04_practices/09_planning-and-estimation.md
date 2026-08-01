---
title: Planning and Estimation
description: Breaking work down, saying how long, and being wrong less expensively
---

# Planning and Estimation

Turning "we want this feature" into work that can be started, tracked and
finished — and giving people outside the team a usable answer about when.

**Why it matters.** Estimation is the part of engineering most likely to damage
trust. Not because estimates are wrong — they always are — but because the
uncertainty is not communicated, so a guess is heard as a promise and missing it
looks like failure rather than like arithmetic.

## What to understand

- What "done" means for this piece, agreed before starting
- What is genuinely unknown, and whether it can be found out cheaply
- What the estimate includes — review, testing, release, the unglamorous parts
- Who is waiting on this answer and what decision it feeds
- What to say when the estimate turns out wrong, and when to say it

## Core topics

### Breaking down

- Slices that deliver something, rather than layers that deliver nothing until all exist
- Small enough to finish in days, because week-long tasks are ninety percent done for a week
- Dependencies made visible early
- Spikes for genuine unknowns, timeboxed

### Estimating

- Relative sizing versus time, and what each is good for
- Ranges and confidence rather than a single number
- The planning fallacy, and using history instead of optimism
- What is systematically forgotten: review, QA, deployment, meetings
- Padding, and why hidden padding is worse than stated uncertainty

### Tracking

- A board that shows reality rather than a board that looks tidy
- Work in progress limits, and why starting is not progress
- Blocked as a state that must be visible and short
- Noticing slippage early, when it is still a small conversation

### Talking about it

- Committing to a date versus forecasting one
- Escalating early, which is a service and not an admission
- Trading scope rather than quality when time is fixed
- Saying no, or saying what would have to give

### The process itself

- Ceremonies as tools, kept only while they earn their time
- Retrospectives that change something
- Adapting the process to the team rather than the reverse

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Estimates their own tasks, flags when stuck, keeps the board honest. |
| Middle | Breaks features into deliverable slices, estimates with ranges, raises slippage early, negotiates scope. |
| Senior | Plans work across a team, makes uncertainty explicit to stakeholders, and shapes the process around how the team actually works. |

## Practice

### Starting out

- **Estimate, then measure**
  Record your estimate and the actual time for ten tasks, and look at the ratio.

- **Slice vertically**
  Take a feature planned as backend-then-frontend and re-slice it so each piece
  ships something.

- **Define done**
  Write what done means for your current task before starting it.

### Going deeper

- **Give a range**
  Present your next estimate as a range with your confidence, and see how the
  conversation changes.

- **Escalate early**
  Raise a slipping estimate the day you know, not the day it is due.

- **Kill a ceremony**
  Find a recurring meeting that has stopped earning its time and change or end
  it.

## Check yourself

- How wrong are your estimates, and in which direction, on average?
- What do you routinely forget to include?
- When you are late, when do you say so?
- What does done mean on your team, and does everyone agree?
- Which of your tasks have been in progress longest, and why?
- What did your last retrospective actually change?

## Resources

- **[Shape Up](https://basecamp.com/shapeup)** — Basecamp's approach, free
  online. Its central move — fix time and vary scope, rather than the reverse —
  is worth understanding even if you never adopt the rest.
- **[The Planning Fallacy](https://en.wikipedia.org/wiki/Planning_fallacy)** —
  the research on why estimates are systematically optimistic, and why using your
  own history beats reasoning about the task.
- **[Software Estimation: Demystifying the Black Art](https://stevemcconnell.com/books/)** —
  Steve McConnell on uncertainty, cones of confidence and communicating ranges.
  Still the most complete treatment.
- **[Story Points and Velocity](https://martinfowler.com/bliki/StoryPoint.html)** —
  Martin Fowler on what points are for and how they get misused as productivity
  measures.
- **[Agile Manifesto](https://agilemanifesto.org/)** — sixty-eight words. Worth
  rereading occasionally against whatever your process has become.
