import {
  CreateProjectWizard,
  fileTab,
  initialTabs,
  makePreviewProjects,
  openTab,
  type Project,
  ProjectsLibrary,
  type TabState,
  WorkspaceShell,
} from "@fibli/workspace";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta = { title: "Screens/R1 application" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function ScreenExample({ initial }: { initial: "library" | "workspace" | "create" }) {
  const [projects, setProjects] = useState(makePreviewProjects);
  const [selected, setSelected] = useState<string | null>("p_salma");
  const [view, setView] = useState(initial);
  const [tabs, setTabs] = useState<TabState>(initialTabs);
  const project = projects.find((item) => item.id === selected);
  const updateProject = (id: string, update: (project: Project) => Project) =>
    setProjects((previous) => previous.map((item) => (item.id === id ? update(item) : item)));
  function open(id: string, fileId?: string) {
    setSelected(id);
    const file = projects.find((item) => item.id === id)?.files.find((item) => item.id === fileId);
    setTabs(file ? openTab(initialTabs(), fileTab(file)) : initialTabs());
    setView("workspace");
  }

  if (view === "create")
    return (
      <CreateProjectWizard
        onCancel={() => setView("library")}
        onCreate={(item) => {
          setProjects((previous) => [...previous, item]);
          setSelected(item.id);
          setTabs(initialTabs());
          setView("workspace");
        }}
      />
    );
  if (view === "workspace" && project)
    return (
      <WorkspaceShell
        key={project.id}
        project={project}
        projects={projects}
        tabs={tabs}
        onTabsChange={setTabs}
        onProjectChange={(update) => updateProject(project.id, update)}
        onSelectProject={open}
        onNewProject={() => setView("create")}
        onLibrary={() => setView("library")}
      />
    );
  return (
    <ProjectsLibrary
      projects={projects}
      selectedId={selected}
      onSelect={setSelected}
      onOpen={open}
      onNew={() => setView("create")}
      onRename={(id, title) => updateProject(id, (item) => ({ ...item, title }))}
      onDuplicate={(id) => {
        const item = projects.find((value) => value.id === id);
        if (item) {
          const copy = { ...item, id: crypto.randomUUID(), title: `${item.title} — Copy` };
          setProjects((previous) => [...previous, copy]);
          setSelected(copy.id);
        }
      }}
      onDelete={(id) => setProjects((previous) => previous.filter((item) => item.id !== id))}
      onCover={(id, file) => {
        const url = URL.createObjectURL(file);
        updateProject(id, (item) => ({
          ...item,
          cover: { type: file.type.startsWith("video/") ? "video" : "image", name: file.name, url },
        }));
      }}
      onImport={(files) => {
        if (!files.length) return;
        const item: Project = {
          id: crypto.randomUUID(),
          title: "Imported documents",
          category: "Personal",
          premise: "",
          cover: null,
          folders: [],
          files: [],
        };
        void Promise.all(
          files.map(async (file) => ({
            id: crypto.randomUUID(),
            title: file.name,
            kind: "text" as const,
            folderId: null,
            body: await file.text(),
            starred: false,
          })),
        ).then((documents) => {
          setProjects((previous) => [...previous, { ...item, files: documents }]);
          setSelected(item.id);
          setTabs(initialTabs());
          setView("workspace");
        });
      }}
    />
  );
}

export const ProjectsLibraryScreen: Story = { render: () => <ScreenExample initial="library" /> };
export const WorkspaceScreen: Story = { render: () => <ScreenExample initial="workspace" /> };
export const CreateProjectScreen: Story = { render: () => <ScreenExample initial="create" /> };
