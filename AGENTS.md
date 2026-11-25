# Project Overview
Read [README.md](README.md) for project-specific details, setup, and commands.

# What we value
- **Simplicity first:** build the smallest thing that works; add abstraction or complexity only when a real case demands it.
- **Clarity over cleverness:** prefer plain, readable code—clear names, small focused functions, and obvious control flow.
- **Small, reversible steps:** keep changes focused and incremental so they are easy to review, test, and roll back.
- **Evidence over assumptions:** prove changes work in practice rather than assuming passing unit tests are enough.

# Conventions & Boundaries
- Use hexagonal architecture (ports and adapters) to isolate core business logic from external tools, frameworks, and delivery mechanisms so the application can evolve without costly rewrites.
- Keep changes scoped to the task; avoid refactoring unrelated files or renaming shared types unless requested.
- Ask before adding new external dependencies or modifying database migrations.
- Put multi-step workflows and domain-specific playbooks in skills or subdirectory `AGENTS.md` files instead of bloating this root file.
- Use lightweight Git Flow: branch from `main` as `feature/<name>`, `bug/<name>`, or `hotfix/<name>`, and tag releases on `main` (no long-running release branches).
- Write clear PR descriptions with these headers: **What**, **Why**, **Decisions**, **Testing**, and **Risks**.

# Verification & Handoff
- **TDD:** start with a failing test, write the minimal code to pass, then refactor cleanly once the work is green.
- **End-to-end verification:** verify beyond unit tests—launch and exercise the running app (including clicking through flows as needed) to confirm real behavior:
  - Run after completing a meaningful chunk of work and always before opening or updating a PR—not on every turn.
  - Drive the real user path (not internal shortcuts) and verify both visible behavior and side effects (screenshots, files, DB, logs, messages).
  - Mock only external systems behind a real production boundary, and verify what any dry-run or test mode actually skips rather than trusting its name.
  - Never weaken a failing check to make it pass; report gaps honestly and explicitly call out anything left unverified.
- **Pre-PR review:** before opening a PR, run an independent review using a clean-context subagent on a strong model (ideally different from the one that wrote the code). Every review must include security considerations.
