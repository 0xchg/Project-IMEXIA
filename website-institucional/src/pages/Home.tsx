import ButtonLink from '../components/ButtonLink.tsx'
import HighlightGrid from '../components/HighlightGrid.tsx'
import Section from '../components/Section.tsx'
import ServiceCard from '../components/ServiceCard.tsx'
import { company, labels, pillars, services } from '../data/data.ts'

function Home() {
  return (
    <>
      <Section tone="ink" className="flex min-h-[60dvh] flex-col justify-center gap-6">
        <h1 className="max-w-4xl text-display font-semibold text-balance">{company.headline}</h1>
        <p className="max-w-2xl text-canvas/80">{company.intro}</p>
        <div className="flex flex-wrap gap-2">
          <ButtonLink to="/contact-us">{labels.contactCta}</ButtonLink>
          <ButtonLink to="/services" variant="outline">
            {labels.servicesCta}
          </ButtonLink>
        </div>
      </Section>

      <Section title={labels.servicesTitle}>
        <ul className="grid-cards">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard {...service} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title={labels.pillarsTitle} tone="surface">
        <HighlightGrid items={pillars} />
      </Section>

      <Section className="flex flex-wrap items-center justify-between gap-6">
        <h2 className="text-2xl font-semibold">{company.closing}</h2>
        <ButtonLink to="/contact-us">{labels.contactCta}</ButtonLink>
      </Section>
    </>
  )
}

export default Home
