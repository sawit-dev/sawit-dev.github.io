import { Button } from "@sawit/ui/components/button"
import { Input } from "@sawit/ui/components/input"
import type { DnsRecordType } from "@sawit/networking"

type DnsCheckerFormProps = {
  value: string
  recordType: DnsRecordType
  isLoading: boolean
  onValueChange: (value: string) => void
  onRecordTypeChange: (value: DnsRecordType) => void
  onSubmit: () => void
}

export function DnsCheckerForm({
  value,
  recordType,
  isLoading,
  onValueChange,
  onRecordTypeChange,
  onSubmit,
}: DnsCheckerFormProps) {
  return (
    <form
      className="flex flex-col gap-3 border border-border bg-card p-4 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <Input
        aria-label="Domain name"
        className="h-10 flex-1"
        placeholder="example.com"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
      <select
        aria-label="DNS record type"
        className="h-10 border border-input bg-background px-3 text-sm"
        value={recordType}
        onChange={(event) => onRecordTypeChange(event.target.value as DnsRecordType)}
      >
        {(["A", "AAAA", "CNAME", "MX", "NS", "TXT"] as const).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <Button disabled={isLoading} type="submit" className="h-10">
        {isLoading ? "Checking..." : "Check DNS"}
      </Button>
    </form>
  )
}
