import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import portfolio from '../data/portfolio.json'
import Hero from '../components/Hero'
import GitHubStats from '../components/GitHubStats'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Certificates from '../components/Certificates'
import Contact from '../components/Contact'
import PostList from '../components/blog/PostList'
import { posts } from '../lib/blog'
import { usePageTitle } from '../hooks/usePageTitle'

function RecentPosts() {
  if (!posts.length) return null
  return (
    <section id="writing" className="mt-20 scroll-mt-20">
      <div className="reveal mb-4 flex items-baseline justify-between gap-3">
        <h2 className="section-label mb-0">Recent Writing</h2>
        <Link to="/blog" className="inline-flex items-center gap-1 text-xs text-faint transition-colors hover:text-fg">
          All posts <ArrowRight size={12} />
        </Link>
      </div>
      <PostList posts={posts.slice(0, 3)} />
    </section>
  )
}

export default function Home() {
  usePageTitle(null)
  return (
    <>
      <Hero data={portfolio} />
      <GitHubStats username={portfolio.personal.githubUser} />
      <Projects data={portfolio} />
      <Experience data={portfolio} />
      <Skills data={portfolio} />
      <Certificates data={portfolio} />
      <RecentPosts />
      <Contact data={portfolio} />
    </>
  )
}
