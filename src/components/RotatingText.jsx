import { useEffect, useState } from 'react'

// Cycles through phrases, blurring each letter in. Invisible copies of every
// phrase share one grid cell so the width never jumps between phrases.
export default function RotatingText({ items, interval = 2800 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length < 2) return
    const id = setInterval(() => setIndex(i => (i + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [items.length, interval])

  return (
    <span className="inline-grid align-baseline font-medium">
      {items.map(text => (
        <span key={text} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {text}
        </span>
      ))}
      <span key={index} className="col-start-1 row-start-1 whitespace-nowrap">
        {[...items[index]].map((ch, i) => (
          <span key={i} className="blur-letter inline-block whitespace-pre" style={{ animationDelay: `${i * 22}ms` }}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  )
}
