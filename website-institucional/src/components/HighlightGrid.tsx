import type { Highlight } from '../data/data.ts'

interface HighlightGridProps {
  items: Highlight[]
}

function HighlightGrid({ items }: HighlightGridProps) {
  return (
    <ul className="grid-cards">
      {items.map(({ title, description }) => (
        <li key={title} className="flex flex-col gap-2 rounded-lg border border-border bg-canvas p-6">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-muted">{description}</p>
        </li>
      ))}
    </ul>
  )
}

export default HighlightGrid
