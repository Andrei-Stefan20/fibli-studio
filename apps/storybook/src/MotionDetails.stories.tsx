import { GlassButton, GlassGroup, PaneTransition, PanelTransition, SceneEntrance, SelectionLens, SelectionScope } from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { Specimen } from "./catalog/Specimen";

const meta = { title: "01 Foundations/Motion details" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function LensExample() {
  const scope = useId();
  const [active, setActive] = useState("First");
  return (
    <Specimen title="Selection lens" description="Shared spring: stiffness 440, damping 36, mass 0.78."
      usage="Use a single selection lens within its own SelectionScope. Do not layer it over unrelated selected elements."
      review="Select neighboring and distant items, then repeat with OS reduced motion enabled.">
      <GlassGroup>
        <SelectionScope id={scope}>
          {["First", "Second", "Third"].map((item) => (
            <GlassButton key={item} variant="ghost" aria-pressed={active === item}
              style={{ position: "relative" }} onClick={() => setActive(item)}>
              {active === item && <SelectionLens />}
              <span style={{ position: "relative" }}>{item}</span>
            </GlassButton>
          ))}
        </SelectionScope>
      </GlassGroup>
    </Specimen>
  );
}

function PanelExample() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("First");
  const [replay, setReplay] = useState(0);
  return (
    <Specimen title="Panel, pane and entrance" description="Width/opacity transitions for panels (240 ms), panes (160 ms) and a spring entrance."
      usage="Use these shared motion primitives for local visual continuity. Application navigation and cinema orchestration are deferred."
      review="Toggle repeatedly, switch the pane, replay the entrance and enable reduced motion. Check clipping and focus on disappearing content.">
      <div className="story-row">
        <GlassButton aria-pressed={open} onClick={() => setOpen(!open)}>Toggle panel</GlassButton>
        <GlassButton onClick={() => setActive(active === "First" ? "Second" : "First")}>Switch pane</GlassButton>
        <GlassButton onClick={() => setReplay(replay + 1)}>Replay entrance</GlassButton>
      </div>
      <div className="story-motion-stage">
        <PanelTransition open={open} width={200} className="story-motion-panel"><div>Panel</div></PanelTransition>
        <PaneTransition activeId={active} className="story-motion-pane"><h2>{active} pane</h2></PaneTransition>
      </div>
      <SceneEntrance key={replay} className="story-motion-entrance">Entrance specimen</SceneEntrance>
    </Specimen>
  );
}

export const Selection: Story = { render: () => <LensExample /> };
export const Transitions: Story = { render: () => <PanelExample /> };
