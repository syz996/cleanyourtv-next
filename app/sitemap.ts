import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/install/claude-code', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/models', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/troubleshooting', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/launcher', priority: 0.6, changeFrequency: 'monthly' as const },
]
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}