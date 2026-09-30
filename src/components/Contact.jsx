import { useState } from 'react'
import { ArrowUpRight, Clock, FileText, Mail, MapPin, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Contact({ data }) {
  const { personal, social } = data
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const rows = [
    { href: `mailto:${personal.email}`, Icon: Mail, title: personal.email, sub: 'Quick inquiries & questions' },
    { href: social.linkedin, Icon: LinkedinIcon, title: 'Connect on LinkedIn', sub: 'Professional network & updates' },
    { href: social.github, Icon: GithubIcon, title: 'Follow on GitHub', sub: 'Open-source work & experiments' },
    { href: `${import.meta.env.BASE_URL}${personal.cvUrl}`, Icon: FileText, title: 'Download my CV', sub: 'Full experience & education' },
  ]

  // No backend: hand the message to the visitor's mail client, pre-filled.
  const handleSubmit = e => {
    e.preventDefault()
    const subject = `Portfolio inquiry from ${form.name}`
    const body = `${form.message}\n\n${form.name}\n${form.email}`
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const update = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <section id="contact" className="mt-24 scroll-mt-20">
      <h2 className="section-label reveal">Let&apos;s Work Together</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="card reveal flex flex-col px-6 py-5">
          <div className="mb-4 sm:mb-5">
            <h3 className="mb-1.5 text-lg font-medium text-fg-2">Get in Touch</h3>
            <p className="text-sm leading-[1.6] text-muted">
              Have a project, a collaboration idea, or just want to say hello? Pick whichever channel suits you.
            </p>
          </div>
          <div className="-mx-6 divide-y divide-line border-y border-line">
            {rows.map(({ href, Icon, title, sub }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-6 py-3.5 transition-colors duration-150 hover:bg-hover"
              >
                <Icon size={18} className="shrink-0 text-faint transition-colors group-hover:text-subtle" />
                <div className="min-w-0 flex-1">
                  <p className="mb-0.5 truncate text-xs font-medium text-fg-2 sm:text-sm">{title}</p>
                  <p className="text-[10px] text-faint sm:text-xs">{sub}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-faint transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
          <div className="mt-auto space-y-2.5 pt-5">
            <div className="flex items-center gap-2.5 text-xs text-faint">
              <Clock size={14} />
              <span>Typically replies within 24 hours</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-faint">
              <MapPin size={14} />
              <span>Based in {personal.location}</span>
            </div>
          </div>
        </div>

        <div className="card reveal flex flex-col px-6 py-5">
          <div className="mb-4">
            <h3 className="mb-1.5 text-base font-medium text-fg-2 sm:text-lg">Send a Message</h3>
            <p className="text-sm leading-[1.6] text-muted">
              Prefer to write? Fill this out and it opens in your email app, ready to send.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-2.5">
            <input type="text" name="name" placeholder="Full Name" required value={form.name} onChange={update('name')} className="field" />
            <input type="email" name="email" placeholder="Email Address" required value={form.email} onChange={update('email')} className="field" />
            <textarea name="message" rows={5} placeholder="Your Message" required value={form.message} onChange={update('message')} className="field min-h-32 flex-1 resize-none" />
            <button
              type="submit"
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-line bg-hover px-4 py-2.5 text-sm font-medium text-fg-2 transition-colors duration-200 hover:border-line-strong hover:text-fg"
            >
              <span>Send Message</span>
              <Send size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
