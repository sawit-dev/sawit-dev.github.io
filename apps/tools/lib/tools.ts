export type ToolStatus = "Coming next" | "In the making"

export type ToolSummary = {
  number: string
  title: string
  status: ToolStatus
}

export const toolSummaries: ToolSummary[] = [
  { number: "01", title: "DNS Checker", status: "Coming next" },
  { number: "02", title: "WHOIS / RDAP Lookup", status: "Coming next" },
  { number: "03", title: "More utilities", status: "In the making" },
]