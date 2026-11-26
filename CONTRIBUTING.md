# Contributing

## Local setup

### Prerequisites

- Git
- Node.js (see `.node-version`)
- pnpm (see `package.json`)
- Rustup (see `rust-toolchain.toml`)
- Python 3.11 or later

### Installation

```sh
git clone https://github.com/Andrei-Stefan20/fibli-studio.git
cd fibli-studio
pnpm install --frozen-lockfile
```

Use a Node.js version manager to match the required runtime.
Rustup selects the configured Rust toolchain automatically.

### Verification

```sh
node --version
pnpm --version
rustc --version
python3 -m unittest discover -s tests -v
```

### Development commands

- `pnpm dev` - Start the client at http://127.0.0.1:1420.
- `pnpm typecheck` - Run TypeScript checks.
- `pnpm build` - Generate the production build.
- `pnpm preview` - Preview the production build.
- `pnpm lint` - Check code quality.
- `pnpm format` - Format source files.
- `pnpm format:check` - Check formatting.
- `pnpm test` - Run automated tests.
- `pnpm test:watch` - Run tests in watch mode.
- `pnpm check` - Run all client quality checks.

Run `pnpm check` before submitting frontend changes.


### Rust commands

- `cargo check --workspace --locked` - Check Rust code.
- `cargo build --workspace --locked` - Build Rust crates.
- `cargo fmt --all -- --check` - Check Rust formatting.
- `cargo clippy --workspace --all-targets --locked -- -D warnings` - Run Rust linting.
- `cargo test --workspace --locked` - Run Rust tests.

Run Rust formatting, linting, and tests before submitting native changes.


### Desktop commands

- `pnpm tauri dev` - Start the native desktop application.
- `pnpm tauri build` - Build the desktop application.
- `pnpm tauri build --bundles app` - Build a macOS application bundle.

Install the platform-specific prerequisites documented at https://v2.tauri.app/start/prerequisites/.

Stop any existing Vite server before starting Tauri development.


Optional: enable the local commit-message hook if no other hook configuration is in use:

```sh
git config --local core.hooksPath .githooks
```

The hook uses Python 3 and Git's shell. Do not overwrite an existing hook configuration without reviewing it. CI checks pull request titles independently.

## Workflow

1. Create a short-lived branch from `main` (for example `feat/editor` or `fix/storage`).
2. Make a focused change and add relevant tests.
3. Run the applicable checks and review the diff.
4. Open a pull request with a summary, verification, and known limitations.

Prefer squash merges and delete merged branches. Protect `main` with pull requests and passing checks where supported by the repository settings.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): description`. Scope is optional; use an imperative description and keep the title within 100 characters. Pull request titles follow the same convention.

Examples: `feat(editor): add document tabs`, `fix(storage): handle save errors`, `docs: update setup instructions`.

## Development conventions

Use English for code, commits, issues, and documentation. Follow existing formatting and module boundaries. Commit lockfiles when dependencies are introduced. Explain new dependencies and update relevant documentation. Keep secrets and personal data out of the repository.

## Coding agents

Read [AGENTS.md](AGENTS.md). Project-specific profiles and skills are optional and discovered by supported clients. Tool connections (GitHub, Figma, documentation, browser testing) are configured locally as needed; review permissions and never commit credentials. No agent or external service is required to contribute.

## Component catalog

Run `pnpm storybook` to develop shared UI components in isolation. Add stories for meaningful states and keyboard interactions. `pnpm check` also builds and type-checks the catalog. Review the R1 visual reference and `docs/design-system.md` before changing navigation or materials.
