import { Toast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { Icon } from "../icons/Icon";
import styles from "./Notifications.module.css";

export function NotificationProvider({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider>
      {children}
      <NotificationViewport />
    </Toast.Provider>
  );
}

export function useNotifications() {
  const manager = Toast.useToastManager();
  return {
    notify: (title: string, description?: string) =>
      manager.add({ title, ...(description ? { description } : {}) }),
  };
}

function NotificationViewport() {
  const { toasts } = Toast.useToastManager();
  return (
    <Toast.Portal>
      <Toast.Viewport className={styles.viewport}>
        {toasts.map((toast) => (
          <Toast.Root key={toast.id} toast={toast} className={styles.toast}>
            <div className={styles.row}>
              <Toast.Title className={styles.title}>{toast.title}</Toast.Title>
              <Toast.Close className={styles.close} aria-label="Dismiss notification">
                <Icon name="close" size={14} />
              </Toast.Close>
            </div>
            {toast.description && (
              <Toast.Description className={styles.description}>
                {toast.description}
              </Toast.Description>
            )}
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}
