import { ArrowUpRight } from "lucide-react"

export function AboutIntroduction() {
  return (
    <section className="border-b border-border/70 bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
          About Sawit Dev
        </p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h1 className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
            A small place for good work.
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl leading-9 text-foreground">
              Sawit Dev is an independent developer profile and project space.
              It exists to make useful software, explore ideas in the open, and
              leave each project clearer than it was found.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              href="https://github.com/sawit-dev"
              target="_blank"
              rel="noreferrer"
            >
              Open the GitHub profile
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
