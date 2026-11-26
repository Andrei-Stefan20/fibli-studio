# Fibli component catalog

Run `pnpm storybook` from the repository root and open http://127.0.0.1:6006.

The catalog is organized by foundations, controls, overlays, navigation and collections,
feedback, and review. Each isolated specimen uses the public shared packages, with local
example state only. The token reference reads resolved CSS variables and follows the
appearance toolbar. The reference background contrast calculations are not a substitute
for visual or accessibility testing.

Use `pnpm storybook:typecheck` and `pnpm storybook:build` for technical checks.
See the Review section for manual acceptance criteria.

No application screens, workspace state or persistence are part of this catalog.
New specialized components are deferred until separately scoped. Do not mark the design
system visually accepted from a passing build.
