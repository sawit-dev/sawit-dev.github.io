import { useState } from "react"
import type { MetaFunction } from "react-router"
import type { DnsRecordType } from "@sawit/networking/dns"

import { DnsCheckerForm } from "../../components/dns-checker/form"
import { DnsCheckerHero } from "../../components/dns-checker/hero"
import { DnsCheckerResults } from "../../components/dns-checker/results"
import { useDnsChecker } from "../../hooks/use-dns-checker"

export const meta: MetaFunction = () => [
  { title: "DNS Checker | Sawit Tools" },
  {
    name: "description",
    content: "Look up DNS records and compare public resolver responses.",
  },
]

export default function DnsCheckerRoute() {
  const { results, isLoading, error, lookup } = useDnsChecker()
  const [domain, setDomain] = useState("")
  const [recordType, setRecordType] = useState<DnsRecordType | "">("")

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-8 lg:py-16">
      <DnsCheckerHero />
      <div className="mt-8 space-y-6">
        <DnsCheckerForm
          value={domain}
          recordType={recordType}
          isLoading={isLoading}
          onValueChange={setDomain}
          onRecordTypeChange={setRecordType}
          onSubmit={() => {
            const cleanDomain = domain.trim()
            if (!cleanDomain || !recordType) return
            lookup(cleanDomain, recordType)
          }}
        />
        {error ? (
          <div className="border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        {results.length > 0 ? <DnsCheckerResults results={results} /> : null}
      </div>
    </div>
  )
}
