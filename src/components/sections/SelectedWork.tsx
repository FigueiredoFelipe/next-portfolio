import Link from 'next/link'
import { Project } from '@/lib/types'
import ProjectCard from '../projects/ProjectCard'
import AnimatedSection from '../UI/AnimatedSection'

interface Props {
  projects: Project[]
}

export default function SelectedWork({ projects }: Props) {
  return (
    <section id="selected-work" className="max-w-5xl mx-auto px-6 py-20 border-t border-[var(--border)]">
      <AnimatedSection className="flex items-baseline justify-between mb-10">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] font-light">
          Selected Work
        </p>
        <Link
          href="/projects"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border-b border-transparent hover:border-[var(--text-muted)] pb-0.5"
        >
          View all →
        </Link>
      </AnimatedSection>

      {projects.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No projects yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project._id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </section>
  )
}
