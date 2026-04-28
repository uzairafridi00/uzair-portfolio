import { Github, ExternalLink } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  const { title, description, tags, github, demo, featured } = project

  return (
    <article
      className="group relative flex flex-col bg-ink-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-2xl p-6 hover:border-ink-400 dark:hover:border-ink-600 hover:shadow-xl hover:shadow-ink-950/5 dark:hover:shadow-ink-950/40 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {featured && (
        <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-accent-400/15 dark:bg-accent-500/15 text-accent-600 dark:text-accent-400 border border-accent-300/30 dark:border-accent-600/30">
          Featured
        </div>
      )}

      {/* Number */}
      <div className="font-mono text-xs text-ink-300 dark:text-ink-700 mb-4 tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Title */}
      <h3 className="font-display font-700 text-lg text-ink-950 dark:text-ink-50 mb-2 group-hover:text-accent-500 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-ink-500 dark:text-ink-400 leading-relaxed flex-1 mb-5">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tags.map(tag => (
          <span key={tag} className="font-mono text-[11px] px-2 py-1 rounded-md bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 border border-ink-200 dark:border-ink-700">
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-ink-200 dark:border-ink-800">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repo for ${title}`}
            className="flex items-center gap-1.5 text-xs font-body text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 transition-colors"
          >
            <Github size={13} />
            Code
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo for ${title}`}
            className="flex items-center gap-1.5 text-xs font-body text-accent-500 hover:text-accent-600 transition-colors ml-auto"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
      </div>
    </article>
  )
}
