import { Breadcrumbs, DisclosureTree } from "@fibli/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

function TreeExample() {
  const [expanded, setExpanded] = useState(new Set<string>());
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <DisclosureTree
      label="Files"
      nodes={[
        { id: "folder", label: "Manuscript", children: [{ id: "chapter", label: "Chapter one" }] },
      ]}
      selectedId={selected}
      expandedIds={expanded}
      onSelect={setSelected}
      onToggle={(id) =>
        setExpanded((previous) => {
          const next = new Set(previous);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        })
      }
    />
  );
}

describe("Shared collections", () => {
  it("discloses nested files and marks the selected item", () => {
    render(<TreeExample />);
    expect(screen.queryByRole("button", { name: "Chapter one" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Expand Manuscript" }));
    const chapter = screen.getByRole("button", { name: "Chapter one" });
    fireEvent.click(chapter);
    expect(chapter).toHaveAttribute("aria-current", "page");
    fireEvent.click(screen.getByRole("button", { name: "Collapse Manuscript" }));
    expect(screen.queryByRole("button", { name: "Chapter one" })).not.toBeInTheDocument();
  });
  it("uses explicit breadcrumb actions and marks the current location", () => {
    const navigate = vi.fn();
    render(
      <Breadcrumbs
        items={[
          { id: "root", label: "Project" },
          { id: "notes", label: "Notes" },
        ]}
        onNavigate={navigate}
      />,
    );
    expect(screen.getByText("Notes")).toHaveAttribute("aria-current", "page");
    fireEvent.click(screen.getByRole("button", { name: "Project" }));
    expect(navigate).toHaveBeenCalledWith("root");
  });
});
