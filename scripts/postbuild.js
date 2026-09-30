// Runs after `vite build`. GitHub Pages only serves static files, so this writes:
//  - 404.html: SPA fallback for any route without its own file
//  - blog/index.html and blog/<slug>/index.html: the app shell with per-page link-preview tags
//  - rss.xml, sitemap.xml (robots.txt is skipped: crawlers only read it at the domain root)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const read = path => JSON.parse(readFileSync(path, 'utf8'))
const SITE = read('package.json').homepage // ends with '/'
const { posts: all } = read('src/data/blogs.json')
const posts = all.filter(p => !p.draft).sort((a, b) => b.date.localeCompare(a.date))
const shell = readFileSync('dist/index.html', 'utf8')

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Swap the title, description and URL in the shell's head for one page's values.
function page({ title, description, url, type = 'website' }) {
  const set = (html, pattern, value) => {
    if (!pattern.test(html)) throw new Error(`postbuild: ${pattern} not found in dist/index.html`)
    return html.replace(pattern, `$1${esc(value)}$2`)
  }
  let html = shell
  html = set(html, /(<title>)[^<]*(<\/title>)/, title)
  html = set(html, /(<meta name="description" content=")[^"]*(")/, description)
  html = set(html, /(<meta property="og:title" content=")[^"]*(")/, title)
  html = set(html, /(<meta property="og:description" content=")[^"]*(")/, description)
  html = set(html, /(<meta property="og:url" content=")[^"]*(")/, url)
  html = set(html, /(<link rel="canonical" href=")[^"]*(")/, url)
  html = set(html, /(<meta property="og:type" content=")[^"]*(")/, type)
  return html
}

function write(path, content) {
  mkdirSync(`dist/${path}`.replace(/\/[^/]*$/, ''), { recursive: true })
  writeFileSync(`dist/${path}`, content)
}

write('404.html', shell)
write('blog/index.html', page({
  title: 'Blog · Uzair Afridi',
  description: 'Notes on LLM infrastructure, RAG, inference optimization and shipping AI systems to production.',
  url: `${SITE}blog/`,
}))
for (const p of posts) {
  write(`blog/${p.slug}/index.html`, page({
    title: `${p.title} · Uzair Afridi`,
    description: p.summary,
    url: `${SITE}blog/${p.slug}/`,
    type: 'article',
  }))
}

const rfc822 = iso => new Date(`${iso}T00:00:00Z`).toUTCString()
write('rss.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>Uzair Afridi · Blog</title>
<link>${SITE}blog/</link>
<description>Notes on LLM infrastructure, RAG, inference optimization and shipping AI systems to production.</description>
${posts.map(p => `<item>
<title>${esc(p.title)}</title>
<link>${SITE}blog/${p.slug}/</link>
<guid>${SITE}blog/${p.slug}/</guid>
<pubDate>${rfc822(p.date)}</pubDate>
<description>${esc(p.summary)}</description>
</item>`).join('\n')}
</channel>
</rss>
`)

const urls = [SITE, `${SITE}blog/`, ...posts.map(p => `${SITE}blog/${p.slug}/`)]
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`)

console.log(`postbuild: ${posts.length} post page(s), rss.xml, sitemap.xml`)
