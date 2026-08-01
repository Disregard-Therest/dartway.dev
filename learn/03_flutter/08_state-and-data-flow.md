---
title: State and Data Flow
description: Deciding where state lives, who changes it, and how the UI finds out
---

# State and Data Flow

State is data that changes while the app runs, affects what is on screen, and
participates in logic. Managing it is mostly not about picking a library — it is
about deciding where each piece belongs and who is allowed to change it.

**Why it matters.** State placed wrong is the most common structural problem in
an app. Too local and it has to be threaded through five widgets; too global and
nothing can be reasoned about in isolation. Both make every later change harder,
and neither is fixed by switching library.

## What to understand

- Where this state should live, given who reads and who writes it
- What is stored versus what is computed from something else
- Who is allowed to change it, and through what
- How the UI learns it changed, and how much of the UI rebuilds
- What happens to it when the screen closes, or the app does

## Core topics

### Kinds of state

- Ephemeral UI state — a dropdown, a tab, an unsubmitted field
- Feature state — one part of the app, several widgets
- Application state — the current user, theme, settings
- Server data, which is a cache and should be treated as one
- Navigation and form state, which have their own rules

### Placement

- Lifting state to the lowest common ancestor
- Why "global by default" is a decision to stop reasoning
- Boundaries: what belongs to a feature and what may leave it
- Derived state, and not storing what can be computed

### The mechanics

- `setState` and its perfectly good range
- Provider, Riverpod, BLoC — the models, not the syntax
- Immutability and predictable updates
- Selective rebuilds and not waking half the tree
- Where side effects live, so `build` stays pure

### Server data

- Loading, empty, error and stale as first-class states
- Caching, invalidation, and refresh on return
- Optimistic updates and reconciliation
- Not duplicating server data into three separate stores

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uses `setState` and a provider correctly. Gets data onto the screen with loading and error handling. |
| Middle | Places state deliberately, separates server cache from UI state, controls rebuild scope, handles all four data states. |
| Senior | Designs the data flow for a whole app: ownership, boundaries, invalidation, and what happens when two sources disagree. |

## Practice

### Starting out

- **A list with every state**
  Build a screen with real loading, empty, error and retry — not just a spinner.

- **Lift state once**
  Find state passed down three levels and move it to where it belongs.

- **Delete stored derived state**
  Find a field kept in sync manually and compute it instead.

### Going deeper

- **A multi-step form**
  Handle dependent fields, async validation and going back without losing input.

- **Update optimistically**
  Show the result before the server confirms, and recover cleanly when it
  refuses.

- **Narrow the rebuilds**
  Find a change rebuilding a whole screen and make it rebuild one widget.

## Check yourself

- How do you decide whether state belongs in a widget or above it?
- Which of your state is server data being treated as if it were local?
- What tells you a piece of state has grown too large?
- Where do you keep the same information in two places?
- What happens to in-progress state when the user leaves and comes back?
- How would you find out what rebuilds when one value changes?

## Resources

- **[State management](https://docs.flutter.dev/data-and-backend/state-mgmt/intro)** —
  the official introduction, and honest about the ephemeral/app-state
  distinction being the actual decision.
- **[Guide to app architecture](https://docs.flutter.dev/app-architecture)** —
  Flutter's own opinionated architecture guidance, including where data and
  repositories sit relative to UI state.
- **[Riverpod documentation](https://riverpod.dev/)** — worth reading for the
  reasoning about scoping, lifetimes and disposal even if you use something else.
- **[Bloc library documentation](https://bloclibrary.dev/)** — the clearest
  articulation of the event-to-state model and testing state transitions.
- **[Making sense of all those Flutter state management options](https://medium.com/flutter-community/making-sense-of-all-those-flutter-state-management-libraries-e6d7c0dfcf5)** —
  a comparison written around the models rather than the APIs, which is what
  actually distinguishes them.
