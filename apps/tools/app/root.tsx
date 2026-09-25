import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"

import { SiteShell } from "../components/layout/tool-shell"
import { ThemeProvider } from "../components/theme/theme-provider"
import "@sawit/ui/globals.css"

const themeBootstrapScript = `
  (() => {
    const storedTheme = window.localStorage.getItem("sawit-tools-theme")
    const theme = ["light", "dark", "system"].includes(storedTheme)
      ? storedTheme
      : "system"
    const resolvedTheme = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme
    document.documentElement.classList.add(resolvedTheme)
  })()
`

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}