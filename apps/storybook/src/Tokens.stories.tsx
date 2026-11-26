import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { Specimen } from "./catalog/Specimen";

const meta = { title: "01 Foundations/Tokens" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const groups = [
  {
    title: "Primitive geometry and timing",
    tokens: [
      "--fibli-font-ui",
      "--fibli-font-mono",
      "--fibli-font-editor",
      "--fibli-font-size-caption",
      "--fibli-font-size-ui",
      "--fibli-font-size-editor",
      "--fibli-space-1",
      "--fibli-space-2",
      "--fibli-space-3",
      "--fibli-space-4",
      "--fibli-space-6",
      "--fibli-space-8",
      "--fibli-control-sm",
      "--fibli-control-md",
      "--fibli-control-lg",
      "--fibli-radius-xs",
      "--fibli-radius-sm",
      "--fibli-radius-md",
      "--fibli-radius-lg",
      "--fibli-radius-pill",
      "--fibli-duration-fast",
      "--fibli-duration-base",
      "--fibli-duration-cinema",
      "--fibli-duration-menu-in",
      "--fibli-duration-menu-out",
      "--fibli-ease-menu",
      "--fibli-ease-menu-out",
      "--fibli-ease",
      "--fibli-ease-cinema",
    ],
  },
  {
    title: "Component dimensions",
    tokens: [
      "--fibli-field-height",
      "--fibli-field-inset",
      "--fibli-field-font-size",
      "--fibli-segment-inset",
      "--fibli-segment-height",
      "--fibli-segment-gap",
      "--fibli-switch-width",
      "--fibli-switch-height",
      "--fibli-switch-thumb",
      "--fibli-switch-travel",
      "--fibli-slider-height",
      "--fibli-slider-track",
      "--fibli-slider-thumb",
      "--fibli-menu-radius",
      "--fibli-menu-inset",
      "--fibli-menu-item-height",
      "--fibli-menu-item-gap",
      "--fibli-menu-min-width",
      "--fibli-toolbar-height",
      "--fibli-toolbar-sub-height",
      "--fibli-toolbar-footer-height",
      "--fibli-editor-column",
      "--fibli-wizard-control-height",
      "--fibli-tooltip-delay",
      "--fibli-motion-press",
      "--fibli-motion-pane",
      "--fibli-motion-curtain",
    ],
  },
  {
    title: "Semantic palette",
    tokens: [
      "--fibli-segment-track",
      "--fibli-segment-selection",
      "--fibli-scrollbar-thumb",
      "--fibli-danger-bg",
      "--fibli-danger-ink",
      "--fibli-danger-text",
      "--fibli-success-text",
      "--fibli-notes-accent",
      "--fibli-fill-1",
      "--fibli-fill-2",
      "--fibli-fill-3",
      "--fibli-primary-bg",
      "--fibli-primary-ink",
      "--fibli-primary-hover",
      "--fibli-scene-control",
      "--fibli-scene-hover",
      "--fibli-scene-border",
      "--fibli-scene-ink",
      "--fibli-scene-ring",
      "--fibli-atmo-opacity",
      "--fibli-atmo-filter",
      "--fibli-atmo-veil",
      "--fibli-atmosphere",
      "--fibli-content",
      "--fibli-surface",
      "--fibli-chrome",
      "--fibli-text",
      "--fibli-text-secondary",
      "--fibli-text-muted",
      "--fibli-border",
      "--fibli-border-strong",
      "--fibli-edge",
      "--fibli-highlight",
      "--fibli-edge-bottom",
      "--fibli-shadow-control",
      "--fibli-shadow-overlay",
      "--fibli-shadow-dialog",
      "--fibli-navigation-tint",
      "--fibli-overlay-tint",
      "--fibli-library-tint",
      "--fibli-dock-tint",
      "--fibli-navigation-filter",
      "--fibli-overlay-filter",
      "--fibli-selection",
      "--fibli-selection-shadow",
      "--fibli-accent",
      "--fibli-accent-ink",
      "--fibli-accent-text",
      "--fibli-focus",
    ],
  },
  {
    title: "Material roles",
    tokens: [
      "--fibli-material-navigation",
      "--fibli-material-overlay",
      "--fibli-material-library",
      "--fibli-material-dock",
      "--fibli-material-scene",
      "--fibli-material-scene-hover",
      "--fibli-filter-navigation",
      "--fibli-filter-overlay",
      "--fibli-material-content",
      "--fibli-material-rim",
      "--fibli-material-control-shadow",
      "--fibli-material-overlay-shadow",
      "--fibli-content",
      "--fibli-surface",
      "--fibli-chrome",
      "--fibli-text",
      "--fibli-text-secondary",
      "--fibli-text-muted",
      "--fibli-border",
      "--fibli-border-strong",
      "--fibli-focus",
      "--fibli-accent",
      "--fibli-accent-ink",
      "--fibli-shadow-control",
      "--fibli-shadow-overlay",
      "--fibli-shadow-dialog",
      "--fibli-selection-shadow",
      "--fibli-selection",
      "--fibli-fill-1",
      "--fibli-fill-2",
      "--fibli-fill-3",
      "--fibli-primary-bg",
      "--fibli-primary-ink",
      "--fibli-primary-hover",
      "--fibli-scene-ink",
      "--fibli-scene-border",
      "--fibli-scene-ring",
      "--fibli-atmo-opacity",
      "--fibli-accent-text",
      "--fibli-segment-track",
      "--fibli-segment-selection",
      "--fibli-danger-bg",
      "--fibli-danger-ink",
      "--fibli-danger-text",
      "--fibli-success-text",
    ],
  },
];

function TokenReference() {
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const css = getComputedStyle(root);
      setValues(
        Object.fromEntries(
          groups.flatMap((group) =>
            group.tokens.map((token) => [token, css.getPropertyValue(token).trim()]),
          ),
        ),
      );
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true });
    const media = [
      "(prefers-color-scheme: dark)",
      "(prefers-reduced-motion: reduce)",
      "(prefers-reduced-transparency: reduce)",
      "(prefers-contrast: more)",
      "(forced-colors: active)",
    ].map((query) => window.matchMedia(query));
    for (const item of media) item.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      for (const item of media) item.removeEventListener("change", sync);
    };
  }, []);
  return (
    <Specimen
      title="Token reference"
      description="Resolved CSS values from the actual design system, not a duplicate palette."
      usage="Use semantic roles in components. Primitive spacing and geometry are shared; do not hardcode a second color palette."
      review="Change appearance, material, contrast and accent in the toolbar. Verify that resolved values update and solid fallbacks remove blur."
    >
      {groups.map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          <table className="catalog-table">
            <thead>
              <tr>
                <th scope="col">Token</th>
                <th scope="col">Resolved value</th>
              </tr>
            </thead>
            <tbody>
              {group.tokens.map((token) => (
                <tr key={token}>
                  <th scope="row">
                    <code>{token}</code>
                  </th>
                  <td>{values[token] || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </Specimen>
  );
}

const palette = [
  "atmosphere",
  "content",
  "surface",
  "chrome",
  "text",
  "text-secondary",
  "text-muted",
  "fill-1",
  "fill-2",
  "fill-3",
  "border",
  "border-strong",
  "primary-bg",
  "primary-ink",
  "accent",
  "accent-ink",
  "accent-text",
  "focus",
  "danger-bg",
  "danger-text",
  "success-text",
  "notes-accent",
];

export const ColorRoles: Story = {
  render: () => (
    <Specimen
      title="Color roles"
      description="Surfaces, foreground hierarchy, selection, status and user accent."
      usage="Primary actions are neutral. Accent identifies selection and focus; red is reserved for destructive actions or errors."
      review="Inspect light and dark themes. Check text on the intended surface; a swatch alone does not establish contrast compliance."
    >
      <div className="catalog-swatch-grid">
        {palette.map((role) => (
          <div className="catalog-swatch-item" key={role}>
            <div className="catalog-swatch" style={{ background: `var(--fibli-${role})` }} />
            <code>{role}</code>
          </div>
        ))}
      </div>
    </Specimen>
  ),
};

export const Geometry: Story = {
  render: () => (
    <Specimen
      title="Geometry"
      description="Compact R1 desktop sizes, spacing and radius scale."
      usage="Use the shared scale for consistent alignment. Compact desktop heights are not a guarantee of touch-target compliance."
      review="Inspect alignment, clipping, focus outlines and legibility at normal and enlarged browser zoom."
    >
      <h2>Spacing</h2>
      {[1, 2, 3, 4, 6, 8].map((step) => (
        <div className="story-row" key={step}>
          <code>space-{step}</code>
          <span className="catalog-measure" style={{ width: `var(--fibli-space-${step})` }} />
        </div>
      ))}
      <h2>Corner radius</h2>
      <div className="story-row">
        {["xs", "sm", "md", "lg", "pill"].map((size) => (
          <div className="catalog-radius" key={size} style={{ borderRadius: `var(--fibli-radius-${size})` }}>
            {size}
          </div>
        ))}
      </div>
      <h2>Control heights</h2>
      <div className="story-row">
        {["sm", "md", "lg"].map((size) => (
          <div className="catalog-size" key={size} style={{ height: `var(--fibli-control-${size})` }}>
            {size}
          </div>
        ))}
      </div>
    </Specimen>
  ),
};

export const ResolvedTokens: Story = { render: () => <TokenReference /> };
