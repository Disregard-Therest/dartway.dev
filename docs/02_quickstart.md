---
id: quick-start
title: Quick Start
description: Spin up your first Dart Way project in minutes
---

# Quick Start

Spin up your first **Dart Way project** in minutes.

---

## 1. Clone the project template

```bash
git clone https://github.com/dartway/dartway_project_template myapp
cd myapp
```

## 2. Rename the project

Dart Way template comes with a rename.dart script.
It replaces all project_name_* identifiers with your project name.

```bash
dart run scripts/rename.dart myapp
```

:::warning
Script breaks with file locks sometime. Just launch it once again. And again if needed. Until it finishes without any errors.
:::
:::warning
IDE may show many errors - just because dependencies between flutter, client and server packages don't see updated filenames immediately, should be fine after pub get.
:::

## 3. Install dependencies

```bash
cd myapp_server && dart pub get
cd ../myapp_client && dart pub get
cd ../myapp_flutter && flutter pub get
```

## 4. Setup database and launch server

```bash
cd ../myapp_server
dart pub global activate serverpod_cli 2.9.1
serverpod create-migration

```

## To be continued soon...