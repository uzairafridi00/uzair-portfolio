const isCurrent = period => /present|now/i.test(period)

export default function Experience({ data }) {
  return (
    <section id="experience" className="mt-20 scroll-mt-20">
      <h2 className="section-label reveal mb-6">Experience</h2>
      <div className="relative">
        <div aria-hidden="true" className="absolute bottom-2 left-[3px] top-2 w-px bg-line" />
        <ol className="space-y-10">
          {data.experience.map(job => (
            <li key={`${job.company}-${job.period}`} className="reveal relative pl-7">
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[7px] h-[7px] w-[7px] rounded-full ${
                  isCurrent(job.period) ? 'bg-emerald-400 ring-4 ring-emerald-400/15' : 'bg-zinc-400 dark:bg-zinc-500'
                }`}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-[14px] font-medium tracking-tight text-fg sm:text-[15px]">{job.role}</h3>
                  <span className="text-faint">&middot;</span>
                  <span className="text-[12.5px] font-[450] text-muted sm:text-[13.5px]">{job.company}</span>
                </div>
                <span className="whitespace-nowrap text-[11px] font-medium tabular-nums text-subtle sm:text-xs">
                  {job.period}
                </span>
              </div>
              {job.location && <div className="mt-0.5 text-[12px] text-faint sm:text-[12.5px]">{job.location}</div>}
              <p className="mt-3 text-[13.5px] font-[450] leading-[1.7] text-muted sm:text-[14px]">{job.highlight}</p>
              {job.points?.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {job.points.map(point => (
                    <li key={point} className="flex items-start gap-2.5 text-[13px] font-[450] leading-[1.6] text-muted sm:text-[13.5px]">
                      <span className="mt-[8.5px] h-[3px] w-[3px] shrink-0 rounded-full bg-zinc-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
