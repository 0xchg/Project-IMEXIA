import { Pause, Play } from 'lucide-react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useRef, useState, type FocusEvent } from 'react'
import { serviceIds } from '../data/shared.ts'
import useContent from '../hooks/useContent.ts'
import ButtonLink from './ButtonLink.tsx'
import Glows from './Glows.tsx'
import HeroArt from './HeroArt.tsx'
import { areaIcons, heroStrengthIcons } from './highlightIcons.ts'
import NetworkCanvas from './NetworkCanvas.tsx'

// how long each area stays on screen
const slideDuration = 7000
const ease = [0.22, 1, 0.36, 1] as const

// one slide per area, rotating on its own; every slide shares one grid cell, so the hero never changes height
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { company, hero, labels, services } = useContent()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  // the visitor's play / pause choice; until then, rotate unless they asked for less motion
  const [choice, setChoice] = useState<boolean | null>(null)
  // a pointer or keyboard focus inside the hero holds the current slide, unless the visitor pressed play
  const [held, setHeld] = useState(false)
  const inView = useInView(ref)
  const progress = useMotionValue(0)
  const autoplay = choice ?? !reduceMotion
  const playing = autoplay && inView && (choice === true || !held)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 120])
  const fade = useTransform(scrollY, [0, 500], [1, 0.2])

  // motion caps each frame's delta, which slows the clock on a busy device: measure real time instead
  const lastFrame = useRef<number | null>(null)
  useAnimationFrame((time) => {
    const delta = lastFrame.current === null ? 0 : time - lastFrame.current
    lastFrame.current = playing && !document.hidden ? time : null
    if (lastFrame.current === null) return
    const next = progress.get() + delta / slideDuration
    if (next < 1) return progress.set(next)
    progress.set(0)
    setActive((index) => (index + 1) % serviceIds.length)
  })

  const select = (index: number) => {
    setActive(index)
    progress.set(0)
  }

  // a mouse click also focuses what it clicks; only keyboard focus should hold the slide
  const hold = (event: FocusEvent) => {
    if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) setHeld(true)
  }

  const release = (event: FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false)
  }

  const areas = services.map((service) => ({
    id: service.id,
    slide: hero[service.id],
    service,
    photo: service.photo,
    Icon: areaIcons[service.id],
  }))

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label={labels.heroLabel}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={hold}
      onBlur={release}
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-deep text-on-deep"
    >
      {/* the area's photo, or drawn artwork when it has none */}
      {areas.map(({ id, photo, Icon }, index) => (
        <motion.div
          key={id}
          aria-hidden="true"
          className="absolute inset-0 -z-20 lg:left-1/3"
          initial={false}
          animate={{ opacity: index === active ? 1 : 0, scale: index === active ? 1 : 1.06 }}
          transition={{ duration: 1.2, ease }}
        >
          {photo ? (
            <img
              src={photo}
              alt=""
              className="size-full object-cover lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]"
            />
          ) : (
            <HeroArt icon={Icon} />
          )}
        </motion.div>
      ))}
      {/* keeps the text readable over any photo: darker under the text, fading towards the picture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-deep/75 via-deep/85 to-deep lg:bg-linear-to-r lg:from-deep lg:via-deep/60 lg:to-deep/10"
      />
      <Glows />
      <NetworkCanvas />

      <h1 className="sr-only">{company.headline.join(' ')}</h1>

      <div className="flex flex-1 flex-col gap-10 px-4 pt-12 pb-8 md:px-6 lg:px-12 lg:pt-16">
        <motion.div
          style={reduceMotion ? undefined : { y, opacity: fade }}
          className="grid flex-1 content-center gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-center lg:gap-16"
        >
          <div aria-live={playing ? 'off' : 'polite'} className="grid">
            {areas.map(({ id, slide }, index) => (
              <motion.div
                key={id}
                aria-hidden={index !== active || undefined}
                inert={index !== active}
                className="col-start-1 row-start-1 flex flex-col gap-6"
                initial={false}
                animate={index === active ? 'shown' : 'hidden'}
                variants={{ shown: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 24 } }}
                transition={{ duration: 0.7, ease }}
              >
                <h2 className="max-w-4xl text-display font-extrabold">
                  <span className="block">{slide.lead}</span>
                  <span className="block text-accent">{slide.highlight}</span>
                </h2>
                <p className="max-w-2xl text-lg text-on-deep/80">{slide.text}</p>
                <div className="flex flex-wrap gap-2">
                  <ButtonLink to={`/services#${id}`}>{labels.learnMore}</ButtonLink>
                  <ButtonLink to="/about" variant="outline">
                    {labels.aboutCta}
                  </ButtonLink>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:rounded-box lg:border lg:border-accent/15 lg:bg-deep/50 lg:px-5 lg:backdrop-blur-sm">
            {areas.map(({ id, slide }, index) => (
              <motion.ul
                key={id}
                aria-hidden={index !== active || undefined}
                className="col-start-1 row-start-1 grid grid-cols-2 gap-x-6 lg:grid-cols-1"
                initial={false}
                animate={{ opacity: index === active ? 1 : 0, x: index === active ? 0 : 16 }}
                transition={{ duration: 0.6, delay: index === active ? 0.15 : 0, ease }}
              >
                {slide.strengths.map((strength, item) => {
                  const StrengthIcon = heroStrengthIcons[id][item]
                  return (
                    <li
                      key={strength}
                      className="flex items-center gap-3 border-b border-on-deep/10 py-4 text-xs font-semibold tracking-wide uppercase last:border-0 max-lg:[&:nth-last-child(2)]:border-0 sm:gap-4 sm:text-sm"
                    >
                      <StrengthIcon aria-hidden="true" className="size-6 shrink-0 text-glow sm:size-7" strokeWidth={1.5} />
                      {strength}
                    </li>
                  )
                })}
              </motion.ul>
            ))}
          </div>
        </motion.div>

        {/* the areas double as the slideshow's controls */}
        <div className="flex items-stretch gap-2 rounded-box border border-accent/20 bg-surface/40 p-2 backdrop-blur-md">
          <ul className="grid flex-1 gap-2 md:grid-cols-3">
            {areas.map(({ id, service, Icon }, index) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-current={index === active ? 'true' : undefined}
                  className={`relative flex h-full min-h-11 w-full items-start gap-4 overflow-hidden rounded-[calc(var(--radius-box)-0.5rem)] p-3 text-left transition-colors duration-200 md:p-4 ${
                    index === active ? 'bg-accent/15' : 'hover:bg-on-deep/5'
                  }`}
                >
                  <Icon aria-hidden="true" className="size-6 shrink-0 text-glow" strokeWidth={1.5} />
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-semibold tracking-wide uppercase">{service.title}</span>
                    <span className="hidden text-sm text-on-deep/70 md:block">{service.summary}</span>
                  </span>
                  {index === active && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-accent to-glow"
                      style={{ scaleX: progress }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setChoice(!autoplay)}
            aria-label={autoplay ? labels.pauseSlides : labels.playSlides}
            className="flex w-11 shrink-0 items-center justify-center rounded-[calc(var(--radius-box)-0.5rem)] transition-colors duration-200 hover:bg-on-deep/5"
          >
            {autoplay ? <Pause aria-hidden="true" className="size-5" /> : <Play aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
