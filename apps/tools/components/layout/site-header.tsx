import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@sawit/ui/components/button"
import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router"
import { ThemeToggle } from "../theme/theme-toggle"

type NavigationLink = {
  label: string
  to: string
}

type NavigationGroup = {
  label: string
  items: NavigationLink[]
}

const navigation: Array<NavigationLink | NavigationGroup> = [
  { label: "Home", to: "/" },
  {
    label: "Networking",
    items: [
      { label: "DNS Checker", to: "/dns-checker" },
      { label: "WHOIS / RDAP", to: "/whois" },
    ],
  },
]

const networkingNavigation = navigation.find(
  (item): item is NavigationGroup => "items" in item
)

function linkClass({ isActive }: { isActive: boolean }) {
  return `text-sm transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
}

function isGroupActive(items: { to: string }[], pathname: string) {
  return items.some((item) => pathname === item.to)
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const [isNetworkingOpen, setIsNetworkingOpen] = useState(() =>
    networkingNavigation ? isGroupActive(networkingNavigation.items, pathname) : false
  )
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const desktopGroupRef = useRef<HTMLDivElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const wasOpenRef = useRef(false)
  const mobileMenuId = "mobile-navigation"

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        setIsNetworkingOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        isNetworkingOpen &&
        desktopGroupRef.current &&
        !desktopGroupRef.current.contains(event.target as Node)
      ) {
        setIsNetworkingOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [isNetworkingOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    function handleBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false)
    }

    mediaQuery.addEventListener("change", handleBreakpointChange)
    return () => mediaQuery.removeEventListener("change", handleBreakpointChange)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ""
      if (wasOpenRef.current) menuButtonRef.current?.focus()
      wasOpenRef.current = false
      return
    }

    wasOpenRef.current = true
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    mobileNavRef.current?.querySelector<HTMLElement>("a")?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <header className="relative z-50 border-b border-border/70 bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          <img src="/logo.svg" alt="Sawit Dev" className="size-8" />
          <span>Sawit Dev</span>
        </NavLink>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navigation.map((item) => {
            if ("items" in item) {
              const isActive = isGroupActive(item.items, pathname)

              return (
                <div className="relative" key={item.label} ref={desktopGroupRef}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-expanded={isNetworkingOpen}
                    aria-haspopup="menu"
                    className={`gap-1 px-1 text-sm font-normal ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                    onClick={() => setIsNetworkingOpen((open) => !open)}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      size={15}
                      className={`transition-transform ${isNetworkingOpen ? "rotate-180" : ""}`}
                    />
                  </Button>
                  <div
                    className={`absolute top-full left-0 mt-2 min-w-48 origin-top-left rounded-lg border border-border bg-background p-1 shadow-lg transition-[transform,opacity,visibility] ${isNetworkingOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"}`}
                    aria-hidden={!isNetworkingOpen}
                  >
                    {item.items.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive: childIsActive }) =>
                          `block rounded-md px-3 py-2 text-sm transition-colors ${childIsActive ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`
                        }
                        onClick={() => setIsNetworkingOpen(false)}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            ref={menuButtonRef}
            type="button"
            variant="ghost"
            size="icon"
            className={`relative z-[70] h-9 w-9 rounded-md md:hidden ${isOpen ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls={mobileMenuId}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
          </Button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-[60] bg-background md:hidden ${
          isOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-4 opacity-0"
        } transition-[transform,opacity,visibility] duration-300 ease-out`}
      >
        <nav
          ref={mobileNavRef}
          id={mobileMenuId}
          aria-label="Mobile navigation"
          aria-hidden={!isOpen}
          className="flex h-full flex-col justify-start bg-background px-5 pt-6 pb-8"
        >
          <div role="menu" className="flex w-full flex-col gap-2">
            {navigation.map((item) => {
              if ("items" in item) {
                const isActive = isGroupActive(item.items, pathname)

                return (
                  <div className="border-t border-border pt-4" key={item.label}>
                    <button
                      type="button"
                      aria-expanded={isNetworkingOpen}
                      className={`flex w-full items-center justify-between px-0 py-2 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase ${isActive ? "text-foreground" : ""}`}
                      onClick={() => setIsNetworkingOpen((open) => !open)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        aria-hidden="true"
                        size={18}
                        className={`transition-transform ${isNetworkingOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-200 ${isNetworkingOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      aria-hidden={!isNetworkingOpen}
                    >
                      <div className="flex min-h-0 flex-col gap-2 overflow-hidden pl-4">
                      {item.items.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          role="menuitem"
                          className={({ isActive }) =>
                            `flex items-center justify-between py-3 text-[clamp(1.75rem,6vw,3rem)] leading-none transition-colors ${isActive ? "text-foreground" : "text-foreground/90"}`
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{child.label}</span>
                          <span className="text-2xl leading-none text-foreground/70">›</span>
                        </NavLink>
                      ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  role="menuitem"
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3 text-[clamp(2rem,7vw,3.5rem)] leading-none transition-colors ${isActive ? "text-foreground" : "text-foreground/90"}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.label}</span>
                  <span className="text-2xl leading-none text-foreground/70">›</span>
                </NavLink>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}
