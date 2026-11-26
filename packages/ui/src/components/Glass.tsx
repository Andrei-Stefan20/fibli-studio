import { LayoutGroup, motion } from "motion/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../icons/Icon";
import styles from "./Glass.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "glass" | "solid" | "ghost";
};

export function GlassButton({
  variant = "glass",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={`${styles.button} ${styles[variant]} ${className}`} {...props} />
  );
}

export function IconButton({
  icon,
  label,
  className = "",
  ...props
}: ButtonProps & { icon: IconName; label: string }) {
  return (
    <GlassButton
      aria-label={label}
      title={label}
      className={`${styles.icon} ${className}`}
      {...props}
    >
      <Icon name={icon} />
    </GlassButton>
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
