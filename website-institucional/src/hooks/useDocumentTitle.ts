import { useEffect } from 'react'
import { companyInfo } from '../data/shared.ts'

// the browser tab reads "Serviços · IMEXIA"; the home page is just "IMEXIA"
function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${companyInfo.name}` : companyInfo.name
  }, [title])
}

export default useDocumentTitle
