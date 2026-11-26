import { Select } from "@base-ui/react/select";
import { Icon } from "../icons/Icon";
import styles from "./ActionMenu.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

export function ViewSelect({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
  className?: string | undefined;
}) {
  return (
    <Select.Root items={options.map((option) => ({ ...option }))} value={value}
      onValueChange={(next) => { if (typeof next === "string") onChange(next); }}>
      <Select.Trigger className={`${styles.selectTrigger} ${className}`} aria-label={label}>
        <span className={styles.selectValue}><Select.Value /></span>
        <Select.Icon className={styles.selectChevrons}>
          <svg aria-hidden="true" focusable="false" viewBox="0 0 12 16" width="10" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6l3-3 3 3M3 10l3 3 3-3" />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className={styles.positioner} align="start" sideOffset={5} alignItemWithTrigger={false}>
          <Select.Popup className={`${styles.popup} ${styles.selectPopup}`}>
            <Select.List>
              {options.map((option) => (
                <Select.Item className={styles.item} key={option.value} value={option.value}>
                  <span className={styles.selectCheck}><Select.ItemIndicator><Icon name="check" size={15} /></Select.ItemIndicator></span>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
