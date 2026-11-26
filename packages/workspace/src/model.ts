export type FileKind = "md" | "tex" | "bib" | "csv" | "code" | "json" | "text";

export interface Cover {
  type: "image" | "video";
  url: string;
  name: string;
  fallbackUrl?: string;
  credit?: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

export interface ProjectFile {
  id: string;
  title: string;
  kind: FileKind;
  folderId: string | null;
  body: string;
  starred: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  premise: string;
  cover: Cover | null;
  folders: Folder[];
  files: ProjectFile[];
}

export type WorkspaceTab =
  | { id: string; kind: "home" | "all" | "ai" | "settings"; title: string }
  | { id: string; kind: "file"; title: string; fileId: string };

export interface TabState {
  tabs: WorkspaceTab[];
  activeId: string;
}

export const homeTab: WorkspaceTab = { id: "home", kind: "home", title: "Home" };

export function initialTabs(): TabState {
  return { tabs: [homeTab], activeId: homeTab.id };
}

export function openTab(state: TabState, tab: WorkspaceTab): TabState {
  return {
    tabs: state.tabs.some((item) => item.id === tab.id) ? state.tabs : [...state.tabs, tab],
    activeId: tab.id,
  };
}

export function closeTab(state: TabState, id: string): TabState {
  if (id === "home") return state;
  const index = state.tabs.findIndex((tab) => tab.id === id);
  if (index < 0) return state;
  const tabs = state.tabs.filter((tab) => tab.id !== id);
  return {
    tabs,
    activeId: state.activeId === id ? (tabs[Math.max(0, index - 1)]?.id ?? "home") : state.activeId,
  };
}

export function closeOtherTabs(state: TabState, id: string): TabState {
  if (!state.tabs.some((tab) => tab.id === id)) return state;
  return { tabs: state.tabs.filter((tab) => tab.id === id || tab.id === "home"), activeId: id };
}

export function closeTabsToRight(state: TabState, id: string): TabState {
  const index = state.tabs.findIndex((tab) => tab.id === id);
  if (index < 0) return state;
  const tabs = state.tabs.slice(0, index + 1);
  return { tabs, activeId: tabs.some((tab) => tab.id === state.activeId) ? state.activeId : id };
}

export function fileTab(file: ProjectFile): WorkspaceTab {
  return { id: `file:${file.id}`, kind: "file", fileId: file.id, title: file.title };
}

export function folderPath(folders: Folder[], id: string): string {
  const parts: string[] = [];
  const seen = new Set<string>();
  let current = folders.find((folder) => folder.id === id);
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    parts.unshift(current.name);
    const parentId = current.parentId;
    current = folders.find((folder) => folder.id === parentId);
  }
  return parts.join(" / ");
}

export const fileTypes: { kind: FileKind; label: string; extension: string }[] = [
  { kind: "md", label: "Text sheet", extension: ".md" },
  { kind: "tex", label: "LaTeX document", extension: ".tex" },
  { kind: "bib", label: "Bibliography", extension: ".bib" },
  { kind: "csv", label: "Table (CSV)", extension: ".csv" },
  { kind: "code", label: "Code", extension: ".txt" },
  { kind: "json", label: "JSON data", extension: ".json" },
  { kind: "text", label: "Plain text", extension: ".txt" },
];
