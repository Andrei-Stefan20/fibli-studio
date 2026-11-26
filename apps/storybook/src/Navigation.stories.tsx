import {
  CreateMenu,
  closeOtherTabs,
  closeTab,
  closeTabsToRight,
  DocumentTabs,
  fileTab,
  initialTabs,
  makePreviewProjects,
  openTab,
  ProjectSelector,
  type TabState,
} from "@fibli/workspace";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = { title: "Workspace/Navigation" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const projects = makePreviewProjects();

function TabExample() {
  const [state, setState] = useState<TabState>(() => {
    let result = initialTabs();
    for (const file of projects[0]?.files ?? []) result = openTab(result, fileTab(file));
    return result;
  });
  const [split, setSplit] = useState("");
  const add = () => {
    const id = crypto.randomUUID();
    setState((previous) => openTab(previous, { id, kind: "file", fileId: id, title: "Untitled" }));
  };
  return (
    <div className="story-inset">
      <div className="story-row">
        <DocumentTabs
          state={state}
          onSelect={(id) => setState((previous) => ({ ...previous, activeId: id }))}
          onClose={(id) => setState((previous) => closeTab(previous, id))}
          onCloseOthers={(id) => setState((previous) => closeOtherTabs(previous, id))}
          onCloseRight={(id) => setState((previous) => closeTabsToRight(previous, id))}
          onNew={add}
          onSplit={setSplit}
        />
        <button type="button" onClick={add}>
          Open tab
        </button>
      </div>
      <p>Active: {state.tabs.find((tab) => tab.id === state.activeId)?.title}</p>
      {split && <p>Split target: {split}</p>}
    </div>
  );
}

function MenuExample() {
  const [selected, setSelected] = useState("p_salma");
  const [destination, setDestination] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [focused, setFocused] = useState(false);
  const project = projects.find((item) => item.id === selected);
  if (!project) return null;
  return (
    <div className="story-inset">
      <div className="story-row">
        <ProjectSelector
          project={project}
          projects={projects}
          focused={focused}
          onSelect={(id) => {
            setSelected(id);
            setDestination(null);
          }}
          onNew={() => setStatus("New project")}
          onSearch={() => setStatus("Search")}
          onAI={() => setStatus("Fibli AI")}
          onFocus={() => setFocused(!focused)}
          onSettings={() => setStatus("Settings")}
          onLibrary={() => setStatus("All projects")}
        />
        <CreateMenu
          folders={project.folders}
          destination={destination}
          onDestination={setDestination}
          onCreate={(kind) => setStatus(`Create ${kind} in ${destination ?? "Root"}`)}
          onFolder={() => setStatus("New folder")}
          onImport={() => setStatus("Import")}
        />
      </div>
      <p>{status || "Open either menu to inspect its hierarchy."}</p>
    </div>
  );
}

export const BrowserTabs: Story = { render: () => <TabExample /> };
export const ProjectAndCreateMenus: Story = { render: () => <MenuExample /> };
