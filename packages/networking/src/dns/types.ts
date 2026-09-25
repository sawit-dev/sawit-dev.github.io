export type DnsRecordType = "A" | "AAAA" | "CNAME" | "MX" | "NS" | "TXT"

export type DnsProvider = {
  id: string
  name: string
  endpoint: string
  supportsBrowser: boolean
  enabled: boolean
}