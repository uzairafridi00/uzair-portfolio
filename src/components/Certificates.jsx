import { useEffect, useState } from 'react'
import { Maximize2, X } from 'lucide-react'
import { asset } from '../lib/asset'

function Lightbox({ cert, onClose }) {
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-lg p-2 text-[#a0a0a0] transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={20} />
      </button>
      <figure onClick={e => e.stopPropagation()} className="flex max-h-full max-w-4xl flex-col items-center gap-3">
        <img src={asset(cert.image)} alt={cert.title} className="max-h-[80vh] w-auto rounded-lg object-contain" />
        <figcaption className="text-center text-sm text-[#b2b2b2]">
          <span className="font-medium text-[#f0f0f0]">{cert.title}</span> &middot; {cert.issuer} &middot; {cert.date}
        </figcaption>
      </figure>
    </div>
  )
}

export default function Certificates({ data }) {
  const [open, setOpen] = useState(null)
  const { certificates } = data
  if (!certificates?.length) return null

  return (
    <section id="certificates" className="mt-20 scroll-mt-20">
      <h2 className="section-label reveal">Certificates</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {certificates.map(cert => (
          <button
            key={cert.id}
            onClick={() => setOpen(cert)}
            className="card reveal group flex items-center gap-4 p-3 text-left hover:bg-hover"
          >
            <div className="relative h-16 w-[5.5rem] shrink-0 overflow-hidden rounded-lg border border-line bg-hover">
              <img src={asset(cert.image)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 size={14} />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[13.5px] font-medium leading-snug tracking-tight text-fg sm:text-[14px]">{cert.title}</h3>
              <p className="mt-1 truncate text-[12px] text-faint sm:text-[12.5px]">
                {cert.issuer} &middot; <span className="tabular-nums">{cert.date}</span>
              </p>
            </div>
          </button>
        ))}
      </div>
      {open && <Lightbox cert={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
