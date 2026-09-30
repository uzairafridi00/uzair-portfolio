import { useMemo } from 'react'
import ContributionGraph, { contributionsUrl } from './ContributionGraph'
import Tooltip from './Tooltip'
import { useFetchJson } from '../hooks/useFetchJson'

const API = 'https://api.github.com'

function StatTile({ label, value, sub }) {
  return (
    <div className="card px-4 py-3.5">
      <div className="meta-label">{label}</div>
      <div className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-fg">
        {value ?? <span className="inline-block h-6 w-12 animate-pulse rounded bg-hover align-middle" />}
      </div>
      {sub && <div className="mt-0.5 text-[11.5px] text-faint">{sub}</div>}
    </div>
  )
}

// Share of public, non-fork repositories by primary language.
function Languages({ repos }) {
  const rows = useMemo(() => {
    const counts = {}
    repos.forEach(r => {
      if (!r.fork && r.language) counts[r.language] = (counts[r.language] || 0) + 1
    })
    const total = Object.values(counts).reduce((a, b) => a + b, 0)
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, n]) => ({ name, n, pct: Math.round((n / total) * 100) }))
  }, [repos])

  if (!rows.length) return null
  const max = rows[0].n

  return (
    <div className="card px-4 py-4 sm:px-5">
      <div className="mb-3.5 flex items-baseline justify-between gap-3">
        <h3 className="meta-label">Top Languages</h3>
        <span className="text-[11px] text-faint">by repository</span>
      </div>
      <ul className="space-y-2.5">
        {rows.map(row => (
          <li key={row.name} className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3 text-[13px]">
            <span className="truncate text-fg-2">{row.name}</span>
            <Tooltip className="flex w-full" label={`${row.n} ${row.n === 1 ? 'repository' : 'repositories'}`}>
              <span className="block h-4 w-full cursor-default py-[5px]">
                <span
                  className="block h-1.5 rounded-full bg-fg-2 opacity-80"
                  style={{ width: `${Math.max((row.n / max) * 100, 4)}%` }}
                />
              </span>
            </Tooltip>
            <span className="text-right tabular-nums text-subtle">{row.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function GitHubStats({ username }) {
  const user = useFetchJson(`${API}/users/${username}`)
  const repos = useFetchJson(`${API}/users/${username}/repos?per_page=100&sort=updated`)
  const contrib = useFetchJson(contributionsUrl(username))

  const stars = repos.data?.reduce((sum, r) => sum + (r.fork ? 0 : r.stargazers_count), 0)
  const since = user.data && new Date(user.data.created_at).getFullYear()

  const tiles = [
    { label: 'Repositories', value: user.data?.public_repos, sub: 'public' },
    { label: 'Contributions', value: contrib.data?.total?.lastYear, sub: 'last 12 months' },
    { label: 'Followers', value: user.data?.followers, sub: 'on GitHub' },
    stars > 0
      ? { label: 'Stars', value: stars, sub: 'across repos' }
      : { label: 'Member Since', value: since, sub: since ? `${new Date().getFullYear() - since}+ years` : null },
  ]

  // Rate-limited or offline: skip the numbers rather than show zeros.
  const statsFailed = user.error && repos.error

  return (
    <section id="github" className="mt-16 scroll-mt-20">
      <div className="reveal mb-4 flex items-baseline justify-between gap-3">
        <h2 className="section-label mb-0">GitHub Activity</h2>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-faint transition-colors hover:text-fg"
        >
          @{username} &#8599;
        </a>
      </div>
      {!statsFailed && (
        <div className="reveal mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tiles.map(t => (
            <StatTile key={t.label} {...t} />
          ))}
        </div>
      )}
      <div className="reveal">
        <ContributionGraph username={username} />
      </div>
      {repos.data && (
        <div className="reveal mt-8">
          <Languages repos={repos.data} />
        </div>
      )}
    </section>
  )
}
