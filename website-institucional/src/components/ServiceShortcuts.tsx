import { ArrowDown } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import type { MouseEvent } from 'react'
import type { Service } from '../data/types.ts'
import Reveal from './Reveal.tsx'

interface ServiceShortcutsProps {
  services: Service[]
}

// one card per service in the page header, gliding down to its section
function ServiceShortcuts({ services }: ServiceShortcutsProps) {
  const reduceMotion = useReducedMotion()

  const jump = (event: MouseEvent, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    // keyboard users carry on reading from the service, not from the shortcut
    target.focus({ preventScroll: true })
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {services.map(({ id, title, summary }, index) => (
        <li key={id}>
          <Reveal delay={0.3 + index * 0.08} className="h-full">
            <a
              href={`#${id}`}
              onClick={(event) => jump(event, id)}
              className="group flex h-full flex-col gap-2 rounded-box border border-canvas/15 bg-canvas/5 p-5 transition duration-200 hover:-translate-y-1 hover:border-canvas/40 hover:bg-canvas/10"
            >
              <span className="flex items-center justify-between gap-4 font-semibold text-canvas">
                {title}
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 shrink-0 text-glow transition-transform duration-200 group-hover:translate-y-1"
                />
              </span>
              <span className="text-sm text-canvas/70">{summary}</span>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

export default ServiceShortcuts
