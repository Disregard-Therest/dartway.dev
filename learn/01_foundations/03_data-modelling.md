---
title: Data Modelling
description: Turning a domain into entities, relations and constraints that hold up
---

# Data Modelling

Describing what the product is actually about — the entities, how they relate,
and what must always be true of them. It happens before the schema and before
the API, and everything downstream inherits whatever you decide here.

**Why it matters.** A wrong model is the most expensive kind of mistake to fix,
because by the time it hurts there is production data shaped like it. Screens
can be redrawn in an afternoon; a relation that should have been many-to-many
cannot.

## What to understand

- What the real-world thing is, independent of the screen showing it
- Which relations are one-to-one, one-to-many, many-to-many — and which will change
- What must always be true, and where that rule is enforced
- What is stored versus what is derived
- Whether history matters, or only the current state

## Core topics

### Entities and relations

- Identifying entities from the domain, not from the UI
- Cardinality, and the cost of getting it wrong
- Join tables, and when a relation deserves its own entity because it carries data
- Optional versus required, and what null actually means here

### Constraints and invariants

Rules the data must satisfy, wherever they are enforced.

- Uniqueness, foreign keys, check constraints
- Rules the database can enforce versus rules only the application can
- Why enforcing in one place is better than validating in three

### Normalisation and its limits

- Removing duplication so a fact lives in one place
- Where denormalising is a deliberate performance decision
- Recognising a schema that has been denormalised by accident

### Change over time

- Migrations, and writing them so they can run against real data
- Soft deletes, audit trails, and event history
- Versioning a model that clients already depend on

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Adds fields and tables that work for the screen in front of them. |
| Middle | Models entities from the domain, gets cardinality right, and uses constraints rather than validation alone. |
| Senior | Anticipates how the model will need to change, keeps migrations safe on live data, and knows when to denormalise on purpose. |

## Practice

### Starting out

- **Model from the domain**
  Take a feature described in words and derive the entities before drawing any
  screen.

- **Fix a cardinality**
  Find a one-to-many that reality says should be many-to-many, and change it.

- **Add a real constraint**
  Move a rule currently checked in application code into the database.

### Going deeper

- **Write a migration that cannot lose data**
  Split a table or change a column type on data that already exists.

- **Model history**
  Change something that only stores current state into something that can answer
  "what did this look like last month".

- **Design for two consumers**
  Model an entity that a mobile app and an admin panel both use, without either
  distorting it.

## Check yourself

- How do you tell a real entity from a field that happens to be on a screen?
- What tells you a relation is about to need its own table?
- Which rules in your project are validated in code but not enforced in the database?
- How do you decide whether to store a value or compute it?
- When has a model change forced you to touch far more code than expected?
- How do you make a schema change safe on a table with a million rows?

## Resources

- **[Designing Data-Intensive Applications](https://dataintensive.net/)** —
  Martin Kleppmann's book, and the reference for how data models, storage and
  consistency actually interact. Chapter 2 alone repays the time.
- **[PostgreSQL: Data Definition](https://www.postgresql.org/docs/current/ddl.html)** —
  what a real database can enforce for you. Read the constraints chapter even if
  you never write SQL by hand.
- **[Patterns of Enterprise Application Architecture catalog](https://martinfowler.com/eaaCatalog/)** —
  the vocabulary for how objects and tables meet, from Active Record to Data
  Mapper. Free summaries of each pattern.
- **[Database normalization](https://en.wikipedia.org/wiki/Database_normalization)** —
  the plain reference for the normal forms. Worth reading once properly so you
  can tell deliberate denormalisation from an accident.
- **[Serverpod: database models](https://docs.serverpod.dev/concepts/database/models)** —
  how this looks in Dart specifically, including relations and generated code.
