---
title: Authentication and Authorization
description: Proving who someone is, and deciding what they may do — in one place
---

# Authentication and Authorization

Two separate problems that get discussed as one. Authentication establishes who
is calling. Authorization decides what that caller may do. Confusing them is how
an app ends up hiding a button and leaving the endpoint open.

**Why it matters.** This is the area where a mistake is not a bug but an
incident. And the failure is silent: nothing crashes when a user can read
another user's data, so nobody notices until someone does.

## What to understand

- Who this request is from, and how confident the server is about that
- Where the decision is made — and that it must be the server
- What a token proves, for how long, and what revoking it actually does
- Which resources belong to whom, and where ownership is checked
- What happens when a session ends while the app is open

## Core topics

### Authentication

- Passwords, and hashing them with an algorithm designed for it
- Passwordless: one-time codes over phone or email
- Social and OAuth providers, and what you are trusting
- Sessions versus tokens, and where each is stored on a device
- Refresh, expiry, and revocation that takes effect immediately

### Authorization

- Roles, permissions, and where they are evaluated
- Ownership: this row belongs to this user, checked on every access
- Scope on read, not only on write — filtering lists by what the caller may see
- Field-level rules, where some callers see fewer columns
- Denying by default, so a new endpoint is closed until opened

### Getting it wrong

- Checking in the UI and not on the server
- An id in a request that nobody verified belongs to the caller
- Tokens in logs, in analytics, in crash reports
- Rules duplicated in three places and disagreeing after a change

### Around it

- Rate limiting and lockout on authentication endpoints
- Multi-factor, and where it belongs in the flow
- Account deletion and data export as requirements, not features

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Implements login and stores a token. Follows the existing pattern for protected calls. |
| Middle | Separates authentication from authorization, checks ownership on the server, handles expiry and refresh cleanly. |
| Senior | Designs the rules so they exist in one place and are enforced by default. Reasons about revocation, escalation and what an attacker would try. |

## Practice

### Starting out

- **Attack your own endpoint**
  Call a protected endpoint with another user's id and see what happens.

- **Handle expiry**
  Make the app behave correctly when a token expires mid-session, without a
  crash or a loop.

- **Find the leaks**
  Search your logs and analytics for tokens, and remove them.

### Going deeper

- **Centralise the rules**
  Take an ownership check duplicated in several endpoints and enforce it in one
  place.

- **Filter reads by permission**
  Make a list endpoint return only what the caller may see, at the query level.

- **Revoke immediately**
  Make signing out on one device end that session everywhere it should, at once.

## Check yourself

- Which of your endpoints would return data if called with someone else's id?
- Where is each authorization rule enforced, and is it more than one place?
- What happens to an open app the moment its account is disabled?
- How are your passwords hashed, and with what parameters?
- Which rules exist only in the UI?
- What could an attacker read from your logs?

## Resources

- **[OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)** —
  the practical checklist. Concrete requirements rather than principles, and it
  is the thing to check your implementation against.
- **[OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)** —
  which algorithm, which parameters, updated as they change. Do not reason about
  this from memory.
- **[OAuth 2.0](https://oauth.net/2/)** — the specifications and, more usefully,
  the current best-practice documents on which flows to use and which are
  deprecated.
- **[Introduction to JSON Web Tokens](https://jwt.io/introduction)** — what a JWT
  is and is not. Particularly the part about why "stateless" makes revocation
  hard.
- **[Serverpod: authentication](https://docs.serverpod.dev/concepts/authentication)** —
  how sessions, scopes and revocation work in a Dart backend.
