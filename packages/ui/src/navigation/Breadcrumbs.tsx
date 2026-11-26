import { Icon } from "../icons/Icon";
import styles from "./Navigation.module.css";

export interface BreadcrumbItem {
  id: string;
  label: string;
}

export function Breadcrumbs({ items, onNavigate, label = "Folder path" }: { items: readonly BreadcrumbItem[]; onNavigate: (id: string) => void; label?: string }) {
  return (
    <nav aria-label={label}>
      <ol className={styles.breadcrumbs}>
        {items.map((item, index) => (
          <li key={item.id}>
            {index > 0 && <Icon name="right" size={11} />}
            {index === items.length - 1
              ? <span aria-current="page">{item.label}</span>
              : <button type="button" onClick={() => onNavigate(item.id)}>{item.label}</button>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
