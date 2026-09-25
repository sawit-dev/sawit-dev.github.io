import type { RdapBootstrap, RdapResource } from "./types"

export const rdapBootstrap = [
  { id: "dns", endpoint: "https://data.iana.org/rdap/dns.json" },
  { id: "ipv4", endpoint: "https://data.iana.org/rdap/ipv4.json" },
  { id: "ipv6", endpoint: "https://data.iana.org/rdap/ipv6.json" },
  { id: "asn", endpoint: "https://data.iana.org/rdap/asn.json" },
] satisfies readonly RdapBootstrap[]

export function getBootstrapEndpoint(resource: RdapResource) {
  return rdapBootstrap.find((item) => item.id === resource)?.endpoint
}