---
title: Flutter Developer Competency Map
description: A practical skill map for people building real products with Flutter and Dart
sidebar_label: The Map
sidebar_position: 0
slug: /
---

# Flutter Developer Competency Map

Six areas, forty-eight topics, and for each one: what it is, what to understand
about it, what competence looks like at junior, middle and senior level, what to
practise, and where the good material already is.

It is a map, not a course. Nothing here teaches a topic — other people have done
that better and at greater length, and each page points at their work. What the
map gives you is the shape of the whole territory, so you can see what you have
not looked at.

**Use it to** assess where you actually are, find the next thing worth learning,
structure a mentoring conversation, or write a review that is about skills rather
than impressions.

---

## Levels

The same four levels apply across every area. They describe scope of
responsibility, not years served.

| Level | Scope | Technically | With people |
| --- | --- | --- | --- |
| **Junior** | A task | Does things well with clear examples and templates. | Follows the instructions they are given. |
| **Middle** | A feature | Solves ordinary problems and builds features within the existing structure. | Organises themselves and works as part of a team. |
| **Senior** | A product | Designs architecture, solves hard problems, finds creative solutions. | Spots problems, escalates early, leads discussions, helps others do their jobs. |
| **Lead** | A team | Sets methodology across a team and several projects, and sees the consequences of decisions before they land. | Runs team processes and takes people somewhere. |

Every topic page carries its own junior/middle/senior table for that specific
skill, because nobody is one level across all six areas.

---

## 1. Foundations

Engineering thinking that outlives any language or framework.

- **[Algorithms and Data Structures](01_foundations/01_algorithms-and-data-structures.md)** — choosing how to store and process data so it still works when there is more of it
- **[Architecture and Code Organization](01_foundations/02_architecture-and-code-organization.md)** — where code lives and what is allowed to depend on what
- **[Data Modelling](01_foundations/03_data-modelling.md)** — turning a domain into entities, relations and constraints that hold up
- **[Networking and HTTP](01_foundations/04_networking-and-http.md)** — what actually happens between an app and a server, and how it fails
- **[Debugging and Problem Solving](01_foundations/05_debugging-and-problem-solving.md)** — finding the cause instead of changing things until it works

## 2. Dart

The language, and everything that runs on the server.

- **[Type System and Null Safety](02_dart/01_type-system-and-null-safety.md)** — using types to make wrong states impossible rather than merely caught
- **[Asynchrony, Futures and Streams](02_dart/02_asynchrony-futures-and-streams.md)** — single-threaded concurrency and the ordering bugs that come with it
- **[Isolates and Concurrency](02_dart/03_isolates-and-concurrency.md)** — real parallelism, and when it is worth it
- **[Collections and Functional Style](02_dart/04_collections-and-functional-style.md)** — expressing transformations clearly without hiding what they cost
- **[Code Generation](02_dart/05_code-generation.md)** — letting the build write the boilerplate
- **[Server-Side Dart](02_dart/06_server-side-dart.md)** — running the backend in the same language as the app
- **[APIs and Contracts](02_dart/07_apis-and-contracts.md)** — designing the boundary so it can change without breaking
- **[Databases and Migrations](02_dart/08_databases-and-migrations.md)** — querying efficiently, and changing a schema that already holds real data
- **[Authentication and Authorization](02_dart/09_authentication-and-authorization.md)** — proving who someone is, and deciding what they may do
- **[Realtime](02_dart/10_realtime.md)** — pushing changes to clients over a connection that keeps dropping
- **[Background Jobs and Scheduling](02_dart/11_background-jobs-and-scheduling.md)** — work that happens without a request, and fails silently
- **[Files and Uploads](02_dart/12_files-and-uploads.md)** — moving bytes without routing them through your server twice

## 3. Flutter

Everything on the client.

- **[Widgets and Composition](03_flutter/01_widgets-and-composition.md)** — how the widget tree actually works
- **[Layout and Rendering](03_flutter/02_layout-and-rendering.md)** — constraints down, sizes up, and why it says unbounded height
- **[Navigation and Routing](03_flutter/03_navigation-and-routing.md)** — where the user is and what back should do
- **[Theming and Design Systems](03_flutter/04_theming-and-design-systems.md)** — appearance decided once, so features never mention a colour
- **[Adaptive and Responsive UI](03_flutter/05_adaptive-and-responsive-ui.md)** — phone to desktop without four layouts
- **[Animation](03_flutter/06_animation.md)** — motion that explains what happened, within frame budget
- **[Accessibility](03_flutter/07_accessibility.md)** — usable by people your testing never included
- **[State and Data Flow](03_flutter/08_state-and-data-flow.md)** — where state lives, who changes it, how the UI finds out
- **[Working with Data](03_flutter/09_working-with-data.md)** — fetching, caching, and behaving well with no network
- **[Platform and Device](03_flutter/10_platform-and-device.md)** — permissions, notifications, deep links, native code
- **[Performance](03_flutter/11_performance.md)** — measuring before optimising
- **[Testing Flutter Apps](03_flutter/12_testing-flutter-apps.md)** — which failures each level can actually catch

## 4. Engineering Practices

How work gets from an idea to users, repeatably.

- **[Git and Workflow](04_practices/01_git-and-workflow.md)** — a history someone can read
- **[Code Review and Conventions](04_practices/02_code-review-and-conventions.md)** — reviews that catch real problems without becoming a bottleneck
- **[Static Analysis and Linting](04_practices/03_static-analysis-and-linting.md)** — letting the analyzer enforce what people otherwise repeat
- **[Testing Strategy](04_practices/04_testing-strategy.md)** — what to test, at which level, and what to leave alone
- **[CI/CD](04_practices/05_ci-cd.md)** — every change built and shipped the same way, by a machine
- **[Release and Distribution](04_practices/06_release-and-distribution.md)** — getting a build to users, and what to do when it is wrong
- **[Monitoring and Crash Reporting](04_practices/07_monitoring-and-crash-reporting.md)** — finding out before your users tell you
- **[Security](04_practices/08_security.md)** — assuming the client is hostile
- **[Planning and Estimation](04_practices/09_planning-and-estimation.md)** — being wrong less expensively

## 5. AI in Development

A real skill area now, with its own technique and its own failure modes.

- **[Working with Coding Agents](05_ai/01_working-with-coding-agents.md)** — what to delegate and what to keep
- **[Context and Conventions for AI](05_ai/02_context-and-conventions.md)** — making a codebase an agent can work in
- **[Reviewing Generated Code](05_ai/03_reviewing-generated-code.md)** — reading a change written by something that is never uncertain
- **[Limits and Failure Modes](05_ai/04_limits-and-failure-modes.md)** — where these tools reliably fail
- **[AI in Review and Testing](05_ai/05_ai-in-review-and-testing.md)** — pointing it at verification, where a second reader is cheap

## 6. Product and Team

What separates someone who closes tickets from someone who ships products.

- **[Requirements and Scope](06_product/01_requirements-and-scope.md)** — understanding what is needed before deciding how to build it
- **[UX Fundamentals](06_product/02_ux-fundamentals.md)** — the hundred small decisions nobody specifies
- **[Analytics and Impact](06_product/03_analytics-and-impact.md)** — knowing whether what you shipped helped
- **[Working with Designers](06_product/04_working-with-designers.md)** — turning a design file into a product without guessing
- **[Technical Communication](06_product/05_technical-communication.md)** — writing so decisions get made

---

## How to use it

1. **Pick one area that is blocking real work right now.** Not the one you find
   most interesting — the one costing you time this month.
2. **Read that topic's levels table** and locate yourself honestly. The gap
   between where you are and the row below it is your next piece of work.
3. **Take one task from Practice.** They are product tasks rather than
   exercises, because the topic is easier to learn where it actually appears.
4. **Answer the questions under Check yourself.** The valuable ones are those you
   cannot answer.
5. **Read one thing from Resources,** properly, rather than five things partly.
6. **Come back in a few weeks** and move on. Nobody is senior across six areas,
   and trying to be is a good way to be middle at all of them.

Used with someone else — a mentor, a lead, a peer — the Check yourself questions
work better as a conversation than as a self-assessment. They are written to be
asked out loud.
