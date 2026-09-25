import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router"
import { ArrowLeft, Home } from "lucide-react"

import type { Route } from "./+types/root"
import { SiteShell } from "../components/layout/site-shell"
import { ThemeProvider } from "../components/theme/theme-provider"
import { Button } from "@workspace/ui/components/button"
import "@workspace/ui/globals.css"

const themeBootstrapScript = `
  (() => {
    const storedTheme = window.localStorage.getItem("sawit-dev-theme")
    const theme = ["light", "dark", "system"].includes(storedTheme)
      ? storedTheme
      : "system"
    const resolvedTheme = theme === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme
    document.documentElement.classList.add(resolvedTheme)
  })()
`

export function links() {
  return [
    { rel: "icon", href: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ]
}

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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="mx-auto flex min-h-[60svh] w-full max-w-6xl items-center px-5 py-16 lg:px-8">
      <div className="max-w-xl">
        <p className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
          {message === "404" ? "Page not found" : "Something went wrong"}
        </p>
        <h1 className="mt-4 font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
          {message}
        </h1>
        <p className="mt-5 max-w-md text-lg leading-8 text-muted-foreground">
          {details}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button render={<a href="/" />}>
            <Home aria-hidden="true" size={16} />
            Back home
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft aria-hidden="true" size={16} />
            Go back
          </Button>
        </div>
        {stack && (
          <pre className="mt-10 w-full overflow-x-auto border border-border p-4 text-sm">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  )
}
