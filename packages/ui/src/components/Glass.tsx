import { Tooltip } from "@base-ui/react/tooltip";
import { LayoutGroup, motion } from "motion/react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { Icon, type IconName } from "../icons/Icon";
import styles from "./Glass.module.css";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: "glass" | "soft" | "solid" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function GlassButton({
  variant = "glass",
  size,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant === "glass" ? "soft" : variant]} ${size ? styles[size] : ""} ${className}`}
      {...props}
    />
  );
}

export function IconButton({
  icon,
  label,
  shortcut,
  className = "",
  ...props
}: ButtonProps & { icon: IconName; label: string; shortcut?: string }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        render={
          <GlassButton aria-label={label} className={`${styles.icon} ${className}`} {...props} />
        }
      >
        <Icon name={icon} />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side="bottom" sideOffset={7} className={styles.tipPositioner}>
          <Tooltip.Popup className={styles.tip}>
            {label}
            {shortcut && <kbd>{shortcut}</kbd>}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function GlassGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return <div className={`${styles.group} ${className}`}>{children}</div>;
}

export function SelectionScope({ id, children }: { id: string; children: ReactNode }) {
  return <LayoutGroup id={id}>{children}</LayoutGroup>;
}

export function SelectionLens() {
  return (
    <motion.span
      aria-hidden="true"
      className={styles.lens}
      layoutId="selection-lens"
      transition={{ type: "spring", stiffness: 440, damping: 36, mass: 0.78 }}
    />
  );
}
