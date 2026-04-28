import { useEffect, useRef, useState } from 'react'
import ProjectCard from './ProjectCard'

export default function Projects({ data }) {
  const { projects } = data
  const [filter, setFilter] = useState('all')
  const sectionRef = useRef(null)

  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)
  const shown = filter === 'featured' ? featured : filter === 'other' ? rest : projects

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.proj-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('proj-revealed'), i * 60)
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

  return (
    <section id="projects" ref={sectionRef} className="py-24 sm:py-32 bg-ink-100/50 dark:bg-ink-900/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="proj-reveal opacity-0 translate-y-6 transition-all duration-500 mb-12">
          <div className="font-mono text-xs text-accent-500 tracking-widest uppercase mb-3">03 / projects</div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display font-700 text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 tracking-tight">
              Things I've built.
            </h2>
            {/* Filter tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-ink-200/70 dark:bg-ink-800/70">
              {[
                { key: 'all', label: `All (${projects.length})` },
                { key: 'featured', label: `Featured (${featured.length})` },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-body font-medium transition-all ${
                    filter === key
                      ? 'bg-ink-50 dark:bg-ink-950 text-ink-900 dark:text-ink-100 shadow-sm'
                      : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((project, i) => (
            <div key={project.id} className="proj-reveal opacity-0 translate-y-6 transition-all duration-500">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {shown.length === 0 && (
          <div className="text-center py-16 text-ink-400 dark:text-ink-600 font-body">
            No projects found.
          </div>
        )}
      </div>

      <style>{`
        .proj-revealed { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </section>
  )
}
