export function WhoisHero() {
  return (
    <header className="border border-border bg-card p-6">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        whois / rdap
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Inspect domain ownership and registry metadata.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Pull public registration information using the same browser-safe RDAP flow
        used by registries and public lookup services.
      </p>
    </header>
  )
}
