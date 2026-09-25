import type { MetaFunction } from "react-router"
import { ProjectsHeader } from "../components/projects/header"
import { ProjectGrid } from "../components/projects/project-grid"

export const meta: MetaFunction = () => [
  { title: "Projects | Sawit Dev" },
  { name: "description", content: "Projects and experiments from Sawit Dev." },
]

export default function Projects() {
  return (
    <>
      <ProjectsHeader />
      <ProjectGrid />
    </>
  )
}
