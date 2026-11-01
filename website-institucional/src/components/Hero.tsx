import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { company, labels } from '../data/data.ts'
import ButtonLink from './ButtonLink.tsx'
import Reveal from './Reveal.tsx'
import Section from './Section.tsx'

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2])
  const reduceMotion = useReducedMotion()

  return (
    <Section
      tone="ink"
      className="relative isolate flex min-h-[70dvh] flex-col justify-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-1/2 -right-1/3 -z-10 aspect-square w-full animate-drift bg-[radial-gradient(closest-side,var(--color-accent),transparent)] opacity-60 motion-reduce:animate-none lg:w-2/3"
      />
      <div
        aria-hidden="true"
        className="absolute -right-1/4 -bottom-1/2 -z-10 aspect-square w-full animate-drift bg-[radial-gradient(closest-side,var(--color-glow),transparent)] opacity-30 [animation-direction:alternate-reverse] motion-reduce:animate-none lg:w-1/2"
      />

      <motion.div className="flex flex-col gap-6" style={reduceMotion ? undefined : { y, opacity }}>
        <h1 className="max-w-4xl text-display font-semibold">
          {company.headline.map((line, index) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <Reveal delay={0.5}>
          <p className="max-w-2xl text-canvas/80">{company.intro}</p>
        </Reveal>
        <Reveal delay={0.65} className="flex flex-wrap gap-2">
          <ButtonLink to="/contact-us">{labels.contactCta}</ButtonLink>
          <ButtonLink to="/services" variant="outline">
            {labels.servicesCta}
          </ButtonLink>
        </Reveal>
      </motion.div>
    </Section>
  )
}

export default Hero
