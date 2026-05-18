import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/UI/AnimatedSection'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Case studies, essays, and notes by Felipe Figueiredo.',
}

const articles = [
  {
    slug: 'token-optimization',
    title: 'CLAUDE.md Token Optimization',
    summary:
      'From score 42 to 96. A real audit that cut 59% of tokens with zero functionality lost.',
    date: 'May 2026',
    tag: 'Prompt Engineering · Case Study',
  },
]

export default function WritingPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      <AnimatedSection>
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4 font-light">
          Writing
        </p>
        <h1 className="font-display font-light text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-10">
          Things I&apos;ve written.
        </h1>
      </AnimatedSection>

      <div className="flex flex-col gap-4">
        {articles.map((article, i) => (
          <AnimatedSection key={article.slug} delay={i * 0.07}>
            <Link
              href={`/writing/${article.slug}`}
              className="group block bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm p-6 hover:border-[var(--text-muted)] transition-colors"
            >
              <p className="text-[0.6rem] tracking-widest uppercase text-[var(--text-muted)] mb-3 font-mono">
                {article.date} · {article.tag}
              </p>
              <h2 className="font-display font-semibold text-[var(--text-primary)] mb-2 text-sm leading-snug group-hover:text-[var(--text-secondary)] transition-colors">
                {article.title}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                {article.summary}
              </p>
              <span className="text-[0.6rem] tracking-widest uppercase font-mono text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                Read case study →
              </span>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
