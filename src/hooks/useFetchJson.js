import { useEffect, useState } from 'react'

// One request per URL for the whole session, shared by every component that asks.
const cache = new Map()

function load(url) {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url).then(r => (r.ok ? r.json() : Promise.reject(new Error(`${r.status} ${url}`))))
    )
  }
  return cache.get(url)
}

export function useFetchJson(url) {
  const [state, setState] = useState({ data: null, error: null })

  useEffect(() => {
    let cancelled = false
    load(url)
      .then(data => !cancelled && setState({ data, error: null }))
      .catch(error => {
        cache.delete(url)
        if (!cancelled) setState({ data: null, error })
      })
    return () => { cancelled = true }
  }, [url])

  return state
}
