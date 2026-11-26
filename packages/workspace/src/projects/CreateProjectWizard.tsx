import { GlassButton, GlassGroup, Icon, ViewSelect } from "@fibli/ui";
import { useEffect, useRef, useState } from "react";
import type { Cover, FileKind, Folder, Project, ProjectFile } from "../model";
import { Atmosphere, CoverView } from "./CoverView";
import { createLocalCover, offlineCovers } from "./covers";
import styles from "./ProjectsLibrary.module.css";

const templates = [
  {
    id: "novel",
    name: "Literary",
    genres: ["Coming-of-age", "Literary fiction", "Romance"],
    format: "md",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    genres: ["Epic fantasy", "Urban fantasy", "Historical fantasy"],
    format: "md",
  },
  {
    id: "scifi",
    name: "Science fiction",
    genres: ["Space opera", "Hard science fiction", "Dystopia"],
    format: "md",
  },
  {
    id: "thesis",
    name: "Thesis",
    genres: ["Computer science", "Science", "Humanities"],
    format: "tex",
  },
  {
    id: "paper",
    name: "Research paper",
    genres: ["Physics and mathematics", "Computer science", "Other"],
    format: "tex",
  },
  { id: "blank", name: "Blank project", genres: ["Personal"], format: "md" },
] as const;

export function createProject(
  title: string,
  category: string,
  format: "md" | "tex",
  template: string,
  cover: Cover | null,
): Project {
  const folders: Folder[] = [];
  const files: ProjectFile[] = [];
  const addFolder = (name: string) => {
    const folder = { id: crypto.randomUUID(), name, parentId: null };
    folders.push(folder);
    return folder.id;
  };
  const addFile = (name: string, kind: FileKind, folderId: string | null) =>
    files.push({ id: crypto.randomUUID(), title: name, kind, folderId, body: "", starred: false });
  if (template === "thesis" || template === "paper") {
    const manuscript = addFolder(template === "thesis" ? "Chapters" : "Article");
    addFile(format === "tex" ? "main.tex" : "Manuscript", format, manuscript);
    addFile("references.bib", "bib", addFolder("Bibliography"));
    addFile("data.csv", "csv", addFolder("Data and figures"));
  } else if (template !== "blank") {
    const manuscript = addFolder("Manuscript");
    addFile("Chapter 1", format, manuscript);
    addFile("Chapter 2", format, manuscript);
    const world = addFolder("Characters and places");
    addFile("Characters", "md", world);
    addFile("Outline", "md", addFolder("Notes and planning"));
  }
  return { id: crypto.randomUUID(), title, category, premise: "", cover, folders, files };
}

export function CreateProjectWizard({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (project: Project) => void;
}) {
  const [title, setTitle] = useState("");
  const [templateId, setTemplateId] = useState<string>("novel");
  const [genre, setGenre] = useState<string>("Coming-of-age");
  const [format, setFormat] = useState<"md" | "tex">("md");
  const [cover, setCover] = useState<Cover | null>(offlineCovers[0] ?? null);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const custom = useRef<string | null>(null);
  const template = templates.find((item) => item.id === templateId) ?? templates[0];

  useEffect(
    () => () => {
      if (custom.current) URL.revokeObjectURL(custom.current);
    },
    [],
  );
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  function chooseCover(next: Cover | null) {
    if (custom.current && custom.current !== next?.url) URL.revokeObjectURL(custom.current);
    custom.current = next?.url.startsWith("blob:") ? next.url : null;
    setCover(next);
  }

  return (
    <div className={`fibli-root ${styles.library}`}>
      <Atmosphere cover={cover} centered />
      <header className={styles.homeBar}>
        <GlassButton variant="ghost" onClick={onCancel}>
          <Icon name="left" /> Projects
        </GlassButton>
      </header>
      <main className={styles.createStage} aria-label="Create project">
        <form
          className={styles.createCenter}
          onSubmit={(event) => {
            event.preventDefault();
            if (!title.trim()) return;
            const project = createProject(title.trim(), genre, format, templateId, cover);
            custom.current = null; // ownership transfers to the application
            onCreate(project);
          }}
        >
          <label htmlFor="create-title" className={styles.createKicker}>
            New project
          </label>
          <input
            id="create-title"
            className={styles.createTitle}
            placeholder="Project title"
            autoComplete="off"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <div className={styles.createOptions}>
            <ViewSelect label="Template" className={styles.createField} value={templateId}
              options={templates.map((item) => ({ value: item.id, label: item.name }))}
              onChange={(value) => {
                const next = templates.find((item) => item.id === value);
                if (!next) return;
                setTemplateId(next.id);
                setGenre(next.genres[0]);
                setFormat(next.format);
              }} />
            <ViewSelect label="Genre" className={styles.createField} value={genre}
              options={template.genres.map((item) => ({ value: item, label: item }))}
              onChange={setGenre} />
            <GlassGroup className={styles.createSegment}>
              <GlassButton
                variant="ghost"
                aria-pressed={format === "md"}
                onClick={() => setFormat("md")}
              >
                Text
              </GlassButton>
              <GlassButton
                variant="ghost"
                aria-pressed={format === "tex"}
                onClick={() => setFormat("tex")}
              >
                LaTeX
              </GlassButton>
            </GlassGroup>
          </div>
          <GlassButton className={styles.primary} type="submit" disabled={!title.trim()}>
            Create project
          </GlassButton>
        </form>
        <div className={styles.createFoot}>
          {error && <p role="alert">{error}</p>}
          <span>{cover?.name ?? "No cover"}</span>
          <fieldset className={styles.dock} aria-label="Project cover">
            <button
              type="button"
              className={styles.addThumb}
              aria-label="Upload image or video"
              onClick={() => fileInput.current?.click()}
            >
              <Icon name="upload" size={22} />
            </button>
            {cover?.url.startsWith("blob:") && (
              <button
                type="button"
                className={styles.thumbnail}
                aria-pressed="true"
                onClick={() => fileInput.current?.click()}
              >
                <CoverView cover={cover} thumbnail />
                <span>{cover.name}</span>
              </button>
            )}
            {offlineCovers.map((item) => (
              <button
                key={item.name}
                type="button"
                className={styles.thumbnail}
                aria-pressed={cover?.url === item.url}
                onClick={() => chooseCover(item)}
              >
                <CoverView cover={item} thumbnail />
                <span>{item.name}</span>
              </button>
            ))}
            <button
              type="button"
              className={styles.addThumb}
              aria-label="No cover"
              aria-pressed={cover === null}
              onClick={() => chooseCover(null)}
            >
              <Icon name="close" />
            </button>
          </fieldset>
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif,video/mp4,video/webm"
          hidden
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            event.currentTarget.value = "";
            if (file) {
              try {
                chooseCover(createLocalCover(file));
                setError("");
              } catch (cause) {
                setError(String(cause));
              }
            }
          }}
        />
      </main>
      <footer className={styles.footer}>Session preview · projects are not saved to disk</footer>
    </div>
  );
}
