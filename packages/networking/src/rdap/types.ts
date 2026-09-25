export type RdapResource = "dns" | "ipv4" | "ipv6" | "asn"

export type RdapBootstrap = {
  id: RdapResource
  endpoint: string
}