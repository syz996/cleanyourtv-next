import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { allGuides } from '@/lib/guides'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: '2026-11-02',
      changeFrequency: 'daily',
      priority: 1,
    },
    ...allGuides.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: g.updated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}