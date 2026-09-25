import type { DnsLookupResult } from "../../lib/dns/types"

const recordTypeLabels: Record<number, string> = {
  1: "A",
  2: "NS",
  5: "CNAME",
  6: "SOA",
  15: "MX",
  16: "TXT",
  28: "AAAA",
}

function formatTtl(ttl?: number) {
  if (ttl === undefined) return "TTL unavailable"
  if (ttl >= 86400) return `${Math.floor(ttl / 86400)}d`
  if (ttl >= 3600) return `${Math.floor(ttl / 3600)}h`
  if (ttl >= 60) return `${Math.floor(ttl / 60)}m`
  return `${ttl}s`
}

export function DnsCheckerResults({ results }: { results: DnsLookupResult[] }) {
  const successfulResolvers = results.filter((result) => result.status === "success").length
  const rawText = results
    .map((result) => {
      if (result.status !== "success" || result.answers.length === 0) {
        return `${result.providerName}: ${result.error ?? "No matching records were returned."}`
      }

      const lines = result.answers.map(
        (answer) =>
          `${result.providerName} | ${recordTypeLabels[answer.type] ?? "DNS"} | ${answer.data} | TTL ${formatTtl(answer.ttl)}`
      )

      return lines.join("\n")
    })
    .filter(Boolean)
    .join("\n\n")

  return (
    <section aria-label="DNS checker results" className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            resolver comparison
          </p>
          <h2 className="mt-2 text-xl font-semibold">DNS answers</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {successfulResolvers} of {results.length} resolvers responded
        </p>
      </div>

      <article className="border border-border bg-card p-5">
        <div className="min-w-0 overflow-x-auto">
          <pre className="font-mono text-[11px] leading-6 text-foreground whitespace-pre-wrap sm:text-xs">
            {rawText}
          </pre>
        </div>
      </article>
    </section>
  )
}
