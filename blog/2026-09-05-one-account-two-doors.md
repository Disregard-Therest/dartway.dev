---
slug: one-account-two-doors
title: "One account, two doors: what phone-or-email login really costs"
authors: [evgenii]
tags: [engineering, case-breakdown]
description: >-
  Letting users sign in with either a phone number or an email looks like a
  one-line change. It is a data-model change, and the bill arrives as duplicate
  accounts you cannot merge.
---

Letting people sign in with **either** a phone number or an email looks like a
one-line change: widen the lookup, accept both. We shipped it last week in a live
project, and the one-line change turned out to be a data-model change with a bill
attached.

Here is what it actually costs, in the order the costs show up.

<!-- truncate -->

## The lookup was never the problem

The framework stored a single `userIdentifier` column and matched it by strict
equality. Ask it to find a profile by phone *or* email and there is no seam to
extend — not because the query is hard, but because authentication itself requires
that column to exist. Remove it and the core fails at startup.

So the first fix is not "search two fields". It is **giving the application a say
in how a user is found**:

```dart
DwAuthConfig(
  findUserProfileByIdentifier: (session, identifier) async {
    // the app decides what "the same person" means
  },
);
```

The column stops being mandatory, the identifier arrives already normalised, and
the framework stops pretending it knows what identity means in your domain. Three
obligations move to the application, and the docs say so out loud — a resolver that
silently does the wrong thing is worse than no resolver.

## Searching two fields fixes nothing on its own

This is the part that surprised us, and it is the reason this post exists.

A user who signed up by phone has an **empty email column**. Searching both fields
finds nothing new, because there is nothing in the second field. The lookup is
correct and useless at the same time.

To fill that column you need a way to attach a second channel to an existing
account — which means `addAuthProvider` and `changeIdentifier` have to actually
work. In our case both threw `UnimplementedError`, and there was no screen for it
in any mockup. Until that exists, **signing in from the other channel keeps quietly
creating a second account**, exactly as before.

## The duplicates are already there

Then comes the part you cannot postpone. We went to add unique indexes on `phone`
and `email` and found there were **no unique indexes at all** — not on the new
columns, not on the old `userIdentifier`. Two rows with the same value were already
legal, and the lookup resolved to whichever one the database felt like returning.

You cannot add the index until the duplicates are merged. And the duplicates exist
precisely *because* login from a second channel used to create a new account. The
bug and its cleanup are the same object.

## Merging is an event, not an action

Account merge is irreversible: one profile absorbs another, and afterwards nobody
can reconstruct what came from where. So we modelled it as a `ProfileMerge` **event**
rather than a method call — who merged, whom, and what moved. An action leaves the
database consistent and the story gone; an event leaves both.

## What we would tell ourselves a week ago

- "Login by phone or email" is not an auth-screen task. It is a **profile identity**
  task, and the screen is the last five percent.
- Ship the **attach-a-second-channel** flow in the same release. Without it, the
  feature is a lookup that finds nothing.
- Check for unique indexes **before** you promise anything. Ours were missing for the
  entire life of the project, and nobody noticed because nothing enforced them.
- Verify on a live database with a real round trip — phone signup, email attach,
  email login into the same account, one row in the table. We had 23 server tests
  including that pass; the reading-the-code version of this article would have been
  wrong in two places.

The framework side landed in `dartway` core `0.12.1` — the auth resolver and a
working `changeIdentifier`. If you are running the earlier version, the migration is
the interesting part, not the API.
