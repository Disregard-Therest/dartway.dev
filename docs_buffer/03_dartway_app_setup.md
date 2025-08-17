# DartWay App Setup

This guide covers key steps for project creation and configuration before any real work could be done.

## Project creation and dependencies

### Create new Serverpod project
You can use official guide from their docs - https://docs.serverpod.dev/

Things you actually need to proceed:
- 3 folders with myapp_client (Client package), myapp_flutter (Flutter package) and myapp_server (Server package) packages
- Docker containers running on your local machine

### Add DartWay dependencies

First of all you need to add Dart Way dependencies to all three packages. Examples below suppose that you need dartwa_core and dartway_auth functionality


For your Client package add to pubspec.yaml:
```yaml
  dartway_auth_serverpod_client:
    git:
      url: git@github.com:dartway/dartway_auth_serverpod.git
      path: dartway_auth_serverpod_client

  dartway_core_serverpod_client:
    git:
      url: git@github.com:dartway/dartway_core_serverpod.git
      path: dartway_core_serverpod_client
```

For your Flutter project add to pubspec.yaml:

```yaml
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

For your Server package add to pubspec.yaml

```yaml
  dartway_core_serverpod_server:
    git:
      url: git@github.com:dartway/dartway_core_serverpod.git
      path: dartway_core_serverpod_server
  dartway_auth_serverpod_server:
    git:
      url: git@github.com:dartway/dartway_auth_serverpod.git
      path: dartway_auth_serverpod_server
```

## Setting up your Flutter app

### Add Dart Way initialization code

In your Flutter package change your main.dart content to the following:

```dart
void main() async {
  DwApp(
    title: 'Your App Name',
    routerProvider: appRouterProvider,
    dwConfig: DwConfig(
      defaultModelGetter: DwRepository.getDefault,
    ),
    // flutterAppOptions: DwFlutterAppOptions(
    //   theme: appLightTheme,
    // ),
    appInitializers: [
      (ref) async => ref.initDartwayServerpodApp<UserProfile>(
            client: AppCore.initServerpodClient(
              kDebugMode
                  ? //
                  !kIsWeb && Platform.isAndroid
                      ? 'http://10.0.2.2:8080/'
                      : 'http://localhost:8080/'
                  : dw.services.dotEnv.get('BACKEND_URL'),
            ),
            initRepositoryFunction: DefaultModels.initRepository,
            userIdMode: UserIdMode.userProfileId,
          ),
    ],
  ).run();
}
```

In this code you will have 4 Undefined names:
1) appRouterProvider -
1) UserProfile - class used for managing all user related information
1) AppCore.initServerpodClient - method for initialization a Serverpod Client
1) DefaultModels.initRepository - method for Data layer initialization providing all Model Classes and their default loading instances


### Initializing Serverpod Client

The Serverpod Client - is the central class for accessing all methods of your server. We suggest to initialize it with AppCore.initServerpodClient method.

> Why can't we ... put client initialization into the Dart Way packages?
> - it's impossible, because it should have the exact type of your client generated in your Client package. And you might need access to it directly for the cases when you write your custom endpoints - which is 100% fine.


### Default Models

Dart Way is built around generic Data layer - so that you can easily call get, delete and save methods for various classes inside your project and all Data and API logic would be handled for you.

For various reasons it's not possible to setup these mechanisms without preliminary initialization. So, you need to setup it manually.
Create a separate file (we recommend /lib/core/default_models.dart) with the following contents:
```dart
import 'package:dartway_core_serverpod_flutter/dartway_core_serverpod_flutter.dart';
import 'package:myapp_client/myapp_client.dart';

class DefaultModels {
  static initRepository() {
    DwRepository.setupRepository(
      defaultModel: UserProfile(
        id: DwRepository.mockModelId,
        userId: DwRepository.mockModelId,
        firstName: 'Niclaus', // String length affects shown shimmers size
        phone: '79123912012', // String length affects shown shimmers size
      ),
    );
  }
}
```

This function is passed as a parameter for ref.initDartwayServerpodApp call in your main.dart and is required for:
- Setting up DwRepository (Data layer) for UserProfile class
- Setting up default UserProfile model for UI skeletons on loading states

Later on you should add all new model classes to this file in the same manner.

### Creating your UserProfile model
 we request it as a parameter in order to integrate it seamnlessly into session management but keep it mostly open and extendable for you