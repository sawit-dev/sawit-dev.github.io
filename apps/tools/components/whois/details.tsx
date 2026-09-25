import type { RdapRecord } from "../../lib/rdap/types"

type WhoisDetailsProps = {
  result: RdapRecord
}

type FlattenedRow = {
  key: string
  value: string
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

function normalizeValue(value: unknown): string {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (value === null || value === undefined) return "Not returned"
  return JSON.stringify(value)
}

function flattenEntries(
  object: Record<string, unknown>,
  parentKey = "",
  rows: FlattenedRow[] = []
): FlattenedRow[] {
  for (const [key, value] of Object.entries(object)) {
    const label = parentKey ? `${parentKey}.${humanizeKey(key)}` : humanizeKey(key)

    if (Array.isArray(value)) {
      if (value.length === 0) {
        rows.push({ key: label, value: "No entries" })
        continue
      }

      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          flattenEntries(item as Record<string, unknown>, `${label}[${index}]`, rows)
        } else {
          rows.push({ key: `${label}[${index}]`, value: normalizeValue(item) })
        }
      })
      continue
    }

    if (typeof value === "object" && value !== null) {
      flattenEntries(value as Record<string, unknown>, label, rows)
      continue
    }

    const isDateLike = key.toLowerCase().includes("date")
    rows.push({
      key: label,
      value: isDateLike ? formatDateValue(value as string) : normalizeValue(value),
    })
  }

  return rows
}

export function WhoisDetails({ result }: WhoisDetailsProps) {
  const rows = flattenEntries(result)
  const rawText = rows.map((row) => `${row.key}: ${row.value}`).join("\n")

  return (
    <section className="border border-border bg-card p-5">
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
        registry response
      </p>
      <h2 className="mt-2 text-2xl font-semibold">
        {result.ldhName ?? result.handle ?? "Domain record"}
      </h2>

      <div className="mt-6 min-w-0 overflow-x-auto">
        <pre className="rounded-md border border-border bg-muted/10 p-3 font-mono text-[11px] leading-6 text-foreground whitespace-pre-wrap sm:text-xs">
          {rawText}
        </pre>
      </div>
    </section>
  )
}
