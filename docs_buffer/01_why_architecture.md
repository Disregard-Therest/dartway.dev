---
id: why-architecture
title: Why Dart Way Architecture
---

Most Flutter projects start the same way: pick a state management library, invent folder structure, hand-craft repositories and services, and hope it scales.

Dart Way takes a different route:

- **One stack, one language.** Flutter + Serverpod, both in Dart.
- **Feature-first, not layer-first.** Code lives where business logic lives, not spread across `data/ui/domain`.
- **Generic data access.** CRUD repo with filters replaces dozens of hand-written service classes.
- **Predictable pipelines.** Authorization, validation, and triggers always run in the same order.

### Pain points we solve

- **Architecture discussions that never end.** With Dart Way, you don’t argue over folder structure — you follow the same feature-first convention.
- **Boilerplate explosion.** Instead of three layers of repositories, you use one generic repo.
- **Drift between backend and frontend models.** Serverpod keeps types aligned across the stack.
- **Hidden business rules.** Our Insert/Update/Delete pipelines make side effects and checks explicit.

👉 Dart Way is not just tools — it’s a way to ship production apps faster and with fewer mistakes.
