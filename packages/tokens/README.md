# Fibli design tokens — R1

Shared CSS foundation derived from the approved demo's `index.html` and `styles/materials.css`. No runtime JavaScript, network requests, component styles or shell redesign.

## Usage

Import `@fibli/tokens/styles.css` once at the client or Storybook entry point. Apply preferences on the document root:

- `data-theme="light"` or `"dark"`; omit or use `"system"` for OS preference.
- `data-material="solid"` disables translucency; omit or use `"liquid"` otherwise.
- `data-contrast="more"` opts into opaque materials. OS increased contrast or reduced transparency also disables translucent surfaces.

`--fibli-material-navigation`, `--fibli-material-overlay`, `--fibli-material-library`, `--fibli-material-dock` and `--fibli-material-content` describe distinct roles. Apply `--fibli-filter-navigation` or `--fibli-filter-overlay` through a component's own `backdrop-filter` and `-webkit-backdrop-filter` declarations. Content surfaces remain opaque. Use `--fibli-selection` for inset tab selection, not another floating layer.

Component geometry, focus behavior, responsive layout, dynamic accent selection and the theme provider will be implemented in separate changes. Fixed accent colors are initial defaults only. CSS is not the native Apple Liquid Glass compositor. Contrast must also be tested in real components; these tokens alone do not ensure WCAG compliance.

Preserve the R1 navigation structure. Do not copy the prototype's monolithic HTML or CDN dependencies into production.
