---
title: Static Analysis and Linting
description: Letting the analyzer enforce what people otherwise repeat in review
---

# Static Analysis and Linting

Rules the compiler and analyzer check on every keystroke, so mistakes are caught
before a person has to notice them. In Dart this is the analyzer, a lint set, and
whatever custom rules a project needs.

**Why it matters.** Every rule a tool enforces is a rule nobody has to remember,
argue about, or catch in review. It is the cheapest quality mechanism available,
and the one most projects leave at its default setting for years.

## What to understand

- What the analyzer already knows that you are ignoring
- Which rules prevent bugs, and which only enforce taste
- What a warning you have learned to scroll past is costing
- Where a project-specific rule would replace a recurring review comment
- Why an ignore comment exists, and whether it should still

## Core topics

### The analyzer

- `analysis_options.yaml`, and that the default is a starting point
- Errors, warnings and infos, and promoting the ones that matter
- Strict modes: `strict-casts`, `strict-inference`, `strict-raw-types`
- Excluding generated code without excluding your own

### Lint rules

- The published sets, and where they stop
- Rules that catch real bugs — unawaited futures, missing cases, unrelated equality
- Rules that enforce style, and settling them once
- Enabling incrementally on an existing codebase rather than drowning in warnings

### Beyond the defaults

- Custom lint rules for project conventions
- Architectural rules: which layer may import which
- Dependency and licence checking
- Dead code and unused dependency detection

### Making it stick

- Failing the build on analyzer issues, so warnings cannot accumulate
- Pre-commit hooks for fast checks
- Formatting as a non-negotiable, applied automatically
- Reviewing every `// ignore:` periodically

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Fixes analyzer warnings, runs the formatter, follows the configured rules. |
| Middle | Configures rule sets, enables strict modes, keeps the codebase warning-free and gates CI on it. |
| Senior | Encodes team conventions and architectural boundaries as rules, and adopts them incrementally without stopping the project. |

## Practice

### Starting out

- **Get to zero**
  Clear every analyzer warning in the project, and fail the build if one returns.

- **Turn on a strict mode**
  Enable `strict-casts` and fix the fallout.

- **Audit the ignores**
  List every `// ignore:` and decide whether each is still justified.

### Going deeper

- **Encode a review comment**
  Find something reviewers keep saying and make it a lint rule.

- **Enforce a boundary**
  Add a rule that fails the build when a layer imports something it must not.

- **Adopt a stricter set**
  Move to a stricter lint package on an existing codebase without a thousand-file
  commit.

## Check yourself

- How many analyzer warnings does your project have right now?
- Which lint rules are you running, and did anyone choose them?
- What comment do reviewers on your team repeat most, and could a tool make it?
- What does an `// ignore:` in your codebase usually mean?
- Does your CI fail on analyzer issues, or only on failing tests?
- Which architectural rule in your project exists only in people's heads?

## Resources

- **[Customizing static analysis](https://dart.dev/tools/analysis)** — the full
  reference for `analysis_options.yaml`, including the strict modes that are off
  by default and worth turning on.
- **[Dart linter rules](https://dart.dev/tools/linter-rules)** — every rule with
  its rationale. Read once end to end; there are more useful ones than any
  default set enables.
- **[package:very_good_analysis](https://pub.dev/packages/very_good_analysis)** —
  a stricter published rule set, and a reasonable target to move an existing
  project toward.
- **[custom_lint](https://pub.dev/packages/custom_lint)** — writing project-specific
  rules in Dart. The mechanism for turning your conventions into errors.
- **[Effective Dart](https://dart.dev/effective-dart)** — the reasoning behind
  most of the rules. Useful when deciding whether a rule is worth its friction.
