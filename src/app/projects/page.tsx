import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/sanity'
import ProjectCard from '@/components/projects/ProjectCard'
import AnimatedSection from '@/components/UI/AnimatedSection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects',
  description: 'All projects built by Felipe Figueiredo — Fullstack Developer.',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      <AnimatedSection>
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4 font-light">
          All Projects
        </p>
        <h1 className="font-display font-light text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-10">
          Things I&apos;ve built.
        </h1>
      </AnimatedSection>

      {projects.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No projects yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project._id} delay={i * 0.07}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </section>
  )
}
