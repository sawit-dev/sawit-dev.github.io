import { Braces, Layers3, Terminal } from "lucide-react"
import { Card, CardContent } from "@workspace/ui/components/card"

const tools = [
  { icon: Braces, label: "TypeScript" },
  { icon: Layers3, label: "React + Router" },
  { icon: Terminal, label: "Open tooling" },
]

export function TechnologyStack() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
            03 / The stack
          </p>
          <h2 className="mt-4 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Familiar tools, deliberately used.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            The exact tools can change from project to project. The preference
            stays the same: accessible defaults, composable parts, and as little
            ceremony as the work allows.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {tools.map(({ icon: Icon, label }) => (
            <Card key={label} className="bg-background p-0 text-center">
              <CardContent className="p-4">
                <Icon
                  aria-hidden="true"
                  className="mx-auto text-primary"
                  size={19}
                />
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                  {label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
