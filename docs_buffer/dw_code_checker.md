---
id: code-checker
title: Dart Way Code Checker
description: Run project checks, list of supported rules, and CI/pre-commit integration
---

`Dart Way Code Checker` is a static analysis tool for Flutter projects.
It enforces Dart Way architectural and UI rules: feature isolation, UI Kit usage, file size limits, and more.

---

## Why a Code Checker?

Architecture is not just folder names — it’s discipline.
Dart Way aims to make **delivery predictable**, which requires that every developer on the team writes code in the same style, with the same rules, and without endless debates.

A human reviewer can miss a violation. A linter can’t.
The **Dart Way Code Checker** is our automated “architecture guardian”:

- It enforces **feature isolation** — no sneaky imports from another feature’s internals.
- It keeps **UI Kit centralized** — no raw `Color` or `TextStyle` scattered across code.
- It protects against **chaos creep** — overgrown files, misplaced folders, hardcoded text.

### Philosophy
- **Consistency over freedom.** The more freedom in architecture, the faster entropy grows. Checker reduces “personal opinions” and keeps everyone aligned.
- **Guardrails, not bureaucracy.** Developers don’t waste time arguing about imports or folder structures — the checker enforces rules automatically.
- **Focus on what matters.** Instead of policing code style in reviews, we focus on actual business logic and user experience.

> In short: the checker is not there to annoy you.
> It’s there to keep the codebase clean so you can move faster.

---

## Quick start

Add checker to your project
```yaml
dev_dependencies:
  dartway_code_checker:
    git: git@github.com:dartway/dartway_code_checker.git
```

Run:

```bash
dart run dartway_code_checker:check_flutter_app
```

* You will get a detailed summary by error type.

### Filters

```bash
# run a single rule
dart run dartway_code_checker:check_flutter_app --type forbiddenUiKitImport

# filter by severity
dart run dartway_code_checker:check_flutter_app --level error   # info|warning|error

# restrict check to a folder
dart run dartway_code_checker:check_flutter_app --dir lib/auth
```

Supported flags:

* `--type <DwFlutterCheckType>` — run only this rule
* `--level <info|warning|error>` — filter by severity
* `--dir <path>` — check only selected folder

By default the checker scans `lib/ui_kit` and root features in `lib/` starting with `app`, `auth`, `common`, `admin`.

---

## Rules catalog

### 1. `uiKitPartMissing` — missing `part of '../ui_kit.dart';` in `ui_kit` files

* **Severity:** `error`
* **Why:** all UI Kit files must be joined via `ui_kit.dart` with `part of` directive.
* **Fix:** add

  ```dart
  part of '../ui_kit.dart';
  ```

---

### 2. `uiKitContainsText` — hardcoded text in `ui_kit`

* **Severity:** `warning` (can be promoted to error)
* **Why:** UI Kit is generic — no hardcoded labels. Text should come from localization/constants.
* **Fix:** move strings to localization or pass them via widget params.

---

### 3. `invalidFeatureStructure` — invalid feature folder structure

* **Severity:** `error`
* **Rule:**

  * Feature root must contain **only one Dart file** (feature entry).
  * Allowed subfolders: `widgets`, `logic`.
* **Fix:** keep structure like:

  ```
  lib/<feature>/
    <feature>.dart
    widgets/
    state/
  ```

---

### 4. `fileTooLong` — file exceeds max length

* **Severity:** `warning` (or error if enforced)
* **Threshold:** > 150 lines.
* **Why:** long files reduce readability and maintainability.
* **Fix:** split into smaller widgets/providers/helpers.

---

### 5. `forbiddenUiUsage` — forbidden UI API outside UI Kit

* **Severity:** `error`
* **Forbidden:**

  * `Color(`, `TextStyle(`, `BorderRadius.`
  * `context.textTheme`, `context.colorTheme`, `context.colorScheme`
* **Why:** styles must be centralized in UI Kit.
* **Fix:** move to UI Kit and use its API.

---

### 6. `forbiddenUiKitImport` — importing UI Kit internals directly

* **Severity:** `error`
* **Rule:** no `import '.../ui_kit/<file>'` except `ui_kit.dart`.
* **Fix:**

  ```dart
  import 'package:<pkg>/ui_kit/ui_kit.dart';
  ```

---

### 7. `forbiddenFeatureImport` — importing `widgets/logic` of another feature

* **Severity:** `error`
* **Rule:** features must only import **public entry file** of another feature.
* **Fix:**

  ```dart
  import 'package:myapp/auth/auth.dart';  // ✅
  import 'package:myapp/auth/widgets/login_form.dart'; // ❌
  ```

> Generated files (`*.g.dart`, `*.freezed.dart`) are ignored.

---

## Example output

```
Checking for {uiKitPartMissing, forbiddenUiKitImport, ...}

❌ Found 4 violations:

- [ERROR] forbiddenUiKitImport: lib/profile/widgets/card.dart imports ui_kit/button.dart
- [ERROR] invalidFeatureStructure: lib/profile contains disallowed folder: services
- [WARNING] uiKitContainsText: lib/ui_kit/atoms/label.dart has hardcoded text "Buy now"
- [WARNING] fileTooLong: lib/auth/widgets/login_form.dart — 231 lines (> 150)

📊 Error stats:
• [ERROR] forbiddenUiKitImport — 1
• [ERROR] invalidFeatureStructure — 1
• [WARNING] uiKitContainsText — 1
• [WARNING] fileTooLong — 1

🔴 Total errors: 4
```

* No violations → `✅ Flutter Project passed all the checks`
* Violations → process exits with `1`.

---

## Integration

### Pre-commit hook

`.git/hooks/pre-commit`:

```bash
#!/usr/bin/env bash
set -e
echo "🔍 Dart Way check..."
dart run tool/dw_check.dart --level error
```

### GitHub Actions

`.github/workflows/dw-check.yml`:

```yaml
name: Dart Way Check
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          channel: stable
      - run: flutter pub get
      - run: dart run dartway_code_checker:check_flutter_app
```

### VS Code task

`.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Dart Way: Check",
      "type": "shell",
      "command": "dart run dartway_code_checker:check_flutter_app",
      "group": "build"
    }
  ]
}
```

---

## Best practices

* Decide severity policy: warnings vs errors.
* Run `--level error` in CI, but allow `--level warning` locally.
* Keep rules strict: they reflect Dart Way architecture.
