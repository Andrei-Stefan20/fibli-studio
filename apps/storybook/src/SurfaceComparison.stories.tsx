import { GlassButton, MaterialSurface, type MaterialRole } from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = { title: "Foundations/Surface comparison" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const roles: MaterialRole[] = ["navigation", "overlay", "library", "dock", "scene", "content"];

function Comparison() {
  const [background, setBackground] = useState("checker");
  return (
    <div className="story-inset">
      <h1>Material comparison</h1>
      <div className="story-row">
        {["black", "white", "checker", "theme"].map((item) => <GlassButton key={item} aria-pressed={background === item} onClick={() => setBackground(item)}>{item}</GlassButton>)}
      </div>
      <div className="story-material-grid" data-background={background}>
        {roles.map((material) => <MaterialSurface material={material} className="story-material-sample" key={material}>
          <strong>{material}</strong>
          <span>Project library</span>
          {material !== "scene" && <><span style={{ color: "var(--fibli-text-secondary)" }}>Secondary text</span><span style={{ color: "var(--fibli-text-muted)" }}>Metadata and shortcut</span></>}
        </MaterialSurface>)}
      </div>
      <p>Use Storybook appearance, material and contrast controls. The checker pattern is a stress test, not application decoration.</p>
    </div>
  );
}
export const AllMaterials: Story = { render: () => <Comparison /> };
