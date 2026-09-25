export function DnsLookupHero() {
  return (
    <header className="border border-border bg-card p-6">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        dns lookup
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Check public DNS records in real time.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Query current A, AAAA, MX, NS, TXT, and related records across browser-safe
        public DNS-over-HTTPS providers.
      </p>
    </header>
  )
}
