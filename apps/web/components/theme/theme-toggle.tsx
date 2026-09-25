import { Monitor, Moon, Sun } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { useTheme, type Theme } from "../../hooks/use-theme"

const themes: { value: Theme; label: string; icon: typeof Monitor }[] = [
  { value: "system", label: "Use system theme", icon: Monitor },
  { value: "light", label: "Use light theme", icon: Sun },
  { value: "dark", label: "Use dark theme", icon: Moon },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <ToggleGroup
      value={[theme]}
      variant="outline"
      size="sm"
      spacing={0}
      aria-label="Choose color theme"
    >
      {themes.map(({ value, label, icon: Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          onClick={() => setTheme(value)}
          aria-pressed={theme === value}
          aria-label={label}
          title={label}
          className="size-7"
        >
          <Icon aria-hidden="true" size={14} />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
