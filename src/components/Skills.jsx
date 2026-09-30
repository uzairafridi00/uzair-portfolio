export default function Skills({ data }) {
  const groups = data.skills.groups
  if (!groups?.length) return null

  return (
    <section id="skills" className="mt-20 scroll-mt-20">
      <h2 className="section-label reveal mb-6">Skills</h2>
      <div className="divide-y divide-line border-y border-line">
        {groups.map(group => (
          <div key={group.name} className="reveal grid gap-2.5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <h3 className="pt-1 text-[13px] font-medium text-fg-2">{group.name}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map(item => (
                <span
                  key={item}
                  className="rounded-md border border-line bg-hover px-2 py-0.5 font-mono text-[11.5px] text-subtle"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
