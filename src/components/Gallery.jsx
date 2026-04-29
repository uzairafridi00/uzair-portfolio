import { useEffect, useRef } from 'react'

export default function Gallery({ data }) {
  const { gallery } = data
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.gallery-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('gallery-revealed'), i * 60)
            })
            obs.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  if (!gallery || gallery.length === 0) return null

  return (
    <section id="gallery" ref={sectionRef} className="py-24 sm:py-32 bg-ink-50 dark:bg-ink-950">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="gallery-reveal opacity-0 translate-y-6 transition-all duration-500 mb-12">
          <div className="font-mono text-xs text-accent-500 tracking-widest uppercase mb-3">07 / gallery</div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display font-700 text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 tracking-tight">
              Project Snapshots.
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((item, i) => (
            <div key={item.id} className="gallery-reveal opacity-0 translate-y-6 transition-all duration-500">
              <article
                className="group relative flex flex-col bg-ink-100 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-2xl overflow-hidden hover:border-ink-400 dark:hover:border-ink-600 hover:shadow-xl hover:shadow-ink-950/5 dark:hover:shadow-ink-950/40 transition-all duration-300 hover:-translate-y-1 h-full"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="aspect-video w-full overflow-hidden bg-ink-200 dark:bg-ink-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-700 text-lg text-ink-950 dark:text-ink-50 mb-2 group-hover:text-accent-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-ink-500 dark:text-ink-400 leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-revealed { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </section>
  )
}
