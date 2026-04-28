import AnimatedSection from '../UI/AnimatedSection'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-20 border-t border-[var(--border)]">
      <AnimatedSection>
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-10 font-light">
          Contact
        </p>
        <h2 className="font-display font-light text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-4">
          Get in touch.
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-md leading-relaxed">
          I&apos;m open to new opportunities. Feel free to reach out — I reply to everyone.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="mailto:fjnfigueiredo@gmail.com"
            className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors"
          >
            fjnfigueiredo@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/fjnfigueiredo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/FigueiredoFelipe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </AnimatedSection>
    </section>
  )
}
