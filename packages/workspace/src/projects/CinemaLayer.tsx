import type { Project } from "../model";
import styles from "./CinemaLayer.module.css";
import { Atmosphere } from "./CoverView";

export interface CinemaState {
  project: Project;
  phase: "hold" | "opening";
}

export function CinemaLayer({ state }: { state: CinemaState | null }) {
  const phase = state?.phase ?? "idle";
  return (
    <div className={styles.layer} data-phase={phase} aria-hidden="true">
      {state && (
        <div className={styles.scene}>
          <Atmosphere cover={state.project.cover} centered />
        </div>
      )}
      <div className={`${styles.bar} ${styles.top}`} />
      <div className={`${styles.bar} ${styles.bottom}`} />
      {state && (
        <div className={styles.title}>
          <span>{state.project.category}</span>
          <h2>{state.project.title}</h2>
        </div>
      )}
    </div>
  );
}
