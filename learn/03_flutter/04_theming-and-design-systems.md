---
title: Theming and Design Systems
description: Deciding appearance in one place, so features never mention a colour
---

# Theming and Design Systems

Colours, type, spacing and component styles defined once and used everywhere,
rather than chosen again in every widget. A design system is the difference
between an app that can be restyled in an afternoon and one that cannot.

**Why it matters.** Hardcoded styling is invisible until the first serious
change — dark mode, a rebrand, a larger default type scale — and then it is
everywhere at once. The cost of fixing it grows with every screen shipped.

## What to understand

- Where a visual decision is made, and whether that is the only place
- What a token means semantically, not what colour it happens to be
- How the theme reaches a widget, and what happens when it changes
- Which components belong to the system and which to a feature
- Whether a designer and a developer are naming the same things

## Core topics

### Tokens

- Semantic naming — `surface`, `onSurface`, `danger` — over `grey200`
- Colour schemes, and generating one that survives dark mode
- Type scale, and why a fixed font size is a bug in accessibility terms
- Spacing and radius scales, and refusing arbitrary numbers
- Elevation and shadow as tokens

### Theming in Flutter

- `ThemeData`, component themes, and setting style once
- Extending the theme with your own token set
- Light, dark, and high contrast
- Reading the theme rather than importing constants
- Where Material and Cupertino end and your system begins

### A design system in practice

- One entry point, so features import the kit and nothing else
- Components with a small, deliberate API
- No raw colour, text style or radius inside feature code
- Enforcing it with lints rather than review
- Versioning and changing a component many screens use

### Working with design

- Shared vocabulary between Figma and code
- What a handoff should contain
- Divergence between design and implementation, and catching it

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uses the theme instead of hardcoding, and existing components rather than new ones. |
| Middle | Extends the theme with tokens, builds reusable components, supports dark mode properly. |
| Senior | Designs the token system and component API, enforces the boundary in tooling, and can restyle the product without touching features. |

## Practice

### Starting out

- **Find the hardcoded styling**
  Search your feature code for `Color(` and `TextStyle(`, and move each into the
  theme.

- **Support dark mode honestly**
  Turn it on and fix everything unreadable rather than everything that crashes.

- **Respect the text scale**
  Set the system font size to maximum and fix what breaks.

### Going deeper

- **Build a token extension**
  Add a `ThemeExtension` for tokens Material does not cover, and use it.

- **Design a component API**
  Build a button used across the app whose props make the wrong result
  impossible.

- **Enforce the boundary**
  Add a lint that fails the build when feature code constructs a raw colour.

## Check yourself

- How many places in your app decide what "primary" looks like?
- What breaks at the largest system font size?
- Could you change the brand colour today, and how long would it take?
- Which of your components belong to the design system and which leaked in?
- Do your token names describe a role or an appearance?
- How would you notice implementation drifting from design?

## Resources

- **[Material 3 design system](https://m3.material.io/)** — the reference for
  semantic colour roles and type scales, useful even if the app does not look
  like Material. The colour system section explains why role naming matters.
- **[Use themes to share colors and font styles](https://docs.flutter.dev/cookbook/design/themes)** —
  the official guide to `ThemeData` and component themes.
- **[ThemeExtension](https://api.flutter.dev/flutter/material/ThemeExtension-class.html)** —
  how to add your own tokens to the theme in a type-safe way. The mechanism most
  hand-rolled token classes should have used.
- **[Design Tokens Community Group](https://www.w3.org/community/design-tokens/)** —
  the emerging standard for describing tokens in a way both design tools and code
  can consume.
- **[Refactoring UI](https://www.refactoringui.com/)** — for developers who have
  to make visual decisions without a designer. Concrete rules rather than taste.
