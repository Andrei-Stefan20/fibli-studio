# Agent instructions

## Working in this repository

- Read `README.md`, `CONTRIBUTING.md`, and the relevant documentation in `docs/`.
- Inspect the working tree and preserve existing changes.
- Keep changes within the requested scope. Use a short plan for cross-module or high-risk work.
- Prefer existing implementations and official documentation matching installed dependencies.

## Engineering standards

- Keep modules independent and expose explicit public interfaces. Avoid circular dependencies and direct platform access from feature UI.
- Reuse shared components, semantic tokens, and registered commands. Follow `docs/design-system.md`.
- Use typed contracts, validate external input, and handle errors explicitly.
- Protect user data and secrets. Test migrations and recovery paths; use synthetic fixtures.
- Add dependencies only when justified; preserve lockfiles and check platform support and licensing.
- Add or update relevant tests and documentation. Report checks actually run and any limitations.

## Delegation

Use available specialists or skills when they improve the result. Assign non-overlapping edit scopes and review changes before integration. Read-only roles must not modify files. Do not assume a tool or subagent is available.

## Safety

Do not discard user changes, rewrite history, publish, push, change permissions, or expose secrets without authorization. Do not bypass checks or invent test results. Follow the closest applicable project instructions.
