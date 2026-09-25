import { Button } from "@sawit/ui/components/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@sawit/ui/components/combobox"
import { Input } from "@sawit/ui/components/input"
import type { DnsRecordType } from "@sawit/networking/dns"

type DnsCheckerFormProps = {
  value: string
  recordType: DnsRecordType | ""
  isLoading: boolean
  onValueChange: (value: string) => void
  onRecordTypeChange: (value: DnsRecordType | "") => void
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
      <Combobox
        value={recordType}
        onValueChange={(value) => onRecordTypeChange(value as DnsRecordType)}
      >
        <ComboboxInput
          aria-label="DNS record type"
          className="h-10 w-full sm:w-36"
          placeholder="Record type"
        />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No record type found.</ComboboxEmpty>
            {(["A", "AAAA", "CNAME", "MX", "NS", "TXT"] as const).map(
              (type) => (
                <ComboboxItem key={type} value={type}>
                  {type}
                </ComboboxItem>
              )
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Button disabled={isLoading} type="submit" className="h-10">
        {isLoading ? "Checking..." : "Check DNS"}
      </Button>
    </form>
  )
}
