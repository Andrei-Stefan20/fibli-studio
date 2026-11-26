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

const meta = { title: "UI/Navigation and collections" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const nodes: DisclosureNode[] = [
  {
    id: "manuscript",
    label: "Manoscritto",
    children: [
      {
        id: "part",
        label: "Prima parte",
        children: [
          { id: "chapter1", label: "Il porto sotto la pioggia", metadata: "MD" },
          { id: "chapter2", label: "La scala del faro", metadata: "MD" },
        ],
      },
    ],
  },
  {
    id: "notes",
    label: "Appunti e materiali",
    children: [{ id: "data", label: "cronologia-maree.json", icon: "json", metadata: "JSON" }],
  },
];

function CollectionExample() {
  const [selected, setSelected] = useState<string | null>("chapter1");
  const [expanded, setExpanded] = useState(() => new Set(["manuscript", "part", "notes"]));
  const [query, setQuery] = useState("");
  const [view, setView] = useState("list");
  const [path, setPath] = useState([
    { id: "root", label: "Le isole di Sàlma" },
    { id: "manuscript", label: "Manoscritto" },
    { id: "part", label: "Prima parte" },
  ]);
  return (
    <div className="story-inset">
      <h1>Navigation patterns</h1>
      <Toolbar label="Folder controls">
        <ToolbarGroup>
          <IconButton
            icon="grid"
            label="Icons"
            variant="ghost"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
          />
          <IconButton
            icon="file"
            label="List"
            variant="ghost"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          />
        </ToolbarGroup>
        <ToolbarSeparator />
        <SearchField
          aria-label="Find files"
          placeholder="Search…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <output>
          View: {view} · {query || "All files"}
        </output>
      </Toolbar>
      <Breadcrumbs
        items={path}
        onNavigate={(id) =>
          setPath((previous) => previous.slice(0, previous.findIndex((item) => item.id === id) + 1))
        }
      />
      <MaterialSurface material="library" className="story-collection-panel">
        <CollectionSection title="Project">
          <CollectionRow
            label="Home"
            icon="home"
            selected={selected === "home"}
            onSelect={() => setSelected("home")}
          />
          <CollectionRow
            label="All files"
            icon="folder"
            metadata="3"
            selected={selected === "all"}
            onSelect={() => setSelected("all")}
          />
        </CollectionSection>
        <CollectionSection title="Folders and files">
          <DisclosureTree
            label="Project folders"
            nodes={nodes}
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
        </CollectionSection>
      </MaterialSurface>
      <output>Selected item: {selected}</output>
    </div>
  );
}

export const LibraryRowsAndTree: Story = { render: () => <CollectionExample /> };
