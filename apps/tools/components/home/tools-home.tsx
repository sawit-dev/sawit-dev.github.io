import { useToolCatalog } from "../../hooks/use-tool-catalog"
import { Link } from "react-router"

const toolLinks: Record<string, string> = {
  "01": "/dns-checker",
  "02": "/whois",
}

export function ToolsHome() {
  const tools = useToolCatalog()

  return (
    <main className="min-h-svh">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-5 py-6 lg:px-8">
        <header className="flex items-center justify-between border-b border-border pb-6">
          <a className="font-mono text-sm font-semibold tracking-tight" href="/">
            sawit.dev/tools
          </a>
          <span className="font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">
            developer utilities
          </span>
        </header>

        <section className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              tools platform
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">
              Small tools for serious technical work.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              A growing home for focused utilities across domains, networks,
              cryptography, WebAssembly, and developer workflows.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {tools.map((tool) => (
              <Link
                className="border border-border bg-card p-5 transition-colors hover:border-foreground/40"
                key={tool.number}
                to={toolLinks[tool.number] ?? "/"}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {tool.number}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                    {tool.status}
                  </span>
                </div>
                <h2 className="mt-8 text-xl font-medium">{tool.title}</h2>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-border pt-5 font-mono text-xs text-muted-foreground">
          Independent tools by Sawit Dev
        </footer>
      </div>
    </main>
  )
}