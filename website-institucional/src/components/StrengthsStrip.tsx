import useContent from '../hooks/useContent.ts'
import ButtonLink from './ButtonLink.tsx'
import { strengthIcons } from './highlightIcons.ts'
import Reveal from './Reveal.tsx'

// the group's strengths in one band under the hero, ending with the call to get in touch
function StrengthsStrip() {
  const { labels, strengths } = useContent()

  return (
    <section className="border-y border-on-deep/10 bg-deep px-4 py-8 text-on-deep md:px-6 lg:px-12">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center">
        <ul className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {strengths.map(({ title, description }, index) => {
            const Icon = strengthIcons[index]
            return (
              <li key={title} className="lg:border-l lg:border-on-deep/10 lg:px-6 lg:first:border-0 lg:first:pl-0">
                <Reveal delay={index * 0.08} className="flex items-start gap-4">
                  <Icon aria-hidden="true" className="size-8 shrink-0 text-glow" strokeWidth={1.5} />
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-semibold tracking-wide text-accent uppercase">{title}</span>
                    <span className="text-sm text-on-deep/80">{description}</span>
                  </span>
                </Reveal>
              </li>
            )
          })}
        </ul>
        <Reveal delay={0.3} className="xl:w-72 xl:shrink-0">
          <ButtonLink to="/contact-us" variant="outline" className="rounded-full py-2">
            {labels.strengthsCta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}

export default StrengthsStrip
