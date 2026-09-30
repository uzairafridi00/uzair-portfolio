import { useMemo, useState } from 'react'
import { useFetchJson } from '../hooks/useFetchJson'

const CELL = 11
const GAP = 3
const TOP = 18
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month = d => new Date(d.date).getUTCMonth()

export const contributionsUrl = username => `https://github-contributions-api.jogruber.de/v4/${username}?y=last`

// Last-year GitHub activity, pulled from a public proxy of the contributions calendar.
export default function ContributionGraph({ username }) {
  const { data, error } = useFetchJson(contributionsUrl(username))
  const [hover, setHover] = useState(null)

  const weeks = useMemo(() => {
    const days = data?.contributions
    if (!days?.length) return Array.from({ length: 53 }, () => Array(7).fill(null))
    const out = []
    // Pad the first column so rows line up with weekdays (Sunday on top).
    let week = Array(new Date(days[0].date).getUTCDay()).fill(null)
    days.forEach(d => {
      week.push(d)
      if (week.length === 7) { out.push(week); week = [] }
    })
    if (week.length) out.push(week)
    return out
  }, [data])

  if (error) return null

  const width = weeks.length * (CELL + GAP) - GAP
  const height = TOP + 7 * (CELL + GAP) - GAP
  const total = data?.total?.lastYear ?? 0
  const year = new Date().getFullYear()

  const monthLabels = []
  if (data) {
    weeks.forEach((w, i) => {
      const first = w.find(Boolean)
      const prev = weeks[i - 1]?.find(Boolean)
      if (first && (!prev || month(first) !== month(prev)) && i < weeks.length - 2) {
        monthLabels.push({ i, label: MONTHS[month(first)] })
      }
    })
    // A partial first month would collide with the next label.
    if (monthLabels.length > 1 && monthLabels[1].i - monthLabels[0].i < 3) monthLabels.shift()
  }

  return (
    <div className="no-scrollbar relative -mx-6 overflow-x-auto sm:mx-0 sm:overflow-visible">
      <div className="min-w-[600px] px-6 sm:min-w-0 sm:px-0">
        <div className="relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className={`block w-full ${data ? '' : 'animate-pulse'}`}
            role="img"
            aria-label={`${total} GitHub contributions in the last year`}
          >
            {monthLabels.map(m => (
              <text key={m.i} x={m.i * (CELL + GAP)} y={9} fontSize="9" style={{ fill: 'var(--faint)' }}>
                {m.label}
              </text>
            ))}
            {weeks.map((w, x) =>
              w.map((d, y) => (
                <rect
                  key={`${x}-${y}`}
                  x={x * (CELL + GAP)}
                  y={TOP + y * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={2.5}
                  style={{ fill: `var(--c${d ? d.level : 0})`, opacity: data && !d ? 0 : 1 }}
                  onMouseEnter={() => d && setHover({ d, x, y })}
                  onMouseLeave={() => setHover(null)}
                />
              ))
            )}
          </svg>
          {hover && (
            <div
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-tip px-2.5 py-1 text-[12px] font-medium text-[#f0f0f0] shadow-lg"
              style={{
                left: `${((hover.x * (CELL + GAP) + CELL / 2) / width) * 100}%`,
                top: `${((TOP + hover.y * (CELL + GAP) - 4) / height) * 100}%`,
              }}
            >
              {hover.d.count || 'No'} contribution{hover.d.count === 1 ? '' : 's'} on{' '}
              {new Date(hover.d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.14em] text-faint sm:text-[11px]">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-fg"
          >
            <span className="font-medium text-fg-2">{total}</span> Contributions
            <span className="hidden md:inline"> &middot; {year - 1}&ndash;{String(year).slice(2)}</span>
          </a>
          <div className="flex items-center gap-1.5">
            <span className="mr-1">Less</span>
            {[0, 1, 2, 3, 4].map(l => (
              <span key={l} className="h-[11px] w-[11px] rounded-[2.5px]" style={{ background: `var(--c${l})` }} />
            ))}
            <span className="ml-1">More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
