import { GlassButton, GlassGroup, PaneTransition, PanelTransition, SceneEntrance, SelectionLens, SelectionScope } from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";

const meta = { title: "Foundations/Motion" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function MotionSample() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("First");
  const [replay, setReplay] = useState(0);
  const scope = useId();
  return (
    <div className="story-inset">
      <h1>R1 motion</h1>
      <p>Enable the operating system's reduced-motion preference to verify the alternate behavior.</p>
      <div className="story-row">
        <GlassButton onClick={() => setOpen(!open)} aria-pressed={open}>Toggle panel</GlassButton>
        <GlassButton onClick={() => setReplay(replay + 1)}>Replay entrance</GlassButton>
        <GlassGroup>
          <SelectionScope id={scope}>
            {["First", "Second", "Third"].map((item) => (
              <GlassButton key={item} variant="ghost" aria-pressed={item === active} style={{ position: "relative" }} onClick={() => setActive(item)}>
                {item === active && <SelectionLens />}<span style={{ position: "relative" }}>{item}</span>
              </GlassButton>
            ))}
          </SelectionScope>
        </GlassGroup>
      </div>
      <div className="story-motion-stage">
        <PanelTransition open={open} width={200} className="story-motion-panel"><div>Library panel</div></PanelTransition>
        <PaneTransition activeId={active} className="story-motion-pane"><h2>{active} document</h2><p>Document switching uses the shared pane transition.</p></PaneTransition>
      </div>
      <SceneEntrance key={replay} className="story-motion-entrance">Scene entrance — replayable</SceneEntrance>
    </div>
  );
}
export const MotionPrimitives: Story = { render: () => <MotionSample /> };
