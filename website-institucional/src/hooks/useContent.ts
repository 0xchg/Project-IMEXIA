import { useLocation } from 'react-router-dom'
import { content } from '../data/content.ts'
import { languages, type Language } from '../data/shared.ts'

const englishPath = /^\/en(?=\/|$)/

export const languageOf = (pathname: string): Language => (englishPath.test(pathname) ? 'en' : 'pt')

// the same page without its language prefix: /en/about → /about
export const withoutLanguage = (pathname: string) => pathname.replace(englishPath, '') || '/'

// a page path in the given language: /about → /en/about
export const localize = (path: string, language: Language) => {
  const { prefix } = languages[language]
  return prefix && path === '/' ? prefix : prefix + path
}

// the language comes from the address, so links always open in the language they were shared in
function useContent() {
  const { pathname } = useLocation()
  const language = languageOf(pathname)

  return {
    ...content[language],
    language,
    localize: (path: string) => localize(path, language),
  }
}

export default useContent
