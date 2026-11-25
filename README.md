# 🌐 template-react-spa-site

A React and Vite single-page app starter. The demo uses Radix UI and Apollo Client to browse Rick and Morty characters and open their detail pages.

## ✨ Features

- ⚛️ React + Vite (super-fast dev experience)
- 🎛️ Radix UI for accessible, themeable components
- 📊 Recharts for data visualization
- 🔌 Optional GraphQL support with Apollo Client and graphql-codegen
- 🧪 Vitest + Testing Library for testing
- 🛠️ Makefile automation for local/dev tasks
- 🐳 Docker + DevContainer ready
- 📦 Clean, minimal scaffold

## 🛠 Prerequisites

- Git, `make`, and Node.js 24 with npm. `make install` installs the pinned pnpm version and the project dependencies.
- Internet access to load character data from the public GraphQL API.
- Docker with Compose for the optional development container.

## 🚀 Quick start

From the repository root, install dependencies and start Vite.

```sh
make install
make start
```

Open the local URL printed by Vite. The **Rick and Morty Characters** page loads the character list from the public GraphQL API. Select a character card to open its detail page.

## 📋 Make commands

| Command | Purpose |
| --- | --- |
| `make install` | Install pnpm and the project dependencies. |
| `make start` | Start the Vite development server. |
| `make test` | Run ESLint, TypeScript checks, and Vitest. |
| `make codegen` | Generate GraphQL types and documents. |
| `make build` | Rebuild the Docker development image. |
| `make build-release` | Build the production site into `dist/`. |

Run `make help` for more targets.

## 📁 Folder structure

- `src/components/` holds reusable UI, and `src/pages/` holds routed pages and their tests.
- `src/graphql/` holds GraphQL operations and generated types. `src/lib/` holds shared utilities and the Apollo client.
- `src/router.tsx` defines the routes.

See [AGENTS.md](AGENTS.md) for project conventions and verification.

## 📦 Deployment

- Use `make build-release` to produce `dist/`. Configure your static host to fall back to `index.html` for client-side routes.
- Use `make docker-build` to build the Nginx runtime image from `src/Dockerfile`.

## 🔗 Optional Integrations

- State management with Zustand (if needed)
- GitHub Actions CI template available

## ❓ FAQ

### 🔄 How do I update packages?

To safely update your project dependencies:

```bash
# 1. Check for outdated packages
pnpm outdated

# 2. Update packages (choose one approach)
pnpm update          # Update within semver ranges
pnpm update --latest # Update to latest versions (be careful!)

# 3. ALWAYS run tests after updating
make test

# 4. If tests pass, commit the changes
git add package.json pnpm-lock.yaml
git commit -m "chore: update dependencies"
```

**⚠️ Important Notes:**
- Always run `make test` after updating packages to catch breaking changes
- Consider updating major versions one at a time for easier debugging
- Check the changelog of major version bumps before updating
- Test your app thoroughly in both development and production builds

### 🧩 Dependency compatibility

- TypeScript stays on 6.x until typescript-eslint supports TypeScript 7.
- ESLint stays on 9.x until eslint-plugin-react supports ESLint 10.
- GraphQL stays on 16.x until the near-operation-file and React Apollo codegen plugins support GraphQL 17.
- Node.js types track the container's Node.js 24 runtime.
- The GraphQL Tools override keeps codegen on a patched version of its utilities.

`pnpm audit` still reports [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
for `braces`, pulled in by the development-only GraphQL codegen CLI. No patched
release is available; avoid untrusted glob patterns in codegen configuration.
CI explicitly excludes only this CVE (`CVE-2026-93687`) from the all-dependencies
audit until a patched release is available. A separate production audit has no
exceptions, and all other advisories still fail CI.

### ➕ How do I add a new package?

```bash
# Add a runtime dependency
pnpm add package-name

# Add a dev dependency  
pnpm add -D package-name

# Don't forget to test!
make test
```

## 🔍 Things that we are working on

- [x] Better graphql integration (we want proper types)
- [ ] We want to use local storage as cache (load from cache > check server > update cache)
- [x] I don't like all the .config files in the root. Can we do something better? 

## 📜 License

[MIT](LICENSE).
