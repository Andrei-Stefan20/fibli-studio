# R1 component inventory

Reference: user-supplied `fibli-demo(3).zip`, SHA-256 `6bc46f03ddebfb50fab5d5961b3b7fdabe84742b1c745f7ac19be64f1aa76436`. Source paths below refer to the extracted demo, not this repository. Inventory is grouped by reusable behavior, not by every CSS selector.

| Group | Demo source | Reusable items | Current port status |
| --- | --- | --- | --- |
| Foundations | index.html:38–193 | Palette, text hierarchy, fills, borders, typography, geometry, elevation, focus, scrollbar, selection | Partial; contrast intentionally stronger |
| Controls | index.html:231–250, 322–361, 1331–1341 | Solid/soft/ghost/danger/small buttons, icon buttons, fields, slider, segmented control, switch | Button partial; remaining controls to consolidate |
| Menus and overlays | index.html:253–320, 326–331, 1400–1419; app/view-select.js; app/main.js:193,1284 | Menu, submenu, contextual menu, popup select, popover, tooltip, dialog, alert, spotlight, toast | Menu/select/dialog/tooltip partial |
| Materials | index.html:575–704 | Navigation, floating controls, dock, menu, content, solid and accessible variants | Partial |
| Motion | index.html:194–230,253–320,575–704; app/main.js | Scene, curtains, menu, selection, panel, tab, hover and press | Partial |
| Project library | app/main.js:494–606; index.html:434–513 | Full-bleed scene, hero actions, project dock, context actions, empty state | Prototype |
| Project creation | app/main.js:607–719; index.html:514–574 | Fullscreen wizard, cover picker, genre/template selects, segmented format | Prototype |
| Workspace navigation | app/main.js:1324 onward; index.html:739–949 | Project selector, tabs, overflow, new item, split, focus, sidebar, inspector | Prototype |
| Project home and details | app/main.js:720–1086 | Recent files, project info, document outline, metadata, tags, writing goals | Prototype / missing |
| Folder navigation | app/main.js:1087–1283; app/finder.js:801 onward | Folder tree, file row, favorite, icon/list/column layouts, breadcrumbs, Quick Look | Tree prototype; Finder pending |
| Editor patterns | app/editors.js:328,2240,3658,3826 | Format toolbar, insert menu, table tools, annotations, source/preview, JSON tree, assets | Pending |
| Specialized documents | app/pdf.js:212; app/slides.js:1104; app/finder.js:110,411 | PDF controls, thumbnails, presentation canvas, code, CSV table | Pending |
| Settings | app/settings.js:27; index.html:1864–1916 | Settings navigation, grouped rows, appearance, preferences | Appearance only |
| Audio and atmosphere | app/main.js:246; app/audio.js; index.html:2826–2949 | Media popover, transport, progress, volume, ambient mixer, track list | Pending except scene preview |
| AI and writing assist | app/ai.js:298; app/writing-assist.js:401,493,551 | Composer, mentions, streaming feedback, suggestions, review banner | Pending |

Checkbox and radio are proposed general-purpose controls; the source does not establish a canonical shared visual implementation for both. Use the existing accent, fill and radius vocabulary and label them as extensions. No AI, editor or audio service is authorized by this inventory.

## Original control measurements

- Buttons: 24/28/34 px; 6/8/10/14 px radii; primary neutral, soft filled, ghost transparent.
- Field: 34 px, 10 px radius, 10 px horizontal inset, 13.5 px text.
- Switch: 36 × 21 px, 15 px thumb, 15 px travel.
- Slider: 4 px track, 15 px thumb, 20 px control height.
- Segmented control: 2 px inset/gap, 24 px minimum button height, 12 px text.
- Menus: 14 px radius, 5 px inset, 30 px item, 9 px icon gap, 208 px minimum width.
- Typography: system SF on macOS, Newsreader for prose, SF Mono/Menlo for code. The demo loads additional editor fonts from Google Fonts; font names alone do not make those fonts available offline.

## Acceptance

For every reusable component: source reference, variants and states, keyboard behavior, focus, disabled/empty/error where relevant, dark/light/solid/liquid appearance, reduced motion and increased contrast; include a focused Storybook story and relevant interaction tests. A passing build is not visual approval. Review on WKWebView before marking the design foundation complete.
