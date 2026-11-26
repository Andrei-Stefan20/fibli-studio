import { Dialog } from "@base-ui/react/dialog";
import type { ReactNode } from "react";
import { Icon } from "../icons/Icon";
import styles from "./GlassDialog.module.css";

export function GlassDialog({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <header className={styles.header}>
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
            <Dialog.Close className={styles.close} aria-label="Close dialog">
              <Icon name="close" />
            </Dialog.Close>
          </header>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
