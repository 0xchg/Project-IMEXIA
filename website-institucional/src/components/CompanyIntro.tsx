import useContent from '../hooks/useContent.ts'
import ButtonLink from './ButtonLink.tsx'
import Reveal from './Reveal.tsx'
import ScrollLitText from './ScrollLitText.tsx'
import Section from './Section.tsx'
import TextReveal from './TextReveal.tsx'

function CompanyIntro() {
  const { company, labels } = useContent()

  return (
    <Section tone="surface">
      <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-heading font-semibold">
            <TextReveal>{labels.aboutTitle}</TextReveal>
          </h2>
          <p className="text-lg text-muted">{company.aboutHeadline}</p>
        </Reveal>
        <div className="flex flex-col items-start gap-8">
          <ScrollLitText text={company.about[0]} />
          <ButtonLink to="/about">{labels.learnMore}</ButtonLink>
        </div>
      </div>
    </Section>
  )
}

export default CompanyIntro
