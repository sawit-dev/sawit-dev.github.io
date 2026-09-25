import type { RdapRecord } from "../../lib/rdap/types"

type WhoisDetailsProps = {
  result: RdapRecord
}

export function WhoisDetails({ result }: WhoisDetailsProps) {
  return (
    <section className="border border-border bg-card p-5">
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        registry response
      </p>
      <h2 className="mt-2 text-2xl font-semibold">
        {result.ldhName ?? result.handle ?? "Domain record"}
      </h2>
      <dl className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="border border-border p-4">
          <dt className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            status
          </dt>
          <dd className="mt-3 text-sm">{result.status?.join(", ") ?? "Not returned"}</dd>
        </div>
        <div className="border border-border p-4">
          <dt className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            nameservers
          </dt>
          <dd className="mt-3 text-sm">
            {result.nameservers?.map((nameserver) => nameserver.ldhName).filter(Boolean).join(", ") ?? "Not returned"}
          </dd>
        </div>
      </dl>
      <pre className="mt-6 max-h-96 overflow-auto border border-border p-4 font-mono text-xs text-muted-foreground">
        {JSON.stringify(result, null, 2)}
      </pre>
    </section>
  )
}
