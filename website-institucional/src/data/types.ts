import type { navPaths, ServiceId } from './shared.ts'

export type Page = keyof typeof navPaths

export interface NavItem {
  to: string
  label: string
}

export interface Highlight {
  title: string
  description: string
}

// the same in every language
export interface CompanyInfo {
  name: string
  email: string
  phones: string[]
  whatsapp: string
  instagram: string
  address: string
}

export interface CompanyText {
  tagline: string
  headline: string[]
  intro: string
  closing: string
  aboutHeadline: string
  servicesHeadline: string
  about: string[]
  mission: string
}

export type Company = CompanyInfo & CompanyText

export interface Client {
  name: string
  logo: string
}

export interface ServiceText {
  title: string
  summary: string
  description: string
  features: Highlight[]
}

export interface Service extends ServiceText {
  id: ServiceId
  image: string
}

export interface Labels {
  contactCta: string
  servicesCta: string
  learnMore: string
  aboutTitle: string
  missionTitle: string
  valuesTitle: string
  servicesTitle: string
  pillarsTitle: string
  clientsTitle: string
  openMenu: string
  closeMenu: string
  language: string
  footerNav: string
  footerServices: string
  footerContact: string
  instagram: string
  whatsapp: string
  rights: string
  backToTop: string
}

export interface ContactText {
  emailLabel: string
  phoneLabel: string
  addressLabel: string
  formTitle: string
  fields: Record<'name' | 'email' | 'phone' | 'service' | 'message', string>
  optional: string
  serviceOther: string
  errors: Record<'name' | 'email' | 'phone' | 'message', string>
  submit: string
  // opens the message sent through WhatsApp
  greeting: string
  sent: string
  blocked: string
  openWhatsapp: string
  mapTitle: string
  openMap: string
}

// what each language file provides: text only
export interface Translation {
  labels: Labels
  contact: ContactText
  nav: Record<Page, string>
  company: CompanyText
  pillars: Highlight[]
  values: Highlight[]
  services: Record<ServiceId, ServiceText>
}

// what the components read: text joined with the shared data
export interface Content {
  labels: Labels
  contact: ContactText
  navItems: NavItem[]
  // page names, as in the navigation
  pageTitles: Record<Page, string>
  company: Company
  pillars: Highlight[]
  values: Highlight[]
  services: Service[]
}
