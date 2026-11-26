export type Appearance = "system" | "light" | "dark";
export type Material = "liquid" | "solid";
export type Contrast = "normal" | "more";

export interface ThemePreferences {
  appearance: Appearance;
  material: Material;
  contrast: Contrast;
  accent: string | null;
}

export const defaultTheme: ThemePreferences = {
  appearance: "system",
  material: "liquid",
  contrast: "normal",
  accent: null,
};

export const accentSwatches = [
  "#007aff",
  "#5856d6",
  "#af52de",
  "#ff2d55",
  "#ff3b30",
  "#ff9500",
  "#34c759",
  "#8e8e93",
] as const;

export function parseTheme(value: unknown): ThemePreferences {
  if (typeof value !== "object" || value === null) return { ...defaultTheme };
  const input = value as Partial<ThemePreferences>;
  return {
    appearance: input.appearance === "light" || input.appearance === "dark"
      ? input.appearance
      : "system",
    material: input.material === "solid" ? "solid" : "liquid",
    contrast: input.contrast === "more" ? "more" : "normal",
    accent:
      typeof input.accent === "string" && /^#[0-9a-f]{6}$/i.test(input.accent)
        ? input.accent
        : null,
  };
}

function rgb(hex: string): [number, number, number] {
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

function luminance(hex: string): number {
  const [r, g, b] = rgb(hex).map((value) => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(first: string, second: string): number {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function accessibleAccent(accent: string, background: string, minimum: number): string {
  const towards = luminance(background) > 0.5 ? 0 : 255;
  for (let step = 0; step <= 100; step += 1) {
    const mixed = rgb(accent).map((value) =>
      Math.round(value + (towards - value) * step / 100).toString(16).padStart(2, "0"),
    );
    const candidate = `#${mixed.join("")}`;
    if (contrastRatio(candidate, background) >= minimum) return candidate;
  }
  return towards === 0 ? "#000000" : "#ffffff";
}

export function accentTokens(accent: string, appearance: "light" | "dark") {
  const background = appearance === "light" ? "#d9d9db" : "#55565b";
  return {
    ink: contrastRatio(accent, "#000000") >= contrastRatio(accent, "#ffffff")
      ? "#000000"
      : "#ffffff",
    text: accessibleAccent(accent, background, 4.5),
    focus: accessibleAccent(accent, background, 3),
  };
}

export function applyTheme(
  root: HTMLElement,
  preferences: ThemePreferences,
  systemDark: boolean,
  forcedColors = false,
): void {
  const appearance = preferences.appearance === "system"
    ? (systemDark ? "dark" : "light")
    : preferences.appearance;
  root.dataset.theme = appearance;
  root.dataset.material = preferences.material;
  root.dataset.contrast = preferences.contrast;
  const keys = ["--fibli-accent", "--fibli-accent-ink", "--fibli-accent-text", "--fibli-focus"];
  for (const key of keys) root.style.removeProperty(key);
  if (!preferences.accent || forcedColors) return;
  const { ink, text, focus } = accentTokens(preferences.accent, appearance);
  root.style.setProperty("--fibli-accent", preferences.accent);
  root.style.setProperty("--fibli-accent-ink", ink);
  root.style.setProperty("--fibli-accent-text", text);
  root.style.setProperty("--fibli-focus", focus);
}
