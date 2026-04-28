import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import SelectedWork from '@/components/sections/SelectedWork'
import Contact from '@/components/sections/Contact'
import { getFeaturedProjects, getSiteSettings } from '@/lib/sanity'

export const revalidate = 60

export default async function HomePage() {
  const [projects, siteSettings] = await Promise.all([
    getFeaturedProjects(),
    getSiteSettings(),
  ])

  return (
    <>
      <Hero openToWork={siteSettings?.openToWork ?? false} />
      <About />
      <SelectedWork projects={projects} />
      <Contact />
    </>
  )
}
