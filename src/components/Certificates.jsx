import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'

export default function Certificates({ data }) {
  const { certificates } = data
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.cert-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('cert-revealed'), i * 60)
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

  if (!certificates || certificates.length === 0) return null

  return (
    <section id="certificates" ref={sectionRef} className="py-24 sm:py-32 bg-ink-100/50 dark:bg-ink-900/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="cert-reveal opacity-0 translate-y-6 transition-all duration-500 mb-12">
          <div className="font-mono text-xs text-accent-500 tracking-widest uppercase mb-3">08 / certificates</div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display font-700 text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 tracking-tight">
              Certifications.
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {certificates.map((cert, i) => (
            <div key={cert.id} className="cert-reveal opacity-0 translate-y-6 transition-all duration-500">
              <article
                className="group relative flex flex-col md:flex-row bg-ink-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-2xl overflow-hidden hover:border-ink-400 dark:hover:border-ink-600 hover:shadow-xl hover:shadow-ink-950/5 dark:hover:shadow-ink-950/40 transition-all duration-300 hover:-translate-y-1 h-full"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="md:w-2/5 aspect-video md:aspect-square overflow-hidden bg-ink-200 dark:bg-ink-800 shrink-0">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1 justify-center">
                  <div className="font-mono text-xs text-ink-400 dark:text-ink-500 mb-2">
                    {cert.date}
                  </div>
                  <h3 className="font-display font-700 text-lg text-ink-950 dark:text-ink-50 mb-1 group-hover:text-accent-500 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="font-body text-sm text-ink-500 dark:text-ink-400 mb-4">
                    {cert.issuer}
                  </p>
                  {cert.link && (
                    <div className="mt-auto pt-2">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-body text-accent-500 hover:text-accent-600 transition-colors"
                      >
                        <ExternalLink size={13} />
                        View Credential
                      </a>
                    </div>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cert-revealed { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </section>
  )
}
