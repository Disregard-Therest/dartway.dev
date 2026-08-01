---
title: CI/CD
description: Every change built, checked and shipped the same way, by a machine
---

# CI/CD

Automating what happens between a commit and a release: building, checking,
signing, and distributing. The point is not automation for its own sake — it is
that the process is identical every time and does not depend on whose laptop it
runs on.

**Why it matters.** A manual release process is a process only one person can
run, that changes slightly each time, and that gets skipped under deadline
pressure. It is also where secrets end up in the wrong places.

## What to understand

- What must pass before a change can merge
- What is different between the pipeline's environment and a developer's
- Where secrets come from, and who can read them
- How long the pipeline takes, and whether anyone waits for it
- What happens when the pipeline fails on the main branch

## Core topics

### Continuous integration

- Building and checking every change, not only before release
- The gate: analyzer, tests, format, build — and keeping it fast
- Caching dependencies and build artefacts
- Reproducibility, including pinned tool versions
- Reacting to a red main branch immediately

### Mobile specifics

- Signing on iOS and Android, and managing certificates without pain
- macOS runners, and their cost
- Build numbers and versioning, generated rather than typed
- Flavours and environments in one pipeline

### Delivery

- Internal distribution for testers
- Store submission, phased rollout, and review time
- Release notes generated from the change history
- Rollback, which on mobile means rolling forward

### Secrets

- Never in the repository, and never in logs
- Scoped per environment, with the least access that works
- Rotation, and knowing what would break

### Keeping it healthy

- Pipeline duration as a tracked number
- Flaky pipelines treated as broken
- Failure messages that say what to do
- Someone owning it, because an unowned pipeline decays

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Works with an existing pipeline and fixes their own failures. |
| Middle | Writes and modifies workflows, manages signing and secrets, keeps builds fast and reproducible. |
| Senior | Designs the whole path from commit to store, including environments, rollout and rollback, and keeps the pipeline trustworthy. |

## Practice

### Starting out

- **Gate the merge**
  Make analyzer and tests block merging, not just report.

- **Speed it up**
  Measure pipeline time, cache what repeats, and cut it meaningfully.

- **Find a secret in a log**
  Search your pipeline output for anything that should not be there.

### Going deeper

- **Automate signing**
  Set up iOS and Android signing so a release needs no local machine.

- **Ship to testers automatically**
  Make a merge to main produce an internal build without human steps.

- **Generate release notes**
  Build them from commits or pull requests rather than writing them by hand.

## Check yourself

- Could someone else run a release today if you were unavailable?
- How long does your pipeline take, and how long before people work around it?
- Where are your signing certificates, and what happens when they expire?
- What in your pipeline differs from a developer's machine?
- What happens when main goes red — who notices, and how fast?
- How would you get a fix to users in under an hour?

## Resources

- **[Continuous delivery for Flutter apps](https://docs.flutter.dev/deployment/cd)** —
  the official guide, including the mobile-specific parts that generic CI
  documentation omits.
- **[GitHub Actions documentation](https://docs.github.com/en/actions)** — the
  reference for the platform most projects use. The sections on caching and
  secrets are the ones that matter.
- **[Fastlane](https://docs.fastlane.tools/)** — the standard tooling for
  signing, building and submitting mobile apps. `match` alone solves the
  certificate problem most teams suffer through.
- **[Continuous Delivery](https://continuousdelivery.com/)** — Jez Humble and
  Dave Farley's principles. Old, and still the clearest argument for why the
  pipeline should be the only path to production.
- **[Accelerate / DORA metrics](https://dora.dev/)** — deployment frequency, lead
  time, change failure rate, recovery time. The four numbers worth measuring
  about a delivery process.
