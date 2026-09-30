import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PostContent from '../components/blog/PostContent'
import NotFound from './NotFound'
import { formatDate, getPost, posts, readingTime } from '../lib/blog'
import { asset } from '../lib/asset'
import { usePageTitle } from '../hooks/usePageTitle'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  usePageTitle(post?.title ?? 'Post not found')

  if (!post) return <NotFound what="post" />

  const index = posts.indexOf(post)
  const newer = posts[index - 1]
  const older = posts[index + 1]

  return (
    <article className="pt-28 md:pt-36">
      <Link
        to="/blog"
        className="reveal mb-8 inline-flex items-center gap-1.5 text-[13px] text-subtle transition-colors hover:text-fg"
      >
        <ArrowLeft size={14} /> All posts
      </Link>

      <header className="reveal mb-8 border-b border-line pb-8">
        <h1 className="text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl md:text-[2rem]">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12.5px] text-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>&middot;</span>
          <span>{readingTime(post)} min read</span>
          {post.tags?.map(tag => (
            <span key={tag} className="rounded-md border border-line bg-hover px-2 py-0.5 font-mono text-[11px] text-subtle">
              {tag}
            </span>
          ))}
        </div>
        {post.cover && (
          <img src={asset(post.cover)} alt="" className="mt-8 aspect-video w-full rounded-xl border border-line object-cover" />
        )}
      </header>

      <div className="reveal">
        <PostContent blocks={post.content} />
      </div>

      {(newer || older) && (
        <nav className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2" aria-label="More posts">
          {older ? (
            <Link to={`/blog/${older.slug}`} className="card group px-4 py-3.5 hover:bg-hover">
              <span className="flex items-center gap-1.5 text-[11.5px] text-faint"><ArrowLeft size={12} /> Older</span>
              <span className="mt-1 block text-[14px] font-medium text-fg-2 group-hover:text-fg">{older.title}</span>
            </Link>
          ) : <span />}
          {newer && (
            <Link to={`/blog/${newer.slug}`} className="card group px-4 py-3.5 text-right hover:bg-hover">
              <span className="flex items-center justify-end gap-1.5 text-[11.5px] text-faint">Newer <ArrowRight size={12} /></span>
              <span className="mt-1 block text-[14px] font-medium text-fg-2 group-hover:text-fg">{newer.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  )
}
