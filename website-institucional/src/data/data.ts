export interface NavItem {
  to: string
  label: string
}

export interface Company {
  name: string
  tagline: string
  about: string
  email: string
  phone: string
  address: string
}

export interface Service {
  title: string
  description: string
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Início' },
  { to: '/services', label: 'Serviços' },
  { to: '/about', label: 'Sobre' },
  { to: '/contact-us', label: 'Contactos' },
]

export const company: Company = {
  name: 'IMEXIA',
  tagline: '',
  about: '',
  email: '',
  phone: '',
  address: '',
}

export const services: Service[] = []
