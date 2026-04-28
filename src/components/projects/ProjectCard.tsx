import Image from 'next/image'
import Link from 'next/link'
import { Project, SanityImage } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface Props {
  project: Project
}

function TechTag({ label }: { label: string }) {
  return (
    <span className="text-[0.6rem] tracking-widest uppercase px-2 py-0.5 border border-[var(--border)] text-[var(--text-muted)] rounded-sm">
      {label}
    </span>
  )
}

export default function ProjectCard({ project }: Props) {
  const imgSrc = project.coverImage
    ? urlFor(project.coverImage as SanityImage).width(800).height(450).url()
    : null

  const visibleTechs = project.techs?.slice(0, 3) ?? []
  const extraCount = (project.techs?.length ?? 0) - 3

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group block bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--text-muted)] transition-colors"
    >
      <div className="relative aspect-video bg-[var(--border)] overflow-hidden">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)] text-xs tracking-wider uppercase">
            No image
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-[var(--text-primary)] mb-2 text-sm leading-snug">
          {project.title}
        </h3>
        {project.summary && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
            {project.summary}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {visibleTechs.map((tech) => (
            <TechTag key={tech} label={tech} />
          ))}
          {extraCount > 0 && <TechTag label={`+${extraCount}`} />}
        </div>
      </div>
    </Link>
  )
}
