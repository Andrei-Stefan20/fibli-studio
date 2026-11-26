import { type Action, ContextActions, Icon, IconButton } from "@fibli/ui";
import { useState } from "react";
import type { Project, ProjectFile } from "../model";
import { CreateMenu, type CreateMenuProps } from "../navigation/CreateMenu";
import styles from "./WorkspaceShell.module.css";

interface Props {
  project: Project;
  activeFileId: string | null;
  create: CreateMenuProps;
  onOpenFile: (file: ProjectFile) => void;
  onHome: () => void;
  onAll: () => void;
  onAI: () => void;
  onStar: (id: string) => void;
  onSplit: (id: string) => void;
  onSearch: () => void;
  width: number;
}

export function LibraryPanel({
  project,
  activeFileId,
  create,
  onOpenFile,
  onHome,
  onAll,
  onAI,
  onStar,
  onSplit,
  onSearch,
  width,
}: Props) {
  const [filter, setFilter] = useState("");
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const query = filter.trim().toLowerCase();
  const matches = (file: ProjectFile) => file.title.toLowerCase().includes(query);

  function fileRow(file: ProjectFile) {
    const actions: Action[] = [
      { kind: "action", id: "open", label: "Open", icon: "file", run: () => onOpenFile(file) },
      {
        kind: "action",
        id: "split",
        label: "Open side by side",
        icon: "split",
        run: () => onSplit(file.id),
      },
      {
        kind: "action",
        id: "star",
        label: file.starred ? "Remove from favorites" : "Add to favorites",
        run: () => onStar(file.id),
      },
    ];
    return (
      <ContextActions key={file.id} className={styles.fileContext} entries={actions}>
        <button
          type="button"
          className={styles.libraryRow}
          aria-current={activeFileId === file.id ? "page" : undefined}
          onClick={() => onOpenFile(file)}
        >
          <Icon name={file.kind === "code" || file.kind === "json" ? "code" : "file"} size={15} />
          <span>{file.title}</span>
        </button>
      </ContextActions>
    );
  }

  function folderTree(parentId: string | null, visited = new Set<string>()) {
    return project.folders
      .filter((folder) => folder.parentId === parentId && !visited.has(folder.id))
      .map((folder) => {
        const open = !collapsed.includes(folder.id);
        const nextVisited = new Set([...visited, folder.id]);
        return (
          <div key={folder.id}>
            <div className={styles.folderRow}>
              <button
                type="button"
                className={styles.libraryRow}
                aria-expanded={open}
                onClick={() => {
                  setCollapsed((previous) =>
                    open ? [...previous, folder.id] : previous.filter((id) => id !== folder.id),
                  );
                  create.onDestination(folder.id);
                }}
              >
                <Icon name={open ? "down" : "right"} size={12} />
                <Icon name="folder" size={15} />
                <span>{folder.name}</span>
                {create.destination === folder.id && <Icon name="check" size={12} />}
              </button>
            </div>
            {open && (
              <div className={styles.folderChildren}>
                {folderTree(folder.id, nextVisited)}
                {project.files.filter((file) => file.folderId === folder.id).map(fileRow)}
              </div>
            )}
          </div>
        );
      });
  }

  const favorites = project.files.filter((file) => file.starred);
  return (
    <aside className={styles.library} aria-label="Project library" style={{ width }}>
      <div className={styles.librarySearch}>
        <Icon name="search" size={15} />
        <input
          aria-label="Filter project files"
          type="search"
          placeholder="Search…"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <button type="button" onClick={onSearch} title="Search all commands and files">
          ⌘K
        </button>
      </div>
      <div className={styles.libraryScroll}>
        {!query && (
          <>
            <div className={styles.navRows}>
              <button type="button" className={styles.libraryRow} onClick={onHome}>
                <Icon name="home" size={15} />
                <span>Home</span>
              </button>
              <button type="button" className={styles.libraryRow} onClick={onAll}>
                <Icon name="folder" size={15} />
                <span>All files</span>
                <small>{project.files.length}</small>
              </button>
              <button type="button" className={styles.libraryRow} onClick={onAI}>
                <Icon name="spark" size={15} />
                <span>Fibli AI</span>
              </button>
            </div>
            {favorites.length > 0 && (
              <div className={styles.librarySection}>
                <div className={styles.sectionHeading}>Favorites</div>
                {favorites.map(fileRow)}
              </div>
            )}
          </>
        )}
        <div className={styles.librarySection}>
          <div className={styles.sectionHeading}>
            <span>{query ? "Search results" : "Folders and files"}</span>
            <div className={styles.sectionActions}>
              {!query && (
                <IconButton
                  variant="ghost"
                  icon={collapsed.length ? "right" : "down"}
                  label="Expand or collapse folders"
                  onClick={() =>
                    setCollapsed(collapsed.length ? [] : project.folders.map((folder) => folder.id))
                  }
                />
              )}
              <CreateMenu {...create} />
            </div>
          </div>
          {query ? (
            project.files.filter(matches).map(fileRow)
          ) : (
            <>
              {folderTree(null)}
              {project.files.filter((file) => file.folderId === null).map(fileRow)}
              {project.files.length === 0 && project.folders.length === 0 && (
                <p className={styles.muted}>No files yet.</p>
              )}
            </>
          )}
          {query && !project.files.some(matches) && (
            <p className={styles.muted}>No matching files.</p>
          )}
        </div>
      </div>
      <div className={styles.libraryFooter}>
        <button
          type="button"
          className={styles.libraryRow}
          onClick={() => create.onDestination(null)}
        >
          <Icon name="folder" size={14} />
          <span>
            New files:{" "}
            {create.destination
              ? (project.folders.find((folder) => folder.id === create.destination)?.name ?? "Root")
              : "Root"}
          </span>
        </button>
      </div>
    </aside>
  );
}
