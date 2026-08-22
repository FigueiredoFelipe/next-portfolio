import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/sanity'
import ProjectCard from '@/components/projects/ProjectCard'
import AnimatedSection from '@/components/UI/AnimatedSection'
import type { Project } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects',
  description: 'All projects built by Felipe Figueiredo — Fullstack Developer.',
}

/**
 * An odd count leaves a hole in a two-column grid. Widening the *first* card
 * fills it and puts the lead project at the largest size on the page — the
 * ordering already says which one that is. Widening the last one would give the
 * hero treatment to the weakest entry.
 */
function Grid({ projects, offset = 0 }: { projects: Project[]; offset?: number }) {
  const leadIsWide = projects.length % 2 === 1

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, i) => (
        <AnimatedSection
          key={project._id}
          delay={(offset + i) * 0.07}
          className={leadIsWide && i === 0 ? 'md:col-span-2' : undefined}
        >
          <ProjectCard project={project} />
        </AnimatedSection>
      ))}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-6 font-light">
      {children}
    </p>
  )
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  /**
   * Two tiers, stated out loud.
   *
   * A flat grid gives a contract-review engine and a to-do list the same visual
   * weight, which is the page asserting they are the same kind of thing. The
   * reader believes it and averages. Naming the tiers withdraws the claim —
   * nothing is hidden, it just stops competing with the work that carries the
   * argument.
   */
  const selected = projects.filter((p) => p.featured)
  const earlier = projects.filter((p) => !p.featured)

  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      <AnimatedSection>
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4 font-light">
          All Projects
        </p>
        <h1 className="font-display font-light text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-12">
          Things I&apos;ve built.
        </h1>
      </AnimatedSection>

      {projects.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No projects yet.</p>
      ) : (
        <>
          {selected.length > 0 && (
            <>
              <AnimatedSection>
                <SectionLabel>Selected Work</SectionLabel>
              </AnimatedSection>
              <Grid projects={selected} />
            </>
          )}

          {earlier.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[var(--border)]">
              <AnimatedSection>
                <SectionLabel>Earlier &amp; smaller builds</SectionLabel>
                <p className="text-sm text-[var(--text-secondary)] max-w-prose mb-8 -mt-2">
                  Practice projects from when I was learning the stack. Kept here
                  because the trail is part of the story.
                </p>
              </AnimatedSection>
              <Grid projects={earlier} offset={selected.length} />
            </div>
          )}
        </>
      )}
    </section>
  )
}
