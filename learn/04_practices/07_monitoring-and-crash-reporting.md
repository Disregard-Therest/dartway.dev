---
title: Monitoring and Crash Reporting
description: Finding out something is broken before your users tell you
---

# Monitoring and Crash Reporting

Knowing what the app and server are actually doing in production: crashes,
errors, latency, and the things that quietly stopped working. The alternative is
learning from a one-star review.

**Why it matters.** Most production problems never generate a support ticket.
The user retries, gives up, and leaves. Without instrumentation those failures
are invisible, and the app appears to be working perfectly right up until the
retention numbers say otherwise.

## What to understand

- What you would need to know to diagnose this without reproducing it
- Which signals mean a user is having a bad time, not just that a log line fired
- What is worth waking someone for, and what is worth a dashboard
- Whether an absence of errors means health or means blindness
- What personal data your telemetry is collecting, deliberately or not

## Core topics

### Crashes and errors

- Native crashes, Dart exceptions, and the difference in what you get
- Symbolication and deobfuscation, and uploading the mapping at build time
- Grouping, so a thousand reports are one issue
- Non-fatal errors, which are usually the larger problem
- Crash-free rate as the headline number

### Context

- What to attach: version, route, user action, device, connectivity
- Breadcrumbs leading to the failure
- User identifiers that support can use and that respect privacy
- Enough to reproduce, without shipping a diary of someone's session

### Beyond crashes

- Latency and error rate at the API boundary
- Failures the app recovers from and never reports
- Business-level signals: sign-ups, purchases, sends — and their absence
- Structured logging that can actually be queried

### Alerting

- Alerting on symptoms users feel, not on every anomaly
- Thresholds that account for normal variation
- Alerting on silence — a job that stopped, a metric that flatlined
- Fatigue, and an alert nobody reads being worse than none

### Responding

- Triage: how bad, how many, since when
- Correlating with a release
- The loop from incident back to a test or a guard

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Integrates a crash reporter and looks at it when asked. |
| Middle | Adds useful context and breadcrumbs, reports non-fatals, watches crash-free rate around releases. |
| Senior | Instruments what users actually experience, sets alerts on symptoms, and closes the loop from incident to prevention. |

## Practice

### Starting out

- **Crash on purpose**
  Trigger a crash in a release build and confirm it arrives, readable and
  symbolicated.

- **Add context**
  Attach the current route and last action, and see how much faster diagnosis
  becomes.

- **Report a swallowed error**
  Find a `catch` that hides a failure and report it as a non-fatal.

### Going deeper

- **Alert on a symptom**
  Set an alert on something a user feels, and tune it until it is trustworthy.

- **Alert on silence**
  Make a metric that stops arriving raise an alarm.

- **Watch a release**
  Compare crash-free rate and error rate against the previous version, with a
  defined threshold for halting.

## Check yourself

- How would you find out your app is crashing for one device model?
- What is your crash-free rate, and what was it last release?
- Which errors does your app swallow without reporting?
- What context arrives with a crash, and is it enough to diagnose?
- Which of your alerts have people learned to ignore?
- What would tell you a background job stopped running a month ago?

## Resources

- **[Google SRE Book: Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)** —
  symptoms versus causes, and the four golden signals. The chapter that changes
  how people choose alerts.
- **[Error reporting in Flutter](https://docs.flutter.dev/testing/errors)** —
  catching Dart and framework errors properly, which is the prerequisite for
  reporting them.
- **[Firebase Crashlytics](https://firebase.google.com/docs/crashlytics)** — the
  most common choice for mobile, including symbol upload and non-fatal reporting.
- **[Sentry for Flutter](https://docs.sentry.io/platforms/dart/guides/flutter/)** —
  covers app and server in one place, with good documentation on breadcrumbs and
  release health.
- **[Google SRE Workbook: Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)** —
  how to alert on user-visible objectives rather than on raw metrics, with the
  maths for burn rates.
