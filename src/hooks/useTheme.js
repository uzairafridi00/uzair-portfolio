import { useState, useEffect } from 'react'

// Dark is the default look; light is opt-in and remembered.
export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('theme') !== 'light'
    } catch {
      return true
    }
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {}
  }, [dark])

  return { dark, toggle: () => setDark(d => !d) }
}
