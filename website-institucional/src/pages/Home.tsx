import { HeartHandshake, Network, ShieldCheck, Workflow } from 'lucide-react'
import ButtonLink from '../components/ButtonLink.tsx'
import ClientLogos from '../components/ClientLogos.tsx'
import Glows from '../components/Glows.tsx'
import Hero from '../components/Hero.tsx'
import HighlightGrid from '../components/HighlightGrid.tsx'
import Marquee from '../components/Marquee.tsx'
import Reveal from '../components/Reveal.tsx'
import Section from '../components/Section.tsx'
import ServicesShowcase from '../components/ServicesShowcase.tsx'
import { clients } from '../data/shared.ts'
import useContent from '../hooks/useContent.ts'

// in the order of the pillars in the language files
const pillarIcons = [Network, Workflow, ShieldCheck, HeartHandshake]

function Home() {
  const { company, labels, pillars, services } = useContent()

  return (
    <>
      <Hero />
      <Marquee items={services.map(({ title }) => title)} />

      <ServicesShowcase />

      <Section title={labels.pillarsTitle} tone="surface">
        <HighlightGrid items={pillars} icons={pillarIcons} />
      </Section>

      <Section title={labels.clientsTitle}>
        <ClientLogos clients={clients} />
      </Section>

      <Section tone="deep" className="relative isolate overflow-hidden py-24">
        <Glows />
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-heading font-semibold">{company.closing}</h2>
          <ButtonLink to="/contact-us">{labels.contactCta}</ButtonLink>
        </Reveal>
      </Section>
    </>
  )
}

export default Home
