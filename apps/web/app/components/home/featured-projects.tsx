import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"
import { projects } from "../../lib/projects"

export function FeaturedProjects() {
  return (
    <section className="border-y border-border/70 bg-muted/30">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
              02 / Selected work
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Things in motion.
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            to="/projects"
          >
            View all projects
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {projects.map((project, index) => (
            <a
              key={project.name}
              className="group bg-background p-5 transition-colors hover:bg-muted"
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>0{index + 1}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={16}
                />
              </div>
              <h3 className="mt-16 font-heading text-xl font-medium">
                {project.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
              <p className="mt-8 font-mono text-[11px] tracking-[0.12em] text-primary uppercase">
                {project.status}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
