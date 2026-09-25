import { BookOpen, HeartHandshake, Layers3 } from "lucide-react"
import { Card, CardContent } from "@sawit/ui/components/card"

const values = [
  {
    icon: Layers3,
    title: "Make the structure visible",
    text: "A project should communicate its shape through names, boundaries, and predictable interactions.",
  },
  {
    icon: HeartHandshake,
    title: "Respect the people using it",
    text: "Accessibility, honest copy, and calm interfaces are part of the engineering work.",
  },
  {
    icon: BookOpen,
    title: "Leave useful notes",
    text: "Documentation is a way to make the next decision easier, for yourself or someone else.",
  },
]

export function DevelopmentPhilosophy() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
            01 / Philosophy
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Craft without ceremony.
          </h2>
        </div>
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="bg-background p-0">
              <CardContent className="p-5">
                <Icon aria-hidden="true" className="text-primary" size={20} />
                <h3 className="mt-12 font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
