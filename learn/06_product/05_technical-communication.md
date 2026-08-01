---
title: Technical Communication
description: Writing and speaking so decisions get made and other people can act
---

# Technical Communication

Explaining technical things to people who need to act on them — a teammate, a
reviewer, a manager, a stranger reading your commit in two years. The skill that
determines whether good engineering has any effect beyond the person who did it.

**Why it matters.** Past a certain point, your impact is limited by how well
others understand what you know. A correct proposal nobody understood does not
get built, and a risk nobody registered does not get mitigated.

## What to understand

- Who is reading this, and what they need to do afterwards
- What they already know, and what you are assuming
- What decision this is asking for, if any
- What comes first, if they read nothing else
- Whether it can be shorter without losing the point

## Core topics

### Writing

- The conclusion first, then the reasoning — not a detective story
- Naming the decision being asked for
- Short sentences and concrete nouns
- Cutting the throat-clearing: "it is important to note that"
- Written as the default, so it survives being repeated

### The formats

- Commit messages explaining why
- Pull request descriptions: what, why, and what to look at
- Design documents: problem, options, decision, consequences
- Incident write-ups without blame
- Documentation, and knowing which kind you are writing

### Explaining

- Matching depth to the audience
- Analogies, and where they break
- Diagrams that carry the load words cannot
- Checking understanding rather than asking "does that make sense?"

### Talking to non-engineers

- Cost and risk in their terms
- Uncertainty stated honestly, not hidden in confidence
- Bad news early and specifically
- Translating a technical constraint into a product consequence

### Disagreement

- Attacking the argument and not the person
- Stating what would change your mind
- Escalating without heat
- Disagreeing and committing, out loud

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Explains their work clearly, asks well-formed questions, writes usable commit messages. |
| Middle | Writes design documents and reviews that move decisions along, explains at the right depth, raises risks early. |
| Senior | Builds alignment across teams in writing, communicates uncertainty honestly to non-engineers, and changes what gets decided. |

## Practice

### Starting out

- **Conclusion first**
  Rewrite your next long message so the ask is in the first line.

- **Explain to a non-engineer**
  Describe your current work to someone outside engineering. Notice where they
  lose you.

- **Say why in a commit**
  Write your next commit message so it explains the reason, not the diff.

### Going deeper

- **Write a design document**
  Problem, options with tradeoffs, decision, consequences. Circulate it and act
  on the feedback.

- **Deliver bad news well**
  Report a slipping estimate or a real risk clearly, early, with options.

- **Halve it**
  Take something you wrote and remove half the words without losing meaning.

## Check yourself

- Does your longest recent message say the point in the first line?
- When did you last raise a risk, and how long had you known?
- What do you write down, and what stays in chat and disappears?
- How do you check someone understood rather than hoping?
- What would change your mind about your current technical position?
- Could someone reconstruct why from your commit history?

## Resources

- **[Google Technical Writing Courses](https://developers.google.com/tech-writing)** —
  free, short, and exercise-based. The single most efficient way to improve
  technical writing.
- **[Style: Lessons in Clarity and Grace](https://en.wikipedia.org/wiki/Joseph_M._Williams)** —
  Joseph Williams on why some sentences are hard to read, with rules you can
  apply rather than taste you must acquire.
- **[Writing a design doc](https://www.industrialempathy.com/posts/design-docs-at-google/)** —
  Malte Ubl on how design documents work at Google: what they contain, and what
  they are actually for.
- **[The Diátaxis framework](https://diataxis.fr/)** — the four kinds of
  documentation and why mixing them makes all four worse. Changes how people
  write docs immediately.
- **[Crucial Conversations](https://cruciallearning.com/crucial-conversations-book/)** —
  for the disagreements that matter, where the technical argument is not the hard
  part.
