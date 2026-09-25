# Sawit Dev Tools

A browser-first collection of focused developer utilities for DNS and domain registration data.

## Current tools

- **DNS Checker**: queries DNS records through multiple public DNS-over-HTTPS providers and compares their responses.
- **WHOIS / RDAP Lookup**: resolves the appropriate RDAP registry through IANA bootstrap data and displays public domain registration metadata.

## Design goals

- Keep the first version browser-based and deployable as a static application.
- Use public APIs without requiring a server-side proxy for the initial release.
- Keep route files thin and organize UI by feature sections.
- Keep browser clients in `lib/`, stateful behavior in `hooks/`, and reusable domain metadata in `@sawit/networking`.

## Stack

- React 19
- React Router 7
- Vite
- TypeScript
- Tailwind CSS 4
- `@sawit/ui`
- `@sawit/networking`

## Development

Run from the repository root:

```bash
pnpm --filter tools dev
```

The app is available at `http://localhost:5173` by default.

## Commands

```bash
pnpm --filter tools typecheck
pnpm --filter tools build
pnpm --filter tools start
```

## Structure

```text
app/
├── root.tsx
├── routes.ts
└── routes/
components/
├── dns-checker/
├── home/
├── layout/
├── theme/
└── whois/
hooks/
lib/
├── dns/
└── rdap/
public/
```

The `dns-checker` feature intentionally combines DNS record lookup and resolver comparison into one workflow. The route coordinates the feature sections; it does not own reusable networking implementation.

## API notes

DNS requests use browser-compatible public DNS-over-HTTPS endpoints. RDAP requests use IANA bootstrap data to locate a registry endpoint. Availability, CORS behavior, rate limits, and response data are controlled by those public services.

## License

The project code is available under the MIT License. See [LICENSE](LICENSE).
