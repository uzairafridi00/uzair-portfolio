import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// New page: start at the top. Link with a hash (e.g. /#contact): scroll to that section.
export function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    // Wait a frame so the target page has rendered.
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
}
