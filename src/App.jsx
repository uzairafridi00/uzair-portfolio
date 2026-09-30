import { useTheme } from './hooks/useTheme'
import { useReveal } from './hooks/useReveal'
import portfolio from './data/portfolio.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'

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

  return (
    <div className="relative min-h-screen font-sans">
      <GridBackground />
      <Navbar dark={dark} toggleDark={toggle} />
      <main className="relative z-10 mx-auto w-full max-w-page px-6 lg:px-0">
        <Hero data={portfolio} />
        <Projects data={portfolio} />
        <Experience data={portfolio} />
        <Certificates data={portfolio} />
        <Contact data={portfolio} />
      </main>
      <Footer data={portfolio} />
    </div>
  )
}
