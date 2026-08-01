---
title: Databases and Migrations
description: Querying efficiently, and changing a schema that already holds real data
---

# Databases and Migrations

Getting data in and out of a relational database without surprises, and changing
its shape once production is full of rows that assume the old one.

**Why it matters.** The database is the one part of the system that remembers.
A bad query degrades gradually until it does not; a bad migration takes the
service down at the moment it runs, on the largest table, with everyone watching.

## What to understand

- What the query actually does, rather than what the ORM implies
- Which column is doing the filtering, and whether it is indexed
- How many queries one screen causes
- What a migration does to a table that is being written to right now
- Which guarantees you get from a transaction, and which you assumed

## Core topics

### Querying

- Filtering, joining and aggregating, and where each is done — database or app
- The N+1 problem, and recognising it before the row count grows
- Eager versus lazy loading, and paying for what you use
- Reading a query plan well enough to see a sequential scan

### Indexes

- What an index costs on write and saves on read
- Composite indexes and why column order matters
- Indexes that are never used, and finding them
- Uniqueness as a constraint rather than a check in code

### Transactions

- Atomicity in practice: what rolls back and what does not
- Isolation levels, briefly, and the anomalies each permits
- Deadlocks, and keeping transactions short
- Work that must not happen inside a transaction — sending mail, calling an API

### Migrations

- Forward-only, and treating rollback as a new migration
- Additive first: add, backfill, switch, remove — across separate deploys
- Long-running migrations on large tables, and locking
- Keeping migrations reproducible from an empty database

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Writes queries that return the right rows. Runs migrations the tooling generates. |
| Middle | Spots N+1, adds indexes for real access patterns, keeps transactions correct and short. |
| Senior | Reads query plans, designs multi-step migrations that are safe on live data, and knows which work belongs in the database. |

## Practice

### Starting out

- **Count the queries**
  Log every query one screen makes. Explain each, and remove the ones you cannot.

- **Fix an N+1**
  Find a loop issuing a query per item and replace it with one query.

- **Add an index that matters**
  Find a slow filter, add the index, and measure before and after.

### Going deeper

- **Read a plan**
  Run `EXPLAIN ANALYZE` on your slowest query and explain each line.

- **Migrate in steps**
  Rename a column across several deploys without breaking the running app.

- **Backfill safely**
  Populate a new column across a large table in batches, without locking it.

## Check yourself

- Which query in your app is the slowest, and how do you know?
- Which of your indexes have never been used?
- What does your longest transaction hold open, and for how long?
- Which migration in your history would fail on a table with ten million rows?
- What happens if a migration fails halfway through?
- Where are you doing work in the app that the database would do faster?

## Resources

- **[Use The Index, Luke](https://use-the-index-luke.com/)** — a full free book on
  indexing for developers rather than DBAs. The single highest-return thing to
  read on this list.
- **[PostgreSQL documentation](https://www.postgresql.org/docs/current/)** — the
  chapters on indexes, transaction isolation and `EXPLAIN`. Unusually well
  written for a reference manual.
- **[Designing Data-Intensive Applications](https://dataintensive.net/)** —
  Kleppmann on what storage engines and transactions actually guarantee, and
  where distributed systems break the assumptions.
- **[Serverpod: database migrations](https://docs.serverpod.dev/concepts/database/migrations)** —
  how migrations are generated and applied in a Dart backend, including the
  repair flow when they diverge.
- **[Strong Migrations](https://github.com/ankane/strong_migrations)** — written
  for Rails, but its list of unsafe operations and their safe alternatives is
  database knowledge, not framework knowledge.
