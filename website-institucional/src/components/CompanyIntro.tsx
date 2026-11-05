import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import useContent from '../hooks/useContent.ts'
import ButtonLink from './ButtonLink.tsx'
import Reveal from './Reveal.tsx'
import Section from './Section.tsx'
import TextReveal from './TextReveal.tsx'

interface WordProps {
  progress: MotionValue<number>
  range: [number, number]
  children: string
}

function Word({ progress, range, children }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

// lights the words up one by one as the paragraph scrolls into view
function ScrollLitText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.7'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className="text-2xl leading-snug font-semibold text-balance md:text-3xl">
      {reduceMotion ? (
        text
      ) : (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {words.map((word, index) => (
              <span key={index}>
                <Word progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
                  {word}
                </Word>{' '}
              </span>
            ))}
          </span>
        </>
      )}
    </p>
  )
}

function CompanyIntro() {
  const { company, labels } = useContent()

  return (
    <Section tone="surface">
      <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-heading font-semibold">
            <TextReveal>{labels.aboutTitle}</TextReveal>
          </h2>
          <p className="text-lg text-muted">{company.aboutHeadline}</p>
        </Reveal>
        <div className="flex flex-col items-start gap-8">
          <ScrollLitText text={company.about[0]} />
          <ButtonLink to="/about">{labels.learnMore}</ButtonLink>
        </div>
      </div>
    </Section>
  )
}

export default CompanyIntro
