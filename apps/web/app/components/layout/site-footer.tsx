import { siGithub } from "simple-icons"
import { Link } from "react-router"
import { BrandIcon } from "../brand-icon"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>Built in public by Sawit Dev.</p>
        <div className="flex items-center gap-5">
          <Link className="hover:text-foreground" to="/contact">
            Get in touch
          </Link>
          <a
            className="inline-flex items-center gap-2 hover:text-foreground"
            href="https://github.com/sawit-dev"
            target="_blank"
            rel="noreferrer"
          >
            <BrandIcon path={siGithub.path} title={siGithub.title} size={15} />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
