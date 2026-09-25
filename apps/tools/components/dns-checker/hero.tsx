export function DnsCheckerHero() {
  return (
    <header className="border border-border bg-card p-6">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        dns checker
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Inspect DNS records and resolver visibility.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Query public DNS-over-HTTPS providers at once to see the records they
        return and compare whether your latest DNS changes are visible.
      </p>
    </header>
  )
}
