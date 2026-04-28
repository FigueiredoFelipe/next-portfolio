import AnimatedSection from '../UI/AnimatedSection'
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact,
  SiTailwindcss, SiNextdotjs, SiAngular, SiNestjs, SiDocker,
} from 'react-icons/si'

const techStack = [
  { icon: SiHtml5,       label: 'HTML5',      color: '#E34F26' },
  { icon: SiCss3,        label: 'CSS3',       color: '#1572B6' },
  { icon: SiJavascript,  label: 'JavaScript', color: '#F7DF1E' },
  { icon: SiTypescript,  label: 'TypeScript', color: '#3178C6' },
  { icon: SiReact,       label: 'React',      color: '#61DAFB' },
  { icon: SiTailwindcss, label: 'Tailwind',   color: '#06B6D4' },
  { icon: SiNextdotjs,   label: 'Next.js',    color: 'var(--text-primary)' },
  { icon: SiAngular,     label: 'Angular',    color: '#DD0031' },
  { icon: SiNestjs,      label: 'NestJS',     color: '#E0234E' },
  { icon: SiDocker,      label: 'Docker',     color: '#2496ED' },
]

export default function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-20 border-t border-[var(--border)]">
      <AnimatedSection>
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-10 font-light">
          About
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-5 gap-12">
        <AnimatedSection className="md:col-span-3">
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-4">
            I&apos;m a Fullstack Developer based in Belo Horizonte, Brazil, with experience building
            scalable web applications using React, NestJS, and TypeScript.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-4">
            I care about clean architecture, developer experience, and shipping things that work.
            Recently I&apos;ve been integrating AI models — like Gemini LLM — into fullstack applications.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed text-sm">
            Open to new opportunities — feel free to reach out.
          </p>
        </AnimatedSection>

        <AnimatedSection className="md:col-span-2" delay={0.1}>
          <p className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-6 font-light">
            Tech Stack
          </p>
          <div className="grid grid-cols-5 gap-4">
            {techStack.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 group">
                <Icon
                  size={24}
                  style={{ color }}
                  className="opacity-70 group-hover:opacity-100 transition-opacity"
                  title={label}
                />
                <span className="text-[0.6rem] text-[var(--text-muted)] tracking-wide hidden sm:block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
