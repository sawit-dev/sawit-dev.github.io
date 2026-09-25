import { ArrowUpRight } from "lucide-react"
import type { Project } from "../../lib/projects"

export function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  return (
    <a
      className="group flex min-h-80 flex-col border border-border bg-background p-5 transition-colors hover:bg-muted"
      href={project.href}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>0{index + 1}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          size={17}
        />
      </div>
      <div className="mt-auto">
        <p className="font-mono text-[11px] tracking-[0.12em] text-primary uppercase">
          {project.status}
        </p>
        <h2 className="mt-3 font-heading text-2xl font-medium tracking-tight">
          {project.name}
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
