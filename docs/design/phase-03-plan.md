# Phase 03 — Design foundation gate

Workspace and project screen prototypes are excluded from this pull request. Limit this phase to the shared design system and isolated component stories.

| Step | Deliverable | Exit condition |
| --- | --- | --- |
| 03.1 | Source inventory | Source-to-component mapping reviewed |
| 03.2 | Primitive, semantic and component tokens | Original dimensions and materials represented; intentional deviations recorded |
| 03.3 | Typography and iconography | Offline licensed assets and canonical glyphs verified |
| 03.4 | Materials | Isolated visual comparisons against R1, including extreme backgrounds |
| 03.5 | Motion | Shared timings and isolated motion examples; reduced motion verified |
| 03.6 | Controls | Standalone stories, interaction and disabled/focus states |
| 03.7 | Overlays | Menu/select/popover/dialog/tooltip/toast behavior and stories |
| 03.8 | Navigation and collections | Standalone tabs/tree/list/panel primitives, not new feature screens |
| 03.9 | Quality | Browser visual regression, keyboard/accessibility checks and macOS WKWebView review |
| 03.10 | Approval | Explicit visual acceptance before moving to application architecture |

Next phase: typed command registry, module contributions and workspace state. Storage, production editors, media, AI and release work follow their own milestones.

Record each milestone in separate commits; keep PR #8 in draft until review. No automatic merge.

## Implementation checkpoint

The inventory, original component dimensions, local Newsreader font, material comparison, shared motion examples, button/form controls, popup select, popover, confirmation, notifications, disclosure list, breadcrumb and toolbar are present. The Storybook examples are isolated; no application shell is implemented in this phase. The disclosure list intentionally uses native nested lists and buttons rather than claiming full ARIA tree behavior. More specialized editor controls and the remaining icon set will be ported when their owning modules are implemented.

Visual acceptance, cross-browser accessibility and macOS native review remain mandatory. No production project persistence, module registry or command registry is introduced here.
