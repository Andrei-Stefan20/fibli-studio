import { AlertDialog } from "@base-ui/react/alert-dialog";
import { GlassButton } from "../components/Glass";
import styles from "./Overlays.module.css";

export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel, destructive = false, onConfirm }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className={styles.backdrop} />
        <AlertDialog.Popup className={styles.alert}>
          <AlertDialog.Title className={styles.title}>{title}</AlertDialog.Title>
          <AlertDialog.Description className={styles.description}>{description}</AlertDialog.Description>
          <div className={styles.actions}>
            <AlertDialog.Close render={<GlassButton />}>Cancel</AlertDialog.Close>
            <AlertDialog.Close render={<GlassButton variant={destructive ? "danger" : "solid"} onClick={onConfirm} />}>{confirmLabel}</AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
