import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-40 pb-20 text-center">
      <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4 font-light">
        404
      </p>
      <h1 className="font-display font-light text-4xl md:text-5xl tracking-tight text-[var(--text-primary)] mb-4">
        Page not found.
      </h1>
      <p className="text-sm text-[var(--text-secondary)] mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors"
      >
        ← Back home
      </Link>
    </section>
  )
}
