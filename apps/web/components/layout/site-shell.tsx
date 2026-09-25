import type { ReactNode } from "react"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"
import { PageTransition } from "./page-transition"
import { useNavigation } from "react-router"

export function SiteShell({ children }: { children: ReactNode }) {
  const navigation = useNavigation()
  const isNavigating = navigation.state !== "idle"

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <PageTransition />
      <SiteHeader />
      <main
        className={`flex-1 transition-opacity duration-200 ${isNavigating ? "opacity-70" : "opacity-100"}`}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
