# 0001: Application architecture

Status: Proposed

## Context

The application needs local data ownership and a portable desktop-first architecture.

## Decision

Use a React client, Tauri runtime, portable Rust core, and SQLite. Keep platform-specific code behind adapters.

## Alternatives

Electron, Flutter, or separate native applications.

## Consequences

Shared application logic and UI, with explicit WebView and native-platform verification required.
