import { useState } from 'react'
import { ArrowUpRight, Clock, FileText, Mail, MapPin, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Contact({ data }) {
  const { personal, social, integrations } = data
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const rows = [
    { href: `mailto:${personal.email}`, Icon: Mail, title: personal.email, sub: 'Quick inquiries & questions' },
    { href: social.linkedin, Icon: LinkedinIcon, title: 'Connect on LinkedIn', sub: 'Professional network & updates' },
    { href: social.github, Icon: GithubIcon, title: 'Follow on GitHub', sub: 'Open-source work & experiments' },
    { href: `${import.meta.env.BASE_URL}${personal.cvUrl}`, Icon: FileText, title: 'Download my CV', sub: 'Full experience & education' },
  ]

  const subject = `Portfolio inquiry from ${form.name}`
  const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `${form.message}\n\n${form.name}\n${form.email}`
  )}`

  // Web3Forms emails the message to you (no backend needed). Without a key, fall back to the visitor's mail app.
  const handleSubmit = async e => {
    e.preventDefault()
    if (!integrations.web3formsKey) {
      window.location.href = mailto
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: integrations.web3formsKey, subject, from_name: form.name, replyto: form.email, ...form }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message)
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
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
              Prefer to write? Drop me a message here and I&apos;ll get back to you by email.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-2.5">
            <input type="text" name="name" placeholder="Full Name" required value={form.name} onChange={update('name')} className="field" />
            <input type="email" name="email" placeholder="Email Address" required value={form.email} onChange={update('email')} className="field" />
            <textarea name="message" rows={5} placeholder="Your Message" required value={form.message} onChange={update('message')} className="field min-h-32 flex-1 resize-none" />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-line bg-hover px-4 py-2.5 text-sm font-medium text-fg-2 transition-colors duration-200 hover:border-line-strong hover:text-fg disabled:cursor-wait disabled:opacity-60"
            >
              <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
              <Send size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <p role="status" className="text-center text-xs text-faint empty:hidden">
              {status === 'sent' && 'Thanks! Your message is on its way.'}
              {status === 'error' && (
                <>Couldn&apos;t send that. Please <a href={mailto} className="underline underline-offset-2 hover:text-fg">email me directly</a>.</>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
