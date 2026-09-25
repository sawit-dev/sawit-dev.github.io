import * as React from "react"

export type Theme = "dark" | "light" | "system"

export type ThemeProviderState = {
  theme: Theme
  isHydrated: boolean
  setTheme: (theme: Theme) => void
}

export const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

export function useThemePreference(
  defaultTheme: Theme = "system",
  storageKey = "sawit-tools-theme"
) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey)
    if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
      setThemeState(storedTheme)
    }
    setIsHydrated(true)
  }, [storageKey])

  React.useEffect(() => {
    if (!isHydrated) return

    const root = document.documentElement
    const applyTheme = () => {
      root.classList.remove("light", "dark")
      root.classList.add(
        theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : theme
      )
    }

    applyTheme()
    if (theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", applyTheme)
    return () => mediaQuery.removeEventListener("change", applyTheme)
  }, [isHydrated, theme])

  return {
    theme,
    isHydrated,
    setTheme: (nextTheme: Theme) => {
      window.localStorage.setItem(storageKey, nextTheme)
      setThemeState(nextTheme)
    },
  }
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}