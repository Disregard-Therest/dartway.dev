---
title: Animation
description: Motion that explains what happened, at sixty frames per second
---

# Animation

Movement that tells the user what changed and where things went. Flutter makes
animation easy enough that the real skill is restraint and knowing which of the
several APIs fits.

**Why it matters.** Good motion makes an interface feel obvious without a word
of copy. Bad motion — too long, too bouncy, running on every rebuild — makes an
app feel slow even when it is fast, and users blame the app.

## What to understand

- What the motion is explaining, and whether anything is lost without it
- Which is changing: a value, a widget, or a whole screen
- Who drives the animation, and who disposes of it
- Whether it runs on the UI thread or can be handed to the compositor
- What it does for someone who has asked the system to reduce motion

## Core topics

### The APIs, in order of preference

- Implicit — `AnimatedContainer`, `AnimatedOpacity`, and the rest of the family
- `TweenAnimationBuilder` for one value with no controller
- `AnimationController` for anything you must drive, sequence or reverse
- Explicit transitions, and `AnimatedBuilder` to keep rebuilds small
- Physics-based motion, where a spring beats a curve

### Doing it well

- Duration and curve, and why most animations are too slow
- Choreography: things that move together, and staggering
- Interruptibility — reversing mid-flight instead of snapping
- Hero transitions between screens, and where they mislead

### Cost

- Rebuilding a subtree per frame versus repainting one
- Transform and opacity as cheap, layout changes as not
- Shader compilation jank, and what Impeller changed
- Measuring with the performance overlay rather than by eye

### Doing it responsibly

- Respecting reduce-motion accessibility settings
- Motion that does not encode information no other channel carries
- Not animating something the user is trying to read

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uses implicit animations to make transitions less abrupt. |
| Middle | Drives controllers, sequences and staggers motion, disposes properly, keeps rebuilds tight. |
| Senior | Designs motion as part of the interaction, keeps it interruptible and cheap, and honours accessibility preferences. |

## Practice

### Starting out

- **Replace a jump with a fade**
  Find a state change that snaps and make it transition.

- **Halve a duration**
  Take your slowest animation and cut it until it feels responsive rather than
  luxurious.

- **Dispose a controller**
  Find an `AnimationController` without a `dispose` and fix the leak.

### Going deeper

- **Make it interruptible**
  Build an animation that reverses smoothly when the user changes their mind
  mid-flight.

- **Stagger a list**
  Animate items in with an offset, and keep it cheap on a long list.

- **Respect reduce motion**
  Read the accessibility setting and provide a non-animated path.

## Check yourself

- Which animation in your app is the longest, and does it earn the time?
- What happens if the user taps again while an animation is running?
- Which of your animations rebuild widgets rather than repainting them?
- What does your app do when the system asks for reduced motion?
- Where does motion carry information that exists nowhere else?
- How would you prove an animation is dropping frames?

## Resources

- **[Introduction to animations](https://docs.flutter.dev/ui/animations)** — the
  official overview and, crucially, the decision tree for which API to use.
- **[Animations tutorial](https://docs.flutter.dev/ui/animations/tutorial)** —
  controllers, tweens and `AnimatedBuilder` built up step by step, including why
  each layer exists.
- **[Material Design: Motion](https://m3.material.io/styles/motion/overview)** —
  duration and easing guidance grounded in research rather than preference. The
  fastest way to stop guessing durations.
- **[Flutter performance overlay](https://docs.flutter.dev/perf/ui-performance)** —
  how to see whether an animation is actually hitting frame budget.
- **[Building beautiful transitions with Material Motion](https://www.youtube.com/watch?v=WLLDBQ_ZWY0)** —
  applied choreography rather than API mechanics, which is the part usually
  missing.
