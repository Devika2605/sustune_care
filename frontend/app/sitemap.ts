import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/aegis', '/sparsh', '/portal-preview', '/contact', '/about', '/privacy', '/terms'].map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: 'monthly', priority: p === '' ? 1 : 0.7 }))
}
