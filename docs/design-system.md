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

Dynamic accent colors and the theme provider will be implemented
separately.

## Component catalog

Run `pnpm storybook` from the repository root; the catalog is available at http://127.0.0.1:6006. It includes the R1 material stress test, appearance controls, Base UI menus, document tabs, and full-screen library, creation and workspace stories. Use the toolbar to compare appearance, material and contrast. The catalog is built and type-checked by CI.

Use Base UI for menu, context menu and dialog behavior, Motion for the document selection lens, and Radix Colors for semantic status colors. The R1 palette and CSS materials remain the source of visual identity. Do not copy generic dashboard layouts or create decorative controls that have no real action. Keep atmospheric media out of editing surfaces.

## R1 fidelity and scope

The initial port retains the library hero and bottom cover dock, full-screen creation form, three-part top navigation, project switcher, browser-style tabs, creation destination submenu, file library and details panel. The sample projects are adapted from the R1 demo; its original Kilchurn Castle and Das Eismeer example scenes are restored, with vector fallbacks when offline. See `docs/assets.md` for credits. The remaining photograph, video and audio catalog is deferred until asset licensing and offline distribution are reviewed. Imported local covers are session-scoped, bounded in size and never uploaded. Video backgrounds respect reduced motion. Project content remains session-only until the storage layer is implemented; the current text editor is not a production rich-text editor. AI, PDF, presentation and audio services remain out of scope.

## Source fidelity

The supplied demo is the reference, not a generic approximation. The original 24/28/34 px control heights, 38 px wizard fields, radius scale, Spectrum 2 glyphs, Base UI menu and popup select structure, 440/36/0.78 selection spring, 240 ms panel and 160 ms pane transitions, 520 ms cinema curtains, and 900 ms atmosphere fade have been restored. Primary actions are neutral, not accent-colored. Accent remains customizable for selection and focus. Maintain reduced-motion, solid and high-contrast variants and keep editor content opaque. Visual and keyboard review on WKWebView is required before merge.
