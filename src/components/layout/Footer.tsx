import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <p className="text-xs text-[var(--text-muted)] tracking-wider">
          © {year} Felipe Figueiredo
        </p>
        <div className="flex gap-4">
          <a
            href="https://linkedin.com/in/felipefigueiredo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://github.com/FigueiredoFelipe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
