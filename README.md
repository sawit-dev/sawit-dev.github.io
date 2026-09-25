# sawit-dev.github.io

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-0A0F1F?logo=githubpages&logoColor=white)](https://sawit-dev.github.io/)
[![React Router](https://img.shields.io/badge/React%20Router-7.15.1-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/UI-Shadcn-111827?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)

A personal portfolio and project showcase site built with React Router, a modular component structure, and a design system centered on Shadcn UI. The project is configured for GitHub Pages deployment and is designed to present profile information, projects, and contact details in a clean, responsive interface.

## Overview

This repository contains a monorepo-based frontend setup with:

- a lightweight app shell for routing and navigation in `apps/web`
- a reusable UI layer in `packages/ui`
- static deployment support for GitHub Pages
- dark mode support with persistent theme preference

## Live site

- Production: https://sawit-dev.github.io/

## Stack

- React Router
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- pnpm workspaces
- GitHub Pages

## Project structure

```text
.
├── apps/
│   └── web/
│       ├── app/
│       ├── public/
│       └── package.json
├── packages/
│   └── ui/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo.json
├── LICENSE
└── README.md
```

## Local development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Type-check the project:

```bash
pnpm typecheck
```

## Deployment

The site is published via GitHub Pages using the workflow in `.github/workflows` and a static build output compatible with Pages hosting.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
