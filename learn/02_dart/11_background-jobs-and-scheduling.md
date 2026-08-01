---
title: Background Jobs and Scheduling
description: Work that happens without a request, and survives the process that started it
---

# Background Jobs and Scheduling

Everything the server does when nobody is waiting: nightly reports, retries,
reminders, cleanups, anything too slow to keep a request open for. The hard part
is not scheduling it — it is what happens when it fails, or runs twice, or the
process dies halfway.

**Why it matters.** Background work fails silently by definition. Nobody is
watching the screen when it breaks, so a job that has been failing for three
weeks looks exactly like a job that is working.

## What to understand

- Whether this must happen now, soon, or eventually
- What happens if it runs twice, and whether that is acceptable
- What happens if it never runs, and who finds out
- Where the work resumes if the process dies mid-job
- What happens when two instances both decide it is their turn

## Core topics

### Kinds of work

- Deferred: started by a request, finished after the response
- Scheduled: at a time, or on an interval
- Reactive: triggered by a change elsewhere
- Long-running: batches that cannot finish in one go

### Correctness

- Idempotency, so a retry is not a second effect
- Exactly-once as a fiction, and designing for at-least-once
- Locking so only one instance runs a scheduled job
- Transaction boundaries, and not committing before the side effect

### Failure

- Retry with backoff, and a limit
- Dead letters — work that failed too often and needs a human
- Partial failure in a batch: continue, or stop
- Timeouts, and detecting a job that hung rather than failed

### Operating

- Visibility: what ran, when, how long, and what it did
- Alerting on a job that did not run, not only on one that errored
- Backlog as a metric
- Time zones and daylight saving, which break schedules annually

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Schedules a job and writes what it does. |
| Middle | Makes jobs idempotent, adds retries and logging, and handles partial failure. |
| Senior | Designs for at-least-once across multiple instances, with locking, dead letters, and alerting on silence as well as on errors. |

## Practice

### Starting out

- **Move work off the request**
  Take something slow in a request handler and defer it, keeping the user informed.

- **Log a run**
  Give a job a record of what it did, so yesterday's run can be inspected.

- **Make it idempotent**
  Take a job that would double-charge or double-send if run twice, and fix it.

### Going deeper

- **Lock a schedule**
  Make a scheduled job run once when two instances are live.

- **Handle a poisoned item**
  Add retries with backoff and a dead-letter path for an item that always fails.

- **Alert on silence**
  Make a job that stops running raise an alarm, not just one that errors.

## Check yourself

- Which of your jobs would break if it ran twice at the same moment?
- How would you find out a nightly job stopped running three weeks ago?
- What happens when the process is killed mid-job?
- Where does an item go after it has failed ten times?
- Which of your schedules break when the clocks change?
- How long is your backlog right now, and can you see it?

## Resources

- **[Serverpod: scheduling](https://docs.serverpod.dev/concepts/scheduling)** —
  future calls and scheduled work in a Dart backend, including what survives a
  restart.
- **[Idempotency keys](https://brandur.org/idempotency-keys)** — the reference
  for making retried work safe. Background jobs are the case it matters most.
- **[Timeouts, retries and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)** —
  why naive retries turn a small failure into an outage, from people who have
  watched it happen.
- **[Avoiding insurmountable queue backlogs](https://aws.amazon.com/builders-library/avoiding-insurmountable-queue-backlogs/)** —
  what happens when work arrives faster than it is processed, and how to design
  so the queue recovers.
- **[Google SRE Book: Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)** —
  the chapter on what to alert on. Directly applicable to the "it silently
  stopped" failure mode.
