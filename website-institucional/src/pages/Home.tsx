import ClientLogos from '../components/ClientLogos.tsx'
import ClosingCta from '../components/ClosingCta.tsx'
import CompanyIntro from '../components/CompanyIntro.tsx'
import Hero from '../components/Hero.tsx'
import { pillarIcons } from '../components/highlightIcons.ts'
import HighlightGrid from '../components/HighlightGrid.tsx'
import Marquee from '../components/Marquee.tsx'
import Section from '../components/Section.tsx'
import StrengthsStrip from '../components/StrengthsStrip.tsx'
import ServicesShowcase from '../components/ServicesShowcase.tsx'
import { clients } from '../data/shared.ts'
import useContent from '../hooks/useContent.ts'
import useDocumentTitle from '../hooks/useDocumentTitle.ts'

function Home() {
  const { labels, pillars, services } = useContent()
  useDocumentTitle()

  return (
    <>
      <Hero />
      <StrengthsStrip />

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
