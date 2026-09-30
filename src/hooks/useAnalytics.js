import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import portfolio from '../data/portfolio.json'

const code = portfolio.integrations.goatcounter

// GoatCounter: cookie-free page views. The script counts the first page load;
// client-side navigations after that are counted here.
export function useAnalytics() {
  const { pathname } = useLocation()
  const loaded = useRef(false)

  useEffect(() => {
    if (!code) return
    if (!loaded.current) {
      loaded.current = true
      const s = document.createElement('script')
      s.async = true
      s.src = 'https://gc.zgo.at/count.js'
      s.dataset.goatcounter = `https://${code}.goatcounter.com/count`
      document.head.appendChild(s)
      return
    }
    window.goatcounter?.count?.({ path: window.location.pathname })
  }, [pathname])
}
