import type { ReactNode } from "react"
import { Link } from "react-router"
import { SiteHeader } from "./site-header"

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 text-sm text-muted-foreground lg:px-8">
          <p>Tools by Sawit Dev</p>
          <Link className="hover:text-foreground" to="/">
            Home
          </Link>
        </div>
      </footer>
    </div>
  )
}