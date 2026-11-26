import { ContextMenu } from "@base-ui/react/context-menu";
import { Menu } from "@base-ui/react/menu";
import type { ReactNode } from "react";
import { Icon, type IconName } from "../icons/Icon";
import styles from "./ActionMenu.module.css";

export interface Action {
  kind: "action";
  id: string;
  label: string;
  icon?: IconName;
  shortcut?: string;
  checked?: boolean;
  danger?: boolean;
  disabled?: boolean;
  run: () => void;
}

export type MenuEntry = Action
  | { kind: "label"; id: string; label: string }
  | { kind: "separator"; id: string }
  | { kind: "submenu"; id: string; label: string; icon?: IconName; entries: MenuEntry[] };

function EntryContent({ entry }: { entry: Action }) {
  return <>
    {entry.icon && <Icon name={entry.icon} size={15} />}
    <span className={styles.labelText}>{entry.label}</span>
    {entry.checked && <Icon name="check" size={15} />}
    {entry.shortcut && <kbd className={styles.shortcut}>{entry.shortcut}</kbd>}
  </>;
}

function Entries({ entries }: { entries: MenuEntry[] }) {
  return entries.map((entry) => {
    switch (entry.kind) {
      case "separator": return <Menu.Separator key={entry.id} className={styles.separator} />;
      case "label": return <div key={entry.id} className={styles.caption}>{entry.label}</div>;
      case "submenu": return (
        <Menu.SubmenuRoot key={entry.id}>
          <Menu.SubmenuTrigger className={styles.item}>
            {entry.icon && <Icon name={entry.icon} size={15} />}
            <span className={styles.labelText}>{entry.label}</span>
            <Icon name="right" size={14} />
          </Menu.SubmenuTrigger>
          <Menu.Portal>
            <Menu.Positioner className={styles.positioner} side="right" align="start" sideOffset={4}>
              <Menu.Popup className={styles.popup}><Entries entries={entry.entries} /></Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.SubmenuRoot>
      );
      case "action": return (
        <Menu.Item key={entry.id} className={`${styles.item} ${entry.danger ? styles.danger : ""}`}
          disabled={entry.disabled ?? false} onClick={entry.run}>
          <EntryContent entry={entry} />
        </Menu.Item>
      );
    }
    return null;
  });
}

export function ActionMenu({
  label, trigger, entries, className = "", side = "bottom", align = "start",
}: {
  label: string;
  trigger: ReactNode;
  entries: MenuEntry[];
  className?: string | undefined;
  side?: "top" | "bottom";
  align?: "start" | "end";
}) {
  return (
    <Menu.Root>
      <Menu.Trigger aria-label={label} title={label} className={`${styles.trigger} ${className}`}>{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className={styles.positioner} side={side} align={align} sideOffset={6} collisionPadding={8}>
          <Menu.Popup className={styles.popup}><Entries entries={entries} /></Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export function ContextActions({ children, entries, className = "" }: {
  children: ReactNode;
  entries: Action[];
  className?: string | undefined;
}) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className={className}>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner className={styles.positioner}>
          <ContextMenu.Popup className={styles.popup}>
            {entries.map((entry) => (
              <ContextMenu.Item key={entry.id} className={`${styles.item} ${entry.danger ? styles.danger : ""}`}
                onClick={entry.run} disabled={entry.disabled ?? false}>
                <EntryContent entry={entry} />
              </ContextMenu.Item>
            ))}
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
