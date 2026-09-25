import { getBootstrapEndpoint } from "@sawit/networking/rdap"

import type { RdapRecord } from "./types"

type RdapBootstrapResponse = {
  services?: Array<[string[], string[]]>
}

function getTld(domain: string) {
  return domain.trim().toLowerCase().split(".").pop() ?? ""
}

export async function lookupDomain(domain: string): Promise<RdapRecord> {
  const bootstrapEndpoint = getBootstrapEndpoint("dns")
  if (!bootstrapEndpoint) throw new Error("RDAP bootstrap is unavailable")

  const bootstrapResponse = await fetch(bootstrapEndpoint)
  if (!bootstrapResponse.ok) throw new Error("Unable to load RDAP bootstrap")

  const bootstrap = (await bootstrapResponse.json()) as RdapBootstrapResponse
  const tld = getTld(domain)
  const service = bootstrap.services?.find(([tlds]) => tlds.includes(tld))
  const baseUrl = service?.[1]?.[0]?.replace(/\/$/, "")

  if (!baseUrl) throw new Error(`No RDAP registry found for .${tld}`)

  const response = await fetch(`${baseUrl}/domain/${encodeURIComponent(domain)}`)
  if (!response.ok) {
    throw new Error(`RDAP request failed with HTTP ${response.status}`)
  }

  return (await response.json()) as RdapRecord
}