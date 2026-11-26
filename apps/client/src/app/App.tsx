import { ThemeProvider } from "@fibli/ui";
import {
  CreateProjectWizard,
  createLocalCover,
  fileTab,
  initialTabs,
  makePreviewProjects,
  openTab,
  type Project,
  type ProjectFile,
  ProjectsLibrary,
  type TabState,
  WorkspaceShell,
} from "@fibli/workspace";
import { useEffect, useRef, useState } from "react";
import { RuntimeDiagnostics } from "./RuntimeDiagnostics";
import "./App.css";

type View = "library" | "workspace" | "create";

export function App() {
  const [projects, setProjects] = useState(makePreviewProjects);
  const [selectedId, setSelectedId] = useState<string | null>("p_salma");
  const [view, setView] = useState<View>("library");
  const [returnView, setReturnView] = useState<"library" | "workspace">("library");
  const [sessions, setSessions] = useState<Record<string, TabState>>({});
  const [notice, setNotice] = useState("");
  const ownedUrls = useRef(new Set<string>());
  const selected = projects.find((project) => project.id === selectedId);

  useEffect(() => {
    for (const url of ownedUrls.current) {
      if (!projects.some((project) => project.cover?.url === url)) {
        URL.revokeObjectURL(url);
        ownedUrls.current.delete(url);
      }
    }
  }, [projects]);
  useEffect(() => {
    const urls = ownedUrls.current;
    return () => {
      for (const url of urls) URL.revokeObjectURL(url);
      urls.clear();
    };
  }, []);

  function updateProject(id: string, update: (project: Project) => Project) {
    setProjects((previous) =>
      previous.map((project) => (project.id === id ? update(project) : project)),
    );
  }

  function updateTabs(id: string, update: (state: TabState) => TabState) {
    setSessions((previous) => ({ ...previous, [id]: update(previous[id] ?? initialTabs()) }));
  }

  function showProject(id: string, fileId?: string) {
    const project = projects.find((item) => item.id === id);
    if (!project) return;
    setSelectedId(id);
    setView("workspace");
    const file = project.files.find((item) => item.id === fileId);
    if (file) updateTabs(id, (state) => openTab(state, fileTab(file)));
  }

  function showWizard() {
    setReturnView(view === "workspace" ? "workspace" : "library");
    setView("create");
  }

  function addProject(project: Project) {
    if (project.cover?.url.startsWith("blob:")) ownedUrls.current.add(project.cover.url);
    setProjects((previous) => [...previous, project]);
    setSelectedId(project.id);
    setView("workspace");
  }

  function deleteProject(id: string) {
    setProjects((previous) => previous.filter((project) => project.id !== id));
    setSessions((previous) => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
    if (selectedId === id) setSelectedId(projects.find((project) => project.id !== id)?.id ?? null);
  }

  async function importProject(files: File[]) {
    if (!files.length) return;
    const documents: ProjectFile[] = [];
    for (const file of files) {
      if (
        !/\.(md|txt|tex|bib|csv|tsv|json|js|ts|py|rs|html)$/i.test(file.name) ||
        file.size > 5 * 1024 * 1024
      )
        continue;
      try {
        documents.push({
          id: crypto.randomUUID(),
          title: file.name,
          kind: "text",
          folderId: null,
          starred: false,
          body: await file.text(),
        });
      } catch {
        // Continue with the remaining files.
      }
    }
    if (!documents.length) {
      setNotice("No supported text files could be imported.");
      return;
    }
    addProject({
      id: crypto.randomUUID(),
      title: "Imported documents",
      category: "Personal",
      premise: "",
      cover: null,
      folders: [],
      files: documents,
    });
  }

  return (
    <ThemeProvider>
      {view === "create" ? (
        <CreateProjectWizard onCancel={() => setView(returnView)} onCreate={addProject} />
      ) : view === "workspace" && selected ? (
        <WorkspaceShell
          key={selected.id}
          project={selected}
          projects={projects}
          tabs={sessions[selected.id] ?? initialTabs()}
          onTabsChange={(update) => updateTabs(selected.id, update)}
          onProjectChange={(update) => updateProject(selected.id, update)}
          onSelectProject={showProject}
          onNewProject={showWizard}
          onLibrary={() => setView("library")}
          diagnostics={<RuntimeDiagnostics />}
        />
      ) : (
        <ProjectsLibrary
          projects={projects}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onOpen={showProject}
          onNew={showWizard}
          onRename={(id, title) => updateProject(id, (project) => ({ ...project, title }))}
          onDuplicate={(id) => {
            const project = projects.find((item) => item.id === id);
            if (!project) return;
            const copy = {
              ...project,
              id: crypto.randomUUID(),
              title: `${project.title} — Copy`,
              folders: project.folders.map((folder) => ({ ...folder })),
              files: project.files.map((file) => ({ ...file })),
            };
            setProjects((previous) => [...previous, copy]);
            setSelectedId(copy.id);
          }}
          onDelete={deleteProject}
          onCover={(id, file) => {
            try {
              const cover = createLocalCover(file);
              ownedUrls.current.add(cover.url);
              updateProject(id, (project) => ({ ...project, cover }));
              setNotice("");
            } catch (cause) {
              setNotice(String(cause));
            }
          }}
          onImport={(files) => {
            void importProject(files);
          }}
          notice={notice}
        />
      )}
    </ThemeProvider>
  );
}
