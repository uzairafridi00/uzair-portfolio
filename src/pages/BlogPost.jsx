import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Link2 } from 'lucide-react'
import { LinkedinIcon, XIcon } from '../components/Icons'
import PostContent from '../components/blog/PostContent'
import NotFound from './NotFound'
import { formatDate, getPost, headingId, posts, readingTime } from '../lib/blog'
import { asset } from '../lib/asset'
import { usePageTitle } from '../hooks/usePageTitle'

function Contents({ blocks }) {
  const headings = blocks.filter(b => b.type === 'heading' && b.level !== 3)
  if (headings.length < 3) return null
  return (
    <nav className="card reveal mb-8 px-5 py-4" aria-label="Contents">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-faint">Contents</p>
      <ol className="list-decimal space-y-1 pl-5 text-[13.5px] text-subtle marker:text-faint">
        {headings.map(h => (
          <li key={h.text} className="pl-1">
            <a href={`#${headingId(h.text)}`} className="transition-colors hover:text-fg">{h.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

const shareBtn =
  'inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[12px] text-subtle transition-colors hover:border-line-strong hover:text-fg'

function Share({ post }) {
  const [copied, setCopied] = useState(false)
  const url = `${window.location.origin}${import.meta.env.BASE_URL}blog/${post.slug}/`
  const u = encodeURIComponent(url)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <div className="mt-12 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[12.5px] text-faint">Share</span>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" className={shareBtn}>
        <LinkedinIcon size={13} /> LinkedIn
      </a>
      <a href={`https://x.com/intent/post?url=${u}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className={shareBtn}>
        <XIcon size={12} /> Post
      </a>
      <button onClick={copy} className={shareBtn}>
        {copied ? <Check size={13} /> : <Link2 size={13} />} {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}

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

      <Contents blocks={post.content} />

      <div className="reveal">
        <PostContent blocks={post.content} />
      </div>

      <Share post={post} />

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
