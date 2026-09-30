// Resolve a path inside public/ against the site's base URL; full URLs pass through.
export const asset = path => (/^https?:/.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`)
