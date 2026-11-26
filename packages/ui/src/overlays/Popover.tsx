import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ReactNode } from "react";
import { GlassButton } from "../components/Glass";
import styles from "./Overlays.module.css";

export function Popover({ label, trigger, children, side = "bottom", align = "start" }: {
  label: string;
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}) {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={<GlassButton aria-label={label} />}>{trigger}</BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner side={side} align={align} sideOffset={7} collisionPadding={8} className={styles.positioner}>
          <BasePopover.Popup aria-label={label} className={styles.popover}>{children}</BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
