---
title: Layout and Rendering
description: Constraints going down, sizes coming up, and why the error says unbounded height
---

# Layout and Rendering

How Flutter decides where everything goes: constraints travel down the tree,
sizes come back up, and the parent positions the child. One sentence, and almost
every layout error is a consequence of it.

**Why it matters.** Layout errors in Flutter are famously loud and famously
unhelpful if you do not know the model. With the model, "unbounded height" stops
being a mystery and becomes a specific statement about a specific widget.

## What to understand

- What constraints this widget is being given, and by whom
- Whether the parent wants the child to choose a size, or is imposing one
- Where an unbounded dimension came from
- What is being painted that nobody can see
- Why the same layout behaves differently inside a scroll view

## Core topics

### The model

- Constraints down, sizes up, parent sets position
- Tight, loose and unbounded constraints
- `BoxConstraints`, and reading one in the inspector
- Intrinsic sizing, and why it costs

### Everyday layout

- Row, Column, and the meaning of `mainAxisSize` and `Alignment`
- `Expanded` and `Flexible`, and how they differ
- Stack and positioning
- `LayoutBuilder`, and getting the constraints in your own hands
- `IntrinsicHeight` and friends — the escape hatch and its price

### Scrolling

- Viewports and slivers
- Why a `Column` inside a `SingleChildScrollView` behaves differently
- Lazy lists, and building only what is visible
- Nested scrolling, and keeping it sane

### Painting

- Paint order and how `Stack` composes
- Clipping, opacity and shadows as real costs
- Repaint boundaries
- Impeller, and what changed in how frames are drawn

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Builds layouts with Row, Column and Padding. Fixes overflow errors by trying things. |
| Middle | Reads a constraint error and knows which widget caused it. Uses Expanded, LayoutBuilder and slivers deliberately. |
| Senior | Designs layouts that hold across sizes and content, writes custom layout when needed, and reasons about paint cost. |

## Practice

### Starting out

- **Read the error properly**
  Cause an unbounded-height error deliberately, then explain which widget gave
  which constraint.

- **Inspect a constraint**
  Use the inspector to read the actual `BoxConstraints` at three points in a tree.

- **Expanded versus Flexible**
  Build a row where swapping them visibly changes the result, and explain why.

### Going deeper

- **Convert to slivers**
  Turn a scrolling screen of stacked sections into a `CustomScrollView` and keep
  it lazy.

- **Layout from constraints**
  Use `LayoutBuilder` to change layout, not just size, at a breakpoint.

- **Cut paint cost**
  Find a screen with unnecessary clipping or opacity layers and remove them,
  measuring both.

## Check yourself

- What does "unbounded constraint" mean, in one sentence?
- When do you need `Expanded` rather than `Flexible`?
- Why can a `ListView` inside a `Column` fail, and what are the three fixes?
- What does `IntrinsicHeight` cost, and when is it worth it?
- Which parts of your UI repaint when only one small thing changes?
- Where would a `RepaintBoundary` help, and how would you prove it?

## Resources

- **[Understanding constraints](https://docs.flutter.dev/ui/layout/constraints)** —
  the page to read until it is internalised. Everything else about layout follows
  from it.
- **[Layouts in Flutter](https://docs.flutter.dev/ui/layout)** — the practical
  guide to the layout widgets and when each applies.
- **[Slivers explained](https://medium.com/flutter/slivers-demystified-6ff68ab0296f)** —
  from the Flutter team, and still the clearest introduction to viewports and
  lazy scrolling.
- **[Decoding Flutter: Unbounded height and width](https://www.youtube.com/watch?v=jckqXR5CrPI)** —
  the official short video on the single most common layout error.
- **[Impeller](https://docs.flutter.dev/perf/impeller)** — the current rendering
  engine, why it exists, and what it changes about shader jank.
