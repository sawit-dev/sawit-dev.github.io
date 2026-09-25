import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"
import { projects } from "../../lib/projects"
import { ProjectCard } from "../projects/project-card"

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
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
