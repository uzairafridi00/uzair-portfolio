import { useEffect } from 'react'

const SITE = 'Uzair Afridi'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} · AI Engineer`
  }, [title])
}
