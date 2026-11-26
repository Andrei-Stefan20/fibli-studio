import {
  Checkbox,
  GlassButton,
  Icon,
  IconButton,
  RadioGroup,
  SearchField,
  SegmentedControl,
  Slider,
  Switch,
  TextField,
  ViewSelect,
} from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = { title: "UI/Primitives" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function ButtonsSample() {
  const [last, setLast] = useState("None");
  const [pinned, setPinned] = useState(false);
  return (
    <div className="story-inset">
      <h1>Buttons — R1</h1>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="story-row" key={size}>
          <span>{size}</span>
          {(["solid", "soft", "ghost", "danger"] as const).map((variant) => (
            <GlassButton
              key={variant}
              variant={variant}
              size={size}
              onClick={() => setLast(`${variant} / ${size}`)}
            >
              {variant}
            </GlassButton>
          ))}
          <GlassButton size={size} disabled>
            Disabled
          </GlassButton>
        </div>
      ))}
      <div className="story-row">
        <IconButton
          icon="sidebar"
          variant="ghost"
          label="Library"
          shortcut="⌘1"
          aria-pressed={pinned}
          onClick={() => setPinned(!pinned)}
        />
        <GlassButton variant="soft" onClick={() => setLast("Add folder")}>
          <Icon name="plus" size={14} /> Add folder
        </GlassButton>
      </div>
      <output>Last action: {last}</output>
    </div>
  );
}

function FormSample() {
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [checked, setChecked] = useState(false);
  const [format, setFormat] = useState("text");
  const [mode, setMode] = useState("draft");
  const [volume, setVolume] = useState(35);
  return (
    <div className="story-inset">
      <h1>Fields and choices — R1</h1>
      <div className="story-row">
        <label htmlFor="primitive-title">
          Project title
          <TextField
            id="primitive-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Untitled"
          />
        </label>
        <label htmlFor="primitive-invalid">
          Invalid field
          <TextField id="primitive-invalid" defaultValue="" aria-invalid="true" placeholder="Required" />
        </label>
        <label htmlFor="primitive-disabled">
          Unavailable
          <TextField id="primitive-disabled" disabled defaultValue="Read only" />
        </label>
      </div>
      <div className="story-row">
        <SearchField
          aria-label="Search files"
          placeholder="Search…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span>Search: {query || "—"}</span>
      </div>
      <div className="story-row">
        <span>Ambient sounds</span>
        <Switch label="Ambient sounds" checked={enabled} onChange={setEnabled} />
        <Switch label="Unavailable switch" checked={false} disabled onChange={setEnabled} />
        <Checkbox label="Include notes" checked={checked} onChange={setChecked} />
      </div>
      <div className="story-row">
        <SegmentedControl
          label="Document format"
          value={format}
          onChange={setFormat}
          options={[
            { value: "text", label: "Text" },
            { value: "tex", label: "LaTeX" },
            { value: "pdf", label: "PDF", disabled: true },
          ]}
        />
        <ViewSelect
          label="Document format popup"
          value={format}
          onChange={setFormat}
          options={[
            { value: "text", label: "Text" },
            { value: "tex", label: "LaTeX" },
          ]}
        />
      </div>
      <RadioGroup
        label="Editorial state"
        value={mode}
        onChange={setMode}
        options={[
          { value: "draft", label: "Draft" },
          { value: "review", label: "Review" },
          { value: "final", label: "Final", disabled: true },
        ]}
      />
      <div className="story-row">
        <span>Volume</span>
        <Slider label="Volume" value={volume} onChange={setVolume} />
        <output>{volume}%</output>
      </div>
    </div>
  );
}

export const Buttons: Story = { render: () => <ButtonsSample /> };
export const FieldsAndChoices: Story = { render: () => <FormSample /> };
