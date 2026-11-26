import { useRef } from "react";
import styles from "./WorkspaceShell.module.css";

export function ResizeHandle({ side, value, onChange }: { side: "left" | "right"; value: number; onChange: (value: number) => void }) {
  const start = useRef<{ x: number; width: number } | null>(null);
  const direction = side === "left" ? 1 : -1;
  const resize = (width: number) => onChange(Math.max(180, Math.min(380, width)));
  return (
    <hr aria-orientation="vertical" aria-label={`Resize ${side} panel`} aria-valuemin={180} aria-valuemax={380}
      aria-valuenow={value} tabIndex={0} className={styles.resize}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        start.current = { x: event.clientX, width: value };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (start.current) resize(start.current.width + (event.clientX - start.current.x) * direction);
      }}
      onLostPointerCapture={() => { start.current = null; }}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        resize(value + (event.key === "ArrowRight" ? 10 : -10) * direction);
      }} />
  );
}
