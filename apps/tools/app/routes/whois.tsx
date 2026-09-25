import { useState } from "react"
import type { MetaFunction } from "react-router"

import { WhoisDetails } from "../../components/whois/details"
import { WhoisForm } from "../../components/whois/form"
import { WhoisHero } from "../../components/whois/hero"
import { useRdapLookup } from "../../hooks/use-rdap-lookup"

export const meta: MetaFunction = () => [
  { title: "WHOIS / RDAP | Sawit Tools" },
  {
    name: "description",
    content: "Look up registration data through public RDAP registry records.",
  },
]

export default function WhoisRoute() {
  const { result, isLoading, error, lookup } = useRdapLookup()
  const [domain, setDomain] = useState("example.com")

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-8 lg:py-16">
      <WhoisHero />
      <div className="mt-8 space-y-6">
        <WhoisForm
          value={domain}
          isLoading={isLoading}
          onValueChange={setDomain}
          onSubmit={() => lookup(domain)}
        />
        {error ? (
          <div className="border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        {result ? <WhoisDetails result={result} /> : null}
      </div>
    </div>
  )
}