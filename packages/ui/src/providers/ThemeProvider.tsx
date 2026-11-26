import { Tooltip } from "@base-ui/react/tooltip";
import { applyTheme, defaultTheme, parseTheme, type ThemePreferences } from "@fibli/tokens/theme";
import { MotionConfig } from "motion/react";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

const storageKey = "fibli.appearance.v1";
interface ThemeContextValue {
  preferences: ThemePreferences;
  update: (patch: Partial<ThemePreferences>) => void;
}
const ThemeContext = createContext<ThemeContextValue | null>(null);

function loadPreferences(): ThemePreferences {
  try {
    return parseTheme(JSON.parse(localStorage.getItem(storageKey) ?? "null"));
  } catch {
    return { ...defaultTheme };
  }
}

export function ThemeProvider({
  children,
  initial = defaultTheme,
  persist = true,
}: {
  children: ReactNode;
  initial?: ThemePreferences;
  persist?: boolean;
}) {
  const [preferences, setPreferences] = useState(() => (persist ? loadPreferences() : initial));

  useEffect(() => {
    const dark = window.matchMedia?.("(prefers-color-scheme: dark)");
    const forced = window.matchMedia?.("(forced-colors: active)");
    const sync = () => {
      applyTheme(document.documentElement, preferences, dark?.matches ?? true, forced?.matches);
      document.documentElement.classList.toggle(
        "dark",
        document.documentElement.dataset.theme === "dark",
      );
    };
    sync();
    dark?.addEventListener("change", sync);
    forced?.addEventListener("change", sync);
    if (persist) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(preferences));
      } catch {
        // Appearance remains usable when storage is disabled.
      }
    }
    return () => {
      dark?.removeEventListener("change", sync);
      forced?.removeEventListener("change", sync);
    };
  }, [preferences, persist]);

  return (
    <ThemeContext.Provider
      value={{
        preferences,
        update: (patch) => setPreferences((previous) => parseTheme({ ...previous, ...patch })),
      }}
    >
      <MotionConfig reducedMotion="user">
        <Tooltip.Provider delay={350}>{children}</Tooltip.Provider>
      </MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeProvider is required.");
  return context;
}
