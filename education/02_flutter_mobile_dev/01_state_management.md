---
title: State Management
slug: /flutter-mobile-dev/state-management
description: Practical state management skills for Flutter mobile developers
---

# State Management

State management is the management of application state while the app is running.

State is data that:

- changes over time
- affects the UI
- participates in logic

Examples:

- form state
- loaded data
- current steps in user flows

## How To Think

It is important not only to store data, but to understand:

- where state should live
- who changes it and how
- how the UI reacts to changes
- what should be stored and what should be computed
- how to avoid mixing UI, business logic, and server data into one pile

## Types Of State

### Local State

Lives inside one widget or a small part of the UI.

Examples:

- whether a dropdown is open
- selected tab
- checkbox state
- local text input

### Feature State

Responsible for the logic of one part of the application.

Examples:

- authentication
- chat
- catalog
- filters and data list

### Global State

Used across the whole application.

Examples:

- current user
- theme
- language
- app settings

### Separate State Types

Some scenarios are useful to consider separately:

- server data
- forms
- navigation

## Practice

### Basic Level

- **Form with validation**  
  Build a form with data input, value validation, and error display.

- **List with data loading**  
  Build a screen with a data list and loading / empty / error states.

- **Filters**  
  Build filters for a list, for example by category or status, with UI updates.

### Advanced Level

- **Authentication**  
  Build registration, login, password recovery, and user state management.

- **Multi-step form**  
  Build a form with several steps, async validation, and dependent fields.

- **Chat**  
  Build a message list with pagination, position preservation, and updates when new messages arrive.

## Reflection Questions

- How do you usually understand that state has become too large or inconvenient?
- In what situations is it easier for you to keep everything local, even if it could be moved higher?
- When filters start spreading across the application, how do you decide where they should live?
- Have you had situations where a state change caused unexpected UI behavior? How did you catch it?
- When working with server data becomes more complex, what do you change in your approach?
- How do you usually simplify state when it becomes confusing?
