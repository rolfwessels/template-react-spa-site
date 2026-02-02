# template-react-spa-site

A lightweight, modern React Single Page Application (SPA) template using Vite and Radix UI. Built for speed, accessibility, and rapid development — with optional GraphQL integration via Apollo Client.

## 🚀 Features

- ⚛️ React + Vite (super-fast dev experience)
- 🎛️ Radix UI for accessible, themeable components
- 📊 Recharts for data visualization
- 🔌 Optional GraphQL support with Apollo Client and graphql-codegen
- 🧪 Vitest + Testing Library for testing
- 🛠️ Makefile automation for local/dev tasks
- 🐳 Docker + DevContainer ready
- 📦 Clean, minimal scaffold

## 🏁 Getting Started

### Prerequisites

- Node.js ≥ 22.x
- pnpm
- Docker (optional for devcontainers)

```bash
nvm install v22.16.0
npm install -g pnpm
node -v
```

### Clone and Setup

```bash
git clone https://github.com/rolfwessels/template-react-spa-site.git my-app
cd my-app
make install
make dev
```

## 🧰 Make Commands

```bash
make install        # Install dependencies
make start          # Start dev server
make build          # Build production version
make test           # Run tests
make codegen        # Generate graphql types
make build-release  # Build release version of the project
```

## 📁 Folder Structure

```
src/
  components/     # Radix-wrapped reusable components
  pages/          # App pages routed via TanStack Router
  hooks/          # Custom hooks
  lib/            # Utilities, clients, etc.
  graphql/        # (Optional) GraphQL fragments/clients
  styles/
  App.tsx
  main.tsx
```

## 🤖 For AI Coding Assistants

**Important:** Before making any changes to this codebase, please read the project conventions and guidelines in `.cursor/rules/main.mdc`. This file contains:
- Styling rules (NO TAILWIND - Radix UI only)
- Code organization patterns
- Naming conventions
- DRY principles
- Testing requirements

Following these rules ensures consistency and maintainability across the project.

## 🧪 Testing

- **Vitest** for unit tests
- **Testing Library** for UI tests

```bash
make test
```

## 📦 Deployment

- `src\Dockerfile` for containerized builds
- `make docker-build` for local prod builds
- Can be deployed to Vercel, Netlify, or any static host with SPA support

## 🔗 Optional Integrations

- State management with Zustand (if needed)
- GitHub Actions CI template available

## ❓ FAQ

### How do I update packages?

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

### How do I add a new package?

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

MIT — use it however you like!
