import { Github, Linkedin, Twitter, Heart } from 'lucide-react'

export default function Footer({ data }) {
  const { personal, social } = data
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-200 dark:border-ink-800 py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-body text-sm text-ink-400 dark:text-ink-600 flex items-center gap-1.5">
          © {year} {personal.name} · Built with
          <Heart size={12} className="text-accent-500 fill-accent-500 mx-0.5" />
          & React
        </div>

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
              className="p-2 rounded-lg text-ink-400 dark:text-ink-600 hover:text-ink-700 dark:hover:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-all"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
