---
id: project-creation
# title: Quick Start2
description: Create your first Dart Way project in minutes
---

# Project Creation

This guide will take you from an empty folder to a running **Flutter + Serverpod app** with Dart Way.

---

## 1. Create a Serverpod project

Follow [Serverpod guide](https://docs.serverpod.dev/), or run:

```bash
serverpod create myapp
````

You’ll get 3 packages:

```
myapp_client/
myapp_flutter/
myapp_server/
```

Also, make sure Docker is running — Serverpod needs PostgreSQL and Redis.

---

## 2. Add Dart Way dependencies

### Client package (`myapp_client/pubspec.yaml`)

```yaml
dependencies:
  dartway_auth_serverpod_client:
    git:
      url: git@github.com:dartway/dartway_auth_serverpod.git
      path: dartway_auth_serverpod_client
  dartway_core_serverpod_client:
    git:
      url: git@github.com:dartway/dartway_core_serverpod.git
      path: dartway_core_serverpod_client
```

### Flutter package (`myapp_flutter/pubspec.yaml`)

```yaml
dependencies:
  dartway_app:
    git:
      url: git@github.com:dartway/dartway_app.git

  dartway_auth_serverpod_client:
    git:
      url: git@github.com:dartway/dartway_auth_serverpod.git
      path: dartway_auth_serverpod_client

  dartway_core_serverpod_flutter:
    git:
      url: git@github.com:dartway/dartway_core_serverpod.git
      path: dartway_core_serverpod_flutter
```

### Server package (`myapp_server/pubspec.yaml`)

```yaml
dependencies:
  dartway_core_serverpod_server:
    git:
      url: git@github.com:dartway/dartway_core_serverpod.git
      path: dartway_core_serverpod_server

  dartway_auth_serverpod_server:
    git:
      url: git@github.com:dartway/dartway_auth_serverpod.git
      path: dartway_auth_serverpod_server
```

Run `flutter pub get` in each package.

---

## 3. Define your first model

Add `/myapp_server/lib/src/protocol/user_profile.yaml`:

```yaml
class: UserProfile
table: user_profile
fields:
  userId: int
  firstName: String
  phone: String
```

Then generate code:

```bash
cd myapp_server
dart run serverpod generate
```

Now `UserProfile` exists both on server and in Flutter client.

---

## 4. Initialize Dart Way in Flutter

Replace `main.dart` in `myapp_flutter/lib/`:

```dart
void main() async {
  DwApp(
    title: 'MyApp',
    routerProvider: appRouterProvider,
    dwConfig: DwConfig(
      defaultModelGetter: DwRepository.getDefault,
    ),
    appInitializers: [
      (ref) async => ref.initDartwayServerpodApp<UserProfile>(
            client: AppCore.initServerpodClient(
              kDebugMode
                  ? (!kIsWeb && Platform.isAndroid
                      ? 'http://10.0.2.2:8080/'
                      : 'http://localhost:8080/')
                  : dw.services.dotEnv.get('BACKEND_URL'),
            ),
            initRepositoryFunction: DefaultModels.initRepository,
            userIdMode: UserIdMode.userProfileId,
          ),
    ],
  ).run();
}
```

---

## 5. Setup default models

Create `lib/core/default_models.dart`:

```dart
import 'package:dartway_core_serverpod_flutter/dartway_core_serverpod_flutter.dart';
import 'package:myapp_client/myapp_client.dart';

class DefaultModels {
  static initRepository() {
    DwRepository.setupRepository(
      defaultModel: UserProfile(
        id: DwRepository.mockModelId,
        userId: DwRepository.mockModelId,
        firstName: 'Niclaus',
        phone: '79123912012',
      ),
    );
  }
}
```

This provides default `UserProfile` for skeletons while real data loads.

---

## 6. Run it 🚀

Start server:

```bash
cd myapp_server
dart run bin/main.dart
```

Run Flutter app:

```bash
cd ../myapp_flutter
flutter run
```

You now have a working **full-stack Dart app** with Dart Way.

---

<!-- 👉 Next: explore **[UI Patterns → InfiniteListView](/docs/framework/ui/infinite-list-view)** and data filters to build real features. -->
