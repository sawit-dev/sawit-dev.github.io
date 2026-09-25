import { ArrowDown, ArrowUpRight, Code2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Link } from "react-router"

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/70">
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(to_right,transparent_49.9%,var(--border)_50%,transparent_50.1%),linear-gradient(to_bottom,transparent_49.9%,var(--border)_50%,transparent_50.1%)] bg-[size:72px_72px] opacity-35" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-primary uppercase">
            <span className="h-px w-8 bg-primary" />
            Independent software practice
          </div>
          <h1 className="max-w-3xl font-heading text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-8xl">
            Useful software, thoughtfully made.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            Sawit Dev is a home for focused web projects, open source
            experiments, and the ideas that become worth sharing.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button render={<Link to="/projects" />}>
              Explore projects
              <ArrowUpRight aria-hidden="true" size={16} />
            </Button>
            <Button render={<Link to="/about" />} variant="outline">
              About the practice
            </Button>
          </div>
        </div>
        <div className="flex items-end lg:justify-end">
          <div className="w-full max-w-sm border border-border bg-background/90 p-5 font-mono text-xs leading-6 text-muted-foreground shadow-sm">
            <div className="mb-8 flex items-center justify-between border-b border-border pb-3">
              <span className="text-foreground">sawit-dev / now</span>
              <Code2 aria-hidden="true" className="text-primary" size={16} />
            </div>
            <p>
              <span className="text-primary">const</span> direction =
            </p>
            <p className="pl-5 text-foreground">&quot;make it useful&quot;</p>
            <p className="mt-5">
              <span className="text-primary">const</span> principles = [
            </p>
            <p className="pl-5">&quot;clarity&quot;,</p>
            <p className="pl-5">&quot;craft&quot;,</p>
            <p className="pl-5">&quot;curiosity&quot;</p>
            <p>]</p>
            <div className="mt-8 flex items-center justify-between border-t border-border pt-3 text-[11px]">
              <span>status: building</span>
              <span className="flex items-center gap-2 text-primary">
                <span className="size-1.5 bg-primary" />
                active
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl items-center gap-2 px-5 pb-7 font-mono text-xs text-muted-foreground lg:px-8">
        <ArrowDown aria-hidden="true" size={14} />
        Scroll to explore
      </div>
    </section>
  )
}
