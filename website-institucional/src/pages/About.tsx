import Section from '../components/Section.tsx'
import useContent from '../hooks/useContent.ts'
import useDocumentTitle from '../hooks/useDocumentTitle.ts'

function About() {
  const { pageTitles } = useContent()
  useDocumentTitle(pageTitles.about)

  return (
    <Section>
      <h1>{pageTitles.about}</h1>
    </Section>
  )
}

export default About
