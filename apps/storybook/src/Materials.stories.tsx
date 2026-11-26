import { ActionMenu, GlassButton, GlassGroup, Icon, IconButton, ThemeSettings, type MenuEntry } from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = { title: "Foundations/Materials" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function MaterialSample() {
  const [background, setBackground] = useState("theme");
  const [selection, setSelection] = useState("Writing");
  const [action, setAction] = useState("None");
  const entries: MenuEntry[] = [
    { kind: "label", id: "label", label: "Create a document" },
    { kind: "action", id: "text", label: "Text sheet", icon: "file", shortcut: "⌘T", run: () => setAction("Text sheet") },
    { kind: "action", id: "tex", label: "LaTeX document", icon: "code", run: () => setAction("LaTeX") },
    { kind: "separator", id: "sep" },
    { kind: "submenu", id: "destination", label: "Destination: Manuscript", icon: "folder", entries: [
      { kind: "action", id: "root", label: "Root", run: () => setAction("Root") },
      { kind: "action", id: "manuscript", label: "Manuscript", checked: true, run: () => setAction("Manuscript") },
      { kind: "action", id: "notes", label: "Notes", run: () => setAction("Notes") },
    ] },
  ];
  return <div className="story-inset">
    <h1>Navigation materials</h1>
    <div className="story-row">
      {["theme", "light", "dark"].map((item) => <GlassButton key={item} aria-pressed={background === item} onClick={() => setBackground(item)}>{item}</GlassButton>)}
    </div>
    <div className="story-test-bed" data-background={background}>
      <GlassGroup>
        {["Writing", "World", "Plot"].map((item) => <GlassButton key={item} variant="ghost" aria-pressed={selection === item} onClick={() => setSelection(item)}>{item}</GlassButton>)}
      </GlassGroup>
      <div className="story-row">
        <IconButton icon="sidebar" label="Library" aria-pressed="true" />
        <GlassButton><Icon name="folder" /> Project selector <Icon name="down" /></GlassButton>
        <ActionMenu label="Create menu" trigger={<><Icon name="plus" /> New</>} entries={entries} />
        <GlassButton variant="solid">Primary action</GlassButton>
      </div>
      <GlassGroup>Selected: {selection} · Menu action: {action}</GlassGroup>
    </div>
  </div>;
}

export const Navigation: Story = { render: () => <MaterialSample /> };
export const Appearance: Story = { render: () => <div className="story-inset"><ThemeSettings /></div> };
