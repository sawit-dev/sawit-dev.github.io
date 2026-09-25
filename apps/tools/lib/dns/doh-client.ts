import { dnsProviders, type DnsRecordType } from "@sawit/networking"

import type { DnsLookupResult } from "./types"

const requestTimeout = 8000

export async function queryDnsProvider(
  providerId: string,
  domain: string,
  recordType: DnsRecordType
): Promise<DnsLookupResult> {
  const provider = dnsProviders.find((item) => item.id === providerId)
  if (!provider || !provider.enabled || !provider.supportsBrowser) {
    throw new Error("DNS provider is unavailable")
  }

  const url = new URL(provider.endpoint)
  url.searchParams.set("name", domain)
  url.searchParams.set("type", recordType)

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), requestTimeout)

  try {
    const response = await fetch(url, {
      headers: { accept: "application/dns-json" },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Request failed with HTTP ${response.status}`)
    }

    const data = (await response.json()) as { Answer?: DnsLookupResult["answers"] }
    return {
      providerId: provider.id,
      providerName: provider.name,
      status: "success",
      answers: data.Answer ?? [],
    }
  } catch (error) {
    return {
      providerId: provider.id,
      providerName: provider.name,
      status: "error",
      answers: [],
      error: error instanceof Error ? error.message : "Request failed",
    }
  } finally {
    window.clearTimeout(timeout)
  }
}

export async function queryDns(
  domain: string,
  recordType: DnsRecordType
) {
  const providers = dnsProviders.filter(
    (provider) => provider.enabled && provider.supportsBrowser
  )

  return Promise.all(
    providers.map((provider) =>
      queryDnsProvider(provider.id, domain, recordType)
    )
  )
}