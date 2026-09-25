import { Button } from "@sawit/ui/components/button"
import { Input } from "@sawit/ui/components/input"

type WhoisFormProps = {
  value: string
  isLoading: boolean
  onValueChange: (value: string) => void
  onSubmit: () => void
}

export function WhoisForm({
  value,
  isLoading,
  onValueChange,
  onSubmit,
}: WhoisFormProps) {
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
      <Button disabled={isLoading} type="submit" className="h-10">
        {isLoading ? "Checking..." : "Look up domain"}
      </Button>
    </form>
  )
}
