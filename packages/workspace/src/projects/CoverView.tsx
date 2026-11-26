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
    return <CoverImage key={cover.url} cover={cover} className={styles.coverMedia} />;
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

export function CoverImage({ cover, className }: { cover: Cover; className?: string | undefined }) {
  const [failed, setFailed] = useState(false);
  const src = failed ? cover.fallbackUrl : cover.url;
  if (!src) return <div className={styles.coverFallback} aria-hidden="true" />;
  return <img className={className} src={src} alt="" draggable={false} referrerPolicy="no-referrer"
    onError={() => setFailed(true)} />;
}

export function Atmosphere({ cover, centered = false, ambient = false }: {
  cover: Cover | null;
  centered?: boolean;
  ambient?: boolean;
}) {
  return (
    <div className={`${styles.atmosphere} ${centered ? styles.centered : ""} ${ambient ? styles.ambient : ""}`} aria-hidden="true">
      <div className={styles.atmosphereLayer} key={cover?.url ?? "empty"}>
        <CoverView cover={ambient && cover?.type === "video" ? null : cover} />
      </div>
      <div className={styles.scrim} />
    </div>
  );
}
