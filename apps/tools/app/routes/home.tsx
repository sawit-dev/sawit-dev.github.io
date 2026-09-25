import type { MetaFunction } from "react-router"

import { ToolsHome } from "../../components/home/tools-home"

export const meta: MetaFunction = () => [
  { title: "Tools | Sawit Dev" },
  {
    name: "description",
    content: "Practical tools for developers and technical teams.",
  },
]

export default function Home() {
  return <ToolsHome />
}