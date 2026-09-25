import { Blocks, Compass, Workflow } from "lucide-react"

const principles = [
  {
    icon: Compass,
    title: "Start with the why",
    text: "Good software begins with a clear problem and a small enough first step.",
  },
  {
    icon: Blocks,
    title: "Keep the pieces useful",
    text: "Reusable components and honest interfaces make future work easier to change.",
  },
  {
    icon: Workflow,
    title: "Ship, then learn",
    text: "Projects become better through real use, careful iteration, and open notes.",
  },
]

export function HomeOverview() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
            01 / The approach
          </p>
          <h2 className="mt-4 max-w-sm font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Small surface area. High intent.
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Sawit Dev brings product thinking and engineering together without
            making either one precious. The goal is straightforward: build
            things people can understand, use, and improve.
          </p>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-background p-5">
                <Icon aria-hidden="true" className="text-primary" size={20} />
                <h3 className="mt-8 font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
