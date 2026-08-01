---
title: Release and Distribution
description: Getting a build to users, and what to do when it is wrong
---

# Release and Distribution

Everything between "the code is ready" and "people have it": versioning, store
review, staged rollout, and the fact that on mobile you cannot take a release
back.

**Why it matters.** Mobile releases are one-way. A web bug is fixed in ten
minutes; a store release takes review time, and old versions stay installed for
months regardless. That asymmetry should shape how you ship.

## What to understand

- Who is on which version right now, and for how long they will be
- How a bad release is stopped, and how fast
- What must keep working for the oldest supported version
- What review will object to, before submitting
- What the user sees when their version stops being supported

## Core topics

### Versioning

- Version name and build number, and generating rather than typing them
- What a version communicates to users, to support, and to the crash reporter
- Matching a build to the commit it came from

### Store submission

- Review guidelines, and the recurring rejection reasons
- Metadata, screenshots and privacy declarations as part of the release
- Review times, and planning around them
- Expedited review, and not spending it lightly

### Rollout

- Staged rollout, and the numbers to watch at each stage
- Halting a rollout, which is the only real undo
- Rolling forward with a hotfix
- Beta channels and internal distribution before any of this

### Remote control

- Feature flags, so shipping code and enabling it are separate decisions
- Remote configuration and killing a broken feature without a release
- Forced update as the last resort, and doing it kindly
- Server compatibility with old clients, which is the same problem

### After

- Watching crash rate and reviews for the first hours
- Comparing the new version against the previous, not against zero
- A release note anyone can read

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Builds a release, follows the submission checklist. |
| Middle | Manages versioning and staged rollout, monitors after release, uses flags to separate deploy from launch. |
| Senior | Designs the release process including rollback strategy, old-version support and forced updates, and keeps risk per release low. |

## Practice

### Starting out

- **Trace a build**
  Take a released version and identify the exact commit it came from.

- **Read the guidelines**
  Go through the store review guidelines and find two things your app might
  fail.

- **Write a real release note**
  Write one a user would understand, not a changelog of internal names.

### Going deeper

- **Ship dark**
  Release a feature behind a flag, then enable it without a new build.

- **Stage a rollout**
  Release to a small percentage, define what would make you halt, and watch.

- **Support an old client**
  Make a server change that keeps a year-old app working, and prove it.

## Check yourself

- What is the oldest version of your app still in use, and does it still work?
- How would you stop a release that is crashing, and how long would it take?
- Which of your last releases could have been a flag flip instead?
- What does your app do when its API version is no longer supported?
- How do you tell which build a crash report came from?
- Who can ship a release besides you?

## Resources

- **[Deploying to the App Store](https://docs.flutter.dev/deployment/ios)** and
  **[to Google Play](https://docs.flutter.dev/deployment/android)** — the
  official Flutter guides, including signing and build configuration.
- **[App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)** —
  the actual rules. Read the sections on data collection and account deletion
  before your first submission, not after the rejection.
- **[Google Play: release with confidence](https://developer.android.com/distribute/best-practices/launch)** —
  staged rollouts, testing tracks and halting a release.
- **[Feature Toggles](https://martinfowler.com/articles/feature-toggles.html)** —
  Pete Hodgson's long article on the kinds of flags, their lifecycles, and the
  mess they become if never removed.
- **[Semantic Versioning](https://semver.org/)** — the convention, worth knowing
  precisely if you publish packages as well as apps.
