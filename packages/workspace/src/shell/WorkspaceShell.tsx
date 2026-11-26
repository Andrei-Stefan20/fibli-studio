import { GlassButton, GlassDialog, GlassGroup, Icon, IconButton, PanelTransition, PaneTransition, ThemeSettings } from "@fibli/ui";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  closeOtherTabs,
  closeTab,
  closeTabsToRight,
  type FileKind,
  fileTab,
  folderPath,
  homeTab,
  openTab,
  type Project,
  type ProjectFile,
  type TabState,
  type WorkspaceTab,
} from "../model";
import type { CreateMenuProps } from "../navigation/CreateMenu";
import { NavigationBar } from "../navigation/NavigationBar";
import { Atmosphere } from "../projects/CoverView";
import { AllFiles, DocumentPane, ProjectOverview } from "./DocumentPane";
import { LibraryPanel } from "./LibraryPanel";
import { ResizeHandle } from "./ResizeHandle";
import styles from "./WorkspaceShell.module.css";

export interface WorkspaceShellProps {
  project: Project;
  projects: Project[];
  tabs: TabState;
  onTabsChange: (update: (state: TabState) => TabState) => void;
  onProjectChange: (update: (project: Project) => Project) => void;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  onLibrary: () => void;
  diagnostics?: ReactNode;
}

const importKinds: Record<string, FileKind> = {
  md: "md",
  txt: "text",
  tex: "tex",
  bib: "bib",
  csv: "csv",
  tsv: "csv",
  json: "json",
  js: "code",
  ts: "code",
  py: "code",
  rs: "code",
  html: "code",
};

export function WorkspaceShell({
  project,
  projects,
  tabs,
  onTabsChange,
  onProjectChange,
  onSelectProject,
  onNewProject,
  onLibrary,
  diagnostics,
}: WorkspaceShellProps) {
  const [sidebar, setSidebar] = useState(true);
  const [inspector, setInspector] = useState(false);
  const [focused, setFocused] = useState(false);
  const [leftWidth, setLeftWidth] = useState(236);
  const [rightWidth, setRightWidth] = useState(260);
  const [destination, setDestination] = useState<string | null>(null);
  const [splitId, setSplitId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [folderDialog, setFolderDialog] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [notice, setNotice] = useState("");
  const [inspectorMode, setInspectorMode] = useState<"details" | "ai">("details");
  const fileInput = useRef<HTMLInputElement>(null);

  const active = tabs.tabs.find((tab) => tab.id === tabs.activeId) ?? homeTab;
  const activeFile =
    active.kind === "file" ? project.files.find((file) => file.id === active.fileId) : undefined;
  const splitFile = project.files.find((file) => file.id === splitId);
  const displayedTabs: TabState = {
    ...tabs,
    tabs: tabs.tabs.map((tab) =>
      tab.kind === "file"
        ? {
            ...tab,
            title: project.files.find((file) => file.id === tab.fileId)?.title || "Untitled",
          }
        : tab,
    ),
  };

  const selectTab = (id: string) => onTabsChange((state) => ({ ...state, activeId: id }));
  const showTab = (tab: WorkspaceTab) => onTabsChange((state) => openTab(state, tab));
  const openFile = (file: ProjectFile) => showTab(fileTab(file));
  const openSettings = () => showTab({ id: "settings", kind: "settings", title: "Settings" });
  const openAI = () => showTab({ id: "ai", kind: "ai", title: "Fibli AI" });
  const openAll = () => showTab({ id: "all", kind: "all", title: "All files" });
  const openSearch = () => {
    setSearch("");
    setSearchOpen(true);
  };
  const toggleSidebar = () => setSidebar((value) => !value);
  const toggleInspector = () => setInspector((value) => !value);
  const toggleFocus = () => setFocused((value) => !value);
  const editFile = (id: string, patch: Partial<Pick<ProjectFile, "title" | "body">>) =>
    onProjectChange((previous) => ({
      ...previous,
      files: previous.files.map((file) => (file.id === id ? { ...file, ...patch } : file)),
    }));
  const starFile = (id: string) =>
    onProjectChange((previous) => ({
      ...previous,
      files: previous.files.map((file) =>
        file.id === id ? { ...file, starred: !file.starred } : file,
      ),
    }));

  function createFile(kind: FileKind) {
    const file: ProjectFile = {
      id: crypto.randomUUID(),
      title: "Untitled",
      kind,
      folderId: destination,
      body: kind === "json" ? "{}" : "",
      starred: false,
    };
    onProjectChange((previous) => ({ ...previous, files: [...previous.files, file] }));
    openFile(file);
  }

  function createFolder() {
    const name = folderName.trim();
    if (!name) return;
    const id = crypto.randomUUID();
    onProjectChange((previous) => ({
      ...previous,
      folders: [...previous.folders, { id, name, parentId: destination }],
    }));
    setDestination(id);
    setFolderDialog(false);
    setFolderName("");
  }

  async function importFiles(input: HTMLInputElement) {
    const files = Array.from(input.files ?? []);
    input.value = "";
    const imported: ProjectFile[] = [];
    let skipped = 0;
    for (const file of files) {
      const extension = file.name.split(".").at(-1)?.toLowerCase() ?? "";
      const kind = importKinds[extension];
      if (!kind || file.size > 5 * 1024 * 1024) {
        skipped += 1;
        continue;
      }
      try {
        imported.push({
          id: crypto.randomUUID(),
          title: file.name,
          kind,
          folderId: destination,
          body: await file.text(),
          starred: false,
        });
      } catch {
        skipped += 1;
      }
    }
    if (imported.length) {
      onProjectChange((previous) => ({ ...previous, files: [...previous.files, ...imported] }));
      const first = imported[0];
      if (first) openFile(first);
    }
    setNotice(
      `${imported.length} imported${skipped ? `, ${skipped} skipped (unsupported or over 5 MiB)` : ""}.`,
    );
  }

  const create: CreateMenuProps = {
    folders: project.folders,
    destination,
    onDestination: setDestination,
    onCreate: createFile,
    onFolder: () => {
      setFolderName("");
      setFolderDialog(true);
    },
    onImport: () => fileInput.current?.click(),
  };

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape" && focused && !searchOpen && !folderDialog) {
        setFocused(false);
        return;
      }
      if (!(event.metaKey || event.ctrlKey) || event.altKey || searchOpen || folderDialog) return;
      const key = event.key.toLowerCase();
      const commands: Record<string, () => void> = {
        "1": toggleSidebar,
        "2": toggleInspector,
        k: openSearch,
        j: openAI,
        t: () => createFile("md"),
        w: () => onTabsChange((state) => closeTab(state, state.activeId)),
        ",": openSettings,
        "\\": toggleFocus,
      };
      const run = commands[key];
      if (run) {
        event.preventDefault();
        run();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const matchingFiles = project.files.filter((file) =>
    file.title.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const commands = [
    { label: "New text sheet", run: () => createFile("md") },
    { label: "All files", run: openAll },
    { label: "Settings", run: openSettings },
    { label: "Focus mode", run: toggleFocus },
    { label: "All projects", run: onLibrary },
  ].filter((item) => item.label.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className={`fibli-root ${styles.studio}`}>
      <Atmosphere cover={project.cover} ambient />
      {!focused && (
        <NavigationBar
          selector={{
            project,
            projects,
            focused,
            onSelect: onSelectProject,
            onNew: onNewProject,
            onSearch: openSearch,
            onAI: openAI,
            onFocus: toggleFocus,
            onSettings: openSettings,
            onLibrary,
          }}
          tabs={{
            state: displayedTabs,
            onSelect: selectTab,
            onClose: (id) => onTabsChange((state) => closeTab(state, id)),
            onCloseOthers: (id) => onTabsChange((state) => closeOtherTabs(state, id)),
            onCloseRight: (id) => onTabsChange((state) => closeTabsToRight(state, id)),
            onNew: () => createFile("md"),
            onSplit: setSplitId,
          }}
          create={create}
          sidebar={sidebar}
          inspector={inspector}
          onToggleSidebar={toggleSidebar}
          onToggleInspector={toggleInspector}
        />
      )}
      {focused && (
        <GlassButton className={styles.focusExit} onClick={toggleFocus}>
          Exit Focus <kbd>Esc</kbd>
        </GlassButton>
      )}
      <div className={styles.body}>
        <PanelTransition open={!focused && sidebar} width={leftWidth + 6} className={styles.leftPanel}>
            <LibraryPanel
              project={project}
              activeFileId={activeFile?.id ?? null}
              create={create}
              onOpenFile={openFile}
              onHome={() => showTab(homeTab)}
              onAll={openAll}
              onAI={openAI}
              onStar={starFile}
              onSplit={setSplitId}
              onSearch={openSearch}
              width={leftWidth}
            />
            <ResizeHandle side="left" value={leftWidth} onChange={setLeftWidth} />
        </PanelTransition>
        <main className={styles.content} aria-label={active.title}>
          <PaneTransition className={styles.pane} activeId={active.id} labelledBy={focused ? undefined : `tab-${active.id}`}>
            {active.kind === "home" && (
              <ProjectOverview
                project={project}
                onOpenFile={openFile}
                onNew={() => createFile("md")}
                onImport={create.onImport}
              />
            )}
            {active.kind === "all" && <AllFiles project={project} onOpenFile={openFile} />}
            {active.kind === "file" &&
              (activeFile ? (
                <DocumentPane file={activeFile} onEdit={editFile} />
              ) : (
                <p className={styles.muted}>Document not found.</p>
              ))}
            {active.kind === "settings" && (
              <section className={styles.overview}>
                <h1>Settings</h1>
                <ThemeSettings />
                {diagnostics}
              </section>
            )}
            {active.kind === "ai" && (
              <section className={styles.overview}>
                <h1>Fibli AI</h1>
                <p className={styles.muted}>
                  AI providers are not connected in this foundation build.
                </p>
                <GlassButton onClick={openSettings}>Settings</GlassButton>
              </section>
            )}
          </PaneTransition>
          {splitFile && !focused && (
            <div className={styles.splitPane}>
              <div className={styles.splitHeader}>
                <span>{splitFile.title}</span>
                <IconButton
                  variant="ghost"
                  label="Close split pane"
                  icon="close"
                  onClick={() => setSplitId(null)}
                />
              </div>
              <DocumentPane file={splitFile} onEdit={editFile} />
            </div>
          )}
        </main>
        <PanelTransition open={!focused && inspector} width={rightWidth + 6} className={styles.rightPanel}>
            <ResizeHandle side="right" value={rightWidth} onChange={setRightWidth} />
            <aside
              className={styles.inspector}
              aria-label="Assistant and details"
              style={{ width: rightWidth }}
            >
              <GlassGroup>
                <GlassButton
                  variant="ghost"
                  aria-pressed={inspectorMode === "details"}
                  onClick={() => setInspectorMode("details")}
                >
                  Details
                </GlassButton>
                <GlassButton
                  variant="ghost"
                  aria-pressed={inspectorMode === "ai"}
                  onClick={() => setInspectorMode("ai")}
                >
                  <Icon name="spark" size={14} /> Fibli AI
                </GlassButton>
              </GlassGroup>
              {inspectorMode === "ai" ? (
                <div className={styles.inspectorBody}>
                  <p className={styles.muted}>No AI provider configured.</p>
                  <GlassButton onClick={openAI}>Open Fibli AI</GlassButton>
                </div>
              ) : (
                <div className={styles.inspectorBody}>
                  <h2>{activeFile?.title || project.title}</h2>
                  <dl>
                    <dt>{activeFile ? "Format" : "Category"}</dt>
                    <dd>{activeFile?.kind.toUpperCase() ?? project.category}</dd>
                    <dt>{activeFile ? "Folder" : "Files"}</dt>
                    <dd>
                      {activeFile
                        ? activeFile.folderId
                          ? folderPath(project.folders, activeFile.folderId)
                          : "Root"
                        : project.files.length}
                    </dd>
                    {activeFile && (
                      <>
                        <dt>Words</dt>
                        <dd>
                          {activeFile.body.trim() ? activeFile.body.trim().split(/\s+/).length : 0}
                        </dd>
                      </>
                    )}
                  </dl>
                  {activeFile && (
                    <GlassButton
                      aria-pressed={activeFile.starred}
                      onClick={() => starFile(activeFile.id)}
                    >
                      {activeFile.starred ? "Remove from favorites" : "Add to favorites"}
                    </GlassButton>
                  )}
                </div>
              )}
            </aside>
        </PanelTransition>
      </div>
      <footer className={styles.statusBar}>
        <span>{notice || "Session preview · projects are not saved to disk"}</span>
        <span>{project.files.length} files</span>
      </footer>
      <input
        ref={fileInput}
        type="file"
        accept=".md,.txt,.tex,.bib,.csv,.tsv,.json,.js,.ts,.py,.rs,.html"
        multiple
        hidden
        onChange={(event) => {
          void importFiles(event.currentTarget);
        }}
      />
      <GlassDialog open={searchOpen} onOpenChange={setSearchOpen} title="Search project">
        <div className={styles.dialogContent}>
          <input
            type="search"
            aria-label="Search files and commands"
            placeholder="Search files and commands…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {commands.map((command) => (
            <GlassButton
              key={command.label}
              variant="ghost"
              onClick={() => {
                setSearchOpen(false);
                command.run();
              }}
            >
              {command.label}
            </GlassButton>
          ))}
          {matchingFiles.map((file) => (
            <GlassButton
              key={file.id}
              variant="ghost"
              onClick={() => {
                setSearchOpen(false);
                openFile(file);
              }}
            >
              <Icon name="file" /> {file.title}
            </GlassButton>
          ))}
          {!matchingFiles.length && !commands.length && <p>No results.</p>}
        </div>
      </GlassDialog>
      <GlassDialog open={folderDialog} onOpenChange={setFolderDialog} title="New folder">
        <form
          className={styles.dialogContent}
          onSubmit={(event) => {
            event.preventDefault();
            createFolder();
          }}
        >
          <label htmlFor="folder-name">Name</label>
          <input
            id="folder-name"
            value={folderName}
            onChange={(event) => setFolderName(event.target.value)}
            required
          />
          <GlassButton variant="solid" type="submit" disabled={!folderName.trim()}>
            Create folder
          </GlassButton>
        </form>
      </GlassDialog>
    </div>
  );
}
