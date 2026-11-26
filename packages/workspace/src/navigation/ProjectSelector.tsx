import { ActionMenu, Icon, type MenuEntry } from "@fibli/ui";
import type { Project } from "../model";
import styles from "./Navigation.module.css";

export interface ProjectSelectorProps {
  project: Project;
  projects: Project[];
  focused: boolean;
  onSelect: (id: string) => void;
  onNew: () => void;
  onSearch: () => void;
  onAI: () => void;
  onFocus: () => void;
  onSettings: () => void;
  onLibrary: () => void;
}

export function ProjectSelector({
  project,
  projects,
  focused,
  onSelect,
  onNew,
  onSearch,
  onAI,
  onFocus,
  onSettings,
  onLibrary,
}: ProjectSelectorProps) {
  const entries: MenuEntry[] = [
    { kind: "label", id: "projects", label: "Switch project" },
    ...projects.map(
      (item): MenuEntry => ({
        kind: "action",
        id: item.id,
        label: item.title,
        checked: item.id === project.id,
        run: () => onSelect(item.id),
      }),
    ),
    { kind: "separator", id: "sep-new" },
    { kind: "action", id: "new", label: "New project…", icon: "plus", run: onNew },
    { kind: "separator", id: "sep-commands" },
    {
      kind: "action",
      id: "search",
      label: "Search…",
      icon: "search",
      shortcut: "⌘K",
      run: onSearch,
    },
    { kind: "action", id: "ai", label: "Fibli AI", icon: "spark", shortcut: "⌘J", run: onAI },
    {
      kind: "action",
      id: "focus",
      label: focused ? "Exit Focus" : "Focus mode",
      icon: "eye",
      run: onFocus,
    },
    {
      kind: "action",
      id: "settings",
      label: "Settings…",
      icon: "settings",
      shortcut: "⌘,",
      run: onSettings,
    },
    { kind: "separator", id: "sep-library" },
    { kind: "action", id: "library", label: "All projects", icon: "left", run: onLibrary },
  ];
  return (
    <ActionMenu
      label={project.title}
      entries={entries}
      className={styles.projectSelector}
      trigger={
        <>
          {project.cover?.type === "image" ? (
            <img className={styles.projectThumbnail} src={project.cover.url} alt="" />
          ) : (
            <Icon name="folder" />
          )}
          <span className={styles.projectName}>{project.title}</span>
          <Icon name="down" size={14} />
        </>
      }
    />
  );
}
