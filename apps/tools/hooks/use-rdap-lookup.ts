import { useState } from "react"

import { lookupDomain } from "../lib/rdap/client"
import type { RdapRecord } from "../lib/rdap/types"

export function useRdapLookup() {
  const [result, setResult] = useState<RdapRecord | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function lookup(domain: string) {
    setIsLoading(true)
    setError(null)
    try {
      setResult(await lookupDomain(domain))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Lookup failed")
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return { result, isLoading, error, lookup }
}