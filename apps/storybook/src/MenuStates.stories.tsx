import { ActionMenu, ContextActions, GlassButton, Icon, type MenuEntry } from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Specimen } from "./catalog/Specimen";

const meta = { title: "03 Overlays/Menu states" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function MenuExample() {
  const [destination, setDestination] = useState("Root");
  const [status, setStatus] = useState("None");
  const entries: MenuEntry[] = [
    { kind: "label", id: "create", label: "Create" },
    { kind: "action", id: "text", label: "Text sheet", icon: "file", shortcut: "⌘T", run: () => setStatus("Text sheet") },
    { kind: "action", id: "disabled", label: "Unavailable", disabled: true, run: () => setStatus("Unexpected action") },
    { kind: "separator", id: "sep" },
    {
      kind: "submenu",
      id: "destination",
      label: "Destination: " + destination,
      icon: "folder",
      entries: ["Root", "Manuscript", "Notes"].map((item) => ({
        kind: "action",
        id: item,
        label: item,
        checked: destination === item,
        closeOnClick: false,
        run: () => setDestination(item),
      })),
    },
    { kind: "separator", id: "danger-sep" },
    { kind: "action", id: "delete", label: "Delete…", danger: true, icon: "trash", run: () => setStatus("Delete example") },
  ];
  return (
    <Specimen
      title="Menus and submenus"
      description="Grouped actions, separators, disabled items, nested choices and destructive actions."
      usage="Use stable item IDs. Shortcut text does not register a command. Checked items currently use a visual indicator, not checkbox-menu-item semantics."
      review="Open with Enter, navigate with arrows, select a destination, dismiss with Escape and check focus return."
    >
      <div className="story-row">
        <ActionMenu label="Create menu" trigger="New document" entries={entries} />
        <ActionMenu label="Above menu" trigger="Above / end" entries={entries} side="top" align="end" />
      </div>
      <output>{status} · Destination: {destination}</output>
    </Specimen>
  );
}

function ContextExample() {
  const [action, setAction] = useState("None");
  return (
    <Specimen
      title="Context actions"
      description="Secondary-click actions attached to a single item."
      usage="Do not hide the only way to perform an important task in a right-click menu."
      review="Try a secondary click and the keyboard context-menu gesture in the target browser. Check Escape and disabled behavior."
    >
      <ContextActions entries={[
        { kind: "action", id: "rename", label: "Rename", icon: "edit", run: () => setAction("Rename") },
        { kind: "action", id: "copy", label: "Duplicate", icon: "copy", run: () => setAction("Duplicate") },
        { kind: "action", id: "delete", label: "Delete", danger: true, icon: "trash", run: () => setAction("Delete") },
        { kind: "action", id: "locked", label: "Unavailable", disabled: true, run: () => setAction("Unexpected action") },
      ]}>
        <GlassButton onClick={() => setAction("Open item")}><Icon name="file" /> Example item</GlassButton>
      </ContextActions>
      <output>Last action: {action}</output>
    </Specimen>
  );
}

export const HierarchicalMenu: Story = { render: () => <MenuExample /> };
export const ContextMenu: Story = { render: () => <ContextExample /> };
