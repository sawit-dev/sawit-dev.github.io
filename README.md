# Sawit Dev

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Portfolio](https://img.shields.io/badge/Portfolio-sawit--dev.github.io-0A0F1F?logo=githubpages&logoColor=white)](https://sawit-dev.github.io/)
[![React Router](https://img.shields.io/badge/React%20Router-7.15.1-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Sawit Dev is a pnpm and Turborepo monorepo for a personal portfolio, browser-first developer tools, and the shared packages that support them.

## Applications

### `apps/web`

The public portfolio and project showcase. It contains the home, about, projects, and contact experiences and is deployed as a static site to GitHub Pages.

See [apps/web/README.md](apps/web/README.md).

### `apps/tools`

A browser-first tools application with a unified DNS Checker and WHOIS / RDAP Lookup. It is structured for future deployment to Vercel or another static-friendly platform.

See [apps/tools/README.md](apps/tools/README.md).

## Packages

### `packages/ui`

Shared UI primitives, hooks, utilities, fonts, and global styles used by both applications.

See [packages/ui/README.md](packages/ui/README.md).

### `packages/networking`

Shared DNS and RDAP catalogs and types. Browser-specific clients remain in the consuming application so this package stays framework-independent.

See [packages/networking/README.md](packages/networking/README.md).

## Architecture

```text
.
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── public/
│   └── tools/
│       ├── app/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── public/
├── packages/
│   ├── networking/
│   │   └── src/{dns,rdap}/
│   └── ui/
│       └── src/{components,hooks,lib,styles}/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── LICENSE
└── README.md
```

Routes are thin orchestrators. Feature UI is split into feature folders, application behavior belongs in app-local hooks and libraries, and reusable cross-app concerns belong in packages.

## Requirements

- Node.js 20 or newer
- pnpm 10.33.4 or newer

## Getting started

Install dependencies:

```bash
pnpm install
```

Run all development tasks:

```bash
pnpm dev
```

Run one application:

```bash
pnpm --filter web dev
pnpm --filter tools dev
```

Build and type-check the workspace:

```bash
pnpm build
pnpm typecheck
```

Run the end-to-end suite:

```bash
pnpm test:e2e
```

## Deployment

`apps/web` produces a static GitHub Pages build and creates a `404.html` SPA fallback. `apps/tools` produces a static React Router build and is designed to be deployable independently, including on Vercel.

## License

Original project code is licensed under the MIT License. See [LICENSE](LICENSE). Individual workspace applications and packages include a copy of the same license for local clarity. Third-party dependencies, generated assets, and external API data remain subject to their respective licenses and terms.
