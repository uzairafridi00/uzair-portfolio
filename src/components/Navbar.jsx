import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'

const links = [
  { to: '/', label: 'Home', isActive: ({ pathname, hash }) => pathname === '/' && hash !== '#contact' },
  { to: '/blog', label: 'Blog', isActive: ({ pathname }) => pathname.startsWith('/blog') },
  { to: '/#contact', label: 'Contact', isActive: ({ pathname, hash }) => pathname === '/' && hash === '#contact' },
]

export default function Navbar({ dark, toggleDark }) {
  const location = useLocation()

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-bg [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
      />
      <div className="relative mx-auto w-full max-w-page px-6 lg:px-0">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-5 md:gap-6">
            {links.map(l => {
              const active = l.isActive(location)
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={active ? 'page' : undefined}
                  className={`relative text-sm transition-colors after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all md:hover:after:w-full ${
                    active ? 'text-fg' : 'text-subtle hover:text-fg'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
          <button
            onClick={toggleDark}
            aria-label="Toggle theme"
            className="shrink-0 cursor-pointer py-2 text-subtle transition-colors hover:text-fg"
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
