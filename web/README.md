# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Environment setup

None of the `.env.*` files are committed (see `.gitignore`) — only `.env.example`. After cloning,
create the three environment files from that template:

```bash
cp .env.example .env.localhost
cp .env.example .env.development
cp .env.example .env.production
```

Then edit each one so `VITE_API_URL` points at the right backend.

Vite chooses a file by matching its suffix to the `--mode` flag in the npm script:

| Script                                          | Mode          | File loaded        |
| ----------------------------------------------- | ------------- | ------------------ |
| `npm run dev`                                    | `localhost`   | `.env.localhost`   |
| `npm run dev-development` / `build-development`  | `development` | `.env.development` |
| `npm run dev-production` / `build-production`    | `production`  | `.env.production`  |

Two rules worth knowing:

- **Only `VITE_`-prefixed variables reach the app.** Vite strips everything else. It also pastes
  the values straight into the browser bundle, so treat every value here as public — server
  secrets belong in `/api`'s env files.
- **`.env.local` is not a mode.** Vite loads `.env.local` in *every* mode, so it's for personal
  overrides only. For a single mode, use `.env.<mode>.local` (e.g. `.env.localhost.local`).

Read variables through `src/config/env.ts`, never `import.meta.env` directly — it validates that
required values are present and fails with a message naming the file to fix.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
