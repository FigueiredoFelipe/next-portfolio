import AnimatedSection from '../UI/AnimatedSection'
import {
  SiJavascript, SiTypescript, SiReact,
  SiNextdotjs, SiAngular, SiNestjs,
  SiTailwindcss, SiFlutter, SiSupabase, SiDocker,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'
import { SiPostgresql } from 'react-icons/si'

const techStack = [
  // Row 1 — Languages & Core UI
  { icon: SiJavascript,        label: 'JavaScript',   color: '#F7DF1E' },
  { icon: SiTypescript,        label: 'TypeScript',   color: '#3178C6' },
  { icon: SiReact,             label: 'React',        color: '#61DAFB' },
  { icon: TbBrandReactNative,  label: 'React Native', color: '#61DAFB' },
  // Row 2 — Frameworks
  { icon: SiNextdotjs,         label: 'Next.js',      color: 'var(--text-primary)' },
  { icon: SiAngular,           label: 'Angular',      color: '#DD0031' },
  { icon: SiNestjs,            label: 'NestJS',       color: '#E0234E' },
  { icon: SiFlutter,           label: 'Flutter',      color: '#54C5F8' },
  // Row 3 — Tools & Platform
  { icon: SiTailwindcss,       label: 'Tailwind',     color: '#06B6D4' },
  { icon: SiSupabase,          label: 'Supabase',     color: '#3ECF8E' },
  { icon: SiPostgresql,        label: 'PostgreSQL',   color: '#4169E1' },
  { icon: SiDocker,            label: 'Docker',       color: '#2496ED' },
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
            I&apos;m a Fullstack Developer based in Belo Horizonte, Brazil, building scalable
            applications across web and mobile — from React and Angular frontends to NestJS
            backends and React Native & Flutter apps.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-4">
            I care about clean architecture, developer experience, and shipping things that work.
            Recently I&apos;ve been integrating AI models into fullstack applications.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed text-sm">
            Open to new opportunities — feel free to reach out.
          </p>
        </AnimatedSection>

        <AnimatedSection className="md:col-span-2" delay={0.1}>
          <p className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-6 font-light">
            Tech Stack
          </p>
          <div className="grid grid-cols-4 gap-4">
            {techStack.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 group">
                <Icon
                  size={24}
                  style={{ color }}
                  className="opacity-70 group-hover:opacity-100 transition-opacity"
                  title={label}
                />
                <span className="text-[0.6rem] text-[var(--text-muted)] tracking-wide hidden sm:block text-center leading-tight">
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
