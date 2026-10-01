---
slug: shopify-leaves-react-native
title: "Shopify leaves React Native: what it means for Flutter"
authors: [evgenii]
tags: [ecosystem]
description: >-
  Shopify moved its apps to React Native in 2020 and is now going back to Swift
  and Kotlin, because agents made a second codebase cheap. How they did it, what
  the numbers leave out, and why Flutter developers should not worry.
---

Shopify went all-in on React Native in 2020, finished moving its apps last year —
and in September 2026 announced it is going back to native Swift and Kotlin. This
is not our stack, but the reason is coding agents, and agents change what matters
when you pick a framework at all. I build a fullstack Dart framework, and I already
know I will not be the one writing apps on it: agents will. That changes the price
of every technical choice, and Shopify is a clear case of it.

<!-- truncate -->

## What happened

In 2020 Shopify bet on React Native: one codebase, lower costs. In January 2025
its head of mobile wrote that the future of React Native was bright. On 10
September 2026 the same person published
[Native is now the future of mobile at Shopify](https://shopify.engineering/back-to-native).
The Shop app is already rebuilt and in the stores; the main Shopify app — more than
300 screens, widgets, an Apple Watch app, Siri Shortcuts — ships later this year.

They do not say React Native was a mistake. They say it was the right choice in
2020 and the conditions have changed.

## What native gave them

From the [Shop app migration post](https://shopify.engineering/shop-app-migration):

| | React Native | Native | Change |
|---|---|---|---|
| Cold start, Android | 4433 ms | 2233 ms | −50% |
| Cold start, iOS | 3200 ms | 2466 ms | −23% |
| App size, Android | 293 MB | 184 MB | −37% |
| App size, iOS | | | +1 MB |
| Crash-free sessions | 99.5% | 99.95% | 10× fewer crashing sessions |
| Android release build time | | | −75% |

Six core engineers, twelve weeks from proof of concept to the stores. The proof of
concept itself took one engineer one week.

The advantages of native were always known. They just always looked small — a
slightly faster start, a slightly smaller build, a few fewer platform bugs — next
to the cost of building everything twice.

## Why now

Keeping two codebases used to mean keeping two full development teams. Now agents
write most of the code, and they can also take on the supporting work: checking
that a feature behaves the same on both platforms, comparing, verifying. Shopify
puts it this way:

> Native still means building and maintaining software on two platforms, that cost
> has not disappeared. What changed is that agents can now do enough of the
> implementation, translation, testing, and review work that it's no longer the
> deciding factor it was in 2020.

The same thing is happening everywhere. With agents you can port almost any
library to your own stack, or rewrite a whole framework, and do it fast. That
shifts what counts as a good or a bad technical decision.

## How they did it

The interesting part is not the decision but how you trust a rewrite of this size
to agents at a company where any mistake costs real money. They did not just tell a
model to rewrite the app. They built a pipeline.

**Logic separated from UI.** Business logic was split from the interface so cleanly
that it runs headless, on a desktop machine. Agents tested it through a CLI and
console tests — inspect the app's state, navigate, perform actions — in
milliseconds, without starting an emulator. The UI was verified separately: the
new screens were compared by screenshot against the running React Native app at
the same checkpoints. Their tool for this, Tardis, also captured analytics events
in both apps so agents could compare event names, counts and payloads.

**Small checkpoints.** Their system, Helix, cuts a screen into small ordered slices
that can be reviewed in minutes. Each slice has to prove its behaviour with tests,
match the running app in a visual review, survive two adversarial code reviewers
and get a human's approval before it is committed. Review feedback is remembered,
so the loop needs less help as the migration goes on.

**Where agents fell short.** Even inside that pipeline, the generated code brought
duplication, architectural drift and performance problems. Shopify is explicit that
native expertise remained essential — this only worked because they had a team of
native experts reviewing it.

## What the numbers leave out

A few things did not fit into the video:

- **The comparison is against the old React Native architecture.** Commenters
  pointed out that nobody knows how the New Architecture would have measured —
  and moving to it was a large refactor Shopify faced anyway.
- **It was a port, not a new product.** Agents had a working app to read and to
  compare against. Shopify says agents worked best exactly when they had an
  existing implementation; building something new does not speed up the same way.
- **Two platforms is now permanent.** Feature parity "at all times", two reviews,
  two releases — and no over-the-air updates past the store.

## Should Flutter developers worry?

I do not think so — I am quite sure not.

This is one more example of agents making a little more possible. The biggest
tech companies always ran native, with parallel teams for each platform, and never
went cross-platform. Shopify is a large company, but not that large; agents let it
work to the standards of companies with stronger development teams. It is the same
shift as a small business now being able to build its own app, which used to take a
mid-sized one. The cost of reaching the same result drops, at every level.

And rewriting is a pain in any case. For most companies it simply is not worth it:
it is far better to put the effort into the product — new features, higher quality
— than to chase the last 1% of bugs or shave megabytes off a build. The gains
Shopify got matter much less to most teams.

So I do not expect this to move the job market much, and Flutter even less. In my
view Flutter is well ahead of React Native, so it suffers less from trends like
this one.

What I do take from it is the same lesson that changed my own work: I recently
rewrote my framework quite radically, precisely because I came to trust agents
with very large tasks done in short time. Is anyone around you talking about moving
from one stack to another with agents?

---

*The video version, in Russian, is [on YouTube](https://youtu.be/sbbvqOYI0Ko).*
