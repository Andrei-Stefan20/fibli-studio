# Fibli

A local-first workspace for writing, worldbuilding, and research.

## Status

Early development. The repository currently contains the project structure, engineering documentation, and development tooling. The initial React client is runnable in the browser. The Tauri desktop host is initialized. Application features remain to be implemented.

## Getting started

See [Contributing](CONTRIBUTING.md) for prerequisites, local setup, and development checks.

## Development

- `pnpm dev` - Start the development server.
- `pnpm typecheck` - Check TypeScript.
- `pnpm build` - Build the client.
- `pnpm preview` - Preview the production build.
- `pnpm lint` - Check code quality.
- `pnpm format` - Format source files.
- `pnpm format:check` - Check formatting.
- `pnpm test` - Run automated tests.
- `pnpm test:watch` - Run tests in watch mode.
- `pnpm check` - Run all client quality checks.


### Rust commands

- `cargo check --workspace --locked` - Check Rust code.
- `cargo build --workspace --locked` - Build Rust crates.
- `cargo fmt --all -- --check` - Check Rust formatting.
- `cargo clippy --workspace --all-targets --locked -- -D warnings` - Run Rust linting.
- `cargo test --workspace --locked` - Run Rust tests.


### Desktop commands

- `pnpm tauri dev` - Start the native desktop application.
- `pnpm tauri build` - Build the desktop application.
- `pnpm tauri build --bundles app` - Build a macOS application bundle.

## Documentation

- [Architecture](docs/architecture.md)
- [Technology stack](docs/technology-stack.md)
- [Design system](docs/design-system.md)
- [Architecture decisions](docs/adr/README.md)
- [Security](SECURITY.md)

## License

No open-source license has been granted. Distribution terms are to be determined.
