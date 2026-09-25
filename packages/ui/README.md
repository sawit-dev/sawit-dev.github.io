# @sawit/ui

The shared UI and styling package for Sawit Dev applications.

## Purpose

`@sawit/ui` provides reusable interface primitives, hooks, utilities, and global styles used by applications in this monorepo. It is the shared visual foundation for `apps/web` and `apps/tools`.

## Public exports

```text
@sawit/ui/globals.css
@sawit/ui/components/*
@sawit/ui/hooks/*
@sawit/ui/lib/*
```

Examples:

```ts
import { Button } from "@sawit/ui/components/button"
import { cn } from "@sawit/ui/lib/utils"
```

```css
@import "@sawit/ui/globals.css";
```

## Structure

```text
src/
├── components/
├── hooks/
├── lib/
└── styles/
```

Components remain small and focused. Application-specific composition belongs in an app, while broadly reusable primitives belong here.

## Development

Run from the repository root:

```bash
pnpm --filter @sawit/ui typecheck
pnpm --filter @sawit/ui format
```

## Dependencies

The package uses the UI libraries defined in its `package.json`, including Base UI, Radix UI, Lucide, Tailwind CSS, and the project font packages. Each dependency remains subject to its own license.

## License

The project code is available under the MIT License. See [LICENSE](LICENSE).
