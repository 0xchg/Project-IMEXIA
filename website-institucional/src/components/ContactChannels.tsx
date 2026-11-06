import { SiInstagram, SiWhatsapp } from '@icons-pack/react-simple-icons'
import { Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { contactLinks } from '../data/shared.ts'
import useContent from '../hooks/useContent.ts'
import Reveal from './Reveal.tsx'

interface Channel {
  label: string
  value: string
  href: string
  icon: ReactNode
  // opens another site in a new tab
  external?: boolean
}

const icon = 'size-7'

// every way to reach the company, each one a card that acts straight away
function ContactChannels() {
  const { company, contact, labels } = useContent()

  const channels: Channel[] = [
    { label: contact.emailLabel, value: company.email, href: contactLinks.email, icon: <Mail className={icon} /> },
    ...company.phones.map((phone) => ({
      label: contact.phoneLabel,
      value: phone,
      href: contactLinks.phone(phone),
      icon: <Phone className={icon} />,
    })),
    {
      label: labels.whatsapp,
      value: company.whatsapp,
      href: contactLinks.whatsapp,
      icon: <SiWhatsapp title="" className={icon} />,
      external: true,
    },
    {
      label: labels.instagram,
      value: `@${company.instagram}`,
      href: contactLinks.instagram,
      icon: <SiInstagram title="" className={icon} />,
      external: true,
    },
    {
      label: contact.addressLabel,
      value: company.address,
      href: contactLinks.map,
      icon: <MapPin className={icon} />,
      external: true,
    },
  ]

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      {channels.map(({ label, value, href, icon, external }, index) => (
        <li key={href}>
          <Reveal delay={index * 0.06} className="h-full">
            <a
              href={href}
              {...(external && { target: '_blank', rel: 'noreferrer' })}
              className="glass group flex h-full items-center gap-4 rounded-box p-4 transition duration-200 hover:-translate-y-0.5 hover:border-accent/50"
            >
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center text-glow transition-transform duration-200 group-hover:scale-110"
              >
                {icon}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold tracking-wide text-accent uppercase">{label}</span>
                <span className="font-semibold break-words">{value}</span>
              </span>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

export default ContactChannels
