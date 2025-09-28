---
description: Guidelines for using DartWay Router in Flutter projects
alwaysApply: true
---

# Navigation Guidelines (DartWay Router)

These are the official rules for using **DartWay Router** in DartWay projects.
They apply to all frontend codebases built with Flutter.

---

## ✅ General Rules

* Always use **enum-based routes** — no string route names allowed.
* Each app must define its routes inside a `router/` folder:

  ```
  lib/
    router/
      app_router.dart
      zones/
        app_routes.dart
  ```
* Do not mix navigation logic with UI widgets — keep route definitions isolated.

---

## 📍 Route Definitions

* Define all routes as enums implementing `NavigationZoneRoute`.
* Use `SimpleNavigationRouteDescriptor` for static pages.
* Use `ParameterizedNavigationRouteDescriptor` for pages with path parameters.
* Every enum must implement:

  ```dart
  @override
  final NavigationRouteDescriptor descriptor;

  @override
  String get root => '';
  ```

---

## 🎯 Parameters

* All parameters must be defined as enums with `NavigationParamsMixin`.
* Do not use raw strings or maps for parameters.
* Example:

  ```dart
  enum AppParams with NavigationParamsMixin<int> {
    userId;
  }
  ```

---

## 🏗️ Router Initialization

* Always configure the router in a dedicated `app_router.dart` file.
* Use `DwRouter.config()` builder pattern to add zones and set defaults.
* Provide the router via Riverpod:

  ```dart
  final appRouterProvider = dwRouterStateProvider(
    DwRouter.config()
      .addNavigationZones(AppRoutes.values)
      .setInitialLocation(AppRoutes.home.routePath)
      .setPageFactory(DwPageBuilders.material)
      .build(),
  );
  ```
* Initialize `MaterialApp.router` with the router from `ref.watch(appRouterProvider)`.

---

## 🔄 Navigation Usage

* Always use **context extensions** (`context.goTo`, `context.pushTo`) — never call `router.go()` directly.
* When passing parameters:

  ```dart
  context.pushTo(
    AppRoutes.userDetail,
    pathParameters: AppParams.userId.set(123),
  );
  ```
* Access parameters in widgets only via `ref.watchNavigationParam(...)`.

---

## 🔀 Redirects & Guards

* Use `.setRedirect()` in `DwRouter.config()` to handle conditional navigation.
* Example:

  ```dart
  DwRouter.config()
    .addNavigationZones(AppRoutes.values)
    .setRedirect((context, currentRoute) {
      final isAuthenticated = ref.read(authProvider).isAuthenticated;
      if (!isAuthenticated && currentRoute == AppRoutes.profile) {
        return AppRoutes.home;
      }
      return null;
    });
  ```
* Do not scatter redirect logic across widgets — keep it centralized in router config.

---

## 🎨 UI Integration

* Use `DwBottomNavigationBar` for bottom navigation — do not reinvent it.
* All menu items must be created via `DwMenuItem` (icon or svg).
* For badges: use `NotificationBadge` or provide a custom widget.

---

## 🎭 Transitions

* Use built-in factories (`DwPageBuilders.material`, `.fade`, `.slide`, `.scale`) whenever possible.
* Custom transitions must be wrapped in a `CustomTransitionPage`.
* Keep transition duration ≤ 400ms.

---

## ⚡ Best Practices

* Keep navigation zones small and modular — each major app area should have its own enum.
* Place business logic outside navigation (no conditional checks in UI).
* Redirects and guards should be configured in the router builder, not scattered across widgets.
* Always set an initial location explicitly with `.setInitialLocation(...)`.
* Provide a `.setNotFoundPage(...)` to handle unknown routes gracefully.

---
