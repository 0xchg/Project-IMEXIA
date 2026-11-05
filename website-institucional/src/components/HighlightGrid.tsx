import type { Highlight } from '../data/types.ts'
import Reveal from './Reveal.tsx'

interface HighlightGridProps {
  items: Highlight[]
}

function HighlightGrid({ items }: HighlightGridProps) {
  return (
    <ul className="grid-cards">
      {items.map(({ title, description }, index) => (
        <li key={title}>
          <Reveal
            delay={index * 0.08}
            className="flex h-full flex-col gap-2 rounded-lg border border-border bg-canvas p-6"
          >
            <h3 className="font-semibold">{title}</h3>
            <p className="text-muted">{description}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

export default HighlightGrid
