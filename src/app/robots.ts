import type { MetadataRoute } from 'next'

const BASE_URL = 'https://felipefigueiredo.dev'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/studio'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
