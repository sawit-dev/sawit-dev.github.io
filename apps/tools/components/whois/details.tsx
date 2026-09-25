import type { ReactNode } from "react"

import type { RdapRecord } from "../../lib/rdap/types"

type WhoisDetailsProps = {
  result: RdapRecord
}

function humanizeKey(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^./, (character) => character.toUpperCase())
}

function formatDateValue(value?: string) {
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

function formatPrimitive(value: unknown): string {
  if (typeof value === "string") {
    return value
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value)
  }

  if (value === null || value === undefined) {
    return "Not returned"
  }

  return JSON.stringify(value)
}

function renderValue(value: unknown, depth = 0): ReactNode {
  if (Array.isArray(value)) {
    if (value.length === 0) return "No entries"

    return (
      <ul className="mt-2 space-y-2 pl-4 text-sm text-muted-foreground">
        {value.map((item, index) => (
          <li key={`${String(index)}-${depth}`} className="list-disc marker:text-foreground/60">
            {typeof item === "object" && item !== null ? (
              <div className="space-y-2">{renderObjectEntries(item as Record<string, unknown>, depth + 1)}</div>
            ) : (
              <span>{formatPrimitive(item)}</span>
            )}
          </li>
        ))}
      </ul>
    )
  }

  if (typeof value === "object" && value !== null) {
    return <div className="space-y-2">{renderObjectEntries(value as Record<string, unknown>, depth)}</div>
  }

  return <span className="text-sm text-foreground">{formatPrimitive(value)}</span>
}

function renderObjectEntries(object: Record<string, unknown>, depth = 0): ReactNode {
  const entries = Object.entries(object)
  if (entries.length === 0) return <span className="text-sm text-muted-foreground">No data</span>

  return entries.map(([key, value]) => {
    const isNestedObject = typeof value === "object" && value !== null && !Array.isArray(value)
    const isDateLike = typeof value === "string" && key.toLowerCase().includes("date")

    return (
      <div
        key={key}
        className={depth === 0 ? "rounded-md border border-border bg-muted/20 p-3" : "rounded-md border border-border/80 bg-background p-2"}
      >
        <p className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
          {humanizeKey(key)}
        </p>
        <div className="mt-2">
          {isNestedObject ? (
            <div className="pl-2">{renderObjectEntries(value as Record<string, unknown>, depth + 1)}</div>
          ) : isDateLike ? (
            <span className="text-sm text-foreground">{formatDateValue(value as string)}</span>
          ) : (
            renderValue(value, depth + 1)
          )}
        </div>
      </div>
    )
  })
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

      <div className="mt-6 space-y-3">
        {renderObjectEntries(result)}
      </div>
    </section>
  )
}
