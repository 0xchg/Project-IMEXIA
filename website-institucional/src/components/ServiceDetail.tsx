import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import type { Service } from '../data/types.ts'
import useContent from '../hooks/useContent.ts'
import HeroArt from './HeroArt.tsx'
import { areaIcons, featureIcons } from './highlightIcons.ts'
import Reveal from './Reveal.tsx'
import Section from './Section.tsx'
import TextReveal from './TextReveal.tsx'

interface ServiceDetailProps {
  service: Service
  // a lighter navy, to alternate down the page
  tinted: boolean
}

// one area as a banner: title, slogan and text over its photo, then every solution in a row of icons
function ServiceDetail({ service: { id, title, description, features, photo }, tinted }: ServiceDetailProps) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { hero } = useContent()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // the photo drifts a little slower than the page
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const slogan = hero[id]

  // focusable, so the page header's shortcuts can move focus here
  return (
    <Section
      ref={ref}
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      tone={tinted ? 'canvas' : 'deep'}
      className="relative isolate scroll-mt-16 overflow-hidden py-16 outline-none lg:py-24"
    >
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y }}
        className="absolute -inset-y-[8%] right-0 -z-20 w-full lg:w-3/5"
      >
        {photo ? (
          <img
            src={photo}
            alt=""
            loading="lazy"
            className="size-full object-cover lg:[mask-image:linear-gradient(to_right,transparent,black_40%)]"
          />
        ) : (
          <HeroArt icon={areaIcons[id]} />
        )}
      </motion.div>
      {/* keeps the text readable over the photo, in the section's own navy */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 bg-linear-to-b lg:bg-linear-to-r ${
          tinted
            ? 'from-canvas/80 via-canvas/90 to-canvas lg:from-canvas lg:via-canvas/70 lg:to-canvas/10'
            : 'from-deep/80 via-deep/90 to-deep lg:from-deep lg:via-deep/70 lg:to-deep/10'
        }`}
      />

      <div className="flex flex-col gap-12">
        <div className="flex max-w-2xl flex-col gap-6">
          <span aria-hidden="true" className="h-1 w-16 rounded-full bg-linear-to-r from-accent to-glow" />
          <h2 id={`${id}-title`} className="text-banner font-extrabold text-balance">
            <TextReveal>{title}</TextReveal>
          </h2>
          <Reveal delay={0.1}>
            <p className="text-2xl leading-snug font-semibold text-glow md:text-3xl">
              {slogan.lead} {slogan.highlight}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted md:text-lg">{description}</p>
          </Reveal>
        </div>

        {/* hairline dividers between the solutions, as in the references */}
        <ul
          className={`grid grid-cols-1 gap-px overflow-hidden rounded-box border border-accent/15 bg-border/60 backdrop-blur-sm sm:grid-cols-2 ${
            features.length % 5 === 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
          }`}
        >
          {features.map((feature, index) => {
            const Icon = featureIcons[id][index]
            return (
              <li key={feature.title} className={tinted ? 'bg-canvas/85' : 'bg-deep/85'}>
                <Reveal delay={index * 0.05} className="flex h-full flex-col gap-3 p-5">
                  <Icon aria-hidden="true" className="size-9 text-glow" strokeWidth={1.5} />
                  <h3 className="text-sm font-semibold tracking-wide uppercase">{feature.title}</h3>
                  <p className="text-sm text-muted">{feature.description}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

export default ServiceDetail
