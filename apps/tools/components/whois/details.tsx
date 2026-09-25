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

function normalizeValue(value: unknown): string {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (value === null || value === undefined) return "Not returned"
  return JSON.stringify(value)
}

function renderEnvLikeBlock(
  object: Record<string, unknown>,
  depth = 0,
  parentLabel = ""
): string[] {
  const indent = "  ".repeat(depth)
  const lines: string[] = []

  for (const [key, value] of Object.entries(object)) {
    const label = humanizeKey(key)

    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${indent}${parentLabel ? `${parentLabel}.${label}` : label}=[]`)
        continue
      }

      const primitiveValues = value.filter((item) => item === null || typeof item !== "object")
      if (primitiveValues.length === value.length) {
        lines.push(
          `${indent}${parentLabel ? `${parentLabel}.${label}` : label}=${value.map((item) => normalizeValue(item)).join(", ")}`
        )
        continue
      }

      lines.push(`${indent}${parentLabel ? `${parentLabel}.${label}` : label}:`)
      value.forEach((item) => {
        if (item && typeof item === "object") {
          lines.push(...renderEnvLikeBlock(item as Record<string, unknown>, depth + 1))
        } else {
          lines.push(`${"  ".repeat(depth + 1)}- ${normalizeValue(item)}`)
        }
      })
      continue
    }

    if (value && typeof value === "object") {
      const nextLabel = parentLabel ? `${parentLabel}.${label}` : label
      lines.push(`${indent}${nextLabel}:`)
      lines.push(...renderEnvLikeBlock(value as Record<string, unknown>, depth + 1, nextLabel))
      continue
    }

    const finalKey = parentLabel ? `${parentLabel}.${label}` : label
    const normalizedValue = key.toLowerCase().includes("date")
      ? formatDateValue(value as string)
      : normalizeValue(value)
    lines.push(`${indent}${finalKey}=${normalizedValue}`)
  }

  return lines
}

export function WhoisDetails({ result }: WhoisDetailsProps) {
  const rawText = renderEnvLikeBlock(result).join("\n")

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
