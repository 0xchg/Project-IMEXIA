import { SiInstagram, SiWhatsapp } from '@icons-pack/react-simple-icons'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { companyInfo } from '../data/shared.ts'
import useContent from '../hooks/useContent.ts'
import Reveal from './Reveal.tsx'

const year = new Date().getFullYear()
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.address)}`

const socials = [
  { name: 'instagram', href: `https://www.instagram.com/${companyInfo.instagram}`, Icon: SiInstagram },
  { name: 'whatsapp', href: `https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}`, Icon: SiWhatsapp },
] as const

const footerLink =
  'inline-flex min-h-11 items-center gap-3 py-2 transition duration-200 hover:translate-x-1 hover:text-on-deep'
const icon = 'size-4 shrink-0 text-glow'
const socialLink =
  'flex size-11 items-center justify-center rounded-full border border-on-deep/20 transition duration-200 hover:-translate-y-0.5 hover:border-on-deep hover:bg-on-deep/10 hover:text-on-deep'

interface FooterColumnProps {
  title: string
  delay: number
  className?: string
  children: ReactNode
}

function FooterColumn({ title, delay, className = '', children }: FooterColumnProps) {
  return (
    <Reveal delay={delay} className={`flex flex-col gap-2 ${className}`}>
      <h2 className="font-semibold text-on-deep">{title}</h2>
      <ul>{children}</ul>
    </Reveal>
  )
}

function Footer() {
  const reduceMotion = useReducedMotion()
  const { company, labels, navItems, services, localize } = useContent()

  const backToTop = () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })

  return (
    <footer className="overflow-hidden border-t border-on-deep/10 bg-deep text-sm text-on-deep/70">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 px-4 pt-16 pb-12 md:grid-cols-3 md:px-6 lg:grid-cols-[2fr_1fr_1.25fr_1.5fr] lg:gap-x-12 lg:px-12">
        <Reveal className="col-span-2 flex flex-col gap-4 md:col-span-3 lg:col-span-1">
          <Link to={localize('/')} className="inline-flex min-h-11 w-fit items-center">
            <img src={logo} alt={company.name} className="h-8 w-auto brightness-0 invert" />
          </Link>
          <p className="max-w-xs">{company.tagline}</p>
          <ul className="flex gap-2">
            {socials.map(({ name, href, Icon }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={labels[name]} className={socialLink}>
                  <Icon aria-hidden="true" title="" size={20} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <FooterColumn title={labels.footerNav} delay={0.08}>
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <Link to={localize(to)} className={footerLink}>
                {label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={labels.footerServices} delay={0.16}>
          {services.map(({ id, title }) => (
            <li key={id}>
              <Link to={localize(`/services#${id}`)} className={footerLink}>
                {title}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={labels.footerContact} delay={0.24} className="col-span-2 md:col-span-1">
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

      <div className="relative flex flex-wrap items-center justify-between gap-x-6 border-t border-on-deep/10 bg-deep px-4 py-2 md:px-6 lg:px-12">
        <p>
          © {year} {company.name}. {labels.rights}
        </p>
        <button
          type="button"
          onClick={backToTop}
          className="group inline-flex min-h-11 items-center gap-2 transition-colors duration-150 hover:text-on-deep"
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
