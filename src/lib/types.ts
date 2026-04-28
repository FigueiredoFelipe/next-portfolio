export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  coverImage?: SanityImage
  summary?: string
  body?: unknown[]
  techs?: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  order?: number
}

export interface SiteSettings {
  openToWork: boolean
}
