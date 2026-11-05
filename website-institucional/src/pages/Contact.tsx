import { ExternalLink } from 'lucide-react'
import ContactChannels from '../components/ContactChannels.tsx'
import ContactForm from '../components/ContactForm.tsx'
import PageHeader from '../components/PageHeader.tsx'
import Reveal from '../components/Reveal.tsx'
import Section from '../components/Section.tsx'
import TextReveal from '../components/TextReveal.tsx'
import { contactLinks } from '../data/shared.ts'
import useContent from '../hooks/useContent.ts'
import useDocumentTitle from '../hooks/useDocumentTitle.ts'

function Contact() {
  const { company, contact, labels, language, pageTitles } = useContent()
  useDocumentTitle(pageTitles.contact)

  return (
    <>
      <PageHeader title={pageTitles.contact} headline={company.closing} />

      <Section className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="text-heading font-semibold">
              <TextReveal>{labels.contactCta}</TextReveal>
            </h2>
            <ContactChannels />
          </div>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <Section title={contact.mapTitle} tone="surface">
        <Reveal className="flex flex-col items-start gap-4">
          <iframe
            src={contactLinks.mapEmbed(language)}
            title={contact.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-80 w-full rounded-box border border-border lg:h-112"
          />
          <a
            href={contactLinks.map}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent hover:underline"
          >
            {contact.openMap}
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        </Reveal>
      </Section>
    </>
  )
}

export default Contact
