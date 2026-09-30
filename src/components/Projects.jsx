import { ArrowUpRight } from 'lucide-react'
import Tooltip from './Tooltip'
import { GithubIcon } from './Icons'

function ProjectCard({ project }) {
  const links = [
    project.github && { label: 'Source code', href: project.github, Icon: GithubIcon },
    project.demo && { label: 'Live demo', href: project.demo, Icon: ArrowUpRight },
  ].filter(Boolean)

  return (
    <article className="card reveal group flex flex-col hover:bg-hover">
      {project.image && (
        <div className="aspect-video w-full overflow-hidden rounded-t-xl border-b border-line">
          <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-medium tracking-tight text-fg sm:text-base">{project.title}</h3>
          <div className="flex shrink-0 gap-3 pt-0.5">
            {links.map(({ label, href, Icon }) => (
              <Tooltip key={label} label={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title}: ${label}`}
                  className="text-faint transition-colors duration-150 hover:text-fg"
                >
                  <Icon size={17} />
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
        <p className="mb-5 text-[13.5px] font-[450] leading-[1.75] text-muted sm:text-[14px]">
          {project.description.trim()}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="rounded-md border border-line bg-hover px-2 py-0.5 font-mono text-[11px] text-subtle"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Projects({ data }) {
  return (
    <section id="projects" className="mt-20 scroll-mt-20">
      <h2 className="section-label reveal">Featured Projects</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
