import {
  accentSwatches,
  accentTokens,
  applyTheme,
  contrastRatio,
  defaultTheme,
  parseTheme,
} from "@fibli/tokens/theme";
import { describe, expect, it } from "vitest";

describe("Theme preferences", () => {
  it("rejects malformed saved preferences", () => {
    expect(parseTheme({ appearance: "invalid", accent: "red" })).toEqual(defaultTheme);
  });

  it("provides readable accent text and ink in both appearances", () => {
    for (const accent of accentSwatches) {
      for (const appearance of ["light", "dark"] as const) {
        const tokens = accentTokens(accent, appearance);
        expect(contrastRatio(tokens.ink, accent)).toBeGreaterThanOrEqual(4.5);
        expect(
          contrastRatio(tokens.text, appearance === "light" ? "#d9d9db" : "#55565b"),
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("updates appearance and removes custom colors in forced colors", () => {
    const root = document.createElement("div");
    applyTheme(root, { ...defaultTheme, accent: "#ff0000" }, true);
    expect(root.dataset.theme).toBe("dark");
    expect(root.style.getPropertyValue("--fibli-accent")).toBe("#ff0000");
    applyTheme(root, { ...defaultTheme, accent: "#ff0000" }, false, true);
    expect(root.dataset.theme).toBe("light");
    expect(root.style.getPropertyValue("--fibli-accent")).toBe("");
  });
});
