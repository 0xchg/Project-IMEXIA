import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import useContent from '../hooks/useContent.ts'
import { areaIcons, featureIcons } from './highlightIcons.ts'
import Reveal from './Reveal.tsx'
import Section from './Section.tsx'

// what each area does in practice: one frosted panel per area, every solution with its icon
function SolutionsPanel() {
  const { labels, localize, services } = useContent()

  return (
    <Section title={labels.solutionsTitle} className="py-16 lg:py-24">
      <div className="flex flex-col gap-6">
        {services.map(({ id, title, features }, index) => {
          const AreaIcon = areaIcons[id]
          return (
            <Reveal
              key={id}
              delay={index * 0.08}
              className="glass rounded-box p-4 md:p-6"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                <h3 className="flex items-center gap-3 text-sm font-semibold tracking-wide uppercase">
                  <AreaIcon aria-hidden="true" className="size-6 text-glow" strokeWidth={1.5} />
                  {title}
                </h3>
                <Link
                  to={localize(`/services#${id}`)}
                  className="group inline-flex min-h-11 items-center gap-1 text-sm font-semibold tracking-wide text-accent uppercase"
                >
                  {labels.learnMore}
                  <ChevronRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
              {/* hairline dividers between the solutions, as in the references */}
              <ul
                className={`grid grid-cols-1 gap-px overflow-hidden rounded-[calc(var(--radius-box)-0.5rem)] bg-border sm:grid-cols-2 ${
                  features.length % 5 === 0 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
                }`}
              >
                {features.map((feature, item) => {
                  const Icon = featureIcons[id][item]
                  return (
                    <li key={feature.title} className="flex flex-col gap-2 bg-surface p-4">
                      <Icon aria-hidden="true" className="size-7 text-glow" strokeWidth={1.5} />
                      <span className="text-sm font-semibold tracking-wide uppercase">{feature.title}</span>
                      <span className="text-sm text-muted">{feature.description}</span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export default SolutionsPanel
