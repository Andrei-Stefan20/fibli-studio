import { accentSwatches, type Appearance, type Contrast, type Material } from "@fibli/tokens/theme";
import { Icon } from "../icons/Icon";
import { useTheme } from "../providers/ThemeProvider";
import { GlassButton, GlassGroup } from "./Glass";
import styles from "./ThemeSettings.module.css";

export function ThemeSettings() {
  const { preferences, update } = useTheme();
  return (
    <section className={styles.section} aria-label="Appearance">
      <h2>Appearance</h2>
      <div className={styles.row}>
        <span>Color scheme</span>
        <GlassGroup>
          {(["system", "light", "dark"] as Appearance[]).map((value) => (
            <GlassButton key={value} variant="ghost" aria-pressed={preferences.appearance === value} onClick={() => update({ appearance: value })}>
              {value[0]?.toUpperCase()}{value.slice(1)}
            </GlassButton>
          ))}
        </GlassGroup>
      </div>
      <div className={styles.row}>
        <span>Material</span>
        <GlassGroup>
          {(["liquid", "solid"] as Material[]).map((value) => (
            <GlassButton key={value} variant="ghost" aria-pressed={preferences.material === value} onClick={() => update({ material: value })}>
              {value === "liquid" ? "Liquid Glass" : "Solid"}
            </GlassButton>
          ))}
        </GlassGroup>
      </div>
      <div className={styles.row}>
        <span>Contrast</span>
        <GlassGroup>
          {(["normal", "more"] as Contrast[]).map((value) => (
            <GlassButton key={value} variant="ghost" aria-pressed={preferences.contrast === value} onClick={() => update({ contrast: value })}>
              {value === "normal" ? "Normal" : "Increased"}
            </GlassButton>
          ))}
        </GlassGroup>
      </div>
      <div className={styles.row}>
        <span>Accent color</span>
        <div className={styles.swatches}>
          <GlassButton variant="ghost" aria-pressed={preferences.accent === null} onClick={() => update({ accent: null })}>Default</GlassButton>
          {accentSwatches.map((color) => (
            <button type="button" className={styles.swatch} key={color} style={{ backgroundColor: color }}
              aria-label={`Accent ${color}`} aria-pressed={preferences.accent === color} onClick={() => update({ accent: color })}>
              {preferences.accent === color && <Icon name="check" size={14} />}
            </button>
          ))}
          <label className={styles.custom} title="Custom accent">
            <input type="color" aria-label="Custom accent" value={preferences.accent ?? "#007aff"} onChange={(event) => update({ accent: event.target.value })} />
          </label>
        </div>
      </div>
      <p className={styles.note}>System reduced motion, reduced transparency and forced-colors preferences take precedence where supported.</p>
    </section>
  );
}
