import {
  Breadcrumbs,
  CollectionRow,
  CollectionSection,
  type DisclosureNode,
  DisclosureTree,
  IconButton,
  MaterialSurface,
  SearchField,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Specimen } from "./catalog/Specimen";

const meta = { title: "04 Navigation and collections/Individual components" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function ToolbarExample() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("List");
  return (
    <Specimen title="Toolbar" description="A compact grouping of related controls, separated by function."
      usage="Group related actions and give icon-only controls readable accessible labels. This specimen does not implement a file view."
      review="Check alignment, focus order, selected controls and long search text. The toolbar is a group, not a roving-tabindex widget.">
      <Toolbar label="View controls">
        <ToolbarGroup>
          <IconButton icon="file" label="List" aria-pressed={selected === "List"} onClick={() => setSelected("List")} />
          <IconButton icon="grid" label="Grid" aria-pressed={selected === "Grid"} onClick={() => setSelected("Grid")} />
        </ToolbarGroup>
        <ToolbarSeparator />
        <SearchField aria-label="Filter examples" value={query} onChange={(event) => setQuery(event.target.value)} />
      </Toolbar>
      <output>{selected} · {query || "No filter"}</output>
    </Specimen>
  );
}

const initialPath = [
  { id: "root", label: "Collection" },
  { id: "folder", label: "Manuscript" },
  { id: "nested", label: "First part" },
];

function BreadcrumbExample() {
  const [path, setPath] = useState(initialPath);
  return (
    <Specimen title="Breadcrumbs" description="An ordered path with explicit ancestor actions."
      usage="Use for hierarchy, not browsing history. The last item represents the current location."
      review="Activate each ancestor, confirm the updated path and inspect long labels.">
      <Breadcrumbs items={path} onNavigate={(id) => setPath((previous) => previous.slice(0, previous.findIndex((item) => item.id === id) + 1))} />
      <button type="button" className="catalog-text-action" onClick={() => setPath(initialPath)}>Reset path</button>
    </Specimen>
  );
}

const nodes: DisclosureNode[] = [
  { id: "folder", label: "Manuscript", children: [
    { id: "part", label: "First part", children: [
      { id: "chapter", label: "A chapter with a longer descriptive title", metadata: "MD" },
      { id: "other", label: "Second chapter", metadata: "MD" },
    ] },
  ] },
  { id: "empty", label: "Empty folder", children: [] },
  { id: "data", label: "Example data", icon: "json", metadata: "JSON" },
];

function DisclosureExample() {
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(() => new Set(["folder", "part"]));
  const [last, setLast] = useState("None");
  return (
    <Specimen title="Collection rows and disclosure"
      description="Selected rows, metadata, trailing actions and nested expandable groups."
      usage="Use the native nested disclosure list for simple hierarchies. Full ARIA tree behavior, drag and drop and Finder views are not implemented."
      review="Expand and collapse, select rows, Tab to trailing actions and inspect text truncation. Confirm that selection does not execute the trailing action.">
      <MaterialSurface material="library" className="story-collection-panel">
        <CollectionSection title="Examples" actions={<IconButton icon="plus" label="Add example" onClick={() => setLast("Add")} />}>
          <CollectionRow label="Reference item" icon="book" metadata="1"
            selected={selected === "reference"} onSelect={() => setSelected("reference")}
            trailing={<IconButton icon="more" label="Item actions" onClick={() => setLast("Item action")} />} />
          <DisclosureTree label="Nested examples" nodes={nodes} selectedId={selected} expandedIds={expanded}
            onSelect={setSelected} onToggle={(id) => setExpanded((previous) => {
              const next = new Set(previous);
              if (next.has(id)) next.delete(id);
              else next.add(id);
              return next;
            })} />
        </CollectionSection>
      </MaterialSurface>
      <output>Selected: {selected || "None"} · Last action: {last}</output>
    </Specimen>
  );
}

export const ToolbarControls: Story = { render: () => <ToolbarExample /> };
export const BreadcrumbPath: Story = { render: () => <BreadcrumbExample /> };
export const RowsAndDisclosure: Story = { render: () => <DisclosureExample /> };
