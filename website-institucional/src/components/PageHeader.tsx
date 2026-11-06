import type { ReactNode } from 'react'
import Glows from './Glows.tsx'
import NetworkCanvas from './NetworkCanvas.tsx'
import Reveal from './Reveal.tsx'
import Section from './Section.tsx'
import TextReveal from './TextReveal.tsx'

interface PageHeaderProps {
  title: string
  headline: string
  children?: ReactNode
}

// the navy band at the top of every page other than home: a shorter take on the hero
function PageHeader({ title, headline, children }: PageHeaderProps) {
  return (
    <Section tone="deep" className="relative isolate overflow-hidden pt-20 pb-16">
      <Glows />
      <NetworkCanvas />
      <div className="flex flex-col gap-4">
        <h1 className="text-display font-extrabold">
          <TextReveal>{title}</TextReveal>
        </h1>
        <Reveal delay={0.2}>
          <p className="max-w-2xl text-xl font-semibold text-accent md:text-2xl">{headline}</p>
        </Reveal>
        {/* the glowing rule of the references */}
        <Reveal delay={0.3}>
          <span aria-hidden="true" className="block h-px w-full max-w-md bg-linear-to-r from-glow via-accent/60 to-transparent" />
        </Reveal>
      </div>
      {children && <div className="mt-12">{children}</div>}
    </Section>
  )
}

export default PageHeader
