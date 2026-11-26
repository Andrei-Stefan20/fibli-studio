import {
  ActionMenu,
  GlassButton,
  GlassDialog,
  GlassGroup,
  Icon,
  IconButton,
  type MenuEntry,
} from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = { title: "UI/Controls and overlays" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function ControlsSample() {
  const [dialog, setDialog] = useState(false);
  const [status, setStatus] = useState("No action selected");
  const [pressed, setPressed] = useState(false);
  const entries: MenuEntry[] = [
    {
      kind: "action",
      id: "open",
      label: "Open",
      icon: "folder",
      run: () => setStatus("Open selected"),
    },
    { kind: "action", id: "rename", label: "Rename…", icon: "edit", run: () => setDialog(true) },
    {
      kind: "submenu",
      id: "more",
      label: "More actions",
      entries: [
        {
          kind: "action",
          id: "duplicate",
          label: "Duplicate",
          icon: "copy",
          run: () => setStatus("Duplicate selected"),
        },
        {
          kind: "action",
          id: "delete",
          label: "Delete…",
          icon: "trash",
          danger: true,
          run: () => setStatus("Delete selected"),
        },
      ],
    },
  ];
  return (
    <div className="story-inset">
      <div className="story-row">
        <GlassButton onClick={() => setStatus("Regular pressed")}>Regular</GlassButton>
        <GlassButton variant="solid" onClick={() => setStatus("Primary pressed")}>
          Primary
        </GlassButton>
        <GlassButton variant="ghost" onClick={() => setStatus("Ghost pressed")}>
          Ghost
        </GlassButton>
        <GlassButton disabled>Disabled</GlassButton>
        <IconButton
          icon="inspector"
          label="Toggle inspector"
          aria-pressed={pressed}
          onClick={() => setPressed(!pressed)}
        />
      </div>
      <div className="story-row">
        <ActionMenu
          label="Project actions"
          trigger={
            <>
              <Icon name="more" /> Actions
            </>
          }
          entries={entries}
        />
        <GlassButton onClick={() => setDialog(true)}>Open dialog</GlassButton>
      </div>
      <GlassGroup>{status}</GlassGroup>
      <GlassDialog title="Rename project" open={dialog} onOpenChange={setDialog}>
        <form
          className="story-inset"
          onSubmit={(event) => {
            event.preventDefault();
            setStatus("Rename confirmed");
            setDialog(false);
          }}
        >
          <label htmlFor="story-name">Project name</label>
          <input id="story-name" defaultValue="Le isole di Sàlma" required />
          <GlassButton type="submit" variant="solid">
            Rename
          </GlassButton>
        </form>
      </GlassDialog>
    </div>
  );
}

export const ButtonsAndMenus: Story = { render: () => <ControlsSample /> };
