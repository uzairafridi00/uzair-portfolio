import blogs from '../data/blogs.json'

const WORDS_PER_MINUTE = 220

function blockText(block) {
  if (block.type === 'list') return block.items.join(' ')
  if (block.type === 'code') return block.code
  return block.text ?? ''
}

export function readingTime(post) {
  const words = post.content.map(blockText).join(' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

export function formatDate(iso, style = 'long') {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

// Published posts, newest first.
export const posts = blogs.posts
  .filter(p => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export const getPost = slug => posts.find(p => p.slug === slug)
