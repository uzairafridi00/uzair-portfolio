import { useEffect, useRef } from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'

export default function Hero({ data }) {
  const { personal } = data
  const canvasRef = useRef(null)

  // Animated particle field
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isDark = document.documentElement.classList.contains('dark')
      const color = isDark ? '255,255,255' : '30,20,15'

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`
        ctx.fill()

        // Draw lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${color}, ${0.08 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40"
        aria-hidden="true"
      />

      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-400/15 dark:bg-accent-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-ink-300/20 dark:bg-ink-700/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-100 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-300 text-xs font-mono mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <Sparkles size={12} className="text-accent-500" />
            Available for new opportunities
          </div>

          {/* Heading */}
          <h1 className="font-display font-800 text-5xl sm:text-6xl md:text-7xl leading-none tracking-tight text-ink-950 dark:text-ink-50 mb-5 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {personal.name}
            <span className="block text-accent-500">.</span>
          </h1>

          {/* Title */}
          <div className="font-mono text-sm sm:text-base text-ink-400 dark:text-ink-500 mb-5 tracking-widest uppercase opacity-0 animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            {personal.title}
          </div>

          {/* Tagline */}
          <p className="font-body text-xl sm:text-2xl text-ink-600 dark:text-ink-400 font-light leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {personal.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-xl bg-ink-950 dark:bg-ink-50 text-ink-50 dark:text-ink-950 font-body font-medium text-sm hover:bg-ink-800 dark:hover:bg-ink-200 transition-all duration-200 hover:shadow-lg hover:shadow-ink-950/20 dark:hover:shadow-ink-50/10 hover:-translate-y-0.5"
            >
              View Projects
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-xl border border-ink-300 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-body font-medium text-sm hover:border-ink-500 dark:hover:border-ink-500 hover:bg-ink-50 dark:hover:bg-ink-900 transition-all duration-200 hover:-translate-y-0.5"
            >
              Contact Me
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-16 opacity-0 animate-fade-up" style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}>
            {[
              { num: '5+', label: 'Years Experience' },
              { num: '30+', label: 'Projects Shipped' },
              { num: '10M+', label: 'Records Processed' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-display font-700 text-2xl text-ink-950 dark:text-ink-50">{num}</div>
                <div className="font-body text-xs text-ink-400 dark:text-ink-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-ink-400 dark:text-ink-600 hover:text-ink-600 dark:hover:text-ink-400 transition-colors group"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-xs tracking-widest uppercase">scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  )
}
