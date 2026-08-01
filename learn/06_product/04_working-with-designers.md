---
title: Working with Designers
description: Turning a design file into a product without either side guessing
---

# Working with Designers

The collaboration between the person who decides how it should look and behave
and the person who makes it real — including everything the file does not
answer.

**Why it matters.** Most friction here is not disagreement, it is missing
information discovered too late: a state nobody drew, a component that cannot
adapt, a font size that breaks at accessibility settings. Caught during design it
is a conversation; caught during implementation it is rework for both.

## What to understand

- What the design is trying to achieve, so you can adapt it correctly
- Which details are deliberate and which are incidental
- What is missing — states, edge content, platform differences
- What is expensive to build, and whether the designer knows
- Whether you and the designer name the same things the same way

## Core topics

### Before implementation

- Reviewing a design for missing states rather than for looks
- Asking about long text, missing images, one item, many items
- Flagging cost early, when alternatives are still cheap
- Agreeing on component boundaries — what is reusable, what is specific

### Shared vocabulary

- The same names for tokens and components on both sides
- A design system both sides can point at
- Spacing and type scales rather than arbitrary values
- Noticing when the file and the code have drifted

### Handoff

- What a handoff should contain beyond the frames
- Behaviour that only exists in someone's head: motion, focus, empty, error
- Platform differences agreed rather than improvised
- Where to ask questions so the answer is not lost in a chat

### Feedback

- Reporting an implementation problem as a problem, not a refusal
- Proposing an alternative that keeps the intent and drops the cost
- Design review of the built thing, with time to act on it
- Disagreeing about a decision without relitigating who decides

### Ongoing

- Keeping implementation and design in step as both change
- Feeding back what analytics say about a design
- Building the design system together rather than in parallel

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Implements designs accurately and asks when something is missing. |
| Middle | Reviews designs for gaps before starting, raises cost early, keeps implementation faithful across states and sizes. |
| Senior | Works with design on the system rather than the screens, negotiates intent versus cost, and keeps both artefacts converged. |

## Practice

### Starting out

- **Review before building**
  Take your next design and list every state it does not cover. Ask before
  starting.

- **Break it with content**
  Implement a screen, then feed it the longest realistic text and the largest
  font size.

- **Name things the same**
  Compare the component names in the design file with those in code. Reconcile
  them.

### Going deeper

- **Trade cost for intent**
  Find an expensive detail, work out what it is for, and propose a cheaper way to
  achieve it.

- **Run a design review**
  Show the built version and get feedback while there is still time to act.

- **Build a component together**
  Define a shared component's variants and API with the designer, in one sitting.

## Check yourself

- What in your last design was not specified, and how did you decide?
- Which parts of your app have drifted from their design, and would anyone notice?
- Do you and your designer use the same names for the same things?
- When something is expensive, when do you say so?
- What happens to your screens with the longest realistic content?
- Who decides when design and engineering disagree, and is that clear?

## Resources

- **[Design systems 101](https://www.nngroup.com/articles/design-systems-101/)** —
  Nielsen Norman Group on what a design system contains and who maintains it,
  which is the artefact that removes most handoff friction in the first place.
- **[Design Systems Handbook](https://www.designbetter.co/design-systems-handbook)** —
  free, and written for both sides. The chapters on shared vocabulary and
  governance are the relevant ones.
- **[Material 3 foundations](https://m3.material.io/foundations)** — a shared
  reference both roles can point at when arguing about spacing or motion, which
  ends a lot of arguments quickly.
- **[Refactoring UI](https://www.refactoringui.com/)** — so a developer can
  discuss visual decisions in the designer's terms rather than only implementing
  them.
- **[Figma Dev Mode](https://www.figma.com/dev-mode/)** — the handoff mechanics
  most teams use, including how tokens and components surface in code.
