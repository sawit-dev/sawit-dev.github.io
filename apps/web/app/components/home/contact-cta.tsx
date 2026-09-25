import { ArrowRight } from "lucide-react"
import { Link } from "react-router"

export function HomeContactCta() {
  return (
    <section className="border-t border-border/70 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:flex-row sm:items-end sm:justify-between lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <p className="font-mono text-xs tracking-[0.16em] text-primary-foreground/70 uppercase">
            04 / Keep in touch
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Have a useful idea?
          </h2>
          <p className="mt-4 leading-7 text-primary-foreground/75">
            Follow the work on GitHub or send a note through the available
            public channels.
          </p>
        </div>
        <Link
          className="inline-flex shrink-0 items-center gap-2 text-sm font-medium underline underline-offset-4"
          to="/contact"
        >
          Find the links
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  )
}
