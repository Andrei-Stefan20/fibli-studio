import { Checkbox, GlassButton, RadioGroup, SearchField, SegmentedControl, Switch, TextField } from "@fibli/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

describe("Shared controls", () => {
  it("uses a neutral button type and honors disabled", () => {
    const run = vi.fn();
    render(<GlassButton variant="danger" disabled onClick={run}>Delete</GlassButton>);
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(run).not.toHaveBeenCalled();
  });

  it("exposes field names and invalid state", () => {
    render(<><TextField aria-label="Title" aria-invalid="true" /><SearchField aria-label="Search files" /></>);
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("searchbox", { name: "Search files" })).toBeInTheDocument();
  });

  it("changes a controlled checkbox and switch", () => {
    function Example() {
      const [checked, setChecked] = useState(false);
      return <><Checkbox label="Include notes" checked={checked} onChange={setChecked} /><Switch label="Include notes switch" checked={checked} onChange={setChecked} /></>;
    }
    render(<Example />);
    fireEvent.click(screen.getByRole("checkbox", { name: "Include notes" }));
    expect(screen.getByRole("switch", { name: "Include notes switch" })).toBeChecked();
    fireEvent.click(screen.getByRole("switch", { name: "Include notes switch" }));
    expect(screen.getByRole("checkbox", { name: "Include notes" })).not.toBeChecked();
  });

  it("shares controlled choice state and respects disabled options", () => {
    function Example() {
      const [value, setValue] = useState("text");
      const options = [{ value: "text", label: "Text" }, { value: "tex", label: "LaTeX" }, { value: "pdf", label: "PDF", disabled: true }];
      return <><RadioGroup label="Format" value={value} onChange={setValue} options={options} /><SegmentedControl label="Format segments" value={value} onChange={setValue} options={options} /></>;
    }
    render(<Example />);
    const [latex] = screen.getAllByRole("radio", { name: "LaTeX" });
    if (!latex) throw new Error("Missing radio");
    fireEvent.click(latex);
    for (const radio of screen.getAllByRole("radio", { name: "LaTeX" })) expect(radio).toBeChecked();
    for (const radio of screen.getAllByRole("radio", { name: "PDF" })) expect(radio).toBeDisabled();
  });
});
