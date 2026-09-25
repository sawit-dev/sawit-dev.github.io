import { Menu, X } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router"
import { ThemeToggle } from "../theme/theme-toggle"

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
]

function linkClass({ isActive }: { isActive: boolean }) {
  return `text-sm transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const wasOpenRef = useRef(false)
  const mobileMenuId = "mobile-navigation"

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")

    function handleBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsOpen(false)
      }
    }

    mediaQuery.addEventListener("change", handleBreakpointChange)

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ""
      if (wasOpenRef.current) {
        menuButtonRef.current?.focus()
      }
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
    <header className="relative z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          <img src="/logo.svg" alt="Sawit Dev" className="size-8" />
          <span>Sawit Dev</span>
        </NavLink>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
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
            {isOpen ? (
              <X aria-hidden="true" size={18} />
            ) : (
              <Menu aria-hidden="true" size={18} />
            )}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background md:hidden">
          <nav
            ref={mobileNavRef}
            id={mobileMenuId}
            aria-label="Mobile navigation"
            aria-hidden={!isOpen}
            className="flex h-full flex-col justify-start bg-background px-5 pt-6 pb-8 transition-all duration-200 ease-out"
          >
            <div role="menu" className="flex w-full flex-col gap-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  role="menuitem"
                  className={({ isActive }) =>
                    `flex items-center justify-between py-3 text-[clamp(2rem,7vw,3.5rem)] leading-none tracking-[-0.06em] transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/90"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.label}</span>
                  <span className="text-2xl leading-none text-foreground/70">
                    ›
                  </span>
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
