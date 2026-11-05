import en from './en.ts'
import pt from './pt.ts'
import { companyInfo, navPaths, serviceIds, serviceImages, type Language } from './shared.ts'
import type { Content, Page, Translation } from './types.ts'

// joins a language's text with the data every language shares
const build = ({ nav, company, services, ...text }: Translation): Content => ({
  ...text,
  navItems: (Object.keys(navPaths) as Page[]).map((page) => ({ to: navPaths[page], label: nav[page] })),
  pageTitles: nav,
  company: { ...companyInfo, ...company },
  services: serviceIds.map((id) => ({ id, image: serviceImages[id], ...services[id] })),
})

export const content: Record<Language, Content> = {
  pt: build(pt),
  en: build(en),
}
