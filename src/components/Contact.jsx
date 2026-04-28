import { useState, useRef, useEffect } from 'react'
import { Send, Github, Linkedin, Twitter, Mail, CheckCircle } from 'lucide-react'

export default function Contact({ data }) {
  const { personal, social } = data
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.c-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('c-revealed'), i * 80)
            })
            obs.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    // Placeholder: integrate with your email service (Resend, EmailJS, etc.)
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  const field = 'w-full px-4 py-3 rounded-xl bg-ink-100 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-800 dark:text-ink-200 placeholder-ink-400 dark:placeholder-ink-600 font-body text-sm focus:outline-none focus:border-accent-400 dark:focus:border-accent-500 focus:ring-2 focus:ring-accent-400/20 transition-all'

  return (
    <section id="contact" ref={sectionRef} className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="c-reveal opacity-0 translate-y-6 transition-all duration-500 mb-16">
          <div className="font-mono text-xs text-accent-500 tracking-widest uppercase mb-3">04 / contact</div>
          <h2 className="font-display font-700 text-4xl sm:text-5xl text-ink-950 dark:text-ink-50 tracking-tight">
            Let's build something<br />
            <span className="text-ink-400 dark:text-ink-600">worth remembering.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="c-reveal opacity-0 translate-y-6 transition-all duration-500">
              <p className="font-body text-base text-ink-500 dark:text-ink-400 leading-relaxed">
                Whether you have a project in mind, a collaboration idea, or just want to say hello — my inbox is always open.
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 mt-4 font-body text-sm text-accent-500 hover:text-accent-600 transition-colors"
              >
                <Mail size={14} />
                {personal.email}
              </a>
            </div>

            <div className="c-reveal opacity-0 translate-y-6 transition-all duration-500">
              <div className="font-display font-600 text-sm uppercase tracking-widest text-ink-400 dark:text-ink-500 mb-4">Find me on</div>
              <div className="flex flex-col gap-3">
                {[
                  { href: social.github, Icon: Github, label: 'GitHub', handle: '@uzairafridi00' },
                  { href: social.linkedin, Icon: Linkedin, label: 'LinkedIn', handle: 'in/uzair-afridi00' },
                  { href: social.twitter, Icon: Twitter, label: 'Twitter', handle: '@uzair__afridi' },
                ].map(({ href, Icon, label, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-ink-200 dark:border-ink-800 hover:border-ink-400 dark:hover:border-ink-600 hover:bg-ink-50 dark:hover:bg-ink-900 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-ink-100 dark:bg-ink-800 flex items-center justify-center group-hover:bg-accent-500/10 transition-colors">
                      <Icon size={15} className="text-ink-500 dark:text-ink-400 group-hover:text-accent-500" />
                    </div>
                    <div>
                      <div className="font-body text-sm font-medium text-ink-800 dark:text-ink-200">{label}</div>
                      <div className="font-mono text-xs text-ink-400 dark:text-ink-600">{handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3 c-reveal opacity-0 translate-y-6 transition-all duration-500">
            {status === 'sent' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
                <CheckCircle size={48} className="text-emerald-500" />
                <h3 className="font-display font-600 text-xl text-ink-950 dark:text-ink-50">Message received!</h3>
                <p className="font-body text-sm text-ink-500 dark:text-ink-400">I'll get back to you as soon as possible.</p>
                <button onClick={() => setStatus('idle')} className="mt-2 text-sm text-accent-500 hover:text-accent-600 font-body">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`${field} ${errors.name ? 'border-red-400 dark:border-red-600' : ''}`}
                    aria-label="Your name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500 font-body">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`${field} ${errors.email ? 'border-red-400 dark:border-red-600' : ''}`}
                    aria-label="Your email"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500 font-body">{errors.email}</p>}
                </div>

                <div>
                  <textarea
                    rows={7}
                    placeholder="What's on your mind?"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`${field} resize-none ${errors.message ? 'border-red-400 dark:border-red-600' : ''}`}
                    aria-label="Your message"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500 font-body">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink-950 dark:bg-ink-50 text-ink-50 dark:text-ink-950 font-body font-medium text-sm hover:bg-ink-800 dark:hover:bg-ink-200 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-ink-950/15"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center font-body text-xs text-ink-400 dark:text-ink-600">
                  ✦ I typically respond within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .c-revealed { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </section>
  )
}
