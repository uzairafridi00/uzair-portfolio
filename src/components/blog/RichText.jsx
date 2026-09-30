import { Link } from 'react-router-dom'

// Inline markup for post text: **bold**, *italic*, `code`, [label](url).
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g

function renderToken(token, key) {
  if (token.startsWith('**')) return <strong key={key} className="font-semibold text-fg">{token.slice(2, -2)}</strong>
  if (token.startsWith('`'))
    return (
      <code key={key} className="rounded border border-line bg-hover px-1.5 py-0.5 font-mono text-[0.86em] text-fg-2">
        {token.slice(1, -1)}
      </code>
    )
  if (token.startsWith('[')) {
    const [, label, href] = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    const cls = 'text-fg underline decoration-faint underline-offset-[3px] transition-colors hover:decoration-fg'
    return href.startsWith('/') ? (
      <Link key={key} to={href} className={cls}>{label}</Link>
    ) : (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>
    )
  }
  return <em key={key}>{token.slice(1, -1)}</em>
}

export default function RichText({ text }) {
  return text.split(TOKEN).map((part, i) => (i % 2 ? renderToken(part, i) : part))
}
