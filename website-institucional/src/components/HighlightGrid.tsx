import type { LucideIcon } from 'lucide-react'
import type { Highlight } from '../data/types.ts'
import Reveal from './Reveal.tsx'

interface HighlightGridProps {
  items: Highlight[]
  // matched to the items by position
  icons?: LucideIcon[]
}

// a frosted panel split by hairlines, one cell per item, as in the references
function HighlightGrid({ items, icons = [] }: HighlightGridProps) {
  return (
    <ul
      className={`grid gap-px overflow-hidden rounded-box border border-accent/15 bg-border/60 sm:grid-cols-2 ${
        items.length % 5 === 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
      }`}
    >
      {items.map(({ title, description }, index) => {
        const Icon = icons[index]
        return (
          <li key={title} className="group bg-surface/90 transition-colors duration-200 hover:bg-surface/70">
            <Reveal delay={index * 0.08} className="flex h-full flex-col gap-3 p-6">
              {Icon && (
                <Icon
                  aria-hidden="true"
                  className="size-9 text-glow transition-transform duration-200 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              )}
              <h3 className="text-sm font-semibold tracking-wide uppercase">{title}</h3>
              <p className="text-sm text-muted">{description}</p>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}

export default HighlightGrid
