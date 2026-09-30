import { Route, Routes } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useReveal } from './hooks/useReveal'
import { useScrollOnNavigate } from './hooks/useScrollOnNavigate'
import { useAnalytics } from './hooks/useAnalytics'
import portfolio from './data/portfolio.json'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

function GridBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden">
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="grid-pattern" width="70" height="70" patternUnits="userSpaceOnUse">
            <path d="M 70 0 L 0 0 0 70" fill="none" style={{ stroke: 'var(--grid)' }} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  )
}

export default function App() {
  const { dark, toggle } = useTheme()
  useReveal()
  useScrollOnNavigate()
  useAnalytics()

  return (
    <div className="relative min-h-screen font-sans">
      <GridBackground />
      <Navbar dark={dark} toggleDark={toggle} />
      <main className="relative z-10 mx-auto w-full max-w-page px-6 lg:px-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer data={portfolio} />
    </div>
  )
}
