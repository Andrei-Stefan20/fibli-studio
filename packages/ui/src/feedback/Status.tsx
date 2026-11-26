import type { ReactNode } from "react";
import { Icon, type IconName } from "../icons/Icon";
import styles from "./Status.module.css";

export function EmptyState({ title, description, action, icon = "folder" }: {
  title: string; description?: string; action?: ReactNode; icon?: IconName;
}) {
  return (
    <section className={styles.empty}>
      <Icon name={icon} size={24} />
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </section>
  );
}

export function Progress({ label, value, max = 100 }: { label: string; value?: number; max?: number }) {
  return <progress className={styles.progress} aria-label={label} value={value} max={max} />;
}

export function InlineStatus({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "danger" }) {
  return <p className={`${styles.status} ${styles[tone]}`} role={tone === "danger" ? "alert" : "status"}>{children}</p>;
}
