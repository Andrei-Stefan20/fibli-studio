import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "00 Getting started/Design system" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <article className="story-inset catalog-page">
      <header className="catalog-heading">
        <span className="catalog-eyebrow">Fibli / R1 design foundation</span>
        <h1>Design system</h1>
        <p>A component reference for a quiet, compact, editorial desktop interface.</p>
      </header>
      <section className="catalog-notes">
        <h2>Principles</h2>
        <p>
          The supplied R1 demo is the reference. Preserve compact geometry, neutral primary
          actions, restrained transparency, expressive typography and purposeful motion.
        </p>
        <h2>Structure</h2>
        <dl className="catalog-definition">
          <dt>01 Foundations</dt>
          <dd>Live tokens, appearance, materials, typography, icons and motion.</dd>
          <dt>02 Controls</dt>
          <dd>Buttons, input fields, binary controls, choices, selects and sliders.</dd>
          <dt>03 Overlays</dt>
          <dd>Menus, submenus, context menus, tooltips, popovers and dialogs.</dd>
          <dt>04 Navigation and collections</dt>
          <dd>Toolbars, breadcrumbs, collection rows and nested disclosure lists.</dd>
          <dt>05 Feedback</dt>
          <dd>Notifications, status, empty states and progress.</dd>
          <dt>06 Review</dt>
          <dd>Accessibility and visual acceptance criteria.</dd>
        </dl>
        <h2>How to review</h2>
        <p>
          Use the toolbar to switch light, dark or system appearance; solid or liquid material;
          normal or increased contrast; and accent color. Inspect real controls with the mouse
          and keyboard, not screenshots alone.
        </p>
        <h2>Scope</h2>
        <p>
          This catalog contains existing shared components only. Workspace composition, project
          screens, production editors, media engines and application commands are deferred.
          A passing build is not design approval.
        </p>
      </section>
    </article>
  ),
};
