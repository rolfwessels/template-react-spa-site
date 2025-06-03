# template-react-spa-site

A lightweight, modern React Single Page Application (SPA) template using Vite, TailwindCSS, and Radix UI. Built for speed, accessibility, and rapid development — with optional GraphQL integration via urql.

## 🚀 Features

- ⚛️ React + Vite (super-fast dev experience)
- 🎨 TailwindCSS for utility-first styling
- 🎛️ Radix UI primitives for accessible components
- 📊 ui-shadcn for graphs and other UI components (https://ui.shadcn.com/)
- 🔌 Optional GraphQL support with apollo and graphql-codegen
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
```

## 📁 Folder Structure

```
src/
  components/
    ui/           # Radix-wrapped reusable components
  pages/          # App pages routed via TanStack Router
  hooks/          # Custom hooks
  lib/            # Utilities, clients, etc.
  graphql/        # (Optional) GraphQL fragments/clients
  styles/
  App.tsx
  main.tsx
```

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

## 📜 License

MIT — use it however you like!
