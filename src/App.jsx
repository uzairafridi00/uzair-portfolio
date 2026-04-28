import { useTheme } from './hooks/useTheme'
import portfolio from './data/portfolio.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { dark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 text-ink-800 dark:text-ink-200 font-body transition-colors duration-300">
      <Navbar dark={dark} toggleDark={toggle} data={portfolio} />
      <main>
        <Hero data={portfolio} />
        <About data={portfolio} />
        <Projects data={portfolio} />
        <Contact data={portfolio} />
      </main>
      <Footer data={portfolio} />
    </div>
  )
}
