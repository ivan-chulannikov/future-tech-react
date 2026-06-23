Codex Project Workflow Instructions
Project

This is a React + TypeScript + Redux Toolkit + RTK Query + Vite project using an FSD-like structure.

Main stack:

React
TypeScript
Redux Toolkit
React Redux
RTK Query
Vite
SCSS
FSD-like architecture
Core Rules

Work in small production-like tasks.

Do not implement large features in one pass. Every change should be connected to a GitHub issue and a dedicated feature branch.

Do not touch the backend in this repository. Backend work is stored separately.

Do not add unrelated refactors, styling changes, or architectural changes unless the current issue explicitly requires them.

Do not merge into main automatically. Create a pull request and wait for user confirmation.

Git Workflow

Before starting any task:

Check the current branch.
Check that the working tree is clean.
Switch to main.
Pull the latest main.
Create a new branch from main.

Branch naming:

feature/<issue-number>-short-task-name

Examples:

feature/4-add-auth-selectors
feature/5-add-profile-route
feature/6-profile-header-layout

Commit naming:

Use conventional commits.

Examples:

feat(auth): add auth selectors
feat(profile): add profile route
feat(profile): add profile header layout
fix(auth): handle login validation error
style(profile): refine profile layout spacing

Pull request description must include:

Closes #<issue-number>

Example:

## What was done

- Added profile route
- Added minimal ProfilePage
- Connected route to app router

Closes #5
GitHub Issues / Cards

If the user asks to create GitHub Project cards or issues, create small issues from the epic.

Each issue must follow this template:

## Цель

## Контекст

## План

- [ ]

## Трудность

## Решение

-

## Что понял

## Файлы

-

## Проверки

- [ ] npm run lint
- [ ] npm run build

Issues should be small enough to complete independently.

One issue should usually be doable in 30–120 minutes.

User Profile Epic

The current epic is:

Epic: User Profile Page

The profile page should be implemented through small tasks.

Suggested task order:

Add profile route
Add basic ProfilePage
Add profile page layout shell
Add ProfileHeader block
Add ProfileStats block
Add ProfileTabs block
Add Overview tab
Add Saved Posts tab
Add Activity tab placeholder
Add Create Post entry point
Add basic protected route behavior
Add responsive profile layout

Do not implement all of these in one task.

Architecture Rules

Use the existing FSD-like structure.

Expected layers:

src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/

General rules:

pages assemble page-level UI.
widgets are large reusable page sections.
features are user actions.
entities contain business entities.
shared contains reusable UI, API, config, and helpers.
Do not put business logic into shared.
Do not put page-specific logic into shared.
Auth Rules

Auth state lives in Redux.

authSlice stores:

user
accessToken

authSlice must not store:

password
passwordHash
refreshToken

Refresh token is stored only in httpOnly cookie and must not be accessed from frontend JavaScript.

Use selectors for reading auth state:

selectUser
selectAccessToken
selectIsAuthenticated

Use typed Redux hooks:

useAppDispatch
useAppSelector

Do not use raw useDispatch or raw useSelector in new code.

RTK Query Rules

Use RTK Query for API requests.

Auth API uses:

credentials: 'include'

because refresh token is stored in httpOnly cookie.

Access token should be attached to protected API requests through Authorization: Bearer <accessToken> when protected endpoints are introduced.

Profile Page Rules

The profile page should follow the approved FutureTech design direction:

dark theme
yellow accent color
card-based layout
clean borders
English UI text
desktop-first layout with responsive mobile behavior

The profile page should not become one huge component.

Expected conceptual structure:

ProfilePage
├─ ProfileHeader
├─ ProfileStats
├─ ProfileTabs
├─ OverviewTab
├─ SavedPostsTab
├─ ActivityTab
└─ CreatePost entry point

Overview is a dashboard summary.

Saved Posts is a full saved content library.

Do not duplicate the same content in both tabs without purpose.

Checks Before Finishing

Before committing, run:

npm run lint
npm run build

If checks fail, fix the issue before committing.

Output Style

When reporting back to the user, explain:

What issue was worked on.
What branch was created.
What files were changed.
What checks were run.
What commit was created.
Whether a PR was created.
What the user should review next.

Do not hide errors. If something failed, report it clearly.



## GitHub CLI

Use GitHub CLI to create issues, inspect issues, and work with pull requests.

Default command:

```txt
gh
If gh is not available in PATH, use this full Windows path instead:
"C:\Program Files\GitHub CLI\gh.exe"
Before creating issues, verify GitHub CLI access with:
"C:\Program Files\GitHub CLI\gh.exe" auth status
"C:\Program Files\GitHub CLI\gh.exe"  repo view