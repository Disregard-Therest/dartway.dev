---
title: Adaptive and Responsive UI
description: One codebase across phone, tablet, desktop and web without four layouts
---

# Adaptive and Responsive UI

Responsive means the layout reflows as the window changes. Adaptive means the
app behaves like it belongs on the platform it is running on. They are different
problems and both are needed once the app leaves phones.

**Why it matters.** Flutter's promise is one codebase everywhere, and the way
that promise breaks is a phone layout stretched across a desktop window: a
column of buttons two thousand pixels wide, a bottom sheet on a monitor, a
right-click that does nothing.

## What to understand

- Whether the constraint is window size, input method, or platform convention
- Which layouts are genuinely different, and which are the same one reflowed
- What the user expects on this platform, which is not what they expect on another
- Where size is decided — the window, or the space this widget was given
- What changes when the window is resized while the app is running

## Core topics

### Responsive

- Breakpoints, and deriving them from content rather than device names
- `LayoutBuilder` over `MediaQuery` when the parent's space is what matters
- Reflow patterns: list to master-detail, stack to side-by-side
- Maximum widths, because text at full desktop width is unreadable
- Orientation, foldables, and split screen

### Adaptive

- Navigation: bottom bar, rail, drawer, and when each is right
- Platform conventions for dialogs, menus, scrollbars and selection
- Input: mouse hover, right click, keyboard shortcuts, focus order
- Text selection and copy on desktop and web
- Density, and touch targets that shrink with a mouse

### Structure

- Sharing logic and swapping only the layout
- Where the branch lives, so features are not full of size checks
- Testing several sizes without four screenshots of hope

### Web specifics

- URLs, deep links and refresh
- Initial load size and what the user stares at meanwhile
- Browser back and forward as first-class navigation

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Avoids overflow on different phone sizes and handles orientation. |
| Middle | Implements real breakpoint layouts, adapts navigation, and handles mouse and keyboard input. |
| Senior | Designs one structure that serves every form factor, with platform conventions respected and the branching contained in one place. |

## Practice

### Starting out

- **Resize until it breaks**
  Run on desktop and drag the window from narrow to wide. Fix everything ugly.

- **Cap the width**
  Give a text-heavy screen a maximum content width, and pick it by readability.

- **Support hover**
  Add hover states to something interactive and check the cursor is right.

### Going deeper

- **Master–detail**
  Make a list-and-detail flow that is two screens on a phone and one on a tablet,
  with the same code.

- **Adapt the navigation**
  Move from a bottom bar to a rail to a drawer by width, keeping state across the
  change.

- **Make it keyboard usable**
  Complete a full task in your app without touching the mouse, and fix the focus
  order.

## Check yourself

- What does your app look like in a window 400 pixels wide and 2000 pixels wide?
- Where do you branch on size, and is it in one place or scattered?
- What happens on right click in your app?
- Can someone complete your main flow with the keyboard alone?
- Which of your dialogs would be wrong on a desktop?
- What breaks when the window is resized while a screen is open?

## Resources

- **[Adaptive and responsive design](https://docs.flutter.dev/ui/adaptive-responsive)** —
  the official guide, and unusually good: it separates the two concepts properly
  and covers input as well as layout.
- **[Material 3: Layout](https://m3.material.io/foundations/layout)** — window
  size classes and canonical layouts, with breakpoints defined by someone who
  studied the problem rather than by device rumours.
- **[Building adaptive apps](https://docs.flutter.dev/ui/adaptive-responsive/large-screens)** —
  the large-screen guidance, including navigation patterns and input differences.
- **[Material 3: Adaptive design](https://m3.material.io/foundations/adaptive-design/overview)** —
  the distinction between responding to size and adapting to a platform, argued
  from research rather than preference.
- **[Flutter on the web](https://docs.flutter.dev/platform-integration/web)** —
  what actually differs, including URL handling and load characteristics.
