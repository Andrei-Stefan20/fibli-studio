import {
  type Action,
  ActionMenu,
  ContextActions,
  GlassButton,
  GlassDialog,
  Icon,
  IconButton,
  SceneEntrance,
  type MenuEntry,
  ThemeSettings,
} from "@fibli/ui";
import { useRef, useState } from "react";
import type { Project } from "../model";
import { Atmosphere, CoverView } from "./CoverView";
import styles from "./ProjectsLibrary.module.css";

interface Props {
  projects: Project[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOpen: (id: string, fileId?: string) => void;
  onNew: () => void;
  onRename: (id: string, title: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onCover: (id: string, file: File) => void;
  onImport: (files: File[]) => void;
  notice?: string;
}

export function ProjectsLibrary({
  projects,
  selectedId,
  onSelect,
  onOpen,
  onNew,
  onRename,
  onDuplicate,
  onDelete,
  onCover,
  onImport,
  notice,
}: Props) {
  const [filter, setFilter] = useState("");
  const [settings, setSettings] = useState(false);
  const [rename, setRename] = useState<Project | null>(null);
  const [title, setTitle] = useState("");
  const [deleting, setDeleting] = useState<Project | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const importInput = useRef<HTMLInputElement>(null);
  const coverTarget = useRef<string | null>(null);

  const query = filter.trim().toLowerCase();
  const filtered = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(query) || project.category.toLowerCase().includes(query),
  );
  const current = filtered.find((project) => project.id === selectedId) ?? filtered[0] ?? null;
  const last = current?.files.at(-1);

  function actions(project: Project): Action[] {
    return [
      {
        kind: "action",
        id: "rename",
        label: "Rename…",
        icon: "edit",
        run: () => {
          setRename(project);
          setTitle(project.title);
        },
      },
      {
        kind: "action",
        id: "cover",
        label: "Change cover…",
        icon: "image",
        run: () => {
          coverTarget.current = project.id;
          coverInput.current?.click();
        },
      },
      {
        kind: "action",
        id: "duplicate",
        label: "Duplicate",
        icon: "copy",
        run: () => onDuplicate(project.id),
      },
      {
        kind: "action",
        id: "delete",
        label: "Delete…",
        icon: "trash",
        danger: true,
        run: () => setDeleting(project),
      },
    ];
  }
  function projectMenu(project: Project): MenuEntry[] {
    const entries = actions(project);
    return [...entries.slice(0, 3), { kind: "separator", id: "sep-delete" }, ...entries.slice(3)];
  }

  return (
    <div className={`fibli-root ${styles.library}`}>
      <Atmosphere cover={current?.cover ?? null} />
      <header className={styles.homeBar}>
        <div className={styles.brand}>
          <span className={styles.wordmark}>fibli</span>
          {projects.length > 5 && (
            <input
              type="search"
              aria-label="Filter projects"
              placeholder="Filter projects…"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
          )}
        </div>
        <div className={styles.homeActions}>
          <GlassButton onClick={onNew}>
            <Icon name="plus" /> New project
          </GlassButton>
          <GlassButton variant="ghost" onClick={() => importInput.current?.click()}>
            <Icon name="upload" /> Import
          </GlassButton>
          <IconButton
            icon="settings"
            label="Appearance settings"
            onClick={() => setSettings(true)}
          />
        </div>
      </header>
      <main className={styles.stage} aria-label="Projects library">
        <SceneEntrance className={styles.hero} key={current?.id ?? "empty"}>
          {current ? (
            <>
              <div className={styles.meta}>{current.category}</div>
              <h1>{current.title}</h1>
              {current.premise && <p>{current.premise}</p>}
              <div className={styles.heroActions}>
                <GlassButton className={styles.primary} onClick={() => onOpen(current.id)}>
                  Open project
                </GlassButton>
                {last && (
                  <GlassButton onClick={() => onOpen(current.id, last.id)}>
                    <Icon name="edit" /> Resume “{last.title}”
                  </GlassButton>
                )}
                <ActionMenu
                  label="Project actions"
                  trigger={<Icon name="more" />}
                  entries={projectMenu(current)}
                  side="top"
                  className={styles.more}
                />
              </div>
            </>
          ) : (
            <>
              <h1>{query ? "No matching projects" : "No projects yet"}</h1>
              <div className={styles.heroActions}>
                <GlassButton
                  className={styles.primary}
                  onClick={query ? () => setFilter("") : onNew}
                >
                  {query ? "Show all projects" : "New project"}
                </GlassButton>
              </div>
            </>
          )}
        </SceneEntrance>
        <fieldset className={styles.dock} aria-label="Your projects">
          {filtered.map((project) => (
            <ContextActions
              key={project.id}
              className={styles.thumbContext}
              entries={[
                {
                  kind: "action",
                  id: "open",
                  label: "Open project",
                  icon: "folder",
                  run: () => onOpen(project.id),
                },
                ...actions(project),
              ]}
            >
              <button
                type="button"
                className={styles.thumbnail}
                aria-pressed={current?.id === project.id}
                title={project.title}
                onClick={() => onSelect(project.id)}
                onDoubleClick={() => onOpen(project.id)}
              >
                <CoverView cover={project.cover} thumbnail />
                <span>{project.title}</span>
              </button>
            </ContextActions>
          ))}
          <button
            type="button"
            className={styles.addThumb}
            aria-label="New project from dock"
            onClick={onNew}
          >
            <Icon name="plus" size={22} />
          </button>
        </fieldset>
      </main>
      <footer className={styles.footer}>
        {notice || "Session preview · projects are not saved to disk"}
        {current?.cover?.credit && <span className={styles.coverCredit}>{current.cover.credit}</span>}
      </footer>
      <input
        ref={coverInput}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif,video/mp4,video/webm"
        hidden
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          const id = coverTarget.current;
          if (file && id) onCover(id, file);
          event.currentTarget.value = "";
        }}
      />
      <input
        ref={importInput}
        type="file"
        accept=".md,.txt,.tex,.bib,.csv,.tsv,.json,.js,.ts,.py,.rs,.html"
        multiple
        hidden
        onChange={(event) => {
          onImport(Array.from(event.currentTarget.files ?? []));
          event.currentTarget.value = "";
        }}
      />
      <GlassDialog title="Appearance" open={settings} onOpenChange={setSettings}>
        <ThemeSettings />
      </GlassDialog>
      <GlassDialog
        title="Rename project"
        open={rename !== null}
        onOpenChange={(open) => {
          if (!open) setRename(null);
        }}
      >
        <form
          className={styles.dialogForm}
          onSubmit={(event) => {
            event.preventDefault();
            if (rename && title.trim()) {
              onRename(rename.id, title.trim());
              setRename(null);
            }
          }}
        >
          <label htmlFor="rename-project">Title</label>
          <input
            id="rename-project"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <GlassButton type="submit" variant="solid" disabled={!title.trim()}>
            Rename
          </GlassButton>
        </form>
      </GlassDialog>
      <GlassDialog
        title="Delete project?"
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
      >
        <p>Delete “{deleting?.title}” and its session documents? This cannot be undone.</p>
        <div className={styles.dialogActions}>
          <GlassButton onClick={() => setDeleting(null)}>Cancel</GlassButton>
          <GlassButton
            variant="solid"
            onClick={() => {
              if (deleting) onDelete(deleting.id);
              setDeleting(null);
            }}
          >
            Delete project
          </GlassButton>
        </div>
      </GlassDialog>
    </div>
  );
}
