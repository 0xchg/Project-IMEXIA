import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useRef, useState } from 'react'
import { labels, services } from '../data/data.ts'
import ButtonLink from './ButtonLink.tsx'

const ease = [0.22, 1, 0.36, 1] as const

const panel = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease, staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.25, ease } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

interface StepProps {
  index: number
  progress: MotionValue<number>
  active: boolean
  label: string
  onSelect: () => void
}

function Step({ index, progress, active, label, onSelect }: StepProps) {
  const fill = useTransform(progress, [index / services.length, (index + 1) / services.length], [0, 1])

  return (
    <li className="flex-1">
      <button
        type="button"
        onClick={onSelect}
        aria-label={label}
        aria-current={active ? 'step' : undefined}
        className="flex min-h-11 w-full items-center"
      >
        <span className="relative h-1 w-full overflow-hidden rounded-full bg-ink/10">
          <motion.span
            className="absolute inset-0 origin-left rounded-full bg-linear-to-r from-accent to-glow"
            style={{ scaleX: fill }}
          />
        </span>
      </button>
    </li>
  )
}

function ServicesShowcase() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // each service owns an equal slice of the section's scroll distance
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setActive(Math.min(services.length - 1, Math.floor(value * services.length)))
  })

  const goTo = (index: number) => {
    const section = ref.current
    if (!section) return
    const top = section.getBoundingClientRect().top + scrollY
    const distance = section.offsetHeight - innerHeight
    scrollTo({ top: top + (distance * index) / services.length + 1, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const service = services[active]

  return (
    <section
      ref={ref}
      aria-labelledby="services-title"
      className="relative"
      style={{ height: `${services.length * 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-surface lg:block">
        <div className="relative h-1/3 shrink-0 md:h-2/5 lg:absolute lg:inset-y-0 lg:right-0 lg:left-1/3 lg:h-full max-lg:[@media(min-height:740px)]:h-2/5">
          {services.map(({ id, image }, index) => (
            <motion.img
              key={id}
              src={image}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover object-[78%_center]"
              initial={false}
              animate={{ opacity: index === active ? 1 : 0, scale: index === active ? 1 : 1.08 }}
              transition={{ duration: 0.9, ease }}
            />
          ))}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-surface to-transparent lg:inset-y-0 lg:right-auto lg:h-full lg:w-1/4 lg:bg-linear-to-r"
          />
        </div>

        <div className="relative flex flex-1 flex-col gap-4 px-4 pb-4 md:px-6 lg:h-full lg:w-[45%] lg:px-12 lg:pt-20 lg:pb-10">
          <h2
            id="services-title"
            className="font-display text-sm font-semibold tracking-[0.2em] text-accent uppercase"
          >
            {labels.servicesTitle}
          </h2>

          <div aria-live="polite" className="flex flex-1 flex-col justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={service.id}
                variants={panel}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-3 lg:gap-5"
              >
                <motion.p
                  variants={item}
                  aria-hidden="true"
                  className="bg-linear-to-r from-accent to-glow bg-clip-text font-display text-4xl leading-none font-bold text-transparent md:text-6xl lg:text-7xl xl:text-8xl"
                >
                  {String(active + 1).padStart(2, '0')}
                </motion.p>
                <motion.h3
                  variants={item}
                  className="font-display text-2xl leading-tight font-semibold text-balance md:text-4xl xl:text-5xl"
                >
                  {service.title}
                </motion.h3>
                <motion.p variants={item} className="max-w-xl text-sm text-muted md:text-base">
                  {service.description}
                </motion.p>
                <motion.ul variants={item} className="hidden flex-wrap gap-2 md:flex">
                  {service.features.map(({ title }) => (
                    <li
                      key={title}
                      className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent"
                    >
                      {title}
                    </li>
                  ))}
                </motion.ul>
                <motion.div variants={item}>
                  <ButtonLink to={`/services#${service.id}`}>{labels.learnMore}</ButtonLink>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <ol className="flex gap-2">
            {services.map(({ id, title }, index) => (
              <Step
                key={id}
                index={index}
                progress={scrollYProgress}
                active={index === active}
                label={title}
                onSelect={() => goTo(index)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default ServicesShowcase
