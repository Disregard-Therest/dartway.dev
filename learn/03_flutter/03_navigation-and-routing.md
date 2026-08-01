---
title: Navigation and Routing
description: Where the user is, how they got there, and what the back button should do
---

# Navigation and Routing

Moving between screens, and holding a coherent answer to "where am I" that
survives deep links, the system back button, a browser URL bar and an app
restored from the background.

**Why it matters.** Navigation looks trivial until the app has to open on a
specific screen from a notification, restore state after being killed, or run on
the web with a shareable URL. Retrofitting a real routing model onto an app built
on ad-hoc pushes is one of the most expensive refactors there is.

## What to understand

- What the current location is, expressed as data rather than a stack of calls
- What should happen on back, from every screen, including the first
- Which screens must be reachable by URL or notification
- Where guards belong — signed out, onboarding incomplete, no permission
- What is passed between screens, and what should be looked up instead

## Core topics

### The models

- Imperative `Navigator.push` and where it stops scaling
- Declarative routing: the location is state, the stack is derived
- Named routes, typed routes, and why strings become a liability
- Nested navigators and per-tab stacks

### Real requirements

- Deep links and app links, including verification on each platform
- Web URLs, and being honest about what they must contain
- Restoring after the process is killed
- Guards and redirects that cannot be bypassed by a direct link

### Passing data

- Path and query parameters versus objects in memory
- Passing an id and loading, rather than passing a whole model
- Returning a result from a screen
- Keeping a route describable so it can be recreated from nothing

### Details that bite

- Back on Android versus the swipe gesture on iOS, and predictive back
- Double-tap producing two pushes
- Dialogs, sheets and whether they belong in the stack
- Transitions, and where they are defined

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Pushes and pops screens, passes arguments, handles the back button. |
| Middle | Uses a declarative router with typed routes, implements deep links and guards, handles nested stacks. |
| Senior | Designs routing so every state is addressable and restorable, and can reason about the stack across platforms and cold starts. |

## Practice

### Starting out

- **Open from a link**
  Make a deep link open a specific item screen with the back stack making sense.

- **Guard a route**
  Redirect a signed-out user away from a protected screen, including on direct
  entry.

- **Stop the double push**
  Find a button that can push twice and fix it properly.

### Going deeper

- **Make every state addressable**
  Give every screen a URL that recreates it from a cold start.

- **Nest a stack**
  Build tabs where each keeps its own history and back behaves correctly.

- **Return a result**
  Implement a picker screen that returns a typed value, with cancellation.

## Check yourself

- Can every screen in your app be reached from a link, and should it be?
- What happens on back from the first screen after a deep link?
- What do you pass between screens — ids or objects, and why?
- Where are your navigation guards, and can a direct link get past them?
- What does your app do when it is restored after being killed?
- Which navigation code would break if you added web support tomorrow?

## Resources

- **[Navigation and routing](https://docs.flutter.dev/ui/navigation)** — the
  official overview, including when the imperative API is enough and when it is
  not.
- **[go_router](https://pub.dev/packages/go_router)** — the package the Flutter
  team maintains for declarative routing. The documentation covers redirects,
  nesting and deep links properly.
- **[Router class reference](https://api.flutter.dev/flutter/widgets/Router-class.html)** —
  the declarative routing model underneath every router package. Dense, and worth
  it before adopting one, because it explains what they are all wrapping.
- **[Deep linking](https://docs.flutter.dev/ui/navigation/deep-linking)** — the
  platform configuration, which is where most of the actual work is.
- **[Predictive back on Android](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture)** —
  Android's own documentation for behaviour Flutter apps now have to support.
