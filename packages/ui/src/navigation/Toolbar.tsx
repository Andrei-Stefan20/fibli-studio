import type { ReactNode } from "react";
import styles from "./Navigation.module.css";

export function Toolbar({ label, children }: { label: string; children: ReactNode }) {
  return <div className={styles.toolbar} role="group" aria-label={label}>{children}</div>;
}

export function ToolbarGroup({ children }: { children: ReactNode }) {
  return <div className={styles.toolbarGroup}>{children}</div>;
}

export function ToolbarSeparator() {
  return <span aria-hidden="true" className={styles.separator} />;
}
