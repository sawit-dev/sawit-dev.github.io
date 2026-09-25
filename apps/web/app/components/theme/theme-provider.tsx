import * as React from "react"

export type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

function getSystemTheme(): Exclude<Theme, "system"> {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "sawit-dev-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)

  React.useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey) as Theme | null
    if (
      storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
    ) {
      setThemeState(storedTheme)
    }
  }, [storageKey])

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

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
