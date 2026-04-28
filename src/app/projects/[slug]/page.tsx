import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getProjectBySlug, getAllProjectSlugs, urlFor } from '@/lib/sanity'
import { SanityImage } from '@/lib/types'
import AnimatedSection from '@/components/UI/AnimatedSection'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.summary ?? `${project.title} — project by Felipe Figueiredo`,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const imgSrc = project.coverImage
    ? urlFor(project.coverImage as SanityImage).width(1200).height(675).url()
    : null

  return (
    <article className="max-w-3xl mx-auto px-6 pt-24 pb-20">
      <AnimatedSection>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8"
        >
          ← All Projects
        </Link>

        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4 font-light">
          Project
        </p>

        <h1 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-4">
          {project.title}
        </h1>

        {project.summary && (
          <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8 max-w-prose">
            {project.summary}
          </p>
        )}

        {project.techs && project.techs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="text-[0.65rem] tracking-widest uppercase px-2.5 py-1 border border-[var(--border)] text-[var(--text-muted)] rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 mb-10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors"
            >
              Live Demo →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border-b border-transparent hover:border-[var(--text-muted)] pb-0.5"
            >
              GitHub →
            </a>
          )}
        </div>
      </AnimatedSection>

      {imgSrc && (
        <AnimatedSection delay={0.1}>
          <div className="relative aspect-video rounded-sm overflow-hidden mb-10 border border-[var(--border)]">
            <Image
              src={imgSrc}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </AnimatedSection>
      )}

      {project.body && (
        <AnimatedSection delay={0.15}>
          <div className="prose prose-sm max-w-none text-[var(--text-secondary)] [&_h2]:text-[var(--text-primary)] [&_h2]:font-display [&_h2]:font-semibold [&_a]:text-[var(--text-primary)] [&_a]:underline [&_strong]:text-[var(--text-primary)]">
            <PortableText value={project.body as Parameters<typeof PortableText>[0]['value']} />
          </div>
        </AnimatedSection>
      )}
    </article>
  )
}
