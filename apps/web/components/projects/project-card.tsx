import { ArrowUpRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sawit/ui/components/card"
import { Badge } from "@sawit/ui/components/badge"
import type { Project } from "../../lib/projects"

export function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  return (
    <Card className="group min-h-80 border border-border bg-background transition-colors hover:bg-muted">
      <CardHeader className="flex flex-1 p-5">
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>0{index + 1}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            size={17}
          />
        </div>
        <Badge variant="outline" className="mt-auto w-fit">
          {project.status}
        </Badge>
        <CardTitle className="mt-3 text-2xl tracking-tight">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            {project.name}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t border-border bg-transparent p-5">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="font-mono text-[11px] font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
