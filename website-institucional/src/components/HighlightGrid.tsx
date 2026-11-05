import type { LucideIcon } from 'lucide-react'
import type { Highlight } from '../data/types.ts'
import Reveal from './Reveal.tsx'

interface HighlightGridProps {
  items: Highlight[]
  // matched to the items by position
  icons?: LucideIcon[]
}

function HighlightGrid({ items, icons = [] }: HighlightGridProps) {
  return (
    <ul className="grid-cards">
      {items.map(({ title, description }, index) => {
        const Icon = icons[index]
        return (
          <li key={title}>
            <Reveal delay={index * 0.08} className="h-full">
              <div className="group flex h-full flex-col gap-4 rounded-box border border-border bg-canvas p-6 transition duration-200 hover:-translate-y-1 hover:border-accent/40">
                {Icon && (
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent-fill group-hover:text-on-accent">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                )}
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted">{description}</p>
              </div>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}

export default HighlightGrid
