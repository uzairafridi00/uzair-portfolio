import { useEffect, useRef } from 'react'
import { MapPin, Briefcase } from 'lucide-react'

const CATEGORY_STYLE = {
  lang:  'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
  ml:    'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  llm:   'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  infra: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  cloud: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  tools: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
}

function useInView(ref) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { ref.current?.classList.add('in-view'); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
}

export default function About({ data }) {
  const { personal, skills, experience } = data
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 80)
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
    <section id="about" ref={sectionRef} className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="reveal opacity-0 translate-y-6 transition-all duration-500 mb-16">
          <div className="font-mono text-xs text-accent-500 tracking-widest uppercase mb-3">02 / about</div>
          <h2 className="font-display font-700 text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 tracking-tight">
            Crafting intelligence,<br />
            <span className="text-ink-400 dark:text-ink-600">one model at a time.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left col */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-500">
              <p className="font-body text-base leading-relaxed text-ink-600 dark:text-ink-400">
                {personal.bio}
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-ink-400 dark:text-ink-500 font-body">
                <MapPin size={14} className="text-accent-500" />
                {personal.location}
              </div>
            </div>

            {/* Experience */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-500">
              <h3 className="font-display font-600 text-sm uppercase tracking-widest text-ink-400 dark:text-ink-500 mb-4 flex items-center gap-2">
                <Briefcase size={13} />
                Experience
              </h3>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-4 border-l-2 border-ink-200 dark:border-ink-800">
                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-accent-500" />
                    <div className="font-display font-600 text-sm text-ink-800 dark:text-ink-200">{exp.role}</div>
                    <div className="font-body text-sm text-ink-500 dark:text-ink-400">{exp.company} · {exp.period}</div>
                    <div className="font-body text-xs text-ink-400 dark:text-ink-500 mt-0.5">{exp.highlight}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain skills */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-500">
              <h3 className="font-display font-600 text-sm uppercase tracking-widest text-ink-400 dark:text-ink-500 mb-4">
                Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.domains.map(d => (
                  <span key={d} className="font-body text-xs px-3 py-1.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 border border-ink-200 dark:border-ink-700">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right col — tech stack */}
          <div className="lg:col-span-3">
            <div className="reveal opacity-0 translate-y-6 transition-all duration-500">
              <h3 className="font-display font-600 text-sm uppercase tracking-widest text-ink-400 dark:text-ink-500 mb-6">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {skills.stack.map(({ name, category }) => (
                  <span
                    key={name}
                    className={`font-mono text-xs px-3 py-1.5 rounded-lg border ${CATEGORY_STYLE[category] || 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'} transition-transform hover:-translate-y-0.5 cursor-default`}
                  >
                    {name}
                  </span>
                ))}
              </div>
              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {Object.entries({
                  lang: 'Language',
                  ml: 'ML / DL',
                  llm: 'LLM',
                  infra: 'Infrastructure',
                  cloud: 'Cloud',
                  tools: 'Tools',
                }).map(([cat, label]) => (
                  <div key={cat} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-sm border ${CATEGORY_STYLE[cat]}`} />
                    <span className="font-body text-xs text-ink-400 dark:text-ink-500">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Abstract grid decoration */}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-500 mt-10 grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xl h-20 ${
                    i % 3 === 0 ? 'bg-ink-100 dark:bg-ink-900' :
                    i % 3 === 1 ? 'bg-ink-50 dark:bg-ink-950' :
                    'bg-accent-400/10 dark:bg-accent-500/10'
                  } ${i === 4 ? 'flex items-center justify-center' : ''}`}
                >
                  {i === 4 && (
                    <div className="font-display font-700 text-2xl text-accent-500">AI</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .revealed { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </section>
  )
}
