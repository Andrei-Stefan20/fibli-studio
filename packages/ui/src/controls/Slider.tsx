import { Slider as BaseSlider } from "@base-ui/react/slider";
import styles from "./Controls.module.css";

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}: SliderProps) {
  return (
    <BaseSlider.Root
      value={value}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      onValueChange={(next) => {
        if (typeof next === "number") onChange(next);
      }}
    >
      <BaseSlider.Control className={styles.slider}>
        <BaseSlider.Track className={styles.sliderTrack}>
          <BaseSlider.Indicator className={styles.sliderIndicator} />
          <BaseSlider.Thumb aria-label={label} className={styles.sliderThumb} />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
