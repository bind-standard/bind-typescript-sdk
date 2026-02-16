# Contributing to BIND TypeScript SDK

The BIND TypeScript SDK packages the [BIND Standard](https://bind-standard.org) types and terminology client for use in TypeScript and JavaScript projects. We welcome contributions from everyone in the insurance ecosystem — brokers, carriers, MGAs, TPAs, reinsurers, vendors, and developers.

## How to Contribute

1. **Fork** this repository
2. **Create a branch** for your change
3. **Make your changes** and commit them
4. **Open a pull request** against `main`

That's it. All contributions are reviewed before merging.

## What to Contribute

- **Type updates** — When the [BIND Standard](https://github.com/bindstandard/bind-standard) evolves, update the types here to match. Run `pnpm run sync:types` to pull from a local `bind-standard` checkout.
- **Terminology client improvements** — New methods, better error handling, caching, or convenience utilities.
- **Bug fixes** — Type errors, client issues, or build problems.
- **Documentation** — Clarifications, examples, typo fixes.
- **Tooling** — CI improvements, test infrastructure, or developer experience.

## Guidelines

- Keep PRs focused. One concept per pull request makes review easier.
- Include a clear description of *why* the change is needed, not just *what* changed.
- Follow existing naming conventions and patterns.
- Type definitions should stay in sync with `bind-standard`. If you need to change a type, the change should ideally go upstream to `bind-standard` first.

## Code Quality

This project uses [Biome](https://biomejs.dev/) for linting, formatting, and import sorting.

Before opening a PR, run:

```bash
pnpm run check        # lint + format + import check (what CI runs)
pnpm run check:fix    # auto-fix all issues
pnpm run typecheck    # TypeScript type checking
pnpm run build        # verify the build succeeds
```

CI runs these checks automatically on every pull request.

## Questions or Ideas?

If you want to discuss something before opening a PR, reach out at **contact@bind-standard.org**.

## License

By contributing to this project, you agree that your contributions will be released under the [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) license.
