import { useMemo, useState } from 'react'
import PostList from '../components/blog/PostList'
import { posts } from '../lib/blog'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Blog() {
  usePageTitle('Blog')
  const [tag, setTag] = useState(null)

  const tags = useMemo(() => [...new Set(posts.flatMap(p => p.tags ?? []))].sort(), [])
  const shown = tag ? posts.filter(p => p.tags?.includes(tag)) : posts

  return (
    <section className="min-h-[70vh] pt-28 md:pt-36">
      <div className="reveal mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl md:text-[2rem]">Blog</h1>
        <p className="mt-2 text-[14px] font-[450] leading-[1.8] text-muted sm:text-[15px]">
          Notes on LLM infrastructure, RAG, inference optimization and shipping AI systems to production.
        </p>
      </div>

      {tags.length > 1 && (
        <div className="reveal mb-6 flex flex-wrap gap-1.5" role="group" aria-label="Filter by tag">
          {[null, ...tags].map(t => {
            const active = tag === t
            return (
              <button
                key={t ?? 'all'}
                onClick={() => setTag(t)}
                aria-pressed={active}
                className={`rounded-md border px-2.5 py-1 font-mono text-[11.5px] transition-colors ${
                  active ? 'border-line-strong bg-hover text-fg' : 'border-line text-subtle hover:text-fg'
                }`}
              >
                {t ?? 'All'}
              </button>
            )
          })}
        </div>
      )}

      {shown.length ? (
        <PostList posts={shown} />
      ) : (
        <p className="reveal border-y border-line py-10 text-center text-[14px] text-faint">No posts yet. Check back soon.</p>
      )}
    </section>
  )
}
