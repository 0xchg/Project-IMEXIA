import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import type { Service } from '../data/types.ts'
import HighlightGrid from './HighlightGrid.tsx'
import Reveal from './Reveal.tsx'
import Section from './Section.tsx'
import TextReveal from './TextReveal.tsx'

interface ServiceDetailProps {
  service: Service
  // image on the right and a tinted background, to alternate down the page
  flipped: boolean
}

function ServiceDetail({ service: { id, title, description, features, image }, flipped }: ServiceDetailProps) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // the illustration drifts a little slower than the page
  const y = useTransform(scrollYProgress, [0, 1], [32, -32])

  // focusable, so the page header's shortcuts can move focus here
  return (
    <Section
      ref={ref}
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      tone={flipped ? 'surface' : 'canvas'}
      className="scroll-mt-16 py-16 outline-none lg:py-24"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* multiply melts the illustration's white background into either tone; the mask softens its square edges */}
        <motion.img
          src={image}
          alt=""
          style={reduceMotion ? undefined : { y }}
          className={`aspect-4/3 w-full object-cover mix-blend-multiply [mask-image:radial-gradient(closest-side,black_75%,transparent)] ${flipped ? 'lg:order-last' : ''}`}
        />
        <div className="flex flex-col gap-6">
          <span aria-hidden="true" className="h-1 w-12 rounded-full bg-linear-to-r from-accent to-glow" />
          <h2 id={`${id}-title`} className="text-heading font-semibold text-balance">
            <TextReveal>{title}</TextReveal>
          </h2>
          <Reveal>
            <p className="text-muted md:text-lg">{description}</p>
          </Reveal>
        </div>
      </div>
      <div className="mt-12">
        <HighlightGrid items={features} />
      </div>
    </Section>
  )
}

export default ServiceDetail
