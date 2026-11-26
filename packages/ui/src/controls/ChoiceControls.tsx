import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { ReactNode } from "react";
import { useId } from "react";
import styles from "./Controls.module.css";

interface BinaryProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ label, checked, onChange, disabled = false }: BinaryProps) {
  return (
    <BaseSwitch.Root aria-label={label} checked={checked} disabled={disabled}
      onCheckedChange={onChange} className={styles.switch}>
      <BaseSwitch.Thumb className={styles.switchThumb} />
    </BaseSwitch.Root>
  );
}

export function Checkbox({ label, checked, onChange, disabled = false }: BinaryProps) {
  return (
    <label className={styles.choice}>
      <input type="checkbox" checked={checked} disabled={disabled}
        onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export interface ChoiceOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface GroupProps {
  label: string;
  value: string;
  options: readonly ChoiceOption[];
  onChange: (value: string) => void;
}

export function RadioGroup({ label, value, options, onChange }: GroupProps) {
  const name = useId();
  return (
    <fieldset className={styles.radioGroup}>
      <legend>{label}</legend>
      {options.map((option) => (
        <label key={option.value} className={styles.choice}>
          <input type="radio" name={name} value={option.value} checked={value === option.value}
            disabled={option.disabled ?? false} onChange={() => onChange(option.value)} />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function SegmentedControl({ label, value, options, onChange }: GroupProps) {
  const name = useId();
  return (
    <fieldset className={styles.segment} aria-label={label}>
      {options.map((option) => (
        <label className={styles.segmentOption} key={option.value}>
          <input className={styles.segmentInput} type="radio" name={name} value={option.value}
            checked={value === option.value} disabled={option.disabled ?? false}
            onChange={() => onChange(option.value)} />
          <span className={styles.segmentLabel}>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
