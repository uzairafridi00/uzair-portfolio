import { Moon, Sun } from 'lucide-react'

const links = [
  { href: '#home', label: 'Home', hideOnMobile: true },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ dark, toggleDark }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-bg [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
      />
      <div className="relative mx-auto w-full max-w-page px-6 lg:px-0">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="no-scrollbar flex items-center gap-4 overflow-x-auto sm:gap-6">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={`${l.hideOnMobile ? 'hidden sm:inline-block' : ''} relative shrink-0 text-[13px] text-subtle transition-colors after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:text-fg sm:text-sm md:hover:after:w-full`}
              >
                {l.label}
              </a>
            ))}
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
