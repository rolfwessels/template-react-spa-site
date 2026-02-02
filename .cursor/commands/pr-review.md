# Cursor Commands

## Custom Commands

### /pr-review
**Description**: Systematically review all changes between main and current branch, check adherence to `.cursor/rules/main.mdc` guidelines, report issues, and generate PR title and description.

**Instructions**:
1. Get the current branch name
2. Run the make task to generate a comprehensive summary:

```bash
make pr-review
```

This creates `PR_REVIEW.md` containing:
- Current branch and base branch info
- File statistics (lines added/removed)
- Commit history
- Full diff of all changes

3. Read the generated `PR_REVIEW.md` file and analyze the changes
4. For each changed file, check adherence to `.cursor/rules/main.mdc` guidelines:
   - **NO TAILWIND** - Only Radix UI components and props used for styling
   - Components use Radix UI props (`p`, `m`, `gap`, `size`, `color`) instead of className
   - Filenames use kebab-case (e.g., `user-menu.tsx`)
   - Component names use PascalCase (e.g., `UserMenu`)
   - Hooks, variables, functions use camelCase
   - DRY principles followed - no duplicate code
   - Common utilities extracted to `src/lib/`
   - Types imported from source, not redefined
   - Comments explain WHY, not WHAT
   - No over-engineering - simplest solution first
   - GraphQL uses generated types from `src/graphql/generated`
4. Check for common issues:
   - New features should have tests
   - `make test` must pass (linting, type checking, tests)
   - Breaking changes without justification
   - Missing test coverage for new components
   - Unnecessary dependencies added
5. Generate a PR title (short, imperative mood, e.g., "Add user authentication flow")
6. Generate a PR description with:
   - Summary of changes
   - List of key files modified
   - Test coverage status
   - Any concerns or suggestions
   - Confirmation that guidelines were followed (or list violations)

**Output Format**: As markdown!
```md
## PR Review Results

### Issues Found:
[List any violations or concerns]

### Suggested PR Title:
[Short imperative title]

### Suggested PR Description:
[Multi-line description with bullet points]
```

**Usage**: Type `/pr-review` in chat

