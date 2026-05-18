import type { MetadataRoute } from 'next'
import { getAllProjectSlugs } from '@/lib/sanity'

const BASE_URL = 'https://felipefigueiredodev.vercel.app'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProjectSlugs()

  const projectUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/projects`, lastModified: new Date() },
    { url: `${BASE_URL}/writing/token-optimization`, lastModified: new Date() },
    ...projectUrls,
  ]
}
