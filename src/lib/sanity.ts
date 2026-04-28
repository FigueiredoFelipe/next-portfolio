import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import { groq } from 'next-sanity'
import { Project, SiteSettings, SanityImage } from './types'

export const client = createClient({
  projectId: '8yzpbmmx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)
export function urlFor(source: SanityImage) {
  return builder.image(source)
}

async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params ?? {})
  } catch (err) {
    console.error('[Sanity fetch error]', err)
    return null
  }
}

const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id, title, slug, summary, coverImage, techs, githubUrl, liveUrl, featured, order
  }
`

const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc)[0...4] {
    _id, title, slug, summary, coverImage, techs, githubUrl, liveUrl
  }
`

const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, summary, body, coverImage, techs, githubUrl, liveUrl
  }
`

const projectSlugsQuery = groq`
  *[_type == "project"]{ "slug": slug.current }
`

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{ openToWork }
`

export async function getAllProjects(): Promise<Project[]> {
  return (await sanityFetch<Project[]>(projectsQuery)) ?? []
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await sanityFetch<Project[]>(featuredProjectsQuery)) ?? []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project>(projectBySlugQuery, { slug })
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const results = await sanityFetch<{ slug: string }[]>(projectSlugsQuery)
  return results?.map(r => r.slug) ?? []
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await sanityFetch<SiteSettings>(siteSettingsQuery)
  return { openToWork: result?.openToWork ?? false }
}
