export type Project = {
  name: string
  description: string
  status: string
  tags: string[]
  href: string
}

export const projects: Project[] = [
  {
    name: "Sawit Dev website",
    description:
      "The public home for Sawit Dev projects, experiments, and open source work.",
    status: "Current project",
    tags: ["React Router", "Tailwind", "shadcn/ui"],
    href: "https://github.com/sawit-dev/sawit-dev.github.io",
  },
  {
    name: "Open source experiments",
    description:
      "A growing collection of practical prototypes and reusable ideas, documented as they become ready to share.",
    status: "In progress",
    tags: ["TypeScript", "Web platform", "Tooling"],
    href: "https://github.com/sawit-dev?tab=repositories",
  },
  {
    name: "Next useful thing",
    description:
      "A placeholder for the next project. Its repository will be linked here when it is ready.",
    status: "To be announced",
    tags: ["Exploration", "Product thinking"],
    href: "https://github.com/sawit-dev",
  },
]
