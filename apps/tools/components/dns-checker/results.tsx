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

  return (
    <section aria-label="DNS checker results" className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            resolver comparison
          </p>
          <h2 className="mt-2 text-xl font-semibold">DNS answers by provider</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {successfulResolvers} of {results.length} resolvers responded
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {results.map((result) => (
          <article className="border border-border bg-card p-5" key={result.providerId}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-medium">{result.providerName}</h3>
              <span
                className={`font-mono text-[10px] tracking-[0.12em] uppercase ${result.status === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}
              >
                {result.status === "success" ? "Responded" : "Unavailable"}
              </span>
            </div>
            {result.answers.length > 0 ? (
              <div className="mt-5 space-y-3">
                {result.answers.map((answer, index) => (
                  <dl className="border-t border-border pt-3 text-sm" key={`${answer.data}-${index}`}>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Record</dt>
                      <dd className="font-mono text-xs">{recordTypeLabels[answer.type] ?? "DNS"}</dd>
                    </div>
                    <div className="mt-2 flex justify-between gap-4">
                      <dt className="text-muted-foreground">Value</dt>
                      <dd className="max-w-[70%] break-all text-right font-mono text-xs">
                        {answer.data}
                      </dd>
                    </div>
                    <div className="mt-2 flex justify-between gap-4">
                      <dt className="text-muted-foreground">Cache time</dt>
                      <dd className="font-mono text-xs">{formatTtl(answer.ttl)}</dd>
                    </div>
                  </dl>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                {result.error ?? "No matching records were returned."}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
