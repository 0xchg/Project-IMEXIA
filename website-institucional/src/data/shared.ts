import abaLogo from '../assets/clients/aba.webp'
import javLogo from '../assets/clients/jav.webp'
import javilLogo from '../assets/clients/javil.webp'
import logisticaImage from '../assets/services/logistica.webp'
import softwareImage from '../assets/services/software.webp'
import viagensImage from '../assets/services/viagens.webp'
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

export const clients: Client[] = [
  { name: 'ABA Construção e Engenharia', logo: abaLogo },
  { name: 'JAVIL Comércio & Indústria', logo: javilLogo },
  { name: 'J.A.V Móveis & Decoração', logo: javLogo },
]

// sets which services exist and their order; each language file must describe every one
export const serviceImages = {
  viagens: viagensImage,
  logistica: logisticaImage,
  software: softwareImage,
}

export type ServiceId = keyof typeof serviceImages

export const serviceIds = Object.keys(serviceImages) as ServiceId[]
