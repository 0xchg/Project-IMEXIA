import Section from '../components/Section.tsx'
import useContent from '../hooks/useContent.ts'
import useDocumentTitle from '../hooks/useDocumentTitle.ts'

function Contact() {
  const { pageTitles } = useContent()
  useDocumentTitle(pageTitles.contact)

  return (
    <Section>
      <h1>{pageTitles.contact}</h1>
    </Section>
  )
}

export default Contact
