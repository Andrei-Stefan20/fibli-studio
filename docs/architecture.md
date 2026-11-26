# Architecture

Status: foundation implemented. The React client and portable Rust workspace are initialized. The Tauri desktop host is initialized. The initial native bridge is implemented through shared contracts and browser/native platform adapters. Application services remain to be implemented.

## Repository layout

| Path | Responsibility |
| --- | --- |
| `apps/client` | Application composition, routes, feature modules, native entry point |
| `apps/storybook` | Shared component catalog and examples |
| `packages/tokens` | Design tokens and themes |
| `packages/ui` | Shared UI primitives, components, and patterns |
| `packages/workspace` | Shell, tabs, panels, menus, toolbars, inspectors, editor registration |
| `packages/commands` | Commands, shortcuts, and context-aware actions |
| `packages/contracts` | Shared types and service interfaces |
| `packages/platform` | Platform adapters and native bridge |
| `packages/module-sdk` | Internal module contracts and contribution points |
| `crates` | Rust application services, storage, search, documents, AI, platform integration |
| `extensions` | Reserved for future extension development |
| `tests` | Cross-module tests and fixtures |

## Boundaries

Use a local-first modular monolith. The application composes modules and platform implementations. Feature modules depend on public shared interfaces, not on each other's internals. Shared UI depends on tokens and UI utilities, not feature code or native APIs. Platform adapters implement shared contracts; Tauri delegates to a portable Rust core. Use explicit exports and avoid circular imports.

## Platform integration

- `@fibli/contracts` defines platform-independent service interfaces.
- `@fibli/platform` implements browser and native adapters.
- Only native adapters access Tauri IPC.
- Native commands validate inputs and delegate to Rust services.
- Browser adapters expose only supported functionality.
- IPC responses are validated at runtime.
- Native capabilities follow the principle of least privilege.

## Modules

Modules own their UI, domain-facing logic, state, and tests. Introduce folders as needed, using `components/`, `views/`, `services/`, `state/`, and a public `index.ts` where appropriate. Register module contributions through a typed interface; do not modify the global shell for each new feature.

Supported contribution points to implement incrementally: navigation, commands, shortcuts, menus, tabs, editors, toolbars, inspectors, settings, search and import/export. Use stable IDs, context predicates, deterministic ordering, lazy loading, and resource cleanup. The host owns placement and fallback behavior.

## Data and platforms

Use SQLite for structured local data and the filesystem for assets. Keep credentials in an OS-backed secure store. Version migrations and test backup, recovery, and failure paths. Separate platform-specific capabilities from domain logic; validate macOS, Windows, iPadOS, and iOS independently.

## Extensions

Begin with built-in, statically registered modules. A public extension SDK and runtime plugin host are future decisions, not implemented interfaces. Before executing third-party code, define versioning, permissions, isolation, trust, and distribution. Tauri capabilities do not isolate JavaScript modules sharing a WebView. Prefer constrained declarative contributions where possible.

See [Technology stack](technology-stack.md) and [Architecture decisions](adr/README.md).

## Design foundation implementation

`@fibli/tokens` owns semantic CSS values and appearance preferences; `@fibli/ui` owns reusable controls and themes. `@fibli/workspace` composes the R1 navigation, tab state, library and project screens. The client owns the session project state, platform diagnostics and application view transitions. No shared visual package imports a native API. Session project data is deliberately not written to disk; persistence belongs to a later storage service.
