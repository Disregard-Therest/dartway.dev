---
slug: flutter-3-47-what-breaks
title: "Flutter 3.47: what actually breaks, and what to do before November"
authors: [evgenii]
tags: [ecosystem, engineering]
description: >-
  material and cupertino left the SDK. Nothing breaks today, the migration is
  one command with two traps, and the most repeated claim about this release —
  that ChangeNotifier moved out — is not true yet.
---

Summer produced exactly one stable Flutter release. 3.45 and 3.46 never reached
stable at all, and 3.47 arrived on 12 August carrying 1358 commits on top of
3.44. The headline is not a feature. It is a repackaging: **`material` and
`cupertino` moved out of the SDK into separate packages.**

That sounds alarming and mostly is not — today. Here is what we found migrating a
real project from 3.44.0 to 3.47.2, and the one widely repeated claim about this
release that does not survive contact with the code.

<!-- truncate -->

## Nothing is on fire today

We took a live project from 3.44.0 to 3.47.2 and ran it: `flutter analyze` clean,
tests green, the libraries still inside the SDK and not marked deprecated. The
deprecation is scheduled for the **November release**. That is when the clock
starts.

So this is a good month to migrate and a bad month to panic. The window exists
precisely so the migration is boring.

## The migration is one command, with two traps

```bash
dart fix --apply --code=migrate_design_widgets
```

**Trap one: plain `dart fix --apply` will not do it.** The fix is not in the
default set; without `--code=migrate_design_widgets` the command runs, reports
success, and changes nothing relevant. It is the kind of failure that reads as
"already migrated".

**Trap two: it writes `material_ui: any` into your `pubspec`.** `any` means the
next breaking release of that package lands in your build without a word.
Replace it with a caret and a version the moment the fix finishes.

## The claim that is not true: `ChangeNotifier` did not move

The most repeated line about this release is that `ChangeNotifier` and friends
were pulled out of the SDK into `package:listen`. In 3.47.2 that is not what
happened.

The classes are still in the SDK, and they are not marked deprecated. `listen`
is a **second, independent implementation of the same names** — not a new home
for the old ones. The two are separate types, and the compiler treats them that
way:

- hand a `listen` `ValueNotifier` to a Flutter `ValueListenableBuilder` and you
  get a compile error, not a subtle runtime bug;
- the same applies in reverse, and to every other pair with a shared name.

Where `listen` earns its place is code that has no Flutter in it: a server, a
CLI, logic shared between the two. There the SDK types were never available and
now there is an equivalent. Inside a Flutter app, switching to it today buys
nothing and costs you type compatibility with every widget that expects the SDK
version.

## Primary constructors will not turn themselves on

Dart 3.13 ships primary constructors, and they are behind a language version
gate. Without `sdk: ^3.13.0` in `pubspec.yaml` you get `experiment_not_enabled`
even on the right SDK — the toolchain is correct and the project is not asking.

Worth saying plainly, though: the value of saving constructor boilerplate drops
a long way once the boilerplate is not written by a human. If your constructors
are generated, this is a readability change, not a productivity one.

## The rest

Impeller by default on desktop, iOS 15 and macOS 12 as the new floors, and the
Wasm work — all real, none of it urgent, and none of it changes what you do this
month.

**What to actually do before November:** run the migration on a branch, pin
`material_ui` properly, and leave `ChangeNotifier` alone.

---

*Checked by migrating a live project from 3.44.0 to 3.47.2 — `before/` and
`after/` each build and pass their tests on their own SDK. The video walkthrough
is [on YouTube](https://youtu.be/kNXMVEj_7bA).*
