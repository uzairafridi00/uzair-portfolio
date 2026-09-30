# Uzair Afridi · Portfolio

Personal site and blog, built with **React 18 + Vite + Tailwind CSS** and deployed to GitHub Pages.

Live: https://uzairafridi00.github.io/uzair-portfolio/

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173/uzair-portfolio/
npm run build    # production build in dist/ (also writes dist/404.html)
npm run deploy   # build + publish dist/ to the gh-pages branch
```

## Where things live

| What | File |
|------|------|
| Profile, projects, experience, skills, certificates | `src/data/portfolio.json` |
| Blog posts | `src/data/blogs.json` |
| CV (linked from the site) | `public/muhammad_uzair_afridi_cv.pdf` |
| Certificate images | `public/certificates/` |
| Colors (light + dark) | CSS variables at the top of `src/index.css` |

Pages: `/` (home), `/blog`, `/blog/:slug`, and a 404 page for everything else.
GitHub stats and the contribution graph are fetched live from the GitHub API
and a public contributions proxy, using `personal.githubUser`.

## Writing a blog post

Add an object to the `posts` array in `src/data/blogs.json`:

```json
{
  "slug": "serving-llms-with-vllm",
  "title": "Serving LLMs with vLLM",
  "date": "2026-10-01",
  "summary": "One or two sentences shown on the blog index.",
  "tags": ["vLLM", "Inference"],
  "cover": "blog/vllm-cover.png",
  "draft": false,
  "content": [
    { "type": "paragraph", "text": "Supports **bold**, *italic*, `code` and [links](https://example.com)." },
    { "type": "heading", "text": "A section" },
    { "type": "heading", "level": 3, "text": "A subsection" },
    { "type": "list", "items": ["One", "Two"] },
    { "type": "list", "ordered": true, "items": ["First", "Second"] },
    { "type": "code", "language": "python", "code": "print('hello')" },
    { "type": "quote", "text": "A memorable line.", "cite": "Someone" },
    { "type": "callout", "text": "A note or warning." },
    { "type": "image", "src": "blog/diagram.png", "alt": "Diagram", "caption": "Optional caption" },
    { "type": "divider" }
  ]
}
```

- `slug` becomes the URL: `/blog/serving-llms-with-vllm`. Keep it unique.
- `cover` and image `src` are paths inside `public/` (or full URLs). Both are optional.
- `"draft": true` hides a post from the site.
- Posts are sorted by `date`, newest first; reading time is calculated automatically.
- In `code` blocks, write line breaks as `\n`.

The included post, `writing-posts-for-this-blog`, shows every block type. Delete it
or set it to draft once you publish your own.
