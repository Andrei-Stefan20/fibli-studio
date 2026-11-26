import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "06 Review/Acceptance" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ReviewChecklist: Story = {
  render: () => (
    <article className="story-inset catalog-page">
      <header className="catalog-heading">
        <h1>Design acceptance</h1>
        <p>Required manual review before the R1 design system is approved.</p>
      </header>
      <section className="catalog-notes">
        <h2>Appearance</h2>
        <p>Review every specimen in light and dark, liquid and solid, normal and increased contrast. Try light and dark accents and black, white and checker backgrounds.</p>
        <h2>Keyboard and semantics</h2>
        <p>Check Tab order, visible focus, Space and Enter activation, arrow navigation, Escape dismissal and focus return. Use VoiceOver to verify names, roles and states.</p>
        <h2>Motion and materials</h2>
        <p>Check press, hover, selection, menu, pane and panel transitions. Enable OS reduced motion and reduced transparency; verify forced-colors behavior where supported.</p>
        <h2>Geometry and typography</h2>
        <p>Compare the original R1 control sizes, icon geometry, alignment, typography, spacing and shadows. Review narrow windows and enlarged browser zoom.</p>
        <h2>Native validation</h2>
        <p>Review on macOS WKWebView before integrating the design system into the application. Browser tests do not establish native parity.</p>
        <h2>Known boundaries</h2>
        <p>Context menu keyboard support and checked-item semantics require review. The nested disclosure list is not a full ARIA tree. The complete original icon set and future specialized controls remain deferred. No visual baselines have been approved.</p>
      </section>
    </article>
  ),
};
