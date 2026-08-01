---
title: Performance
description: Measuring before optimising, and knowing what a frame budget is
---

# Performance

Keeping the app responsive: frames rendered on time, memory that does not grow
without bound, a start-up that does not test the user's patience, and a download
size that does not lose them before they begin.

**Why it matters.** Performance is judged, not measured, by users — and they
judge harshly. Start-up time and scroll smoothness correlate with retention more
directly than almost any feature. The catch is that optimising the wrong thing
is worse than doing nothing: it costs time and adds complexity for no gain.

## What to understand

- Whether there is a measured problem, or a suspicion
- Which budget is being missed — frame time, memory, start-up, size
- Where the time actually goes, from a profile rather than from intuition
- Whether the fix is worth the complexity it adds
- Whether it is still fixed a month later

## Core topics

### Frames

- The frame budget: 16ms at 60Hz, 8ms at 120Hz
- Build, layout, paint, raster — and which phase is over budget
- Jank from an expensive `build`, and from too-wide rebuilds
- Shader compilation jank, and what Impeller changed
- Long lists: lazy building, item extents, and cheap items

### Memory

- Leaks: controllers, subscriptions, listeners never disposed
- Images as the dominant cost, and decoding at display size
- Caches without bounds
- Reading a memory profile and telling growth from noise

### Start-up

- Cold, warm and hot start as separate numbers
- Work done before the first frame that need not be
- Deferred initialisation, and what must block
- The gap between the native splash and the first real frame

### Size

- What is actually in the bundle
- Assets, fonts, and shipping four unused weights
- Deferred components and per-platform builds
- Measuring rather than guessing what grew

### Method

- Profile mode, because debug numbers are meaningless
- Real devices, and the cheapest one your users have
- Measuring before and after, with numbers written down
- Regression tracking, so a fix stays fixed

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Notices a screen is slow. Applies known good practice — `const`, lazy lists — without measuring. |
| Middle | Profiles to find the cause, distinguishes UI from raster problems, fixes leaks and image cost, measures the result. |
| Senior | Sets budgets, tracks regressions over time, and can say what to optimise and what to leave alone. |

## Practice

### Starting out

- **Profile, do not guess**
  Take a screen that feels slow and find the actual cause in DevTools before
  changing anything.

- **Fix an image**
  Find an image decoded far larger than it is displayed and cap it. Measure the
  memory.

- **Find a leak**
  Open and close a screen fifty times and watch whether memory returns.

### Going deeper

- **Make a list smooth**
  Take a list that stutters and get it to a steady frame time, with numbers
  before and after.

- **Cut cold start**
  Measure cold start on a low-end device and remove work from the critical path.

- **Track it over time**
  Add a performance measurement to CI so a regression is visible before release.

## Check yourself

- What is your cold start time on the cheapest device your users have?
- Which screen in your app drops the most frames, and how do you know?
- Is your worst jank in the UI thread or the raster thread?
- Does memory return to baseline after closing a heavy screen?
- What is the largest thing in your app bundle?
- What performance number do you track release over release?

## Resources

- **[Performance best practices](https://docs.flutter.dev/perf/best-practices)** —
  the official list, with the rare virtue of saying which items actually matter
  and which are folklore.
- **[Flutter performance profiling](https://docs.flutter.dev/perf/ui-performance)** —
  how to read the timeline and tell a UI-thread problem from a raster-thread one,
  which determines the entire fix.
- **[DevTools](https://docs.flutter.dev/tools/devtools)** — the CPU profiler,
  memory view and app size tool. The app size tool in particular is
  underused.
- **[Impeller](https://docs.flutter.dev/perf/impeller)** — the rendering engine
  and what it changed about shader jank, which used to be the most common
  first-run stutter.
- **[Improving rendering performance](https://docs.flutter.dev/perf/rendering-performance)** —
  repaint boundaries, opacity and clipping costs, and the specific widgets that
  are expensive.
