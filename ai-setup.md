# AI Instructions: Setup for `template-react-spa-site`

You are helping scaffold and evolve a lightweight React SPA starter. Here's the current architecture and setup approach:

## 📦 Base Stack

- **React** (18+)
- **Vite** (dev/build tool)
- **Radix UI** (accessible UI primitives)
- **TanStack Router** (routing)
- **Vitest** (tests)
- **graphql-codegen** (For generating graphql type safe classes)
- **Zustand** (optional state management)Na

## 🛠️ Automation & Tooling

- `Makefile` for common tasks:
  - `dev`, `build`, `lint`, `test`, `docker-*`
- Dockerfile for production
- `.devcontainer` for VS Code development in containers
- ESLint + Prettier + EditorConfig for formatting/linting

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

## ✅ Conventions

- Radix-ui components should be used wherever possible. Especialy @radix-ui/themes
- Reusable UI components should go in `components/ui/`.
- Avoid large frameworks or abstractions.
- Code should be modular, typed (TS), and composable.
- We want a test for every component where possible
- Only use `pnpm` to add components!
- Do not use custom styles.

## 🔧 Example Tasks You Might Do

- Create a new `Card` UI component using Radix primitives + Tailwind
- Scaffold a login form using React Hook Form
- Add a new route `/about` and page component
- Add a `graphql/` folder with an urql setup

Your goal is to keep this template simple, accessible, fast, and composable.
