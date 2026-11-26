import { AnimatePresence, motion, type Transition, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Timings preserved from the original Fibli demo.
const spring: Transition = { type: "spring", stiffness: 440, damping: 36, mass: 0.78 };
const panelMotion: Transition = { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] };
const paneMotion: Transition = { duration: 0.16, ease: [0.22, 1, 0.36, 1] };

export function SceneEntrance({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string | undefined;
  direction?: "up" | "down";
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: direction === "up" ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : spring}
    >
      {children}
    </motion.div>
  );
}

export function PanelTransition({
  children,
  open,
  width,
  className,
}: {
  children: ReactNode;
  open: boolean;
  width: number;
  className?: string | undefined;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="panel"
          className={className}
          initial={reduce ? false : { width: 0, opacity: 0 }}
          animate={{ width, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={reduce ? { duration: 0 } : panelMotion}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PaneTransition({
  children,
  activeId,
  labelledBy,
  className,
}: {
  children: ReactNode;
  activeId: string;
  labelledBy?: string | undefined;
  className?: string | undefined;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={activeId}
        role="tabpanel"
        id={`panel-${activeId}`}
        aria-labelledby={labelledBy}
        className={className}
        initial={reduce ? false : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -4 }}
        transition={reduce ? { duration: 0 } : paneMotion}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
