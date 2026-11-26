import {
  EmptyState,
  GlassButton,
  InlineStatus,
  NotificationProvider,
  Progress,
  Slider,
  useNotifications,
} from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Specimen } from "./catalog/Specimen";

const meta = { title: "05 Feedback/States" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function NotificationExample() {
  const { notify } = useNotifications();
  return (
    <Specimen
      title="Notifications"
      description="Transient feedback from the shared toast provider."
      usage="Use for brief confirmation; critical errors need persistent visible feedback."
      review="Trigger several notices, dismiss one, and review announcements and timing."
    >
      <GlassButton onClick={() => notify("Example saved", "Storybook specimen only")}>
        Show notification
      </GlassButton>
    </Specimen>
  );
}

function StatusExample() {
  const [created, setCreated] = useState(false);
  return (
    <Specimen
      title="Empty and status states"
      description="Neutral, success and danger feedback."
      usage="Explain why a collection is empty and provide an actionable next step. Do not rely on color alone."
      review="Verify the action changes the sample state and error text is understandable without color."
    >
      {created ? (
        <GlassButton onClick={() => setCreated(false)}>Reset example</GlassButton>
      ) : (
        <EmptyState
          title="No items"
          description="Add an example to populate the collection."
          action={<GlassButton onClick={() => setCreated(true)}>Add example</GlassButton>}
        />
      )}
      <InlineStatus tone="neutral">Waiting for input.</InlineStatus>
      <InlineStatus tone="success">Ready.</InlineStatus>
      <InlineStatus tone="danger">Unable to read the example file.</InlineStatus>
    </Specimen>
  );
}

function ProgressExample() {
  const [value, setValue] = useState(40);
  return (
    <Specimen
      title="Progress"
      description="Determinate and indeterminate progress indicators."
      usage="Use a known numeric value when available. Do not manufacture a percentage for an unknown task duration."
      review="Adjust from zero to completion and check the accessible label. The indeterminate sample does not run a real task."
    >
      <Slider label="Sample progress" value={value} onChange={setValue} />
      <output>{value}%</output>
      <Progress label="Known progress" value={value} />
      <Progress label="Unknown progress" />
    </Specimen>
  );
}

export const Notifications: Story = {
  render: () => (
    <NotificationProvider>
      <NotificationExample />
    </NotificationProvider>
  ),
};
export const EmptyAndStatus: Story = { render: () => <StatusExample /> };
export const ProgressIndicators: Story = { render: () => <ProgressExample /> };
