import { Link } from 'react-router-dom'
import { labels, type Service } from '../data/data.ts'

function ServiceCard({ id, title, summary }: Service) {
  return (
    <Link
      to={`/services#${id}`}
      className="group flex h-full flex-col gap-2 rounded-lg border border-border p-6 transition duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-ink/10"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="flex-1 text-muted">{summary}</p>
      <span className="inline-flex items-center gap-2 font-semibold text-accent">
        {labels.learnMore}
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  )
}

export default ServiceCard
