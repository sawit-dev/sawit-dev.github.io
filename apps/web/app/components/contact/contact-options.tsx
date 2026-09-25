import type { ReactNode } from "react"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import { siGithub } from "simple-icons"
import { Separator } from "@workspace/ui/components/separator"
import { BrandIcon } from "../brand-icon"

type ChannelIcon = (props: { size: number }) => ReactNode

const channels = [
  {
    icon: ({ size }: { size: number }) => (
      <BrandIcon path={siGithub.path} title={siGithub.title} size={size} />
    ),
    label: "GitHub profile",
    detail: "Repositories, issues, and public work",
    href: "https://github.com/sawit-dev",
  },
  {
    icon: (({ size }: { size: number }) => (
      <MessageCircle aria-hidden="true" size={size} />
    )) as ChannelIcon,
    label: "Open an issue",
    detail: "Questions and project-specific notes",
    href: "https://github.com/sawit-dev/sawit-dev.github.io/issues",
  },
]

export function ContactOptions() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="max-w-2xl">
        <p className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
          Ways to connect
        </p>
        <div className="mt-8 border-y border-border">
          {channels.map(({ icon: Icon, label, detail, href }, index) => (
            <div key={label}>
              <a
                className="group flex items-center gap-4 py-6"
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex size-10 shrink-0 items-center justify-center border border-border text-primary">
                  <Icon size={18} />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {detail}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={17}
                />
              </a>
              {index < channels.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
