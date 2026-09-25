import * as React from "react"

import {
  ThemeProviderContext,
  useThemePreference,
  type Theme,
} from "../../hooks/use-theme"

export type { Theme } from "../../hooks/use-theme"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "sawit-dev-theme",
}: ThemeProviderProps) {
  const { theme, setTheme } = useThemePreference(defaultTheme, storageKey)

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export { useTheme } from "../../hooks/use-theme"
