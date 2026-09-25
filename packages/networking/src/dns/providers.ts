import type { DnsProvider } from "./types"

export const dnsProviders = [
  {
    id: "cloudflare",
    name: "Cloudflare",
    endpoint: "https://cloudflare-dns.com/dns-query",
    supportsBrowser: true,
    enabled: true,
  },
  {
    id: "google",
    name: "Google Public DNS",
    endpoint: "https://dns.google/resolve",
    supportsBrowser: true,
    enabled: true,
  },
  {
    id: "adguard",
    name: "AdGuard DNS",
    endpoint: "https://dns.adguard-dns.com/resolve",
    supportsBrowser: true,
    enabled: true,
  },
] satisfies readonly DnsProvider[]