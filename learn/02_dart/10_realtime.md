---
title: Realtime
description: Pushing changes to clients, and everything that goes wrong on a mobile connection
---

# Realtime

Getting a change to other people's screens without them asking — messages
appearing, a list updating, a status changing. Usually WebSockets, sometimes
server-sent events, occasionally honest polling.

**Why it matters.** Realtime is easy to demo and hard to run. On mobile the
connection drops constantly — backgrounding, switching networks, lock screen —
and the difficulty is not delivering the message but staying correct across the
gaps.

## What to understand

- Whether this genuinely needs pushing, or polling would do
- Who is allowed to receive which messages, and where that is enforced
- What happens to messages sent while a client was disconnected
- How the client reconciles a stale local state with the server's
- What the connection costs on battery and on the server

## Core topics

### Transport

- WebSockets, server-sent events, and long polling
- Reconnection with backoff, and not stampeding the server after an outage
- Heartbeats, and detecting a connection that is open but dead
- Backgrounding and OS restrictions

### Channels and delivery

- Channel or topic design, and subscribing to the narrowest useful scope
- Authorising a subscription — the same rules as any read
- Fan-out to many subscribers
- Delivery guarantees: at most once, at least once, and what you actually have

### Consistency

- Catching up after a reconnect: replay, or refetch and replace
- Ordering, and messages arriving out of it
- Deduplication of a message delivered twice
- Optimistic updates and reconciling when the server disagrees

### Scale

- What one server can hold, and what changes with two
- State that must not live in a process
- Push notifications for when the app is not running at all

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Subscribes to a stream and updates the UI when a message arrives. |
| Middle | Handles reconnection, resubscription and catch-up. Authorises subscriptions and cleans them up. |
| Senior | Designs channel granularity and delivery semantics, reasons about ordering and duplicates, and keeps it correct across instances. |

## Practice

### Starting out

- **Break the connection**
  Turn off the network mid-session and make reconnection work without a reload.

- **Scope a subscription**
  Replace a broad subscription with the narrowest one that still works.

- **Clean up**
  Make sure leaving a screen ends its subscription.

### Going deeper

- **Catch up after a gap**
  Ensure nothing is missed across a two-minute disconnection.

- **Handle a duplicate**
  Make the client correct when the same message arrives twice.

- **Update optimistically**
  Show a change before the server confirms it, and recover cleanly when it
  refuses.

## Check yourself

- What does your app miss if the connection drops for a minute?
- Who is allowed to subscribe to each channel, and where is that checked?
- What happens if the same message arrives twice?
- How many open connections can one instance of your server hold?
- What does the app do when it comes back from the background?
- Which of your realtime features would be fine as a refresh on screen open?

## Resources

- **[WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)** —
  MDN's reference for the protocol and its lifecycle, including close codes,
  which is where reconnection logic actually gets decided.
- **[Serverpod: streams](https://docs.serverpod.dev/concepts/streams)** —
  realtime in a Dart backend: typed messages, subscriptions and authorisation.
- **[Designing Data-Intensive Applications](https://dataintensive.net/)** —
  the chapters on streams and ordering. The vocabulary here — at-least-once,
  idempotence, event ordering — is what realtime bugs are made of.
- **[Idempotency keys](https://brandur.org/idempotency-keys)** — applies directly
  to message handling: the only reliable answer to at-least-once delivery is a
  handler that can run twice.
- **[Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)** —
  for the case realtime cannot cover, when the app is not running. Worth reading
  for the delivery guarantees section alone.
