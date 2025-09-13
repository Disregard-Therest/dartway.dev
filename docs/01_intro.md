# Welcome to Dart Way

**Dart Way** — full-stack Dart framework on **Flutter + Serverpod**.
Ship real products faster, cleaner, and with minimal boilerplate.

* 🚀 Build 3–5× faster (typed data layer, ready patterns, fewer layers)
* 🧱 Feature-first modules, predictable delivery
* 🔒 CRUD pipeline with access rules, validation, triggers
* 🔌 Realtime (WebSocket) + built-in loading skeletons & error UX
* 💬 Community: https://t.me/dartway_dev

---

## Show me the code

### 1) UI without state boilerplate

Typed, paginated data straight in widgets. Skeletons & errors handled automatically.

```dart
final posts = ref.watchEntityListAsync<Post>(
  backendFilter: DwBackendFilter.and([
    PostFilter.authorId.equals(currentUserId),
    PostFilter.publishedAt.greaterThan(DateTime(2025, 1, 1)),
  ]),
  sortBy: [PostSort.publishedAt.desc()],
);

return posts.dwWhenList(
  loadingItemsCount: 6,
  childBuilder: (items) => ListView.builder(
    itemCount: items.length,
    itemBuilder: (_, i) => ListTile(
      title: Text(items[i].title),
      subtitle: Text(items[i].publishedAt?.toIso8601String() ?? 'Draft'),
    ),
  ),
);
```

---

### 2) Typed filters via enums

Instead of raw strings or ad-hoc queries you declare filters once,
then use them everywhere — safe and autocompletable.

```dart
// lib/filters/post_filter.dart
enum PostFilter<T> with DwFilterMixin<T> {
  authorId<int>,
  publishedAt<DateTime>,
  slug<String>,
}
```

Usage:

```dart
DwBackendFilter.and([
  PostFilter.authorId.equals(currentUserId),
  PostFilter.publishedAt.lessOrEqual(DateTime.now()),
]);
```

---

### 3) One-line saves from UI

Generic repo handles persistence — no DTO glue or boilerplate.

```dart
await ref.saveModel(
  Post(
    title: 'Hello, Dart Way',
    body: 'Minimal code, maximal progress.',
    authorId: currentUserId,
    publishedAt: DateTime.now(),
  ),
);
```

---

### 4) Backend rules as a pipeline

Access rules → validation → preprocessing → side-effects.
All executed in the right order and properly logged.

```dart
final postInsert = InsertConfig<Post>(
  allowInsert: (session, post) async =>
      session.authenticated && session.userId == post.authorId,
  insertValidation: (session, post) {
    if (post.title.isEmpty) throw ValidationException('Title is required');
  },
  beforeInsertPreProcessing: (session, post) async {
    post.slug = Slugify.create(post.title);
  },
  afterInsertSideEffects: (session, post) async {
    await Realtime.push('posts:new', post);
  },
);

Future<Post> createPost(Session session, Post input) =>
    insertWithConfig(session, input, postInsert);
```

---

### 5) Define once, get full stack

Model in Serverpod → typed code on client + server.

```yaml
# server: lib/src/protocol/post.yaml
class: Post
table: post
fields:
  authorId: int
  title: String
  body: String?
  slug: String?
  publishedAt: DateTime?
```

Then:

```bash
serverpod generate
```

Then init it Flutter:
```dart
# flutter: lib/core/default_models.dart
    DwRepository.setupRepository(
      // Used for Skeletons
      defaultModel: Post(
        id: DwRepository.mockModelId,
        userId: DwRepository.mockModelId,
        title: 'My Default Post',
        body: 'Very interesting text on Flutter development',
        slug: 'my-default-post',
        publishedAt: DateTime(2025, 6, 1),
      ),
    );
```

Now `Post` exists both in Flutter and server code, ready for `DwRepository`.

---

## Why teams pick Dart Way

* **Less code, fewer layers.** No hand-rolled repos or state glue.
* **Predictable delivery.** CRUD pipeline makes rules explicit and testable.
* **Full-stack Dart.** One language across UI, backend, and models.

👉 Next: **[Quick Start →](/docs/Quickstart/quick-start)** to set up a project and see it working.

---
