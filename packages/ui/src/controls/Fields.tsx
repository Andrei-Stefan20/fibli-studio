import type { ComponentPropsWithRef } from "react";
import { Icon } from "../icons/Icon";
import styles from "./Controls.module.css";

type InputProps = ComponentPropsWithRef<"input">;

export function TextField({ className = "", ...props }: InputProps) {
  return <input {...props} className={`${styles.field} ${className}`} />;
}

export function SearchField({ className = "", ...props }: Omit<InputProps, "type">) {
  return (
    <div className={styles.search}>
      <Icon name="search" size={14} />
      <input {...props} type="search" className={`${styles.searchInput} ${className}`} />
    </div>
  );
}
