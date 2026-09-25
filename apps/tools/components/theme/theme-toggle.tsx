import { Monitor, Moon, Sun } from "lucide-react"
import { toggleVariants } from "@sawit/ui/components/toggle"
import { cn } from "@sawit/ui/lib/utils"
import { useTheme, type Theme } from "../../hooks/use-theme"

const themes: { value: Theme; label: string; icon: typeof Monitor }[] = [
  { value: "system", label: "Use system theme", icon: Monitor },
  { value: "light", label: "Use light theme", icon: Sun },
  { value: "dark", label: "Use dark theme", icon: Moon },
]

export function ThemeToggle() {
  const { theme, isHydrated, setTheme } = useTheme()

  return (
    <div
      role="group"
      data-size="sm"
      data-spacing="0"
      data-variant="outline"
      className="flex w-fit flex-row items-center rounded-lg"
      aria-label="Choose color theme"
    >
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          aria-pressed={isHydrated && theme === value}
          aria-label={label}
          title={label}
          className={cn(
            "size-7 shrink-0 rounded-none border-l-0 px-2 first:rounded-l-lg first:border-l last:rounded-r-lg",
            toggleVariants({ variant: "outline", size: "sm" })
          )}
        >
          <Icon aria-hidden="true" size={14} />
        </button>
      ))}
    </div>
  )
}
