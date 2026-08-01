---
title: Security
description: Assuming the client is hostile, and protecting what actually matters
---

# Security

Protecting user data and the system holding it, across a client you do not
control, a network you do not own, and a server everyone can reach.

**Why it matters.** Security failures do not degrade the product, they end
conversations — with users, with partners, with regulators. And the common
failures are not exotic: a key in the bundle, a check only in the UI, a token in
a log.

## What to understand

- What is actually worth protecting here, and from whom
- What an attacker with the app installed can see and change — which is everything
- Where each rule is enforced, and whether the client could bypass it
- What is stored on the device, and what that means if it is lost
- What you would do in the first hour of a breach

## Core topics

### The client is not trusted

- Anything shipped can be read: strings, keys, endpoints, logic
- Rooted and jailbroken devices, emulators, and modified builds
- Obfuscation as friction, not protection
- Client-side validation for helpfulness, server-side for safety

### Storing on a device

- Keychain and Keystore for secrets, not shared preferences
- What survives an uninstall, and what backs up to the cloud
- Caches and screenshots as leaks
- Biometric gates, and what they actually prove

### In transit

- TLS everywhere, and certificate validation left alone
- Pinning: what it buys, and the operational cost when a certificate rotates
- Tokens out of URLs, out of logs, out of crash reports

### On the server

- Authorization on every request, denying by default
- Injection, and parameterised queries as the whole answer
- Rate limiting and abuse protection
- Dependencies with known vulnerabilities, checked automatically
- Secrets in a secret manager, rotated, never in the repository

### Privacy and obligation

- Collecting less as the strongest protection
- Consent, retention and deletion as product requirements
- Store privacy declarations matching what the app does
- Incident response: who is told, how fast

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uses HTTPS, stores tokens in secure storage, does not commit secrets. |
| Middle | Enforces authorization server-side, handles secrets per environment, keeps dependencies patched, avoids leaking data into logs. |
| Senior | Threat-models features, designs for a hostile client, minimises collected data, and has an incident response people have rehearsed. |

## Practice

### Starting out

- **Read your own bundle**
  Extract strings from a release build and find what should not be there.

- **Move a secret**
  Find something sensitive in shared preferences and move it to secure storage.

- **Scan dependencies**
  Run a vulnerability check and deal with what it finds.

### Going deeper

- **Bypass your own client**
  Call your API directly, skipping the app, and find what it lets you do.

- **Threat-model a feature**
  Take one feature and enumerate what an attacker would try, then close the gaps.

- **Collect less**
  Find data you collect and do not use, and stop collecting it.

## Check yourself

- What could someone learn by decompiling your app?
- Which rules are enforced only in the UI?
- What sensitive data is on the device, and how is it protected?
- Where do your secrets live in each environment, and who can read them?
- When did you last update a dependency for a security fix?
- What would you do in the first hour after discovering a breach?

## Resources

- **[OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)** — the
  ranked list of what actually goes wrong in mobile apps. The right place to
  start, because it is ordered by real frequency.
- **[OWASP Mobile Application Security Testing Guide](https://mas.owasp.org/MASTG/)** —
  the deep version: concrete tests for storage, cryptography, network and
  platform interaction on both platforms.
- **[OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)** — short,
  specific guidance per topic. Authentication, password storage, and file upload
  are the ones to read first.
- **[Obfuscating Dart code](https://docs.flutter.dev/deployment/obfuscate)** —
  what Flutter's obfuscation does and does not do, and how it interacts with
  crash symbolication.
- **[Android and iOS security documentation](https://developer.android.com/privacy-and-security/security-tips)** —
  platform-specific storage and transport guidance, which is what a security
  review will check against.
