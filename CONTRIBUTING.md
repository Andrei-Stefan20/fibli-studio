# Contributing

## Local setup

Requirements for the current repository: Git and Python 3.11 or later (for development checks).

Replace `REPOSITORY_URL` with the repository clone URL.

```sh
git clone REPOSITORY_URL
cd fibli-studio
python3 -m unittest discover -s tests -p 'test_*.py'
```

If the repository is already cloned, open its root directory and run the checks. On Windows, use `py -3` if `python3` is unavailable. No dependencies or application runtime are configured yet. When introduced, the package manifests, lockfiles, and documented development commands will define the application setup.

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
