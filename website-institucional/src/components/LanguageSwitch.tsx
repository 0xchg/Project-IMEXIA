import { Link, useLocation } from 'react-router-dom'
import { languages, type Language } from '../data/shared.ts'
import useContent, { localize, withoutLanguage } from '../hooks/useContent.ts'

interface LanguageSwitchProps {
  onSwitch?: () => void
}

// keeps the visitor on the same page, only in the other language
function LanguageSwitch({ onSwitch }: LanguageSwitchProps) {
  const { language, labels } = useContent()
  const { pathname, hash } = useLocation()
  const page = withoutLanguage(pathname)

  return (
    <ul aria-label={labels.language} className="flex">
      {(Object.keys(languages) as Language[]).map((code) => (
        <li key={code}>
          <Link
            to={localize(page, code) + hash}
            lang={code}
            hrefLang={code}
            title={languages[code].name}
            aria-current={code === language ? 'true' : undefined}
            onClick={onSwitch}
            className={`inline-flex size-11 items-center justify-center text-sm font-semibold transition-colors duration-150 ${
              code === language ? 'text-accent' : 'text-muted hover:text-ink'
            }`}
          >
            {code.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default LanguageSwitch
