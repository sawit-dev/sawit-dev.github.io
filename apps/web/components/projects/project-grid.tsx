import { projects } from "../../lib/projects"
import { ProjectCard } from "./project-card"

export function ProjectGrid() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
