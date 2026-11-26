import { ConfirmDialog, GlassButton, GlassDialog, IconButton, Popover, TextField } from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Specimen } from "./catalog/Specimen";

const meta = { title: "03 Overlays/Individual components" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function TooltipExample() {
  const [last, setLast] = useState("None");
  return (
    <Specimen
      title="Tooltip"
      description="Short labels and optional shortcut hints on icon buttons."
      usage="Use supplementary hints, not required instructions. Shortcut text does not register a keyboard command."
      review="Hover, focus with Tab, move away and check that the tooltip does not block the target."
    >
      <div className="story-row">
        <IconButton icon="search" label="Search" shortcut="⌘K" onClick={() => setLast("Search")} />
        <IconButton icon="folder" label="Open folder" onClick={() => setLast("Open folder")} />
        <IconButton
          icon="settings"
          label="Preferences"
          shortcut="⌘,"
          onClick={() => setLast("Preferences")}
        />
      </div>
      <output>{last}</output>
    </Specimen>
  );
}

function PopoverExample() {
  const [value, setValue] = useState("");
  return (
    <Specimen
      title="Popover"
      description="A small, anchored surface containing interactive content."
      usage="Use for contextual settings. Use a modal dialog when the task must block interaction elsewhere."
      review="Check alignment, keyboard focus inside the popup, Escape and outside dismissal."
    >
      <div className="story-row">
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <Popover key={side} label={side + " popover"} trigger={side} side={side}>
            <TextField
              aria-label={side + " value"}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Enter a value"
            />
          </Popover>
        ))}
      </div>
      <output>Value: {value || "—"}</output>
    </Specimen>
  );
}

function DialogExample() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Example");
  const [saved, setSaved] = useState("Example");
  return (
    <Specimen
      title="GlassDialog"
      description="A modal surface for a focused, bounded task."
      usage="Give the dialog a descriptive title and explicit completion and cancellation actions. Keep the form short."
      review="Check initial focus, focus containment, close button, Escape, cancellation and focus restoration."
    >
      <GlassButton
        onClick={() => {
          setName(saved);
          setOpen(true);
        }}
      >
        Rename example
      </GlassButton>
      <output>Saved label: {saved}</output>
      <GlassDialog open={open} onOpenChange={setOpen} title="Rename example">
        <form
          className="story-inset"
          onSubmit={(event) => {
            event.preventDefault();
            if (name.trim()) {
              setSaved(name.trim());
              setOpen(false);
            }
          }}
        >
          <label htmlFor="dialog-example">Name</label>
          <TextField
            id="dialog-example"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <div className="story-row">
            <GlassButton onClick={() => setOpen(false)}>Cancel</GlassButton>
            <GlassButton type="submit" variant="solid" disabled={!name.trim()}>
              Rename
            </GlassButton>
          </div>
        </form>
      </GlassDialog>
    </Specimen>
  );
}

function ConfirmExample() {
  const [kind, setKind] = useState<"normal" | "danger" | null>(null);
  const [result, setResult] = useState("No action confirmed");
  return (
    <Specimen
      title="ConfirmDialog"
      description="Explicit confirmation for consequential actions."
      usage="Explain what will happen. Use danger only for destructive actions; prefer a specific verb to a generic OK."
      review="Verify that Cancel and Escape do not confirm, and the explicit confirmation runs once. Review initial focus and announcement."
    >
      <div className="story-row">
        <GlassButton onClick={() => setKind("normal")}>Confirm change…</GlassButton>
        <GlassButton variant="danger" onClick={() => setKind("danger")}>
          Delete example…
        </GlassButton>
      </div>
      <output>{result}</output>
      <ConfirmDialog
        open={kind !== null}
        onOpenChange={(open) => {
          if (!open) setKind(null);
        }}
        title={kind === "danger" ? "Delete example?" : "Apply change?"}
        description={
          kind === "danger"
            ? "The sample item would be removed."
            : "The sample setting would change."
        }
        confirmLabel={kind === "danger" ? "Delete" : "Apply"}
        destructive={kind === "danger"}
        onConfirm={() => setResult(kind === "danger" ? "Delete confirmed" : "Change confirmed")}
      />
    </Specimen>
  );
}

export const Tooltips: Story = { render: () => <TooltipExample /> };
export const Popovers: Story = { render: () => <PopoverExample /> };
export const Dialog: Story = { render: () => <DialogExample /> };
export const Confirmation: Story = { render: () => <ConfirmExample /> };
