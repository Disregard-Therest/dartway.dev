---
description: Database model organization, relation patterns, and Serverpod conventions
globs:
alwaysApply: true
---

## Code Generation

- Models are automatically generated from `.spy.yaml` files
- Relations are handled by Serverpod's code generation
- Use descriptive field names as they become part of the generated API
- Group related models in domain folders for better organization

## Best Practices

- Always use nullable types (`Type?`) for optional fields
- Use descriptive table names that match the class name (snake_case)
- Keep relation names consistent and descriptive
- Group related models in the same domain folder

## File Organization

All models are described with class_name.spy.yaml files located under project_name_server/lib/src/models folder.

Group files by domain area in order to avoid mess.

Examples:
- `models/user_profile/` - User-related models
- `models/feed/` - Post and comment models
- `models/notifications/` - Notification models
- `models/payments/` - Payment and billing models


## Relations

Fields with a model relations must be nullable (e.g. appPost: AppPost?)

### Bidirectional Relations

For bidirectional relations between models, use the following pattern:

**Parent side (one-to-many):**
- Use `List<ChildModel>?` field type
- Use `relation(name=relation_name)` syntax
- Example: `comments: List<PostComment>?, relation(name=post_comments)`

**Child side (many-to-one):**
- Use the actual parent model type (not ID)
- Use `relation(name=relation_name)` with the same name as parent
- Example: `appPost: AppPost, relation(name=post_comments)`

Both sides must use the same `relation_name` to establish the bidirectional connection.
