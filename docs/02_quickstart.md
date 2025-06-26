# Quickstart

## 🚀 Setting up your first Dart Way App

Our main goal is to handle all technical issues so that you only need to worry about the real logic and UI.
Simplest version looks like this.

```dart
  DwApp(
    title: 'Your Dart Way App',
    routerProvider: appRouterProvider,
    dwConfig: DwConfig(
      defaultModelGetter: DwRepository.getDefault,
    ),
    flutterAppOptions: DwFlutterAppOptions(
      theme: appLightTheme,
    ),
    appInitializers: [
      (_) async {
        AppCore.initServerpodClient(
          await dotenv.load().then((_) => dotenv.get('BACKEND_URL')),
        );
        return true;
      },
      (ref) => ref.initDartwayServerpodApp<UserProfile>(
            client: AppCore.serverpodClient,
            initRepositoryFunction: DefaultModels.initRepository,
            userIdMode: UserIdMode.userProfileId,
          ),
    ],
  ).run();
```

All DartWay classes start with Dw which helps you to find needed classes fast.

The example above looks a bit complicated but here is what it covers for you:
1. MaterialApp.router initialization with appRouterProvider and auto rebuild for redirects
2. Native splash screen preserved untill all initializers are successfully finished
3. Carefully managed connection with Serverpod backend
4. User session management
5. Realtime sockets update
6. Default models and auto-skeleton for all your pages
