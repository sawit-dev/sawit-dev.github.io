import type { RdapRecord } from "../../lib/rdap/types"

type WhoisDetailsProps = {
  result: RdapRecord
}

function formatDate(value?: string) {
  if (!value) return "Not returned"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date)
}

export function WhoisDetails({ result }: WhoisDetailsProps) {
  const status = result.status?.join(", ") ?? "Not returned"
  const nameservers =
    result.nameservers
      ?.map((nameserver) => nameserver.ldhName)
      .filter((value): value is string => Boolean(value))
      .join(", ") ?? "Not returned"

  const registrationDate =
    result.events?.find((event) => event.eventAction === "registration")?.eventDate ??
    "Not returned"
  const lastChanged =
    result.events?.find((event) => event.eventAction === "last changed")?.eventDate ??
    result.events?.find((event) => event.eventAction === "last update of RDAP database")?.eventDate ??
    "Not returned"
  const expirationDate =
    result.events?.find((event) => event.eventAction === "expiration")?.eventDate ??
    "Not returned"

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
          <dd className="mt-3 text-sm">{status}</dd>
        </div>
        <div className="border border-border p-4">
          <dt className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            nameservers
          </dt>
          <dd className="mt-3 text-sm">{nameservers}</dd>
        </div>
        <div className="border border-border p-4">
          <dt className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            registered
          </dt>
          <dd className="mt-3 text-sm">{formatDate(registrationDate)}</dd>
        </div>
        <div className="border border-border p-4">
          <dt className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            last changed
          </dt>
          <dd className="mt-3 text-sm">{formatDate(lastChanged)}</dd>
        </div>
        <div className="border border-border p-4 md:col-span-2">
          <dt className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            expiry
          </dt>
          <dd className="mt-3 text-sm">{formatDate(expirationDate)}</dd>
        </div>
      </dl>
    </section>
  )
}
