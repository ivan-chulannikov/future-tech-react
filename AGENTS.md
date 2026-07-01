# Codex Project Workflow Instructions

## Project

This is a React + TypeScript + Redux Toolkit + RTK Query + Vite project using an FSD-like structure.

Main stack:

- React
- TypeScript
- Redux Toolkit
- React Redux
- RTK Query
- Vite
- SCSS
- FSD-like architecture

## Core Rules

Work in small production-like tasks.

Do not implement large features in one pass. Every change should be connected to a GitHub issue and a dedicated feature branch.

Do not touch the backend in this repository. Backend work is stored separately.

Do not add unrelated refactors, styling changes, or architectural changes unless the current issue explicitly requires them.

Do not merge into `main` automatically.

Do not write code when the user asks only to prepare an issue or branch.

## GitHub CLI

Use GitHub CLI to create issues, inspect issues, and work with pull requests.

Default command:

```txt
gh
```

If `gh` is not available in `PATH`, use this full Windows path instead:

```txt
C:\Program Files\GitHub CLI\gh.exe
```

Before creating issues, verify GitHub CLI access with:

```bash
"C:\Program Files\GitHub CLI\gh.exe" auth status
"C:\Program Files\GitHub CLI\gh.exe" repo view
```

If GitHub CLI is unavailable even through the full path, stop and report the problem. Do not create branches for issue-based work without a real issue number.

## Git Workflow

Before starting any task:

1. Check the current branch.
2. Check that the working tree is clean.
3. If there are uncommitted changes, stop and report them.
4. Switch to `main`.
5. Pull the latest `main`.
6. Create a new branch from `main`.

Branch naming:

```txt
feature/<issue-number>-short-task-name
```

Examples:

```txt
feature/4-add-auth-selectors
feature/5-add-profile-route
feature/6-profile-header-layout
```

Commit naming:

Use conventional commits.

Examples:

```txt
feat(auth): add auth selectors
feat(profile): add profile route
feat(profile): add profile header layout
fix(auth): handle login validation error
style(profile): refine profile layout spacing
docs: update codex workflow instructions
```

Pull request description must include:

```txt
Closes #<issue-number>
```

Example:

```md
## What was done

- Added profile route
- Added minimal ProfilePage
- Connected route to app router

Closes #5
```

## Issue Preparation Mode

When the user asks to prepare work from an epic, do not write application code.

Your job is only to prepare the GitHub workflow.

### Goal

Create a small GitHub issue from the current epic, add it to the GitHub Project if possible, create a dedicated branch from `main`, and stop.

### Required flow

1. Check current git branch.
2. Check `git status`.
3. If there are uncommitted changes, stop and report them.
4. Switch to `main`.
5. Pull latest `main`.
6. Read or ask for the epic issue number if needed.
7. Choose the next small task from the epic checklist.
8. Create a GitHub issue using the project issue template.
9. Add the issue to the GitHub Project if possible.
10. Move the issue/card to `In progress` if possible.
11. Create a branch from `main`.

### Branch naming

Use:

```txt
feature/<issue-number>-short-task-name
```

Examples:

```txt
feature/5-add-profile-route
feature/6-add-profile-layout-shell
feature/7-add-profile-header
```

### Rules

- Do not implement code.
- Do not edit React files.
- Do not edit Redux files.
- Do not edit styles.
- Do not commit.
- Do not push.
- Do not create PR.
- Stop after creating the branch.
- Tell the user what issue was created and what branch is ready.

### Final report format

Report:

```md
## Prepared

- Epic:
- Created issue:
- Created branch:
- Project status:
- Current branch:

## Next

You can now implement the task manually.
```

## GitHub Issues / Cards

If the user asks to create GitHub Project cards or issues, create small issues from the epic.

Each issue must follow this template:

```md
## Цель

## Контекст

Почему эта задача появилась?

## План

- [ ]

## Трудность

С чем я столкнулся / могу столкнуться?

## Решение

Как решил?

-

## Что понял

Короткий вывод для собеса.

## Файлы

-

## Проверки

- [ ] npm run lint
- [ ] npm run build
```

Issues should be small enough to complete independently.

One issue should usually be doable in 30–120 minutes.

## Issue Quality Rules

When creating an issue, keep the user's template structure exactly.

Do not fill the `Решение` section before the task is completed.

Always leave it as:

```md
## Решение

Как решил?

-
```

The `Трудность` section must describe possible risks or problems, not just difficulty level.

Bad:

```md
## Трудность

Низкая
```

Good:

```md
## Трудность

С чем я столкнулся / могу столкнуться?

- Можно добавить route не в тот слой.
- Можно случайно выйти за scope задачи.
- Можно забыть проверить прямой переход по URL.
```

Always mention exact route names, file areas, and task boundaries when possible.

For example, prefer:

```txt
Добавить route `/profile`
```

instead of:

```txt
Добавить route для ProfilePage
```

## User Profile Epic

The current epic is:

```txt
Epic: User Profile Page
```

The profile page should be implemented through small tasks.

Suggested task order:

1. Add profile route
2. Add basic ProfilePage
3. Add profile page layout shell
4. Add ProfileHeader block
5. Add ProfileStats block
6. Add ProfileTabs block
7. Add Overview tab
8. Add Saved Posts tab
9. Add Activity tab placeholder
10. Add Create Post entry point
11. Add basic protected route behavior
12. Add responsive profile layout

Do not implement all of these in one task.

## Architecture Rules

Use the existing FSD-like structure.

Expected layers:

```txt
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```

General rules:

- `app` contains store, providers, app-level routing and global setup.
- `pages` assemble page-level UI.
- `widgets` are large reusable page sections.
- `features` are user actions.
- `entities` contain business entities.
- `shared` contains reusable UI, API, config, and helpers.
- Do not put business logic into `shared`.
- Do not put page-specific logic into `shared`.
- Do not create unnecessary abstractions before they are needed.

## Auth Rules

Auth state lives in Redux.

`authSlice` stores:

- `user`
- `accessToken`

`authSlice` must not store:

- password
- passwordHash
- refreshToken

Refresh token is stored only in httpOnly cookie and must not be accessed from frontend JavaScript.

Use selectors for reading auth state:

- `selectUser`
- `selectAccessToken`
- `selectIsAuthenticated`

Use typed Redux hooks:

- `useAppDispatch`
- `useAppSelector`

Do not use raw `useDispatch` or raw `useSelector` in new code.

## RTK Query Rules

Use RTK Query for API requests.

Auth API uses:

```txt
credentials: 'include'
```

because refresh token is stored in httpOnly cookie.

Access token should be attached to protected API requests through:

```txt
Authorization: Bearer <accessToken>
```

when protected endpoints are introduced.

## Profile Page Rules

The profile page should follow the approved FutureTech design direction:

- dark theme
- yellow accent color
- card-based layout
- clean borders
- English UI text
- desktop-first layout with responsive mobile behavior

The profile page should not become one huge component.

Expected conceptual structure:

```txt
ProfilePage
├─ ProfileHeader
├─ ProfileStats
├─ ProfileTabs
├─ OverviewTab
├─ SavedPostsTab
├─ ActivityTab
└─ CreatePost entry point
```

`Overview` is a dashboard summary.

`Saved Posts` is a full saved content library.

Do not duplicate the same content in both tabs without purpose.

## Checks Before Finishing

Before committing, run:

```bash
npm run lint
npm run build
```

If checks fail, fix the issue before committing.

## Output Style

When reporting back to the user, explain:

1. What issue was worked on.
2. What branch was created.
3. What files were changed.
4. What checks were run.
5. What commit was created.
6. Whether a PR was created.
7. What the user should review next.

Do not hide errors. If something failed, report it clearly.
