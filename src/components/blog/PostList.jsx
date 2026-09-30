import { Link } from 'react-router-dom'
import { formatDate, readingTime } from '../../lib/blog'

export default function PostList({ posts }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {posts.map(post => (
        <li key={post.slug} className="reveal">
          <Link
            to={`/blog/${post.slug}`}
            className="group -mx-3 flex flex-col gap-1.5 rounded-lg px-3 py-5 transition-colors hover:bg-hover sm:flex-row sm:items-baseline sm:gap-6"
          >
            <time dateTime={post.date} className="shrink-0 text-[12px] tabular-nums text-faint sm:w-28 sm:text-[12.5px]">
              {formatDate(post.date, 'short')}
            </time>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-medium tracking-tight text-fg underline-offset-[3px] group-hover:underline sm:text-base">
                {post.title}
              </h3>
              {post.summary && (
                <p className="mt-1.5 text-[13.5px] font-[450] leading-[1.7] text-muted sm:text-[14px]">{post.summary}</p>
              )}
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11.5px] text-faint">
                <span>{readingTime(post)} min read</span>
                {post.tags?.map(tag => (
                  <span key={tag} className="font-mono">#{tag.toLowerCase()}</span>
                ))}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
