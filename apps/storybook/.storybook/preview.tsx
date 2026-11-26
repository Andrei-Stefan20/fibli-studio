import "@fibli/tokens/styles.css";
import "@fibli/ui/styles.css";
import { parseTheme } from "@fibli/tokens/theme";
import { ThemeProvider } from "@fibli/ui";
import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  parameters: { layout: "fullscreen" },
  globalTypes: {
    appearance: {
      description: "Fibli color scheme",
      toolbar: { title: "Appearance", items: ["system", "light", "dark"], dynamicTitle: true },
    },
    material: {
      description: "Navigation material",
      toolbar: { title: "Material", items: ["liquid", "solid"], dynamicTitle: true },
    },
    contrast: {
      description: "Contrast preference",
      toolbar: { title: "Contrast", items: ["normal", "more"], dynamicTitle: true },
    },
  },
  initialGlobals: { appearance: "dark", material: "liquid", contrast: "normal" },
  decorators: [
    (Story, context) => {
      const preferences = parseTheme(context.globals);
      return (
        <ThemeProvider key={JSON.stringify(preferences)} initial={preferences} persist={false}>
          <div className="fibli-root story-surface">
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
