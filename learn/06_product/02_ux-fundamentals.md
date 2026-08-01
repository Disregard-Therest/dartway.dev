---
title: UX Fundamentals
description: Enough interaction design to make the hundred small decisions nobody specifies
---

# UX Fundamentals

The judgement to handle everything a design file does not cover: what the empty
state says, how an error is phrased, what happens after a tap, how long the user
waits before seeing something.

**Why it matters.** A designer specifies the happy path. Developers decide
everything else — and everything else is where users actually spend their
frustration. Those decisions are made whether or not anyone makes them
deliberately.

## What to understand

- What the user is trying to do, not what the screen contains
- What they know at this moment, and what you are assuming
- What happens after every action, and how they find out
- What the worst realistic case looks like, not the demo case
- What this asks the user to remember or retype

## Core topics

### Feedback

- Every action acknowledged, immediately
- Loading as several distinct problems: instant, brief, long, unknown
- Skeletons versus spinners, and when neither
- Optimistic updates, and being honest when they fail
- Errors that say what happened and what to do about it

### The states nobody designs

- Empty, and first-run as different from empty-because-filtered
- Error, offline, permission denied
- Loading more, end of list, nothing found
- One item, and ten thousand
- Long text, missing images, unexpected content

### Interaction

- Touch target sizes, and thumb reach on a large phone
- Destructive actions: confirm, or undo, and preferring undo
- Forms: validation timing, error placement, keyboard types, autofill
- Navigation that matches where the user thinks they are

### Words

- Buttons naming the action, not "OK"
- Errors in the user's terms, not the system's
- Consistent vocabulary throughout the product
- Text that survives translation and a larger font

### Judging it

- Watching someone use it without helping
- Counting taps for the most common task
- Where people hesitate, which is where the design failed

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Implements designs faithfully and adds loading and error states when reminded. |
| Middle | Handles every state without being asked, writes clear messages, notices interaction problems in the design. |
| Senior | Makes flow-level decisions, reduces steps, and argues for changes with reasons a designer accepts. |

## Practice

### Starting out

- **Design the empty state**
  Take a list that shows nothing when empty and make it useful.

- **Rewrite an error**
  Find a message showing a technical string and rewrite it for a user.

- **Count the taps**
  Count the taps for your app's most common task, and remove one.

### Going deeper

- **Replace confirm with undo**
  Take a destructive action behind a dialog and make it undoable instead.

- **Fix a form**
  Take the worst form in your app and improve validation timing, keyboards and
  error placement.

- **Watch someone use it**
  Give a person a task, say nothing, and write down every hesitation.

## Check yourself

- What does your app show while waiting, and for how long is that acceptable?
- Which of your screens has no designed empty state?
- What do your error messages tell the user to do?
- What is the most destructive action in your app, and how is it protected?
- How many taps is your most common task, and could it be fewer?
- When did you last watch a real person use your app?

## Resources

- **[Nielsen Norman Group](https://www.nngroup.com/articles/)** — the research
  library. The ten usability heuristics and the response-time limits are the two
  pieces every developer should know.
- **[Refactoring UI](https://www.refactoringui.com/)** — written by developers
  for developers, and entirely made of specific decisions rather than principles.
- **[Material Design guidelines](https://m3.material.io/foundations)** — the
  reasoning behind touch targets, motion and feedback, useful regardless of
  visual style.
- **[Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)** —
  the iOS expectations your users have, and what App Review checks patterns
  against.
- **[Don't Make Me Think](https://sensible.com/dont-make-me-think/)** — Steve
  Krug. Short, old, and still the fastest way to acquire the instinct for what
  confuses people.
