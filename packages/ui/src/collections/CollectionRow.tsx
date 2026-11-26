import type { ReactNode } from "react";
import { Icon, type IconName } from "../icons/Icon";
import styles from "./Collections.module.css";

export function CollectionRow({
  label,
  icon,
  metadata,
  selected = false,
  onSelect,
  trailing,
  leaf = false,
}: {
  label: string;
  icon: IconName;
  metadata?: ReactNode;
  selected?: boolean;
  onSelect: () => void;
  trailing?: ReactNode;
  leaf?: boolean;
}) {
  return (
    <div className={styles.row} data-selected={selected}>
      <button
        type="button"
        className={styles.rowButton}
        data-leaf={leaf}
        aria-current={selected ? "page" : undefined}
        onClick={onSelect}
      >
        <Icon name={icon} size={16} />
        <span className={styles.name}>{label}</span>
        {metadata != null && <span className={styles.metadata}>{metadata}</span>}
      </button>
      {trailing && <div className={styles.trailing}>{trailing}</div>}
    </div>
  );
}

export function CollectionSection({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <header className={styles.sectionHeading}>
        <h2>{title}</h2>
        {actions && <div className={styles.sectionActions}>{actions}</div>}
      </header>
      {children}
    </section>
  );
}
