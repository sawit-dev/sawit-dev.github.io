import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router"

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

  return (
    <header className="border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex size-8 items-center justify-center bg-primary font-mono text-xs text-primary-foreground">
            SD
          </span>
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
        <button
          type="button"
          className="flex size-9 items-center justify-center border border-border md:hidden"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X aria-hidden="true" size={18} />
          ) : (
            <Menu aria-hidden="true" size={18} />
          )}
        </button>
      </div>
      {isOpen && (
        <nav
          className="border-t border-border/70 px-5 py-4 md:hidden"
          aria-label="Mobile navigation"
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
      )}
    </header>
  )
}
