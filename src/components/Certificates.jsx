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
          <div className="font-mono text-xs text-accent-500 tracking-widest uppercase mb-3">certificates</div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display font-700 text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 tracking-tight">
              Certifications.
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 lg:gap-10">
          {certificates.map((cert, i) => (
            <div key={cert.id} className="cert-reveal opacity-0 translate-y-6 transition-all duration-500">
              <article
                className="group relative flex flex-col md:flex-row bg-ink-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-3xl overflow-hidden hover:border-ink-400 dark:hover:border-ink-600 hover:shadow-xl hover:shadow-ink-950/5 dark:hover:shadow-ink-950/40 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Image Section */}
                <div className="md:w-3/5 lg:w-2/3 bg-ink-200/50 dark:bg-ink-950/50 p-6 sm:p-8 lg:p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-ink-200 dark:border-ink-800 shrink-0">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto max-h-[500px] lg:max-h-[700px] object-contain rounded-lg shadow-sm border border-ink-200/60 dark:border-ink-700/60 transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col flex-1 justify-center md:w-2/5 lg:w-1/3">
                  <div className="font-mono text-sm text-accent-500 mb-3">
                    {cert.date}
                  </div>
                  <h3 className="font-display font-700 text-2xl lg:text-3xl text-ink-950 dark:text-ink-50 mb-4 group-hover:text-accent-500 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="font-body text-base lg:text-lg text-ink-600 dark:text-ink-400 mb-8">
                    {cert.issuer}
                  </p>
                  {cert.link && (
                    <div className="mt-auto pt-4 border-t border-ink-200 dark:border-ink-800">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-ink-950 dark:bg-ink-50 text-ink-50 dark:text-ink-950 text-sm font-body font-medium transition-all hover:bg-ink-800 dark:hover:bg-ink-200 hover:shadow-lg hover:shadow-ink-950/20"
                      >
                        <ExternalLink size={16} />
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