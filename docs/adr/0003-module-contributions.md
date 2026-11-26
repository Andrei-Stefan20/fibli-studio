# 0003: Module contributions

Status: Proposed

## Context

New modules need to integrate without coupling their implementation to the application shell.

## Decision

Use typed, first-party contributions and a shared registry. Defer dynamically loaded third-party extensions.

## Alternatives

Direct shell imports or a dynamic plugin host.

## Consequences

Explicit public interfaces and stable identifiers are required. Third-party isolation and compatibility remain future decisions.
