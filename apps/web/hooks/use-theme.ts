import * as React from "react"

export type Theme = "dark" | "light" | "system"

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

export function getSystemTheme(): Exclude<Theme, "system"> {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getStoredTheme(storageKey: string): Theme | null {
  if (typeof window === "undefined") {
    return null
  }

  const storedTheme = window.localStorage.getItem(storageKey)
  return storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
    ? storedTheme
    : null
}

export function useThemePreference(
  defaultTheme: Theme = "system",
  storageKey = "sawit-dev-theme"
) {
  const [theme, setThemeState] = React.useState<Theme>(
    () => getStoredTheme(storageKey) ?? defaultTheme
  )

  React.useEffect(() => {
    const storedTheme = getStoredTheme(storageKey)
    if (storedTheme && storedTheme !== theme) {
      setThemeState(storedTheme)
    }
  }, [storageKey, theme])

  React.useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = () => {
      root.classList.remove("light", "dark")
      root.classList.add(theme === "system" ? getSystemTheme() : theme)
    }

    applyTheme()

    if (theme !== "system") {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", applyTheme)
    return () => mediaQuery.removeEventListener("change", applyTheme)
  }, [theme])

  const setTheme = (nextTheme: Theme) => {
    window.localStorage.setItem(storageKey, nextTheme)
    setThemeState(nextTheme)
  }

  return { theme, setTheme }
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
