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
          <h2 className="mt-2 text-xl font-semibold">DNS answers</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {successfulResolvers} of {results.length} resolvers responded
        </p>
      </div>

      <article className="border border-border bg-card p-5">
        <div className="space-y-5">
          {results.map((result) => (
            <div key={result.providerId} className="rounded-md border border-border p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium">{result.providerName}</h3>
                <span
                  className={`font-mono text-[10px] tracking-[0.12em] uppercase ${result.status === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}
                >
                  {result.status === "success" ? "Responded" : "Unavailable"}
                </span>
              </div>

              {result.status === "success" && result.answers.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {result.answers.map((answer, index) => (
                    <dl
                      key={`${result.providerId}-${answer.data}-${index}`}
                      className="rounded-md border border-border/80 bg-muted/20 p-3 text-sm"
                    >
                      <div className="grid gap-2 sm:grid-cols-[120px_1fr]">
                        <dt className="text-muted-foreground">Record</dt>
                        <dd className="font-mono text-xs">{recordTypeLabels[answer.type] ?? "DNS"}</dd>
                      </div>
                      <div className="mt-2 grid gap-2 sm:grid-cols-[120px_1fr]">
                        <dt className="text-muted-foreground">Value</dt>
                        <dd className="break-all font-mono text-xs">{answer.data}</dd>
                      </div>
                      <div className="mt-2 grid gap-2 sm:grid-cols-[120px_1fr]">
                        <dt className="text-muted-foreground">TTL</dt>
                        <dd className="font-mono text-xs">{formatTtl(answer.ttl)}</dd>
                      </div>
                    </dl>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  {result.error ?? "No matching records were returned."}
                </p>
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
