import { FileText, Mail, MapPin } from 'lucide-react'
import RotatingText from './RotatingText'
import StackIcon from './StackIcon'
import Tooltip from './Tooltip'
import { GithubIcon, LinkedinIcon, XIcon } from './Icons'

const MailIcon = props => <Mail {...props} strokeWidth={1.8} />

export default function Hero({ data }) {
  const { personal, social, skills } = data

  const socials = [
    { label: 'GitHub', href: social.github, Icon: GithubIcon },
    { label: 'LinkedIn', href: social.linkedin, Icon: LinkedinIcon },
    { label: 'X (Twitter)', href: social.twitter, Icon: XIcon },
    { label: 'Email', href: `mailto:${personal.email}`, Icon: MailIcon },
  ]

  const meta = [
    { label: 'Location', Icon: MapPin, text: personal.location },
    { label: 'Email', Icon: Mail, text: personal.email, href: `mailto:${personal.email}` },
    { label: 'Resume', Icon: FileText, text: 'Download CV', href: `${import.meta.env.BASE_URL}${personal.cvUrl}`, external: true },
  ]

  const focus = skills.domains.slice(0, 3)

  return (
    <section id="home" className="pt-28 md:pt-36">
      <div className="reveal mb-7 flex items-center gap-4">
        <img
          src={personal.avatar}
          alt={personal.name}
          width="64"
          height="64"
          className="h-[60px] w-[60px] shrink-0 rounded-xl border border-line object-cover sm:h-16 sm:w-16"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-fg sm:text-3xl md:text-[2rem]">
            {personal.name}
          </h1>
          <div className="mt-0.5 text-sm text-faint sm:text-[15px]">
            <RotatingText items={personal.roles ?? [personal.title]} />
          </div>
        </div>
      </div>

      <div className="reveal mb-6 mt-10 flex flex-wrap items-start gap-x-6 gap-y-4 sm:gap-x-8">
        {meta.map(({ label, Icon, text, href, external }) => {
          const body = (
            <>
              <Icon size={15} className="shrink-0 text-faint" />
              <span className={href ? 'underline-offset-2 group-hover:underline' : ''}>{text}</span>
            </>
          )
          const cls = 'group flex items-center gap-2 text-[13.5px] font-medium text-fg-2 transition-colors sm:text-[15px]'
          return (
            <div key={label} className="space-y-1">
              <div className="meta-label">{label}</div>
              {href ? (
                <a href={href} className={`${cls} hover:text-fg`} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </div>
          )
        })}
      </div>

      <p className="reveal mb-8 text-[13.5px] font-[450] leading-[1.85] text-muted sm:text-[15px]">
        {personal.bio} Currently focused on{' '}
        {focus.map((d, i) => (
          <span key={d}>
            <span className="text-fg-2">{d}</span>
            {i < focus.length - 2 ? ', ' : i === focus.length - 2 ? ', and ' : ''}
          </span>
        ))}
        .
      </p>

      <div className="reveal flex items-center gap-4">
        {socials.map(({ label, href, Icon }) => (
          <Tooltip key={label} label={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-faint transition-colors duration-150 hover:text-fg"
            >
              <Icon size={19} />
            </a>
          </Tooltip>
        ))}
      </div>

      <div className="reveal mt-12">
        <h2 className="section-label">Tech Stack</h2>
        <div className="flex flex-wrap items-center gap-3 opacity-95 sm:gap-4">
          {skills.stack.map(item => (
            <StackIcon key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
