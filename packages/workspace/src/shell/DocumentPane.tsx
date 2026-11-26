import { GlassButton, Icon } from "@fibli/ui";
import { useId } from "react";
import type { Project, ProjectFile } from "../model";
import styles from "./WorkspaceShell.module.css";

export function DocumentPane({ file, onEdit }: { file: ProjectFile; onEdit: (id: string, patch: Partial<Pick<ProjectFile, "title" | "body">>) => void }) {
  const titleId = useId();
  return (
    <div className={styles.document}>
      <div className={styles.documentHeader}>
        <span><Icon name="file" size={14} /> {file.kind.toUpperCase()}</span>
        <span>Session draft</span>
      </div>
      <div className={styles.documentPage}>
        <label htmlFor={titleId} className={styles.screenReader}>Document title</label>
        <input id={titleId} className={styles.documentTitle} value={file.title} onChange={(event) => onEdit(file.id, { title: event.target.value })} />
        <textarea className={`${styles.documentBody} ${file.kind === "md" || file.kind === "text" ? styles.prose : styles.code}`}
          aria-label="Document text" value={file.body} onChange={(event) => onEdit(file.id, { body: event.target.value })}
          placeholder="Start writing…" spellCheck={file.kind === "md" || file.kind === "text"} />
      </div>
      <div className={styles.documentFooter}>{file.body.trim() ? file.body.trim().split(/\s+/).length : 0} words</div>
    </div>
  );
}

export function ProjectOverview({ project, onOpenFile, onNew, onImport }: { project: Project; onOpenFile: (file: ProjectFile) => void; onNew: () => void; onImport: () => void }) {
  return (
    <section className={styles.overview}>
      <div className={styles.overviewMeta}>{project.category}</div>
      <h1>{project.title}</h1>
      {project.premise && <p className={styles.premise}>{project.premise}</p>}
      <div className={styles.overviewActions}>
        <GlassButton variant="solid" onClick={onNew}><Icon name="plus" /> New text sheet</GlassButton>
        <GlassButton onClick={onImport}><Icon name="upload" /> Import text files</GlassButton>
      </div>
      <h2>Recent documents</h2>
      {project.files.length === 0 ? <p className={styles.muted}>Create a document to begin.</p> : project.files.slice().reverse().slice(0, 6).map((file) => (
        <button type="button" className={styles.documentRow} key={file.id} onClick={() => onOpenFile(file)}>
          <Icon name="file" /><span>{file.title}</span><small>{file.kind.toUpperCase()}</small><Icon name="right" size={14} />
        </button>
      ))}
    </section>
  );
}

export function AllFiles({ project, onOpenFile }: { project: Project; onOpenFile: (file: ProjectFile) => void }) {
  return (
    <section className={styles.overview}>
      <h1>All files</h1>
      {project.files.length === 0 ? <p className={styles.muted}>No files yet.</p> : project.files.map((file) => (
        <button type="button" className={styles.documentRow} key={file.id} onClick={() => onOpenFile(file)}>
          <Icon name="file" /><span>{file.title}</span><small>{file.kind.toUpperCase()}</small><Icon name="right" size={14} />
        </button>
      ))}
    </section>
  );
}
