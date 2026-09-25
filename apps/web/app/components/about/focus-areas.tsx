const areas = [
  [
    "01",
    "Web interfaces",
    "Accessible, responsive experiences that make the important action easy to find.",
  ],
  [
    "02",
    "Developer experience",
    "Project foundations that help teams move with confidence and less repetition.",
  ],
  [
    "03",
    "Open exploration",
    "Small experiments that test a direction before it becomes a bigger commitment.",
  ],
]

export function FocusAreas() {
  return (
    <section className="border-y border-border/70 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="font-mono text-xs tracking-[0.16em] text-primary-foreground/70 uppercase">
          02 / Focus areas
        </p>
        <div className="mt-8 divide-y divide-primary-foreground/20 border-y border-primary-foreground/20">
          {areas.map(([number, title, text]) => (
            <div
              key={number}
              className="grid gap-4 py-6 sm:grid-cols-[4rem_0.7fr_1fr] sm:items-baseline"
            >
              <span className="font-mono text-xs text-primary-foreground/60">
                {number}
              </span>
              <h3 className="font-heading text-xl font-medium">{title}</h3>
              <p className="max-w-lg text-sm leading-6 text-primary-foreground/70">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
