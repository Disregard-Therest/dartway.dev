---
title: Working with Data
description: Fetching, caching and persisting — and behaving well when there is no network
---

# Working with Data

Everything between the server and the screen: making the call, turning the
response into models, keeping a copy locally, and deciding what to show when the
network is slow, absent or lying.

**Why it matters.** The gap between a demo and a product is almost entirely
here. A demo fetches and displays. A product handles the second tap, the stale
cache, the trip through a tunnel, and the response that arrives after the user
has moved on.

## What to understand

- Where the truth is — the server, the cache, or optimistically the screen
- How old the data on screen is, and whether that matters here
- What the user sees while waiting, and whether waiting is necessary
- What is kept between launches, and what must not be
- What happens when the same data is requested twice at once

## Core topics

### Fetching

- A client layer that features call, rather than HTTP scattered through widgets
- Serialisation, and failing loudly on an unexpected shape
- Cancellation when the screen goes away
- Deduplicating identical in-flight requests
- Pagination, including the boring parts: end of list, refresh, insertion

### Caching

- Memory, disk, and their different lifetimes
- Staleness policies: fresh, stale-while-revalidate, cache-first
- Invalidation on write, and the two hard problems joke being true
- Cache keys that account for the user and the parameters
- Image caching, which is separate and usually already handled

### Local persistence

- Key–value for preferences, a database for anything queryable
- Migrations for local schemas — the same rules as the server, with worse failure modes
- Encryption for anything sensitive, and what the platform offers
- Size, and clearing up after yourself

### Offline

- Read-only offline versus full offline with a sync queue
- Conflict resolution, and choosing a rule rather than discovering one
- Telling the user what is not yet saved
- Retrying a queued write without duplicating its effect

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Calls an API, parses the response, shows loading and error states. |
| Middle | Builds a data layer with caching and pagination, persists locally, handles cancellation and duplicate requests. |
| Senior | Designs the whole data flow including staleness, invalidation and offline behaviour, and can say where truth lives at any moment. |

## Practice

### Starting out

- **Paginate properly**
  Add paging to a list, including the end of the list, pull to refresh, and
  errors mid-scroll.

- **Fail on a bad shape**
  Make parsing an unexpected response produce a clear error rather than a null
  three screens later.

- **Cancel on leave**
  Make an in-flight request stop mattering when the user navigates away.

### Going deeper

- **Stale while revalidate**
  Show cached data instantly, refresh in the background, and update without a
  flicker.

- **Queue an offline write**
  Let the user act with no network, and sync when it returns without duplicating.

- **Resolve a conflict**
  Have the same record edited on two devices and make the outcome deliberate.

## Check yourself

- Where does your app decide data is too old to show?
- What happens if the user taps a button twice quickly?
- Which data survives an app restart, and did you choose that?
- What does your app do when the response shape changes unexpectedly?
- How does a user know something has not been saved yet?
- If the same record is edited on two devices, which wins and why?

## Resources

- **[Networking and data](https://docs.flutter.dev/data-and-backend/networking)** —
  the official starting point for fetching and parsing, including background
  parsing.
- **[Persist data with SQLite](https://docs.flutter.dev/cookbook/persistence/sqlite)** —
  the local database path, and the cookbook entries around it for key–value and
  files.
- **[Drift](https://drift.simonbinder.eu/)** — a typed local database for Dart.
  Its documentation on migrations and reactive queries is the best treatment of
  local persistence in the ecosystem.
- **[Offline first](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation)** —
  MDN on offline strategies. Written for the web, but the caching policies and
  sync patterns transfer directly.
- **[Designing Data-Intensive Applications](https://dataintensive.net/)** — the
  chapter on replication and conflict resolution, which is the honest treatment
  of what happens when two devices disagree.
