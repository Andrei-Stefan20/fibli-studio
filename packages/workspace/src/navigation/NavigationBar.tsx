import { IconButton } from "@fibli/ui";
import { CreateMenu, type CreateMenuProps } from "./CreateMenu";
import { DocumentTabs, type DocumentTabsProps } from "./DocumentTabs";
import { ProjectSelector, type ProjectSelectorProps } from "./ProjectSelector";
import styles from "./Navigation.module.css";

export function NavigationBar({
  selector, tabs, create, sidebar, inspector, onToggleSidebar, onToggleInspector,
}: {
  selector: ProjectSelectorProps;
  tabs: DocumentTabsProps;
  create: CreateMenuProps;
  sidebar: boolean;
  inspector: boolean;
  onToggleSidebar: () => void;
  onToggleInspector: () => void;
}) {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <IconButton icon="sidebar" label="Toggle library (⌘1)" aria-pressed={sidebar} onClick={onToggleSidebar} />
        <ProjectSelector {...selector} />
      </div>
      <div className={styles.center}>
        <DocumentTabs {...tabs} />
        <CreateMenu {...create} />
      </div>
      <div className={styles.right}>
        <IconButton icon="search" label="Search project (⌘K)" onClick={selector.onSearch} />
        <IconButton icon="inspector" label="Toggle inspector (⌘2)" aria-pressed={inspector} onClick={onToggleInspector} />
      </div>
    </header>
  );
}
