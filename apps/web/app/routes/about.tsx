import type { MetaFunction } from "react-router"
import { AboutIntroduction } from "../../components/about/introduction"
import { FocusAreas } from "../../components/about/focus-areas"
import { DevelopmentPhilosophy } from "../../components/about/philosophy"

export const meta: MetaFunction = () => [
  { title: "About | Sawit Dev" },
  {
    name: "description",
    content: "The approach and focus areas behind Sawit Dev.",
  },
]

export default function About() {
  return (
    <>
      <AboutIntroduction />
      <DevelopmentPhilosophy />
      <FocusAreas />
    </>
  )
}
