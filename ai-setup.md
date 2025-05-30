# AI Instructions: Setup for `template-react-spa-site`

You are helping scaffold and evolve a lightweight React SPA starter. Here's the current architecture and setup approach:

## 📦 Base Stack

- **React** (18+)
- **Vite** (dev/build tool)
- **Tailwind CSS** (styling)
- **Radix UI** (accessible UI primitives)
- **TanStack Router** (routing)
- **Vitest** (tests)
- **urql** (optional GraphQL client)
- **Zustand** (optional state management)

## 🛠️ Automation & Tooling

- `Makefile` for common tasks:
  - `dev`, `build`, `lint`, `test`, `docker-*`
- Dockerfile for production
- `.devcontainer` for VS Code development in containers
- ESLint + Prettier + EditorConfig for formatting/linting

## 🤖 You Can Help With:

- Bootstrapping new components (`Dialog`, `DropdownMenu`, etc. with Radix + Tailwind)
- Generating form schemas with `react-hook-form`
- Writing tests with Vitest + Testing Library
- Creating new pages or routes
- Configuring urql client (only if GraphQL API is in use)
- Improving DX (e.g. alias paths, error boundaries, suspense)

## ✅ Conventions

- Tailwind class names are preferred for UI.
- Reusable UI components should go in `components/ui/`.
- Avoid large frameworks or abstractions.
- Code should be modular, typed (TS), and composable.

## 🔧 Example Tasks You Might Do

- Create a new `Card` UI component using Radix primitives + Tailwind
- Scaffold a login form using React Hook Form
- Add a new route `/about` and page component
- Add a `graphql/` folder with an urql setup

Your goal is to keep this template simple, accessible, fast, and composable.
