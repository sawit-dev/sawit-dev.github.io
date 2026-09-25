import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@sawit/ui/components/button"
import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router"
import { ThemeToggle } from "../theme/theme-toggle"

type NavigationLink = {
  label: string
  to: string
  description?: string
}

type NavigationGroup = {
  label: string
  description: string
  items: NavigationLink[]
}

const navigation: Array<NavigationLink | NavigationGroup> = [
  {
    label: "Home",
    to: "/",
    description: "See all available network tools in one place.",
  },
  {
    label: "Networking",
    description:
      "Practical tools for exploring DNS and domain registration data.",
    items: [
      {
        label: "DNS Checker",
        to: "/dns-checker",
        description: "Inspect records, nameservers, and resolver responses.",
      },
      {
        label: "WHOIS / RDAP",
        to: "/whois",
        description: "Look up registration and network allocation details.",
      },
    ],
  },
]

function linkClass({ isActive }: { isActive: boolean }) {
  return `inline-flex h-7 items-center rounded-lg px-1 text-sm transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
}

function isGroupActive(items: { to: string }[], pathname: string) {
  return items.some((item) => pathname === item.to)
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const { pathname } = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const wasOpenRef = useRef(false)
  const mobileMenuId = "mobile-navigation"

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        setOpenGroup(null)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        openGroup &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpenGroup(null)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [openGroup])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    function handleBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsOpen(false)
        setOpenGroup(null)
      }
    }

    mediaQuery.addEventListener("change", handleBreakpointChange)
    return () =>
      mediaQuery.removeEventListener("change", handleBreakpointChange)
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

  useEffect(() => {
    setOpenGroup(null)
  }, [pathname])

  return (
    <header
      ref={headerRef}
      className="relative z-50 border-b border-border/70 bg-background"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight"
          onClick={() => {
            setIsOpen(false)
            setOpenGroup(null)
          }}
        >
          <img src="/logo.svg" alt="Sawit Dev" className="size-8" />
          <span>Sawit Dev</span>
        </NavLink>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            if ("items" in item) {
              const isActive = isGroupActive(item.items, pathname)
              const isGroupOpen = openGroup === item.label
              const menuId = `${item.label.toLowerCase()}-menu`

              return (
                <div className="relative" key={item.label}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-expanded={isGroupOpen}
                    aria-haspopup="menu"
                    aria-controls={menuId}
                    className={`gap-1 px-1 text-sm font-normal ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                    onClick={() =>
                      setOpenGroup(isGroupOpen ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      size={15}
                      className={`transition-transform ${isGroupOpen ? "rotate-180" : ""}`}
                    />
                  </Button>
                  {isGroupOpen ? (
                    <div
                      id={menuId}
                      role="menu"
                      className="absolute top-full left-1/2 mt-4 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border border-border bg-background p-3 shadow-xl"
                    >
                      <div className="border-b border-border px-3 pb-3">
                        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                          {item.label}
                        </p>
                        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className="grid gap-1 pt-2 sm:grid-cols-2">
                        {item.items.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            role="menuitem"
                            className={({ isActive: childIsActive }) =>
                              `group rounded-lg p-3 transition-colors ${childIsActive ? "bg-muted" : "hover:bg-muted"}`
                            }
                            onClick={() => setOpenGroup(null)}
                          >
                            <span className="flex items-center justify-between gap-3 text-sm font-medium text-foreground">
                              {child.label}
                              <ArrowUpRight
                                aria-hidden="true"
                                size={15}
                                className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                              {child.description}
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : null}
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
            onClick={() => {
              setIsOpen((open) => {
                if (open) setOpenGroup(null)
                return !open
              })
            }}
          >
            {isOpen ? (
              <X aria-hidden="true" size={18} />
            ) : (
              <Menu aria-hidden="true" size={18} />
            )}
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
                const isGroupOpen = openGroup === item.label
                const mobileGroupId = `mobile-${item.label.toLowerCase()}-menu`

                return (
                  <div className="py-5" key={item.label}>
                    <button
                      type="button"
                      aria-expanded={isGroupOpen}
                      aria-controls={mobileGroupId}
                      className="flex w-full items-start justify-between gap-4 text-left"
                      onClick={() =>
                        setOpenGroup(isGroupOpen ? null : item.label)
                      }
                    >
                      <span>
                        <span
                          className={`block text-xl font-medium ${isActive ? "text-foreground" : "text-foreground/90"}`}
                        >
                          {item.label}
                        </span>
                        <span className="mt-1 block max-w-xs text-sm leading-5 text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                      <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground">
                        <ChevronDown
                          aria-hidden="true"
                          size={17}
                          className={`transition-transform ${isGroupOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>
                    <div
                      id={mobileGroupId}
                      className={`grid transition-[grid-template-rows,opacity] duration-200 ${isGroupOpen ? "grid-rows-[1fr] pt-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="flex min-h-0 flex-col gap-2 overflow-hidden pl-1">
                        {item.items.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className={({ isActive: childIsActive }) =>
                              `group flex items-center justify-between gap-4 rounded-lg border border-border/70 px-4 py-3 transition-colors ${childIsActive ? "bg-muted" : "hover:bg-muted"}`
                            }
                            onClick={() => {
                              setIsOpen(false)
                              setOpenGroup(null)
                            }}
                          >
                            <span>
                              <span className="block text-base font-medium text-foreground">
                                {child.label}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                {child.description}
                              </span>
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              size={17}
                              className="shrink-0 text-muted-foreground"
                            />
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div className="py-5" key={item.to}>
                  <NavLink
                    to={item.to}
                    role="menuitem"
                    className={({ isActive }) =>
                      `group flex items-start justify-between gap-4 text-left ${isActive ? "text-foreground" : "text-foreground/90"}`
                    }
                    onClick={() => {
                      setIsOpen(false)
                      setOpenGroup(null)
                    }}
                  >
                    <span>
                      <span className="block text-xl font-medium">
                        {item.label}
                      </span>
                      <span className="mt-1 block max-w-xs text-sm leading-5 text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                    <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:bg-muted">
                      <ArrowUpRight aria-hidden="true" size={17} />
                    </span>
                  </NavLink>
                </div>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}
