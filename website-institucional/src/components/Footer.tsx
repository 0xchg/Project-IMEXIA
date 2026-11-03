import { company, labels, navItems, services } from '../data/data.ts'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Reveal from './Reveal.tsx'

const year = new Date().getFullYear()
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`

const footerLink =
  'inline-flex min-h-11 items-center gap-3 transition duration-200 hover:translate-x-1 hover:text-canvas'
const icon = 'size-4 shrink-0 text-glow'

interface FooterColumnProps {
  title: string
  delay: number
  children: ReactNode
}

function FooterColumn({ title, delay, children }: FooterColumnProps) {
  return (
    <Reveal delay={delay} className="flex flex-col gap-2">
      <h2 className="font-semibold text-canvas">{title}</h2>
      <ul>{children}</ul>
    </Reveal>
  )
}

function Footer() {
  const reduceMotion = useReducedMotion()

  const backToTop = () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })

  return (
    <footer className="overflow-hidden bg-ink text-sm text-canvas/70">
      <div className="grid gap-12 px-4 pt-16 pb-12 md:grid-cols-2 md:px-6 lg:grid-cols-[2fr_1fr_1.25fr_1.5fr] lg:px-12">
        <Reveal className="flex flex-col gap-4">
          <Link to="/" className="inline-flex min-h-11 w-fit items-center">
            <img src={logo} alt={company.name} className="h-8 w-auto brightness-0 invert" />
          </Link>
          <p className="max-w-xs">{company.tagline}</p>
        </Reveal>

        <FooterColumn title={labels.footerNav} delay={0.08}>
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={footerLink}>
                {label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={labels.footerServices} delay={0.16}>
          {services.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/services#${id}`} className={footerLink}>
                {title}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={labels.footerContact} delay={0.24}>
          <li>
            <a href={`mailto:${company.email}`} className={footerLink}>
              <Mail aria-hidden="true" className={icon} />
              {company.email}
            </a>
          </li>
          {company.phones.map((phone) => (
            <li key={phone}>
              <a href={`tel:${phone.replaceAll(' ', '')}`} className={footerLink}>
                <Phone aria-hidden="true" className={icon} />
                {phone}
              </a>
            </li>
          ))}
          <li>
            <a href={mapUrl} target="_blank" rel="noreferrer" className={footerLink}>
              <MapPin aria-hidden="true" className={icon} />
              {company.address}
            </a>
          </li>
        </FooterColumn>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none mb-[-8vw] text-center text-[20vw] leading-none font-semibold tracking-tight text-canvas/5 select-none"
      >
        {company.name}
      </p>

      <div className="relative flex flex-wrap items-center justify-between gap-x-6 border-t border-canvas/10 bg-ink px-4 py-2 md:px-6 lg:px-12">
        <p>
          © {year} {company.name}. {labels.rights}
        </p>
        <button
          type="button"
          onClick={backToTop}
          className="group inline-flex min-h-11 items-center gap-2 transition-colors duration-150 hover:text-canvas"
        >
          {labels.backToTop}
          <ArrowUp
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-y-1"
          />
        </button>
      </div>
    </footer>
  )
}

export default Footer
