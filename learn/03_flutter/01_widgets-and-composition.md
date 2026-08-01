---
title: Widgets and Composition
description: How the widget tree actually works, and building from small pieces
---

# Widgets and Composition

Everything on screen is a widget, and widgets are cheap descriptions rebuilt
constantly rather than objects you mutate. Getting comfortable with that — and
with composing small widgets instead of extending big ones — is what makes
Flutter code readable.

**Why it matters.** Almost every "Flutter is slow" and "my state disappeared"
problem comes from a mental model that treats widgets as long-lived objects.
They are not, and the framework's behaviour only makes sense once that lands.

## What to understand

- What `build` is for: describing, not doing
- What survives a rebuild and what does not
- Why the framework thinks two widgets are the same one, or are not
- Where a piece of UI should become its own widget
- What is const, and what that saves

## Core topics

### The trees

- Widget, element, and render object — three trees and their jobs
- Rebuild, and why it is cheap by design
- Keys: when identity matters, and what `ValueKey` and `GlobalKey` cost
- `BuildContext` as a position in the tree, not a bag of things

### Stateless and stateful

- Where state lives, and lifting it up
- `initState`, `didUpdateWidget`, `dispose`, and what belongs in each
- Why `build` must be free of side effects
- `StatefulWidget` versus a state management solution

### Composition

- Small widgets over long build methods
- A method returning a widget versus an actual widget class, and why it matters
- Builders, slots, and passing children instead of configuration
- `InheritedWidget` and reading data from above

### Rebuilds

- What triggers a rebuild, and how far it spreads
- `const` constructors and the rebuilds they prevent
- Rebuilding a subtree instead of a screen
- Recognising an expensive `build`

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Composes existing widgets into screens. Uses `setState` correctly. |
| Middle | Splits UI into small widgets, understands the element tree well enough to explain keys, and controls rebuild scope. |
| Senior | Designs reusable widget APIs, uses keys and lifecycle deliberately, and diagnoses rebuild and layout problems from the tree. |

## Practice

### Starting out

- **Break up a build method**
  Take a `build` over a hundred lines and split it into named widgets.

- **Const everything possible**
  Turn on the lint, fix the warnings, and watch the rebuild count.

- **Watch a rebuild**
  Use the inspector's rebuild counters to see how far a `setState` reaches.

### Going deeper

- **Need a key**
  Build a reorderable list of stateful items and find the bug that only a key
  fixes.

- **Design a widget API**
  Write a reusable widget others will use, and make the wrong call impossible.

- **Fix a wide rebuild**
  Find a `setState` rebuilding half a screen and narrow it.

## Check yourself

- What exactly happens between `setState` and the pixels changing?
- Why does state sometimes attach to the wrong item in a list?
- When is a helper method returning a widget the wrong choice?
- What in your longest `build` should not be there?
- How do you find out what is rebuilding and how often?
- When does a `GlobalKey` cost more than it gives?

## Resources

- **[Introduction to widgets](https://docs.flutter.dev/ui/widgets-intro)** — the
  official starting point, including composition and the stateful/stateless
  split.
- **[Flutter architectural overview](https://docs.flutter.dev/resources/architectural-overview)** —
  the three trees and how the framework reaches the GPU. The single most useful
  page for making the rest stop feeling arbitrary.
- **[Inside Flutter](https://docs.flutter.dev/resources/inside-flutter)** — why
  rebuilds are cheap, written by the people who made them so. Explains the
  algorithms behind the behaviour you observe.
- **[When to use keys](https://www.youtube.com/watch?v=kn0EOS-ZiIc)** — the
  Flutter team's explanation, and the one that makes keys click for most people.
- **[Flutter Widget of the Week](https://www.youtube.com/playlist?list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG)** —
  one widget per minute, from the team. The cheapest way to learn what already
  exists before writing it yourself.
