import type { MetaFunction } from "react-router"
import { HomeContactCta } from "../../components/home/contact-cta"
import { FeaturedProjects } from "../../components/home/featured-projects"
import { HomeHero } from "../../components/home/hero"
import { HomeOverview } from "../../components/home/overview"
import { TechnologyStack } from "../../components/home/technology-stack"

export const meta: MetaFunction = () => [
  { title: "Sawit Dev | Useful software, thoughtfully made" },
  {
    name: "description",
    content: "The public home for Sawit Dev projects and experiments.",
  },
]

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeOverview />
      <FeaturedProjects />
      <TechnologyStack />
      <HomeContactCta />
    </>
  )
}
