---
title: Accessibility
description: Making the app usable by people your testing never included
---

# Accessibility

Making the app work for people using a screen reader, a larger font, a keyboard
instead of touch, or high contrast — and for everyone else in a bright street
with one hand full.

**Why it matters.** It is a legal requirement in a growing number of markets, it
is a store review criterion, and the changes it demands — real contrast, larger
touch targets, labels that say what a control does — improve the product for
everyone. It is also nearly free while building and expensive to retrofit.

## What to understand

- What a screen reader announces for this control, and whether it is useful
- Whether anything is conveyed by colour alone
- What happens at the largest system font size
- Whether the whole flow can be completed without touch
- What the reading and focus order actually is

## Core topics

### The semantics tree

- What Flutter exposes to assistive technology, and how to inspect it
- `Semantics`, labels, hints, and values
- Merging and excluding, so a card is one announcement rather than nine
- Live regions for things that change without interaction
- Announcing state: selected, disabled, expanded, busy

### Visual

- Contrast ratios, and measuring rather than judging
- Never colour alone — pairing it with text, shape or icon
- Text scaling to 200 percent without loss of function
- Touch target minimums
- Respecting reduce motion and bold text

### Interaction

- Focus order, and traversal that matches the visual layout
- Keyboard operation of every interactive element
- Time limits, and giving control over them
- Error messages that identify the field and how to fix it

### Verifying

- Actually using TalkBack and VoiceOver on a real device
- Accessibility scanners, and the share of problems they cannot see
- Automated checks in widget tests
- Testing at maximum font size as routine

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Adds labels to icon buttons and images. Knows the setting exists. |
| Middle | Structures the semantics tree, meets contrast and target sizes, supports text scaling and keyboard use. |
| Senior | Designs flows to be accessible from the start, tests with real assistive technology, and includes checks in CI. |

## Practice

### Starting out

- **Turn on a screen reader**
  Complete your app's main flow with TalkBack or VoiceOver. Write down everything
  unusable.

- **Label the icon buttons**
  Find every icon-only control and give it a label that says what it does.

- **Scale the text**
  Set the system font to maximum and fix what breaks.

### Going deeper

- **Fix an announcement**
  Take a card announced as nine separate fragments and merge it into one useful
  sentence.

- **Make a custom widget accessible**
  Give a hand-built control proper semantics, including its state.

- **Check it in CI**
  Add automated accessibility assertions to widget tests so regressions fail the
  build.

## Check yourself

- Have you ever used your own app with a screen reader?
- What in your UI is distinguishable only by colour?
- What is the smallest tappable target in your app?
- Can your main flow be completed with a keyboard?
- What does your screen reader say for your most complex list item?
- Which of your error messages tell the user how to fix the problem?

## Resources

- **[Accessibility in Flutter](https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility)** —
  the official guide, including the semantics debugger and the widget-test
  assertions most projects do not know exist.
- **[WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/)** — the
  actual criteria, filterable. This is what regulations and store reviews refer
  to.
- **[Semantics class](https://api.flutter.dev/flutter/widgets/Semantics-class.html)** —
  the full set of properties. Worth reading once so you know what can be
  expressed.
- **[Mobile accessibility at Google](https://developer.android.com/guide/topics/ui/accessibility/principles)** —
  platform expectations for Android, which is what TalkBack users are used to.
- **[Apple: Accessibility](https://developer.apple.com/accessibility/)** — the
  same for iOS, including the VoiceOver behaviour your app inherits.
