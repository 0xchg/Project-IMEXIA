import { Quote } from 'lucide-react'
import ClosingCta from '../components/ClosingCta.tsx'
import { pillarIcons, valueIcons } from '../components/highlightIcons.ts'
import HighlightGrid from '../components/HighlightGrid.tsx'
import PageHeader from '../components/PageHeader.tsx'
import Reveal from '../components/Reveal.tsx'
import ScrollLitText from '../components/ScrollLitText.tsx'
import Section from '../components/Section.tsx'
import TextReveal from '../components/TextReveal.tsx'
import useContent from '../hooks/useContent.ts'
import useDocumentTitle from '../hooks/useDocumentTitle.ts'

// heading on the left, content on the right, as in the home page's introduction
const split = 'grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12'

function About() {
  const { company, labels, pageTitles, pillars, values } = useContent()
  useDocumentTitle(pageTitles.about)
  const [lead, ...paragraphs] = company.about

  return (
    <>
      <PageHeader title={pageTitles.about} headline={company.aboutHeadline} />

      <Section className="py-16 lg:py-24">
        <div className={split}>
          <h2 className="text-heading font-semibold">
            <TextReveal>{labels.aboutTitle}</TextReveal>
          </h2>
          <div className="flex flex-col gap-8">
            <ScrollLitText text={lead} />
            {paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.1}>
                <p className="text-muted md:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface" className="py-16 lg:py-24">
        <div className={split}>
          <h2 className="text-heading font-semibold">
            <TextReveal>{labels.missionTitle}</TextReveal>
          </h2>
          <Reveal>
            <blockquote className="flex flex-col gap-4">
              <Quote aria-hidden="true" className="size-10 text-accent" />
              <p className="text-2xl leading-snug font-semibold text-balance md:text-3xl">{company.mission}</p>
            </blockquote>
          </Reveal>
        </div>
      </Section>

      <Section title={labels.valuesTitle}>
        <HighlightGrid items={values} icons={valueIcons} />
      </Section>

      <Section title={labels.pillarsTitle} tone="surface">
        <HighlightGrid items={pillars} icons={pillarIcons} />
      </Section>

      <ClosingCta />
    </>
  )
}

export default About
