import type { DnsRecordType } from "@sawit/networking/dns"

export type DnsAnswer = {
  name: string
  type: number
  ttl?: number
  data: string
}

export type DnsLookupResult = {
  providerId: string
  providerName: string
  status: "success" | "error"
  answers: DnsAnswer[]
  error?: string
}

export type DnsQuery = {
  domain: string
  recordType: DnsRecordType
}