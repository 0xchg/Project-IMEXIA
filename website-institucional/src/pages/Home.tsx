import { HeartHandshake, Network, ShieldCheck, Workflow } from 'lucide-react'
import ClientLogos from '../components/ClientLogos.tsx'
import ClosingCta from '../components/ClosingCta.tsx'
import CompanyIntro from '../components/CompanyIntro.tsx'
import Hero from '../components/Hero.tsx'
import HighlightGrid from '../components/HighlightGrid.tsx'
import Marquee from '../components/Marquee.tsx'
import Section from '../components/Section.tsx'
import ServicesShowcase from '../components/ServicesShowcase.tsx'
import { clients } from '../data/shared.ts'
import useContent from '../hooks/useContent.ts'
import useDocumentTitle from '../hooks/useDocumentTitle.ts'

// in the order of the pillars in the language files
const pillarIcons = [Network, Workflow, ShieldCheck, HeartHandshake]

function Home() {
  const { labels, pillars, services } = useContent()
  useDocumentTitle()

  return (
    <>
      <Hero />
      <Marquee items={services.map(({ title }) => title)} />

      <CompanyIntro />

      <ServicesShowcase />

      <Section title={labels.pillarsTitle} tone="surface">
        <HighlightGrid items={pillars} icons={pillarIcons} />
      </Section>

      <Section title={labels.clientsTitle}>
        <ClientLogos clients={clients} />
      </Section>

      <ClosingCta />
    </>
  )
}

export default Home
