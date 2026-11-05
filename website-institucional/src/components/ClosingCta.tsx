import useContent from '../hooks/useContent.ts'
import ButtonLink from './ButtonLink.tsx'
import Glows from './Glows.tsx'
import Reveal from './Reveal.tsx'
import Section from './Section.tsx'
import TextReveal from './TextReveal.tsx'

// the navy band that closes a page with the call to get in touch
function ClosingCta() {
  const { company, labels } = useContent()

  return (
    <Section tone="ink" className="relative isolate overflow-hidden py-24">
      <Glows />
      <Reveal className="flex flex-wrap items-center justify-between gap-6">
        <h2 className="text-heading font-semibold">
          <TextReveal>{company.closing}</TextReveal>
        </h2>
        <ButtonLink to="/contact-us">{labels.contactCta}</ButtonLink>
      </Reveal>
    </Section>
  )
}

export default ClosingCta
