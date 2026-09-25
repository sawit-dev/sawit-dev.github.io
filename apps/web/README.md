# Sawit Dev Web

The portfolio and project showcase application for Sawit Dev.

## Purpose

`apps/web` is the public-facing portfolio site. It contains the home, about, projects, and contact experiences and uses the shared `@sawit/ui` package for visual primitives and styling.

## Stack

- React 19
- React Router 7
- Vite
- TypeScript
- Tailwind CSS 4
- `@sawit/ui`

## Development

Run from the repository root:

```bash
pnpm --filter web dev
```

The app is available at `http://localhost:5173` by default.

## Commands

```bash
pnpm --filter web typecheck
pnpm --filter web build
pnpm --filter web start
```

The production build also creates `build/client/404.html` for GitHub Pages SPA fallback support.

## Structure

```text
app/
├── root.tsx
├── routes.ts
└── routes/
components/
├── about/
├── contact/
├── home/
├── layout/
├── projects/
└── theme/
hooks/
lib/
public/
```

Routes stay thin and orchestrate feature components. Page sections live under their feature folder, while shared layout, theme, hooks, and libraries have their own top-level boundaries.

## License

The project code is available under the MIT License. See [LICENSE](LICENSE).
