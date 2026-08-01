---
title: Platform and Device
description: Permissions, notifications, deep links and native code — where Flutter stops
---

# Platform and Device

Everything the app needs from the operating system: camera and files,
permissions, notifications, background execution, and the native code you write
when no package exists. The layer where "write once" stops and each platform has
opinions.

**Why it matters.** These are the features that get an app rejected from a store,
drain a battery, or silently stop working after an OS update. They are also the
ones least covered by tutorials, because they differ per platform and change
every year.

## What to understand

- What the OS actually promises, which is less than you assume
- When to ask for a permission, and what happens after a refusal
- What the app may do when it is not in the foreground — which is very little
- Which platform differences are cosmetic and which are structural
- What breaks on the next OS version, and how you would find out

## Core topics

### Permissions

- Asking in context, after the user understands why
- Permanent denial, and routing to settings
- Partial grants: limited photo access, approximate location, provisional
  notifications
- Declaring them, and justifying them in a store review

### Notifications

- Local versus push, and which problem each solves
- Channels, categories and the user's control over them
- What happens on tap in each app state — foreground, background, terminated
- Delivery being best-effort, not guaranteed

### Background execution

- What each platform allows, and for how long
- Scheduled work, and why it will not run when you asked
- Battery optimisation and vendor-specific killing
- Designing so nothing important depends on background execution

### Native interop

- Platform channels, and their cost per call
- Method channels versus event channels
- FFI for C libraries
- Federated plugins, and adding a platform to an existing one
- Keeping native code testable

### Device

- Camera, files, sharing, biometrics
- Connectivity, and why "connected" does not mean "working"
- Device capabilities that vary, and degrading gracefully

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uses packages for camera, files and notifications. Requests permissions where the example does. |
| Middle | Handles the full permission lifecycle, notification taps in every app state, and platform differences deliberately. |
| Senior | Writes platform channels and plugins, designs around background execution limits, and anticipates OS policy changes. |

## Practice

### Starting out

- **Handle a refusal**
  Deny a permission permanently and make the app recover with a route to settings.

- **Tap a notification**
  Make a notification open the right screen from foreground, background and
  terminated.

- **Ask in context**
  Move a permission request from app launch to the moment it is needed, with an
  explanation.

### Going deeper

- **Write a channel**
  Implement a method channel for something no package offers, on both platforms.

- **Survive the killer**
  Test on a device with aggressive battery management and fix what stops working.

- **Handle partial access**
  Support limited photo library access properly, rather than treating it as
  denial.

## Check yourself

- What does your app do when a permission is permanently denied?
- What happens when a notification is tapped while the app is terminated?
- Which of your features assume background execution that may not happen?
- What in your app would break on the next major OS release?
- Which platform channels do you call frequently, and what do they cost?
- How does your app behave with limited rather than full photo access?

## Resources

- **[Platform integration](https://docs.flutter.dev/platform-integration)** — the
  official hub for channels, plugins and per-platform behaviour.
- **[Writing platform-specific code](https://docs.flutter.dev/platform-integration/platform-channels)** —
  method and event channels, with both native sides shown. The reference when a
  package does not exist.
- **[Android app permissions best practices](https://developer.android.com/training/permissions/usage-notes)** —
  Android's own guidance, including asking in context and handling denial.
- **[Apple: Requesting authorization](https://developer.apple.com/design/human-interface-guidelines/privacy)** —
  the iOS expectations, which are also what App Review checks against.
- **[Don't kill my app](https://dontkillmyapp.com/)** — a catalogue of
  vendor-specific background restrictions. Unglamorous and repeatedly the answer
  to "it works on my phone".
