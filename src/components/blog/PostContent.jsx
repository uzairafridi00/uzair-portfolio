import { useState } from 'react'
import { Check, Copy, Info } from 'lucide-react'
import RichText from './RichText'
import { asset } from '../../lib/asset'
import { headingId } from '../../lib/blog'

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <div className="card my-6 overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-widest text-faint">{language || 'code'}</span>
        <button
          onClick={copy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 text-[11.5px] text-faint transition-colors hover:text-fg"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-[1.7] text-fg-2">
        <code>{code}</code>
      </pre>
    </div>
  )
}

const text = 'text-[15px] font-[450] leading-[1.85] text-muted'

function Block({ block }) {
  switch (block.type) {
    case 'heading': {
      const H = block.level === 3 ? 'h3' : 'h2'
      return (
        <H
          id={headingId(block.text)}
          className={`${H === 'h2' ? 'mt-10 text-xl' : 'mt-8 text-[17px]'} mb-3 scroll-mt-24 font-semibold tracking-tight text-fg`}
        >
          {block.text}
        </H>
      )
    }
    case 'list': {
      const L = block.ordered ? 'ol' : 'ul'
      return (
        <L className={`${text} my-4 space-y-1.5 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'} marker:text-faint`}>
          {block.items.map((item, i) => (
            <li key={i} className="pl-1"><RichText text={item} /></li>
          ))}
        </L>
      )
    }
    case 'code':
      return <CodeBlock code={block.code} language={block.language} />
    case 'quote':
      return (
        <blockquote className="my-6 border-l-2 border-line-strong pl-5">
          <p className="text-[15.5px] italic leading-[1.8] text-fg-2"><RichText text={block.text} /></p>
          {block.cite && <cite className="mt-2 block text-[13px] not-italic text-faint">&mdash; {block.cite}</cite>}
        </blockquote>
      )
    case 'callout':
      return (
        <div className="card my-6 flex gap-3 px-4 py-3.5">
          <Info size={16} className="mt-[3px] shrink-0 text-faint" />
          <p className="text-[14px] leading-[1.75] text-muted"><RichText text={block.text} /></p>
        </div>
      )
    case 'image':
      return (
        <figure className="my-8">
          <img src={asset(block.src)} alt={block.alt ?? ''} loading="lazy" className="w-full rounded-xl border border-line" />
          {block.caption && <figcaption className="mt-2.5 text-center text-[12.5px] text-faint">{block.caption}</figcaption>}
        </figure>
      )
    case 'divider':
      return <hr className="my-10 border-line" />
    case 'paragraph':
    default:
      return <p className={`${text} my-4`}><RichText text={block.text ?? ''} /></p>
  }
}

export default function PostContent({ blocks }) {
  return (
    <div>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}
