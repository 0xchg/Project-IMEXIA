import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import useContent from '../hooks/useContent.ts'
import ButtonLink from './ButtonLink.tsx'
import Glows from './Glows.tsx'
import Reveal from './Reveal.tsx'
import Section from './Section.tsx'

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2])
  const reduceMotion = useReducedMotion()
  const { company, labels } = useContent()

  return (
    <Section
      tone="ink"
      className="relative isolate flex min-h-[70dvh] flex-col justify-center overflow-hidden"
    >
      <Glows />

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
