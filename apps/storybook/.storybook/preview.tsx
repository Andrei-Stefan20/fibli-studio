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
    accent: {
      description: "User accent color",
      toolbar: {
        title: "Accent",
        items: [
          { value: "default", title: "Default" },
          { value: "#007aff", title: "Blue" },
          { value: "#5856d6", title: "Indigo" },
          { value: "#af52de", title: "Purple" },
          { value: "#ff2d55", title: "Pink" },
          { value: "#ff3b30", title: "Red" },
          { value: "#ff9500", title: "Orange" },
          { value: "#34c759", title: "Green" },
          { value: "#8e8e93", title: "Gray" },
        ],
        dynamicTitle: true,
      },
    },
    contrast: {
      description: "Contrast preference",
      toolbar: { title: "Contrast", items: ["normal", "more"], dynamicTitle: true },
    },
  },
  initialGlobals: { appearance: "dark", material: "liquid", contrast: "normal", accent: "default" },
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
