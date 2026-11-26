import {
  Checkbox,
  GlassButton,
  GlassGroup,
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
import { Specimen } from "./catalog/Specimen";

const meta = { title: "02 Controls/Individual components" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function ButtonExample() {
  const [selected, setSelected] = useState(false);
  const [last, setLast] = useState("None");
  return (
    <Specimen
      title="Buttons and icon buttons"
      description="Neutral solid, soft, ghost and destructive actions at the R1 control sizes."
      usage="Use one primary action per decision. Prefer ghost for contextual actions. Icon-only controls require accessible labels."
      review="Test mouse, keyboard, hover, pressed, disabled and focus states."
    >
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="story-row" key={size}>
          <code>{size}</code>
          {(["solid", "soft", "ghost", "danger"] as const).map((variant) => (
            <GlassButton
              key={variant}
              variant={variant}
              size={size}
              onClick={() => setLast(variant)}
            >
              {variant}
            </GlassButton>
          ))}
          <GlassButton size={size} disabled>
            Disabled
          </GlassButton>
        </div>
      ))}
      <GlassGroup>
        <IconButton
          icon="sidebar"
          label="Toggle panel"
          shortcut="⌘1"
          aria-pressed={selected}
          onClick={() => setSelected(!selected)}
        />
        <IconButton icon="search" label="Search" shortcut="⌘K" onClick={() => setLast("Search")} />
        <IconButton icon="settings" label="Settings" onClick={() => setLast("Settings")} />
      </GlassGroup>
      <output>
        Last action: {last} · Panel selection: {selected ? "On" : "Off"}
      </output>
    </Specimen>
  );
}

function FieldExample() {
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  return (
    <Specimen
      title="TextField and SearchField"
      description="Editable, invalid, read-only and disabled fields."
      usage="Associate a visible label with each field. Explain invalid values; placeholder text is not a label."
      review="Type, select text, navigate by Tab, verify focus styling and test read-only and disabled behavior."
    >
      <div className="catalog-field">
        <label htmlFor="sample-title">Title</label>
        <TextField
          id="sample-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Untitled"
        />
      </div>
      <div className="catalog-field">
        <label htmlFor="sample-invalid">Name</label>
        <TextField id="sample-invalid" aria-invalid="true" aria-describedby="sample-error" />
        <span id="sample-error" style={{ color: "var(--fibli-danger-text)" }}>
          Name is required.
        </span>
      </div>
      <div className="catalog-field">
        <label htmlFor="sample-readonly">Read only</label>
        <TextField id="sample-readonly" readOnly defaultValue="Reference" />
      </div>
      <div className="catalog-field">
        <label htmlFor="sample-disabled">Disabled</label>
        <TextField id="sample-disabled" disabled defaultValue="Unavailable" />
      </div>
      <SearchField
        aria-label="Search examples"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search…"
      />
      <output>
        Title: {title || "—"} · Query: {query || "—"}
      </output>
    </Specimen>
  );
}

function BinaryExample() {
  const [enabled, setEnabled] = useState(false);
  const [checked, setChecked] = useState(true);
  return (
    <Specimen
      title="Switch and Checkbox"
      description="Binary controls with independently controlled values."
      usage="Use a switch for an immediately applied preference and a checkbox for selection. Checkbox is an extension to the R1 vocabulary."
      review="Test Space activation, both checked states, disabled behavior and forced colors. Keep a readable label beside a switch."
    >
      <div className="story-row">
        <span>Enable preference</span>
        <Switch label="Enable preference" checked={enabled} onChange={setEnabled} />
        <output>{enabled ? "On" : "Off"}</output>
      </div>
      <div className="story-row">
        <span>Unavailable preference</span>
        <Switch label="Unavailable preference" checked={false} disabled onChange={setEnabled} />
        <Checkbox label="Include notes" checked={checked} onChange={setChecked} />
        <Checkbox label="Unavailable choice" checked={true} disabled onChange={setChecked} />
      </div>
    </Specimen>
  );
}

const options = [
  { value: "text", label: "Text" },
  { value: "latex", label: "LaTeX" },
  { value: "pdf", label: "PDF", disabled: true },
];

function ChoiceExample() {
  const [value, setValue] = useState("text");
  return (
    <Specimen
      title="RadioGroup and SegmentedControl"
      description="Two visual forms of one mutually exclusive choice."
      usage="Use segments for a small set of short alternatives; use radios when choices need more room. These are selection controls, not document tabs."
      review="Use arrow keys and Tab, verify the selected option and disabled behavior."
    >
      <SegmentedControl
        label="Format segments"
        value={value}
        onChange={setValue}
        options={options}
      />
      <RadioGroup label="Format radios" value={value} onChange={setValue} options={options} />
      <output>Selected format: {value}</output>
    </Specimen>
  );
}

function SelectExample() {
  const [value, setValue] = useState("text");
  return (
    <Specimen
      title="ViewSelect"
      description="Compact popup selection with double chevron and selected-item indicator."
      usage="Use for a single value from a finite set. Do not use the action menu for selection when a select expresses the intent."
      review="Open with the keyboard, navigate and select; Escape should dismiss the popup. Check popup placement."
    >
      <div className="story-row">
        <ViewSelect
          label="Format"
          value={value}
          onChange={setValue}
          options={[
            { value: "text", label: "Text" },
            { value: "latex", label: "LaTeX" },
            { value: "long", label: "A longer example format label" },
          ]}
        />
        <output>Selected: {value}</output>
      </div>
    </Specimen>
  );
}

function SliderExample() {
  const [volume, setVolume] = useState(35);
  const [step, setStep] = useState(2);
  return (
    <Specimen
      title="Slider"
      description="A bounded numeric value with continuous or discrete steps."
      usage="Provide an accessible name, a meaningful range and a visible value. This specimen controls numbers only; it does not play audio."
      review="Drag the thumb, use arrow keys and check minimum, maximum, increments and disabled state."
    >
      <div className="story-row">
        <span>0–100</span>
        <Slider label="Volume" value={volume} onChange={setVolume} />
        <output>{volume}%</output>
      </div>
      <div className="story-row">
        <span>0–10, step 2</span>
        <Slider label="Discrete value" value={step} onChange={setStep} min={0} max={10} step={2} />
        <output>{step}</output>
      </div>
      <Slider label="Disabled value" value={50} onChange={setVolume} disabled />
    </Specimen>
  );
}

export const Buttons: Story = { render: () => <ButtonExample /> };
export const Fields: Story = { render: () => <FieldExample /> };
export const BinaryControls: Story = { render: () => <BinaryExample /> };
export const Choices: Story = { render: () => <ChoiceExample /> };
export const PopupSelect: Story = { render: () => <SelectExample /> };
export const RangeSlider: Story = { render: () => <SliderExample /> };
