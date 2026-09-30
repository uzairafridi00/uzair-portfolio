import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound({ what = 'page' }) {
  usePageTitle(what === 'post' ? 'Post not found' : 'Page not found')

  return (
    <section className="flex min-h-[80vh] flex-col items-start justify-center pt-28">
      <div className="reveal font-mono text-[5.5rem] font-medium leading-none tracking-tighter text-fg sm:text-[8rem]">
        404
      </div>
      <h1 className="reveal mt-6 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
        {what === 'post' ? 'This post doesn’t exist.' : 'This page doesn’t exist.'}
      </h1>
      <p className="reveal mt-2 max-w-md text-[14px] font-[450] leading-[1.8] text-muted sm:text-[15px]">
        {what === 'post'
          ? 'It may have been renamed or unpublished. The blog index has everything that’s currently live.'
          : 'The link may be broken, or the page may have moved. Let’s get you back on track.'}
      </p>
      <div className="reveal mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-hover px-4 py-2.5 text-sm font-medium text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
        >
          <ArrowLeft size={14} /> Back home
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-subtle transition-colors hover:border-line-strong hover:text-fg"
        >
          <BookOpen size={14} /> Read the blog
        </Link>
      </div>
    </section>
  )
}
