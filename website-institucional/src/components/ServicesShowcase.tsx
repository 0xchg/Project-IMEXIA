import {
  animate,
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type AnimationPlaybackControls,
} from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { serviceIds, serviceImages } from '../data/shared.ts'
import useContent from '../hooks/useContent.ts'
import ButtonLink from './ButtonLink.tsx'
import Reveal from './Reveal.tsx'

// scroll distance each service holds the screen, in viewport heights
const stepHeight = 0.5
const lastStep = serviceIds.length - 1
// scroll positions are whole pixels, so a resting point can sit a hair off its step
const tolerance = 0.02
const ease = [0.22, 1, 0.36, 1] as const

const slide = {
  enter: (direction: number) => ({ y: direction > 0 ? '100%' : '-100%', opacity: 0, scale: 1 }),
  center: { y: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({ y: direction > 0 ? '-20%' : '20%', opacity: 0, scale: 0.92 }),
}

const stepKeys: Record<string, number> = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 }

const measure = (track: HTMLElement) => {
  const top = track.getBoundingClientRect().top + scrollY
  const step = (track.offsetHeight - innerHeight) / lastStep
  return { top, step, at: (scrollY - top) / step }
}

// the step a gesture should land on, or null to leave the scroll to the browser
const stepFor = (at: number, heading: number, reach: number) => {
  if (at < -tolerance) return heading > 0 && at + reach > 0 ? 0 : null
  if (at > lastStep + tolerance) return heading < 0 && at + reach < lastStep ? lastStep : null
  const next = heading > 0 ? Math.floor(at + tolerance) + 1 : Math.ceil(at - tolerance) - 1
  return next < 0 || next > lastStep ? null : next
}

// tells the navbar that the page is moving on its own, not because the visitor scrolled
const markAutoscroll = (active: boolean) => {
  if (active) document.documentElement.dataset.autoscroll = 'true'
  else delete document.documentElement.dataset.autoscroll
}

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))

function ServicesShowcase() {
  const trackRef = useRef<HTMLDivElement>(null)
  const glide = useRef<AnimationPlaybackControls | null>(null)
  const glideY = useRef(0)
  const [[active, direction], setSlide] = useState([0, 1])
  const reduceMotion = useReducedMotion()
  const { labels, services } = useContent()
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  const show = (next: number) =>
    setSlide((current) => (current[0] === next ? current : [next, Math.sign(next - current[0])]))

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!glide.current) show(Math.round(value * lastStep))
  })

  // the card changes at once; the page follows with the same easing
  const glideTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const { top, step } = measure(track)
      setSlide((current) => (current[0] === index ? current : [index, Math.sign(index - current[0])]))
      glide.current?.stop()
      glideY.current = scrollY
      markAutoscroll(true)
      glide.current = animate(scrollY, Math.round(top + index * step), {
        duration: reduceMotion ? 0 : 0.6,
        ease,
        onUpdate: (y) => {
          // the page moved without us: the visitor took over, so let go
          if (Math.abs(scrollY - glideY.current) > 3) {
            glide.current?.stop()
            glide.current = null
            markAutoscroll(false)
            return
          }
          glideY.current = y
          scrollTo(0, y)
        },
        onComplete: () => {
          glide.current = null
          // the glide's last scroll events arrive after this; let them pass first
          setTimeout(() => {
            if (!glide.current) markAutoscroll(false)
          }, 100)
        },
      })
    },
    [reduceMotion],
  )

  useEffect(() => {
    for (const image of Object.values(serviceImages)) new Image().src = image
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let locked = false
    let quiet = 0

    // a trackpad gesture sends many wheel events with inertia: one gesture, one step
    const release = () => {
      if (glide.current) quiet = setTimeout(release, 100)
      else locked = false
    }
    const holdLock = () => {
      locked = true
      clearTimeout(quiet)
      quiet = setTimeout(release, 200)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0) return
      if (locked) {
        event.preventDefault()
        holdLock()
        return
      }
      const { step, at } = measure(track)
      const target = stepFor(at, Math.sign(event.deltaY), event.deltaY / step)
      if (target === null) return
      event.preventDefault()
      holdLock()
      glideTo(target)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || isTyping(event.target)) return
      const heading = event.key === ' ' ? (event.shiftKey ? -1 : 1) : stepKeys[event.key]
      if (!heading || (event.key === ' ' && event.target instanceof HTMLButtonElement)) return
      const { at } = measure(track)
      if (at < -tolerance || at > lastStep + tolerance) return
      const target = stepFor(at, heading, 0)
      if (target === null) return
      event.preventDefault()
      glideTo(target)
    }

    // touch and scrollbar keep native scrolling and settle on the nearest step in their direction
    let previousY = scrollY
    let heading = 0
    let gestureStart: number | null = null
    let timer = 0

    const settle = () => {
      const { at } = measure(track)
      const start = gestureStart ?? at
      gestureStart = null
      if (glide.current || at <= 0 || at >= lastStep || Math.abs(at - Math.round(at)) < tolerance) return
      let target = heading > 0 ? Math.ceil(at) : Math.floor(at)
      if (start < -tolerance) target = 0
      if (start > lastStep + tolerance) target = lastStep
      glideTo(target)
    }

    // grabbing the page (touch, scrollbar) takes over from a running glide
    const stopGlide = () => {
      glide.current?.stop()
      glide.current = null
      markAutoscroll(false)
    }

    const onScroll = () => {
      if (glide.current) {
        previousY = scrollY
        return
      }
      const { top, step } = measure(track)
      gestureStart ??= (previousY - top) / step
      if (scrollY !== previousY) heading = Math.sign(scrollY - previousY)
      previousY = scrollY
      if (!('onscrollend' in window)) {
        clearTimeout(timer)
        timer = setTimeout(settle, 150)
      }
    }

    addEventListener('wheel', onWheel, { passive: false })
    addEventListener('keydown', onKeyDown)
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('scrollend', settle)
    addEventListener('touchstart', stopGlide, { passive: true })
    addEventListener('mousedown', stopGlide)
    return () => {
      removeEventListener('wheel', onWheel)
      removeEventListener('keydown', onKeyDown)
      removeEventListener('scroll', onScroll)
      removeEventListener('scrollend', settle)
      removeEventListener('touchstart', stopGlide)
      removeEventListener('mousedown', stopGlide)
      clearTimeout(quiet)
      clearTimeout(timer)
      stopGlide()
    }
  }, [glideTo])

  const service = services[active]

  return (
    <section aria-labelledby="services-title" className="px-4 md:px-6 lg:px-12">
      <div ref={trackRef} style={{ height: `${100 + lastStep * stepHeight * 100}svh` }}>
        <div className="sticky top-0 mx-auto flex h-svh max-w-6xl flex-col justify-center gap-4 pt-16 pb-2">
          <Reveal>
            <h2 id="services-title" className="text-heading font-semibold">
              {labels.servicesTitle}
            </h2>
          </Reveal>

          <div
            aria-live="polite"
            className="relative min-h-0 w-full flex-1 overflow-hidden rounded-box bg-surface shadow-2xl shadow-deep/60 lg:max-h-160"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.article
                key={service.id}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease }}
                className="absolute inset-0 flex flex-col lg:flex-row-reverse"
              >
                {/* the illustrations are drawn on white: they sit in a light window inside the card */}
                <div className="h-2/5 shrink-0 p-2 lg:h-full lg:w-1/2">
                  <img
                    src={service.image}
                    alt=""
                    className="size-full rounded-[calc(var(--radius-box)-0.5rem)] bg-paper object-cover object-[78%_center]"
                  />
                </div>
                <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 p-5 md:p-8 lg:gap-5 lg:p-12">
                  <span aria-hidden="true" className="h-1 w-12 rounded-full bg-linear-to-r from-accent to-glow" />
                  <h3 className="text-2xl leading-tight font-semibold text-balance md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted md:text-base">{service.description}</p>
                  <ul className="hidden flex-wrap gap-2 md:flex">
                    {service.features.map(({ title }) => (
                      <li
                        key={title}
                        className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent"
                      >
                        {title}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <ButtonLink to={`/services#${service.id}`}>{labels.learnMore}</ButtonLink>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <ol className="flex justify-center">
            {services.map(({ id, title }, index) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => glideTo(index)}
                  aria-label={title}
                  aria-current={index === active ? 'true' : undefined}
                  className="flex size-11 items-center justify-center"
                >
                  <span className="relative flex h-2 w-6 items-center justify-center">
                    {index === active && (
                      <motion.span
                        layoutId="showcase-dot"
                        className="absolute inset-0 rounded-full bg-linear-to-r from-accent to-glow"
                      />
                    )}
                    <span className="size-2 rounded-full bg-ink/20" />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default ServicesShowcase
