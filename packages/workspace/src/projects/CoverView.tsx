import { Icon } from "@fibli/ui";
import { useEffect, useState } from "react";
import type { Cover } from "../model";
import styles from "./ProjectsLibrary.module.css";

export function CoverView({
  cover,
  thumbnail = false,
}: {
  cover: Cover | null;
  thumbnail?: boolean;
}) {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
  );
  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (cover?.type === "image")
    return <img className={styles.coverMedia} src={cover.url} alt="" draggable={false} />;
  if (cover?.type === "video" && !thumbnail && !reducedMotion) {
    return (
      <video
        className={styles.coverMedia}
        src={cover.url}
        aria-hidden="true"
        tabIndex={-1}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  return (
    <div className={styles.coverFallback} aria-hidden="true">
      {thumbnail && <Icon name="image" size={23} />}
    </div>
  );
}

export function Atmosphere({ cover }: { cover: Cover | null }) {
  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <CoverView cover={cover} />
      <div className={styles.scrim} />
    </div>
  );
}
