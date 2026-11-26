import { accentSwatches, accentTokens, contrastRatio } from "@fibli/tokens/theme";
import { GlassButton, MaterialSurface, ThemeSettings, useTheme } from "@fibli/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Specimen } from "./catalog/Specimen";

const meta = { title: "01 Foundations/Appearance" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function AccentReview() {
  const { preferences, update } = useTheme();
  return (
    <Specimen
      title="Accent and contrast"
      description="Review the actual accent algorithm against its reference backgrounds."
      usage="Set an accent through ThemeProvider. Use accent-ink on the accent fill, and accent-text for foregrounds on neutral surfaces."
      review="The displayed ratios are mathematical reference checks, not measured contrast for every glass surface. Check all real backgrounds separately."
    >
      <div className="story-row">
        <GlassButton onClick={() => update({ accent: null })}>Default accent</GlassButton>
        {accentSwatches.map((accent) => (
          <GlassButton key={accent} aria-pressed={preferences.accent === accent} onClick={() => update({ accent })}>
            <span className="catalog-accent-dot" style={{ background: accent }} />
            {accent}
          </GlassButton>
        ))}
      </div>
      <MaterialSurface material="content" className="story-inset">
        <p style={{ color: "var(--fibli-accent-text)" }}>Accent foreground</p>
        <span className="catalog-accent-example">Text on accent fill</span>
      </MaterialSurface>
      <table className="catalog-table">
        <thead>
          <tr>
            <th scope="col">Accent / appearance</th>
            <th scope="col">Ink / fill</th>
            <th scope="col">Text / reference</th>
            <th scope="col">Focus / reference</th>
          </tr>
        </thead>
        <tbody>
          {accentSwatches.flatMap((accent) =>
            (["dark", "light"] as const).map((appearance) => {
              const tokens = accentTokens(accent, appearance);
              const background = appearance === "dark" ? "#55565b" : "#d9d9db";
              return (
                <tr key={`${accent}-${appearance}`}>
                  <th scope="row">{accent} / {appearance}</th>
                  <td>{contrastRatio(tokens.ink, accent).toFixed(2)}:1</td>
                  <td>{contrastRatio(tokens.text, background).toFixed(2)}:1</td>
                  <td>{contrastRatio(tokens.focus, background).toFixed(2)}:1</td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </Specimen>
  );
}

export const Preferences: Story = {
  render: () => (
    <Specimen
      title="Appearance preferences"
      description="Theme, material, contrast and custom accent using the actual shared controls."
      usage="Use ThemeProvider at the application boundary. Storybook deliberately does not persist preferences."
      review="Switch every theme and material, choose custom accents, then check OS reduced motion, reduced transparency and forced colors separately."
    >
      <ThemeSettings />
    </Specimen>
  ),
};
export const AccentContrast: Story = { render: () => <AccentReview /> };
