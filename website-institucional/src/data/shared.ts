import abaLogo from '../assets/clients/aba.webp'
import javLogo from '../assets/clients/jav.webp'
import javilLogo from '../assets/clients/javil.webp'
import logisticaPhoto from '../assets/photos/logistica.webp'
import softwarePhoto from '../assets/photos/software.webp'
import type { Client, CompanyInfo } from './types.ts'

// Portuguese lives at the root, every other language under its own prefix
export const languages = {
  pt: { name: 'Português', prefix: '' },
  en: { name: 'English', prefix: '/en' },
} as const

export type Language = keyof typeof languages

export const navPaths = {
  home: '/',
  services: '/services',
  about: '/about',
  contact: '/contact-us',
} as const

export const companyInfo: CompanyInfo = {
  name: 'IMEXIA',
  email: 'imexiageral@gmail.com',
  phones: ['+244 925 670 134'],
  whatsapp: '+244 925 670 134',
  instagram: 'imexia.ao',
  address: 'Av. Talatona, Via C2, Luanda, Angola',
}

// the exact pin of the office, from the company's own Google Maps link
const pin = '-8.917924,13.182291'

// where each way of reaching the company leads
export const contactLinks = {
  email: `mailto:${companyInfo.email}`,
  phone: (phone: string) => `tel:${phone.replaceAll(' ', '')}`,
  whatsapp: `https://wa.me/${companyInfo.whatsapp.replace(/\D/g, '')}`,
  instagram: `https://www.instagram.com/${companyInfo.instagram}`,
  map: `https://www.google.com/maps/search/?api=1&query=${pin}`,
  // embeds without an API key, with the map's own buttons in the page's language
  mapEmbed: (language: Language) => `https://www.google.com/maps?q=${pin}&hl=${language}&z=17&output=embed`,
}

export const clients: Client[] = [
  { name: 'ABA Construção e Engenharia', logo: abaLogo },
  { name: 'JAVIL Comércio & Indústria', logo: javilLogo },
  { name: 'J.A.V Móveis & Decoração', logo: javLogo },
]

// the group's areas, in the order every page lists them; each language file must describe every one
export const serviceIds = ['logistica', 'software', 'viagens'] as const

export type ServiceId = (typeof serviceIds)[number]

// optional: an area without a photo gets drawn artwork instead; a photo added here shows in the hero and on the services page
export const servicePhotos: Partial<Record<ServiceId, string>> = {
  logistica: logisticaPhoto,
  software: softwarePhoto,
}
