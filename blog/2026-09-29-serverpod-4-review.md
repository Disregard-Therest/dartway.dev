---
slug: serverpod-4-review
title: "Serverpod 4 and App Studio: a review from someone who ships with agents"
authors: [evgenii]
tags: [ecosystem]
description: >-
  Full-stack hot reload, Postgres without Docker, an MCP server, offline sync,
  shared models, a cloud and a desktop studio. What each one is, and how much
  it matters when most of the code is written by agents in the background.
---

Serverpod 4 came out in September, and with it App Studio. We have moved our own
framework off Serverpod, but for fullstack Dart it remains a solid choice — so
here is the release, feature by feature, with what each one is and what it is
worth in practice.

The lens matters, so it goes first. Most of our development no longer happens in
front of a running app. One session holds the conversation about the work; it
starts separate agent sessions for development and for code review; several tasks
run at once, in the background; and the result gets looked at on a test server a
couple of times a day. Several of Serverpod 4's headline features are built for a
different picture — a developer at a desk with the whole stack running locally.

<!-- truncate -->

## Full-stack hot reload

The database, the server and the Flutter app come up with one command. An edit
anywhere — from a model to a screen — is picked up live, code generation
included, and the app keeps its state. No more four terminals and restarting
things by hand.

**Worth it?** Convenient, and it barely touches how we work. With agents running
in parallel there is often no local stack up at all: changes go to a test server
and are checked there, and in most cases that is enough. Bringing a stack up was
never the hard part.

## Postgres without Docker, and an MCP server

For local development there is now a built-in Postgres, so Docker is optional. And
the running app exposes an MCP server: your coding agent can reach into the live
stack — logs, migrations, the running Flutter app.

**Worth it?** Useful on the occasional tricky bug. It does not solve a problem we
actually have: the agent already sees the logs, and in practice it rarely lacks
information to work out what is going on. (We looked at the same idea in Dart's
own MCP server — [a separate post](2026-09-29-dart-mcp.md).)

## Offline and a database on the client

The same models and ORM now generate SQLite in Flutter, and a single line —
`database: sync` — turns on two-way sync with the server.

**Worth it?** The right direction; DartWay is heading there too. It is marked
experimental for now, and it will take time to mature.

## Future calls and shared models

Background jobs are declared as ordinary Dart methods, and recurring ones are
supported. Models can live in a separate package shared by the server and the
Flutter app.

**Worth it?** Sharing models between frontend and backend is a well-known pain,
and it was one of the reasons we left Serverpod. Now it is there, and it is a
sensible step.

## Serverpod Cloud

Deploy the backend, the database and the web app with one command, from $5 a
month. The framework is free and the business is hosting — a clear model.

**Worth it?** Today an agent sets up infrastructure in a couple of prompts: a
server, Docker, the database. And if you do not understand how your server is
built, handing it to someone else is uncomfortable either way.

## App Studio

A desktop app with Flutter, Dart and Serverpod already inside. There is no AI of
its own: you plug in Claude Code, Cursor or any other agent. What comes out is an
ordinary project with its code in your hands — not a closed sandbox like Lovable.

**Worth it?** Two reservations.

The first: Serverpod gives you a tool for each task, but it does not tie them
into an architecture. To build everything on that list well you still have to be
the architect of your app, or it turns into a mess. We ran into that many times
when we built on Serverpod directly, before DartWay existed.

The second matters more. Real development does not get stuck on setting up the
environment. A prototype or a first version is easy. It gets hard when there are
many screens and features that have to stay consistent with each other, and a
large set of requirements that must hold precisely. A chat window next to a
running app does not help with that: where do all the requirements live, and how
does it all stay in sync? That is the question that decides whether a real
product gets built, and App Studio does not answer it.

## Verdict

A good release of a good framework, and worth a look if you build fullstack Dart.
Most of it makes the local loop nicer; the hard problems of agent-driven
development — architecture, and keeping a large product consistent — are left
to you.

---

*The video version, in Russian, is [on YouTube](https://youtu.be/HL9ja3EwXzY).*
