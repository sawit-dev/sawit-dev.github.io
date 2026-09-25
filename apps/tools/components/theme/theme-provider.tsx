import * as React from "react"

import {
  ThemeProviderContext,
  useThemePreference,
  type Theme,
} from "../../hooks/use-theme"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "sawit-tools-theme",
}: ThemeProviderProps) {
  const themeState = useThemePreference(defaultTheme, storageKey)
  return (
    <ThemeProviderContext.Provider value={themeState}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export { useTheme } from "../../hooks/use-theme"