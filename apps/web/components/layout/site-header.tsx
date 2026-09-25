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
  const mobileMenuRef = useRef<HTMLElement | null>(null)
  const mobileMenuId = "mobile-navigation"

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node

      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handlePointerDown)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handlePointerDown)
    }
  }, [isOpen])

  return (
    <header className="relative border-b border-border/70 bg-background/90 backdrop-blur">
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
            type="button"
            variant="outline"
            size="icon"
            className={`md:hidden transition-transform ${isOpen ? "rotate-90" : ""}`}
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
        <button
          type="button"
          aria-label="Close mobile navigation"
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        ref={mobileMenuRef}
        id={mobileMenuId}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`absolute inset-x-0 top-full z-50 border-t border-border/70 bg-background/95 px-5 py-4 shadow-sm backdrop-blur-md transition-[opacity,transform,visibility] duration-200 ease-out md:hidden ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
