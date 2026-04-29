# ML / AI Engineer Portfolio

> A modern, minimalistic portfolio website for Machine Learning & AI Engineers — built with **React 18 + Vite + Tailwind CSS**.

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

Live Preview: https://uzairafridi00.github.io/uzair-portfolio/

---

## Table of Contents

- [Quick Start](#quick-start)
- [Folder Structure](#folder-structure)
- [Customising Content](#customising-content)
- [Features](#features)
- [Theming & Design Tokens](#theming--design-tokens)
- [npm Scripts](#npm-scripts)
- [Deployment](#deployment)
- [Dependencies](#dependencies)

---

## Quick Start

```bash
# 1. Unzip the project
unzip portfolio-ml-ai.zip && cd portfolio

# 2. Install dependencies (Node 18+ required)
npm install

# 3. Start dev server → http://localhost:5173
npm run dev

# 4. Build for production
npm run build
```

---

## Folder Structure

```
portfolio/
│
├── index.html                  # Entry HTML — Google Fonts loaded here
├── vite.config.js              # Vite build configuration
├── tailwind.config.js          # Tailwind theme — fonts, colors, keyframes
├── postcss.config.js           # PostCSS plugins (Tailwind + Autoprefixer)
├── package.json                # Dependencies and npm scripts
│
├── public/
│   ├── favicon.svg             # SVG favicon
│   └── alex-chen-cv.pdf        # CV file — replace with your own
│
└── src/
    ├── main.jsx                # React root — mounts <App /> into DOM
    ├── App.jsx                 # Root component — wires theme + all sections
    ├── index.css               # Tailwind directives + global base styles
    │
    ├── data/
    │   └── portfolio.json      # ★ Single source of truth for all content
    │
    ├── hooks/
    │   ├── useTheme.js         # Dark/light mode toggle + localStorage persist
    │   └── useScrollSpy.js     # Active nav link via IntersectionObserver
    │
    └── components/
        ├── Navbar.jsx          # Sticky nav, hamburger menu, CV download button
        ├── Hero.jsx            # Landing section with animated particle canvas
        ├── About.jsx           # Bio, experience timeline, tech stack badges
        ├── Projects.jsx        # Filterable project grid (All / Featured)
        ├── ProjectCard.jsx     # Reusable single project card component
        ├── Contact.jsx         # Validated contact form + social links
        └── Footer.jsx          # Copyright notice + social icon links
```

---

## Customising Content

**Everything is driven by `src/data/portfolio.json` — you never need to touch a component to update your info.**

### `personal`

```json
{
  "personal": {
    "name":     "Alex Chen",
    "title":    "ML / AI Engineer",
    "tagline":  "I build systems that learn, reason, and solve real problems.",
    "bio":      "Your longer bio paragraph here...",
    "location": "San Francisco, CA",
    "email":    "alex@example.com",
    "cvUrl":    "/alex-chen-cv.pdf"
  }
}
```

| Field | Used in |
|---|---|
| `name` | Navbar logo, Hero heading, Footer |
| `title` | Hero monospace badge |
| `tagline` | Hero subtitle |
| `bio` | About section paragraph |
| `location` | About section (with pin icon) |
| `email` | Contact section mailto link |
| `cvUrl` | Navbar "Download CV" button |

---

### `social`

```json
{
  "social": {
    "github":   "https://github.com/yourhandle",
    "linkedin": "https://linkedin.com/in/yourhandle",
    "twitter":  "https://twitter.com/yourhandle"
  }
}
```

Used in: Navbar, Contact section, Footer.

---

### `experience[]`

Array of work history objects rendered as a vertical timeline in the About section.

```json
{
  "role":      "Senior ML Engineer",
  "company":   "Anthropic",
  "period":    "2022 – Present",
  "highlight": "RLHF pipelines & alignment research infrastructure"
}
```

---

### `skills`

```json
{
  "skills": {
    "domains": ["Large Language Models", "Computer Vision", "..."],
    "stack": [
      { "name": "PyTorch", "category": "ml" },
      { "name": "Docker",  "category": "infra" }
    ]
  }
}
```

**Category → badge colour mapping:**

| `category` | Badge colour |
|---|---|
| `lang` | Violet |
| `ml` | Blue |
| `llm` | Amber |
| `infra` | Emerald |
| `cloud` | Sky |
| `tools` | Rose |

---

### `projects[]`

Each object renders as a `ProjectCard`. All fields:

```json
{
  "id":          1,
  "title":       "NeuralSearch",
  "description": "Semantic search engine powered by bi-encoder retrieval...",
  "tags":        ["PyTorch", "FAISS", "FastAPI"],
  "github":      "https://github.com/yourhandle/neuralsearch",
  "demo":        "https://demo.example.com",
  "featured":    true
}
```

| Field | Notes |
|---|---|
| `id` | Unique integer |
| `tags` | Shown as monospace badges on each card |
| `github` | Always shown |
| `demo` | Set to `null` to hide the Live Demo link |
| `featured` | Shows orange "Featured" chip; affects the filter tab count |

---

## Features

### Dark Mode
- Toggle button in the Navbar (sun / moon icon)
- Persists to `localStorage` key `"theme"`
- On first visit, reads `prefers-color-scheme` from the OS
- Implemented via Tailwind `darkMode: "class"` + `document.documentElement.classList`

### Scroll Animations
- **Hero**: CSS keyframe `fade-up` with staggered `animation-delay` per element
- **About / Projects / Contact**: `IntersectionObserver` adds a `revealed` class when sections enter the viewport
- Children within each section are staggered using `setTimeout` offsets

### Active Nav Highlighting
`useScrollSpy` watches all section IDs with `IntersectionObserver` using `rootMargin: "-40% 0px -55% 0px"`. The currently visible section ID drives the highlighted nav button style.

### Particle Canvas (Hero)
A `<canvas>` fills the hero background. 55 particles drift slowly and draw connecting lines to neighbours within 100px. Particle colour adapts automatically to dark / light mode by reading `document.documentElement.classList`.

### Contact Form
- Client-side validation: required name, valid email format, non-empty message
- Inline per-field error messages
- Spinner state during submission
- Success confirmation view after send
- **The submit handler is a placeholder** — wire it to your email provider:

```js
// Contact.jsx — replace the setTimeout in handleSubmit with:
await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { Authorization: "Bearer YOUR_RESEND_KEY", "Content-Type": "application/json" },
  body: JSON.stringify({
    from: "portfolio@yourdomain.com",
    to:   "you@yourdomain.com",
    subject: `Portfolio message from ${form.name}`,
    text: form.message,
  }),
})
```

---

## Theming & Design Tokens

All tokens live in `tailwind.config.js` under `theme.extend`.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `ink.50` | `#f7f6f3` | Light mode page background |
| `ink.950` | `#251f1c` | Dark mode page background |
| `accent.400` | `#f0a05a` | Hover highlights |
| `accent.500` | `#e8853a` | Primary CTAs, icons, links |
| `accent.600` | `#d4692a` | Pressed / hover on accent elements |

### Typography

| Role | Font | Weights |
|---|---|---|
| Display / Headings | **Syne** | 400 – 800 |
| Body text | **DM Sans** | 300, 400, 500 |
| Code / Badges | **JetBrains Mono** | 400, 500 |

All loaded via Google Fonts in `index.html`. To swap fonts:
1. Update the `<link>` in `index.html`
2. Update the `fontFamily` keys in `tailwind.config.js`

---

## npm Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server on `http://localhost:5173` with HMR |
| `npm run build` | Production build output to `/dist` (minified, tree-shaken) |
| `npm run preview` | Serve the `/dist` build locally to verify before deploying |

---

## Deployment

### Vercel _(recommended)_
1. Push repo to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Framework preset: **Vite** — no config needed
4. Build command: `npm run build` · Output dir: `dist`

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add `public/_redirects`:
   ```
   /* /index.html 200
   ```

### GitHub Pages
```bash
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Then:
npm run build && npm run deploy
```

---

## Dependencies

### Runtime

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | DOM renderer |
| `lucide-react` | ^0.383.0 | Icon set (GitHub, LinkedIn, Moon, etc.) |

### Dev Only

| Package | Purpose |
|---|---|
| `vite` + `@vitejs/plugin-react` | Build tool + React plugin |
| `tailwindcss` + `postcss` + `autoprefixer` | Utility CSS pipeline |
| `@types/react` + `@types/react-dom` | TypeScript type hints |

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A modern browser (Chrome, Firefox, Edge, Safari)

---

## License

MIT © 2026 Alex Chen — free to use and modify for your own portfolio.
