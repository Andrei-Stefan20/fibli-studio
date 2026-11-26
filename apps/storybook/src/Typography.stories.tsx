import { Icon, type IconName } from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Foundations/Typography and icons" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const icons: IconName[] = [
  "sidebar", "inspector", "down", "right", "left", "plus", "close", "home", "folder",
  "file", "search", "settings", "spark", "more", "check", "upload", "eye", "image",
  "book", "grid", "code", "copy", "edit", "trash", "split", "latex", "json", "table",
];

export const TypeSpecimen: Story = {
  render: () => (
    <div className="story-inset">
      <h1>Typography</h1>
      <section>
        <h2>System UI</h2>
        <p>13 px — Project library, menu items and controls</p>
        <p style={{ fontSize: 11, color: "var(--fibli-text-muted)" }}>11 px — Metadata and shortcuts</p>
      </section>
      <section style={{ fontFamily: "var(--fibli-font-editor)" }}>
        <h2 style={{ fontWeight: 600, fontSize: 32, margin: 0 }}>Il porto sotto la pioggia</h2>
        <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 660 }}>
          La pioggia arrivò prima del traghetto, sottile e ostinata come la sabbia quando cambia il vento da ovest.
        </p>
        <p style={{ fontSize: 18, fontStyle: "italic" }}>Într-o dimineață liniștită — a quiet morning.</p>
      </section>
      <section style={{ fontFamily: "var(--fibli-font-mono)" }}>
        <h2>Code and data</h2>
        <code>time,height</code>
      </section>
    </div>
  ),
};

export const IconInventory: Story = {
  render: () => (
    <div className="story-inset">
      <h1>Current glyph inventory</h1>
      <div className="story-icon-grid">
        {icons.map((name) => (
          <div className="story-icon-cell" key={name}>
            <Icon name={name} size={16} />
            <Icon name={name} size={14} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
