import ClosingCta from '../components/ClosingCta.tsx'
import PageHeader from '../components/PageHeader.tsx'
import ServiceDetail from '../components/ServiceDetail.tsx'
import ServiceShortcuts from '../components/ServiceShortcuts.tsx'
import useContent from '../hooks/useContent.ts'
import useDocumentTitle from '../hooks/useDocumentTitle.ts'

function Services() {
  const { company, pageTitles, services } = useContent()
  useDocumentTitle(pageTitles.services)

  return (
    <>
      <PageHeader title={pageTitles.services} headline={company.servicesHeadline}>
        <ServiceShortcuts services={services} />
      </PageHeader>

      {services.map((service, index) => (
        <ServiceDetail key={service.id} service={service} flipped={index % 2 === 1} />
      ))}

      <ClosingCta />
    </>
  )
}

export default Services
