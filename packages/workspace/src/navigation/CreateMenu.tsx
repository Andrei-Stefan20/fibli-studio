import { ActionMenu, Icon, type MenuEntry } from "@fibli/ui";
import { type FileKind, type Folder, fileTypes, folderPath } from "../model";
import styles from "./Navigation.module.css";

export interface CreateMenuProps {
  folders: Folder[];
  destination: string | null;
  onDestination: (id: string | null) => void;
  onCreate: (kind: FileKind) => void;
  onFolder: () => void;
  onImport: () => void;
}

export function CreateMenu({
  folders,
  destination,
  onDestination,
  onCreate,
  onFolder,
  onImport,
}: CreateMenuProps) {
  const entries: MenuEntry[] = fileTypes.map(({ kind, label }) => ({
    kind: "action",
    id: kind,
    label,
    icon: kind === "bib" ? "book" : kind === "tex" ? "latex" : kind === "csv" ? "table" : kind === "json" ? "json" : kind === "code" ? "code" : "file",
    ...(kind === "md" ? { shortcut: "⌘T" } : {}),
    run: () => onCreate(kind),
  }));

  entries.push(
    { kind: "separator", id: "sep-folders" },
    { kind: "action", id: "new-folder", label: "New folder…", icon: "folder", run: onFolder },
    { kind: "action", id: "import", label: "Import text files…", icon: "upload", run: onImport },
  );

  if (folders.length) {
    entries.push(
      { kind: "separator", id: "sep-destination" },
      {
        kind: "submenu",
        id: "destination",
        label: `Destination: ${destination ? folderPath(folders, destination) : "Root"}`,
        icon: "folder",
        entries: [
          { kind: "label", id: "hint", label: "Create new files in" },
          {
            kind: "action",
            id: "root",
            label: "Root",
            checked: destination === null,
            closeOnClick: false,
            run: () => onDestination(null),
          },
          { kind: "separator", id: "sep-root" },
          ...folders.map(
            (folder): MenuEntry => ({
              kind: "action",
              id: folder.id,
              label: folderPath(folders, folder.id),
              checked: destination === folder.id,
              closeOnClick: false,
              run: () => onDestination(folder.id),
            }),
          ),
        ],
      },
    );
  }
  return (
    <ActionMenu
      label="New document or tab"
      trigger={<Icon name="plus" />}
      entries={entries}
      className={styles.circle}
    />
  );
}
