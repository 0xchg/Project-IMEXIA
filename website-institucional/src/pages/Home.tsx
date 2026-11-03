import ButtonLink from '../components/ButtonLink.tsx'
import ClientLogos from '../components/ClientLogos.tsx'
import Hero from '../components/Hero.tsx'
import HighlightGrid from '../components/HighlightGrid.tsx'
import Marquee from '../components/Marquee.tsx'
import Reveal from '../components/Reveal.tsx'
import Section from '../components/Section.tsx'
import ServicesShowcase from '../components/ServicesShowcase.tsx'
import { clients, company, labels, pillars, services } from '../data/data.ts'

function Home() {
  return (
    <>
      <Hero />
      <Marquee items={services.map(({ title }) => title)} />

      <ServicesShowcase />

      <Section title={labels.pillarsTitle} tone="surface">
        <HighlightGrid items={pillars} />
      </Section>

      <Section title={labels.clientsTitle}>
        <ClientLogos clients={clients} />
      </Section>

      <Section tone="surface">
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-2xl font-semibold">{company.closing}</h2>
          <ButtonLink to="/contact-us">{labels.contactCta}</ButtonLink>
        </Reveal>
      </Section>
    </>
  )
}

export default Home
