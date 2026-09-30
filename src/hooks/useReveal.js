import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Fades in every `.reveal` element the first time it scrolls into view.
// Re-scans on each route change, since every page mounts fresh elements.
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const scan = () =>
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
        // Already on screen: show now instead of waiting on the observer's first callback.
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible')
        else obs.observe(el)
      })
    scan()
    // Sections that render after data loads (GitHub stats) add new elements later.
    const mo = new MutationObserver(scan)
    mo.observe(document.getElementById('root'), { childList: true, subtree: true })
    return () => {
      obs.disconnect()
      mo.disconnect()
    }
  }, [pathname])
}
