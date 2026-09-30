import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import Tooltip from './Tooltip'
import { GithubIcon, LinkedinIcon, XIcon } from './Icons'

export default function Footer({ data }) {
  const { personal, social } = data
  const [first, ...rest] = personal.name.split(' ')

  const links = [
    { label: 'X (Twitter)', href: social.twitter, Icon: XIcon },
    { label: 'LinkedIn', href: social.linkedin, Icon: LinkedinIcon },
    { label: 'Email', href: `mailto:${personal.email}`, Icon: Mail },
    { label: 'GitHub', href: social.github, Icon: GithubIcon },
  ]

  return (
    <footer className="mt-16 border-t border-line sm:mt-20">
      <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-6 px-4 py-6 sm:py-8 md:flex-row lg:px-0">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
          <p className="text-xs text-faint sm:text-sm">
            &copy; {new Date().getFullYear()} {first}
            <span className="md:hidden"> {rest.join(' ')}</span>.
          </p>
          <div className="hidden h-4 w-px bg-line md:block" />
          <div className="flex items-center gap-5 sm:gap-6">
            {[
              ['Projects', '/#projects'],
              ['Experience', '/#experience'],
              ['Blog', '/blog'],
              ['Contact', '/#contact'],
            ].map(([label, to]) => (
              <Link key={label} to={to} className="text-xs text-subtle transition-colors duration-200 hover:text-fg sm:text-sm">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-4 sm:gap-5">
          {links.map(({ label, href, Icon }) => (
            <Tooltip key={label} label={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex text-subtle transition-colors duration-200 hover:text-fg"
              >
                <Icon size={17} />
              </a>
            </Tooltip>
          ))}
        </div>
      </div>
    </footer>
  )
}
