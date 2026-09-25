import { useState } from "react"
import type { DnsRecordType } from "@sawit/networking"

import { queryDns } from "../lib/dns/doh-client"
import type { DnsLookupResult } from "../lib/dns/types"

export function useDnsChecker() {
  const [results, setResults] = useState<DnsLookupResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function lookup(domain: string, recordType: DnsRecordType) {
    setIsLoading(true)
    setError(null)
    try {
      setResults(await queryDns(domain, recordType))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Lookup failed")
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return { results, isLoading, error, lookup }
}