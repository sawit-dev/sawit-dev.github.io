export type DnsRecordType = "A" | "AAAA" | "CNAME" | "MX" | "NS" | "TXT"

export type DnsProvider = {
  id: string
  name: string
  endpoint: string
  supportsBrowser: boolean
  enabled: boolean
}

export type RdapResource = "dns" | "ipv4" | "ipv6" | "asn"

export type RdapBootstrap = {
  id: RdapResource
  endpoint: string
}