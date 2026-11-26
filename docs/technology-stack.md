# Technology stack

The client foundation uses React, TypeScript, Vite, and pnpm. Other technologies remain proposed until explicitly adopted. Select compatible versions at adoption and commit lockfiles.

| Area | Preferred technologies | Optional when needed |
| --- | --- | --- |
| Client | React, TypeScript, Vite, pnpm | TanStack Router, Zod |
| Native | Tauri, Rust, Tokio, Serde | Swift and native adapters |
| UI | Base UI, CSS Modules, CSS variables, Radix Colors, Motion | CVA, DTCG tokens, Style Dictionary |
| Design | Storybook | Figma, Tokens Studio |
| Workspace | Zustand, command registry | React Resizable Panels, dnd-kit |
| Data | SQLite, SQLx, FTS5, TanStack Query | sqlite-vec, sync |
| Editing | Tiptap, ProseMirror | CodeMirror, Yjs |
| Documents | PDF.js, Mammoth, JSZip, KaTeX, Tectonic (desktop) | docx, PptxGenJS, DOMPurify (sanitize untrusted HTML) |
| Visualization | Graphology, Sigma.js | React Flow, ELK, MapLibre, Konva |
| AI | Provider interface, Reqwest, secure credentials | Ollama, LM Studio, llama.cpp, cloud APIs |
| Quality | Biome, TypeScript, Vitest, Testing Library, Cargo fmt/clippy/test | Stylelint, Knip, dependency-cruiser, Playwright, axe-core, MSW, cargo-audit |

Avoid duplicate libraries with the same responsibility. Validate offline behavior, licensing, WebView compatibility, and mobile limitations before adding dependencies. Browser tests do not replace native integration tests.
