# @sawit/networking

Shared DNS and RDAP metadata for Sawit Dev tools.

## Purpose

`@sawit/networking` contains reusable networking domain definitions that are independent from React and browser UI:

- public DNS provider catalog
- supported DNS record types
- IANA RDAP bootstrap registry metadata
- RDAP resource types

Browser-specific request clients remain in the consuming app, currently under `apps/tools/lib`.

## Public exports

```text
@sawit/networking
@sawit/networking/dns
@sawit/networking/rdap
```

Examples:

```ts
import { dnsProviders, type DnsRecordType } from "@sawit/networking/dns"
import { getBootstrapEndpoint } from "@sawit/networking/rdap"
```

The root export is a convenience facade. Domain-specific imports are preferred when a consumer only needs DNS or RDAP functionality.

## Structure

```text
src/
├── index.ts
├── dns/
│   ├── index.ts
│   ├── providers.ts
│   └── types.ts
└── rdap/
    ├── index.ts
    ├── bootstrap.ts
    └── types.ts
```

The package does not depend on React or browser globals. This keeps the domain catalog reusable for future server-side clients, workers, or additional tools.

## Development

Run from the repository root:

```bash
pnpm --filter tools typecheck
pnpm --filter tools build
```

The networking package currently provides source exports and is validated through its consuming workspace app.

## License

The project code is available under the MIT License. See [LICENSE](LICENSE).
