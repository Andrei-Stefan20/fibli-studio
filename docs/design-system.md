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
