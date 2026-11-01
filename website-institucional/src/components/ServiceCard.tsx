import { Link } from 'react-router-dom'
import { labels, type Service } from '../data/data.ts'

function ServiceCard({ id, title, summary }: Service) {
  return (
    <Link
      to={`/services#${id}`}
      className="flex h-full flex-col gap-2 rounded-lg border border-border p-6 transition-colors duration-150 hover:border-accent"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="flex-1 text-muted">{summary}</p>
      <span className="font-semibold text-accent">{labels.learnMore}</span>
    </Link>
  )
}

export default ServiceCard
