# Design system

Use [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) as a reference for desktop and tablet interaction, with a platform-appropriate visual identity.

## Foundations

- Tokens: primitive, semantic, and component levels; centralized themes and accent colors.
- Materials: solid content surfaces, restrained translucent navigation and controls, accessible fallbacks.
- Typography, spacing, radius, elevation, icons, and motion defined consistently.
- CSS glass effects are not native Liquid Glass. Review asset and font licenses.

## Components

Build shared controls, navigation, overlays, collections, feedback, and patterns in `packages/ui`. Keep workspace-specific composition in `packages/workspace`. Use existing primitives before adding new components.

A component may include a TSX implementation, CSS Module, Storybook story, tests, and public export. Document variants and supported states; avoid unnecessary files for trivial components.

## Interaction

Distinguish document tabs, section tabs, and segmented controls. Use one command registry for menus, toolbars, shortcuts, and command palettes. Preserve native keyboard conventions, focus management, touch support, contrast, light/dark themes, and reduced motion/transparency preferences.

Validate shared components in Storybook once configured, and verify native platform behavior separately.

## Visual identity

Fibli Demo R1 is the structural and visual reference for the application.

- Preserve the original navigation hierarchy, floating controls,
  document tabs, project selector, and contextual menus.
- Use translucent materials for navigation and controls.
- Keep editing and document surfaces opaque.
- Avoid unnecessary decorative elements and generic dashboard patterns.
- Support light, dark, and system appearance.
- Respect reduced motion, reduced transparency, and increased contrast.

## Design tokens

The `@fibli/tokens` package provides shared CSS primitives,
semantic materials, and appearance tokens.

Import `@fibli/tokens/styles.css` at application entry points.
Components must consume semantic tokens instead of hardcoded values.

Dynamic accent colors and the theme provider are implemented. Their visual acceptance is pending.

## Component catalog

Run `pnpm storybook` from the repository root; the catalog is available at http://127.0.0.1:6006. It includes isolated R1 material comparisons, typography, motion, appearance controls, Base UI menus, form controls, overlays, feedback and collections. Use the toolbar to compare appearance, material and contrast. The catalog is built and type-checked by CI.

Use Base UI for menu, context menu and dialog behavior, Motion for the document selection lens, and Radix Colors for semantic status colors. The R1 palette and CSS materials remain the source of visual identity. Do not copy generic dashboard layouts or create decorative controls that have no real action. Keep atmospheric media out of editing surfaces.

## R1 fidelity and scope

This change is restricted to design tokens, shared UI primitives, isolated Storybook stories, licenses and related tests. The original demo remains the visual reference. The project library, creation wizard, workspace shell, document tabs, editor, media catalog and application navigation are deferred to later phases. The client and native host remain unchanged in behavior.

## Source fidelity

The supplied demo is the reference, not a generic approximation. The original 24/28/34 px control heights, 38 px wizard fields, radius scale, Spectrum 2 glyphs, Base UI menu and popup select structure, 440/36/0.78 selection spring, 240 ms panel and 160 ms pane transitionsare represented in the shared design foundations. The cinema curtain and atmosphere transitions remain reference timings for a later phase. Primary actions are neutral, not accent-colored. Accent remains customizable for selection and focus. Maintain reduced-motion, solid and high-contrast variants and keep editor content opaque. Visual and keyboard review on WKWebView is required before merge.

## Phase gates

See [component inventory](design/component-inventory.md) and [Phase 03 plan](design/phase-03-plan.md). The component catalog now includes isolated button, field, choice and motion examples. Application prototypes are excluded from this change. Visual acceptance and the command/module architecture milestones precede workspace implementation.

The Storybook catalog is organized into Getting started, Foundations, Controls, Overlays, Navigation and collections, Feedback, and Review. The live token reference, isolated component specimens, usage guidance and review checklist document the existing public UI API. No new application components are introduced by this catalog pass.
