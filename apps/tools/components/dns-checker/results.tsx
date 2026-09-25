import type { DnsLookupResult } from "../../lib/dns/types"

export function DnsCheckerResults({ results }: { results: DnsLookupResult[] }) {
  return (
    <section aria-label="DNS checker results" className="grid gap-3 md:grid-cols-3">
      {results.map((result) => (
        <article className="border border-border bg-card p-5" key={result.providerId}>
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-medium">{result.providerName}</h2>
            <span
              className={`font-mono text-[10px] tracking-[0.12em] uppercase ${result.status === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}
            >
              {result.status}
            </span>
          </div>
          {result.answers.length > 0 ? (
            <ul className="mt-5 space-y-2 font-mono text-xs text-muted-foreground">
              {result.answers.map((answer, index) => (
                <li className="break-all border-t border-border pt-2" key={`${answer.data}-${index}`}>
                  {answer.data}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-muted-foreground">
              {result.error ?? "No records returned"}
            </p>
          )}
        </article>
      ))}
    </section>
  )
}
