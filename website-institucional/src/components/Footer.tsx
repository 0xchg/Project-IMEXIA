import { company } from '../data/data.ts'

const year = new Date().getFullYear()

const contactLink = 'inline-flex min-h-11 items-center transition-colors duration-150 hover:text-canvas'

function Footer() {
  return (
    <footer className="flex flex-col gap-8 bg-ink px-4 py-12 text-sm text-canvas/80 md:flex-row md:justify-between md:px-6 lg:px-12">
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-canvas">{company.name}</p>
        <p>{company.tagline}</p>
        <p>
          © {year} {company.name}
        </p>
      </div>
      <address className="flex flex-col not-italic">
        <a href={`mailto:${company.email}`} className={contactLink}>
          {company.email}
        </a>
        {company.phones.map((phone) => (
          <a key={phone} href={`tel:${phone.replaceAll(' ', '')}`} className={contactLink}>
            {phone}
          </a>
        ))}
        <span className="inline-flex min-h-11 items-center">{company.address}</span>
      </address>
    </footer>
  )
}

export default Footer
