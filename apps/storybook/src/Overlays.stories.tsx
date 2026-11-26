import { ConfirmDialog, EmptyState, GlassButton, InlineStatus, NotificationProvider, Popover, Progress, TextField, useNotifications } from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = { title: "UI/Overlays and feedback" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function OverlaySample() {
  const [confirm, setConfirm] = useState(false);
  const [tag, setTag] = useState("");
  const { notify } = useNotifications();
  return (
    <div className="story-inset">
      <h1>R1 overlays</h1>
      <div className="story-row">
        <Popover label="Add tag" trigger="Add tag">
          <div className="story-row">
            <TextField aria-label="Tag name" placeholder="Tag name" value={tag} onChange={(event) => setTag(event.target.value)} />
            <GlassButton variant="solid" disabled={!tag.trim()} onClick={() => { notify(`Added ${tag.trim()}`); setTag(""); }}>Add</GlassButton>
          </div>
        </Popover>
        <GlassButton variant="danger" onClick={() => setConfirm(true)}>Delete note…</GlassButton>
        <GlassButton onClick={() => notify("Draft saved", "Local session example")}>Show notification</GlassButton>
      </div>
      <ConfirmDialog open={confirm} onOpenChange={setConfirm} title="Delete note?" description="This removes the example note from the session." confirmLabel="Delete" destructive onConfirm={() => notify("Note deleted")} />
      <EmptyState title="No documents" description="Create a text sheet to start writing." action={<GlassButton onClick={() => notify("New text sheet")}>New text sheet</GlassButton>} />
      <InlineStatus tone="success">Ready</InlineStatus>
      <InlineStatus tone="danger">File type is not supported.</InlineStatus>
      <Progress label="Import progress" value={65} />
    </div>
  );
}

export const PopoversAndConfirmations: Story = { render: () => <NotificationProvider><OverlaySample /></NotificationProvider> };
