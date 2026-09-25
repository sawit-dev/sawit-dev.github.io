export function ProjectsHeader() {
  return (
    <section className="border-b border-border/70 bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
          Project index
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:gap-20">
          <h1 className="font-heading text-5xl font-semibold tracking-tight sm:text-7xl">
            Work in progress, work worth sharing.
          </h1>
          <p className="max-w-md text-lg leading-8 text-muted-foreground">
            A living list of repositories, prototypes, and directions. Each
            entry links to the public source when one is available.
          </p>
        </div>
      </div>
    </section>
  )
}
