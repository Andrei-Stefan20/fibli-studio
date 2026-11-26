import type { ComponentPropsWithRef } from "react";
import styles from "./MaterialSurface.module.css";

export type MaterialRole = "navigation" | "overlay" | "library" | "dock" | "scene" | "content";

export function MaterialSurface({ material, className = "", ...props }: ComponentPropsWithRef<"div"> & { material: MaterialRole }) {
  return <div {...props} className={`${styles.surface} ${styles[material]} ${className}`} />;
}
