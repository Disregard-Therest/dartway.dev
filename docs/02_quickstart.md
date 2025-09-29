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
git clone https://github.com/dartway/dartway_project_template.git my_new_project
cd my_new_project
```

:::warning
Delete .git folder manually or with **rm -rf .git** command - it's important to have clear git history
:::

## 2. Prepare the project files

```bash
dart run dartway/scripts/init_project.dart my_new_project
```

:::warning
Call this script before opening the folder in your IDE in order to avoid file locks
:::

## 3. Open project & install dependencies

Open the project folder in IDE of you choice and run pub get in every folder

```bash
cd my_new_project_server && dart pub get
cd ../my_new_project_client && dart pub get
cd ../my_new_project_flutter && flutter pub get
```

## 4. Setup database and launch server

```bash
cd ../myapp_server
dart pub global activate serverpod_cli 2.9.1
serverpod generate
serverpod create-migration
docker compose up -d
```

## 5. Launch your server

For VS Code we provide ready to go debug configurations for Server & Flutter apps

Or you can launch manually from Terminal
```bash
dart run bin/main.dart --apply-migrations
```

![First launch Server logs](/img/server_first_launch_logs.png)

## That's all!!!
You have server running and can launch the flutter app connected to it

The app includes
- phone auth
- basic scaffold
- simple profile editing
- post feed