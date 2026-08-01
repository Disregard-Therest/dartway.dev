---
title: Git and Workflow
description: A history someone can read, and a branching model that fits the team
---

# Git and Workflow

Using version control as a record of why the code is the way it is, not only as
a way to share files. Branching, reviewing, merging, and getting out of trouble
when something has gone wrong.

**Why it matters.** History is the only documentation guaranteed to still exist
in two years. `git log` answering "why is this line here" turns a mystery into a
minute; a history of "fix", "fix2" and "wip" leaves you guessing.

## What to understand

- What one commit should contain, and why that is one thing
- What the message should say — the reason, not the diff
- What actually happened during a merge or a rebase
- How to undo safely, and which operations rewrite shared history
- What the branching model optimises for, and whether that is your problem

## Core topics

### Commits

- One logical change, buildable on its own
- Messages: a subject line that completes "this commit will…", and a body for why
- Staging in pieces with `add -p`
- Amending and squashing before anything is shared

### Branching

- Trunk-based, GitHub flow, git flow — and matching one to release cadence
- Short-lived branches, and why long ones hurt
- Keeping up to date: merge or rebase, and picking a team rule
- Conflicts, and resolving by understanding both sides

### Reviewing

- Pull requests small enough to actually read
- What the description should contain
- Fixups and keeping a review conversation followable

### Getting out of trouble

- `reflog`, the safety net most people learn too late
- `revert` versus `reset`, and which is safe on shared history
- `bisect` to find the commit that broke something
- `stash`, `cherry-pick`, `worktree` for parallel work

### Hygiene

- `.gitignore`, and never committing a secret — because history is forever
- Large files and why the repository never shrinks
- Tags and release marking
- Hooks for the checks that must not be skipped

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Commits, pushes, opens pull requests, resolves simple conflicts. |
| Middle | Curates commits into readable units, rebases confidently, uses reflog and bisect, writes messages that explain why. |
| Senior | Sets the branching and review model for a team, keeps history useful over years, and recovers from serious mistakes without losing work. |

## Practice

### Starting out

- **Stage in pieces**
  Use `git add -p` to split a messy working tree into two coherent commits.

- **Write a why**
  Take your last five commit messages and rewrite them to explain the reason.

- **Read the history**
  Use `git log -p` on a file you did not write and reconstruct its story.

### Going deeper

- **Bisect a regression**
  Find the commit that introduced a bug with `git bisect run`.

- **Rewrite before sharing**
  Turn a branch of fifteen scrappy commits into four that tell a story.

- **Recover something lost**
  Delete a branch you needed and get it back with `reflog`.

## Check yourself

- Does your last commit message explain why, or only what?
- Could you build and run the code at any commit on your main branch?
- What do you do when you have committed to the wrong branch?
- When is rebasing unsafe, and why?
- How would you find which commit introduced a bug three months ago?
- Has a secret ever been committed to your repository, and is it still there?

## Resources

- **[Pro Git](https://git-scm.com/book/en/v2)** — the book, free and complete.
  Chapters 3 and 7 are the ones that change how people work.
- **[How to Write a Git Commit Message](https://cbea.ms/git-commit/)** — Chris
  Beams' post, and the reason a large share of open source uses the same style.
- **[Oh Shit, Git!?!](https://ohshitgit.com/)** — recovery recipes for the
  specific situations people panic in. Bookmark before you need it.
- **[Trunk Based Development](https://trunkbaseddevelopment.com/)** — the case
  for short-lived branches, with the tradeoffs against git flow laid out
  honestly.
- **[Git branching interactive tutorial](https://learngitbranching.js.org/)** —
  a visual sandbox. The fastest way to actually understand rebase rather than
  fear it.
