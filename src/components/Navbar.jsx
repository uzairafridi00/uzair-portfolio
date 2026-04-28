import { useState, useEffect } from 'react'
import { Github, Linkedin, Twitter, Menu, X, Moon, Sun, Download } from 'lucide-react'
import { useScrollSpy } from '../hooks/useScrollSpy'

const NAV_ITEMS = ['home', 'about', 'projects', 'contact']

export default function Navbar({ dark, toggleDark, data }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(NAV_ITEMS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-ink-50/90 dark:bg-ink-950/90 backdrop-blur-md border-b border-ink-200/60 dark:border-ink-800/60'
          : 'bg-transparent'
        }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="font-display font-700 text-lg tracking-tight text-ink-950 dark:text-ink-50"
          aria-label="Go to top"
        >
          <span className="text-accent-500">_</span>uzair
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(id => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`px-4 py-2 text-sm font-body font-medium capitalize rounded-lg transition-all duration-200 ${active === id
                    ? 'text-ink-950 dark:text-ink-50 bg-ink-100 dark:bg-ink-800'
                    : 'text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800/50'
                  }`}
              >
                {id}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          <SocialLinks social={data.social} size={16} />
          <div className="w-px h-5 bg-ink-200 dark:bg-ink-700" />
          <ThemeToggle dark={dark} toggle={toggleDark} />
          <a
            href={data.personal.cvUrl}
            download
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium font-body transition-all duration-200 hover:shadow-lg hover:shadow-accent-500/30"
          >
            <Download size={14} />
            CV
          </a>
        </div>

        {/* Mobile Right */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle dark={dark} toggle={toggleDark} />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-ink-50/98 dark:bg-ink-950/98 backdrop-blur-md border-b border-ink-200 dark:border-ink-800 px-5 pb-5 pt-2">
          <ul className="flex flex-col gap-1 mb-4">
            {NAV_ITEMS.map(id => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-body font-medium capitalize rounded-lg transition-colors ${active === id
                      ? 'text-ink-950 dark:text-ink-50 bg-ink-100 dark:bg-ink-800'
                      : 'text-ink-500 dark:text-ink-400'
                    }`}
                >
                  {id}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-3 border-t border-ink-200 dark:border-ink-800">
            <SocialLinks social={data.social} size={18} />
            <a
              href={data.personal.cvUrl}
              download
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium"
            >
              <Download size={14} /> CV
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function ThemeToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800 transition-all"
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

function SocialLinks({ social, size }) {
  return (
    <div className="flex items-center gap-1">
      {[
        { href: social.github, Icon: Github, label: 'GitHub' },
        { href: social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
        { href: social.twitter, Icon: Twitter, label: 'Twitter' },
      ].map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="p-2 rounded-lg text-ink-400 dark:text-ink-500 hover:text-ink-800 dark:hover:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800 transition-all"
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  )
}
