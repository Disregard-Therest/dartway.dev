---
title: Networking and HTTP
description: What actually happens between an app and a server, and how it fails
---

# Networking and HTTP

What happens between a request leaving the app and a response arriving — methods,
status codes, headers, caching, connections — and the many ways that round trip
goes wrong on a real phone on a real network.

**Why it matters.** Mobile networks are slow, lossy and intermittent. An app
written as though the network is a function call works perfectly on Wi-Fi at the
desk and falls apart in a lift, on a train, or on the day the backend is
degraded rather than down.

## What to understand

- What each part of a request means, and which parts you control
- What a status code actually promises, and what clients should do with each class
- Which failures are retryable and which are not
- Where time goes in a request, and how much of it is not the server
- What can be cached, by whom, and for how long

## Core topics

### The request

- Methods and what each is supposed to mean — including idempotency
- Headers that matter in practice: content type, auth, cache control, conditional requests
- Query strings, path parameters, and request bodies

### The response

- Status classes and the ones people get wrong: 401 versus 403, 404 versus 204, 409, 422, 429
- Error bodies clients can act on rather than only display
- Content negotiation and compression

### Connections and latency

- TLS, handshakes, and why connection reuse matters more than payload size
- HTTP/2 and HTTP/3 in one paragraph: multiplexing and head-of-line blocking
- Timeouts — connect, read, total — and choosing them deliberately

### Failure and recovery

- Retries, backoff, and jitter
- Why retrying a non-idempotent request is a bug
- Cancellation, and not paying for a response nobody will read
- Offline, flaky, and slow as three different problems

### Beyond request/response

- WebSockets and server-sent events
- Polling, long polling, and when each is honest

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Makes requests, handles success and a generic error, reads status codes from documentation. |
| Middle | Distinguishes error classes and reacts differently. Sets timeouts, retries safely, and handles cancellation. |
| Senior | Designs the client's whole failure behaviour — retry policy, caching, offline — and can profile where the latency actually is. |

## Practice

### Starting out

- **Handle each error class**
  Take a screen that shows one generic error and give 401, 404, 422 and 500
  distinct, useful behaviour.

- **Add timeouts**
  Give every request a deliberate timeout and see what the UI does when it fires.

- **Read the traffic**
  Inspect your own app's requests in DevTools and account for every one.

### Going deeper

- **Retry correctly**
  Add exponential backoff with jitter, and make sure only idempotent requests
  are retried.

- **Cache conditionally**
  Use ETag or Last-Modified so unchanged data costs a round trip and no payload.

- **Survive a bad network**
  Test on throttled and intermittent connections, and fix what breaks.

## Check yourself

- Which of your app's requests are safe to retry, and how do you know?
- What does your app do when the server answers slowly rather than failing?
- How do you decide a timeout value?
- What is cached in your app today, and who decided — you or a default?
- How would you tell a slow server from a slow network?
- What happens to an in-flight request when the user leaves the screen?

## Resources

- **[MDN HTTP reference](https://developer.mozilla.org/en-US/docs/Web/HTTP)** —
  the reference for methods, headers, status codes and caching. Accurate,
  complete, and the place to settle arguments.
- **[High Performance Browser Networking](https://hpbn.co/)** — Ilya Grigorik's
  book, free in full. The chapters on TCP, TLS and mobile networks explain where
  request time actually goes better than anything else written.
- **[HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching)** —
  worth its own entry, because caching is the highest-leverage networking topic
  and the most commonly skipped.
- **[Timeouts, retries and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)** —
  from the Amazon Builders' Library. The clearest explanation of why naive
  retries make outages worse.
- **[dart:io HttpClient](https://api.dart.dev/stable/dart-io/HttpClient-class.html)**
  and **[package:http](https://pub.dev/packages/http)** — what Dart gives you,
  and the layer most projects actually use.
