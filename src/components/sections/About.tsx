import AnimatedSection from '../UI/AnimatedSection'
import {
  SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiNestjs, SiPostgresql, SiSupabase, SiTailwindcss, SiDocker,
  SiAngular, SiFlutter, SiPython, SiFastapi, SiSentry,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'

type Tech = { icon: React.ElementType; label: string; color: string }

/**
 * Two groups, not one list.
 *
 * Twelve icons at identical weight is twelve equal claims, and a reader takes
 * that as "whatever comes along". The same twelve under stated headings read as
 * a position: this is what I reach for, and this is what I have also shipped.
 * Nothing is removed — Angular and React Native still have to be here, because
 * the CV names them and the roles that ask for them are real.
 */
const primary: Tech[] = [
  { icon: SiTypescript,  label: 'TypeScript',  color: '#3178C6' },
  { icon: SiReact,       label: 'React',       color: '#61DAFB' },
  { icon: SiNextdotjs,   label: 'Next.js',     color: 'var(--text-primary)' },
  { icon: SiNodedotjs,   label: 'Node.js',     color: '#5FA04E' },
  { icon: SiNestjs,      label: 'NestJS',      color: '#E0234E' },
  { icon: SiPostgresql,  label: 'PostgreSQL',  color: '#4169E1' },
  { icon: SiSupabase,    label: 'Supabase',    color: '#3ECF8E' },
  { icon: SiTailwindcss, label: 'Tailwind',    color: '#06B6D4' },
  { icon: SiDocker,      label: 'Docker',      color: '#2496ED' },
]

/**
 * Every entry here has to survive "tell me about it" in a call, because the
 * heading is a claim, not a wish list. Python and FastAPI earn their place from
 * BlackLetter's backend; Sentry from actually reading session replays to
 * reproduce production errors. A generic AWS icon would not survive that test —
 * the honest version names the services.
 */
const alsoShipped: Tech[] = [
  { icon: SiAngular,          label: 'Angular',      color: '#DD0031' },
  { icon: TbBrandReactNative, label: 'React Native', color: '#61DAFB' },
  { icon: SiFlutter,          label: 'Flutter',      color: '#54C5F8' },
  { icon: SiPython,           label: 'Python',       color: '#3776AB' },
  { icon: SiFastapi,          label: 'FastAPI',      color: '#009688' },
  { icon: SiSentry,           label: 'Sentry',       color: '#8B5CF6' },
]

function TechGrid({ items }: { items: Tech[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(({ icon: Icon, label, color }) => (
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
  )
}

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
            Most of my work is Next.js, TypeScript and Node. But the part I actually rely on sits
            underneath the framework: components have a lifecycle, state has an owner, and something
            has to decide when to re-render. React and Angular answer those questions differently —
            they aren&apos;t different problems. Moving between them has never been the hard part of
            a job.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-4">
            The hard part, for the last two years, has been deciding what an LLM should be allowed
            to decide. Anything that can be written as a rule should be a rule: deterministic,
            testable, identical every run. The model gets only the questions that genuinely need
            judgment — and it gets them narrowly. It doesn&apos;t hunt on its own; it rules on
            candidates the deterministic layer already found, and it has to show its reasoning. A
            schema guarantees the shape of the answer; the prefilter and that reasoning are what
            make the content auditable. That split is the architecture behind both BlackLetter and
            Strategic Council.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-4">
            I work remotely with teams in the US, and I&apos;m comfortable owning a feature end to
            end — API, database, interface, and the failure paths nobody demos.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed text-sm">
            Open to senior remote roles — feel free to reach out.
          </p>
        </AnimatedSection>

        <AnimatedSection className="md:col-span-2" delay={0.1}>
          <p className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-6 font-light">
            Building with
          </p>
          <TechGrid items={primary} />

          <p className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mt-10 mb-6 font-light">
            Also shipped in production
          </p>
          <TechGrid items={alsoShipped} />
        </AnimatedSection>
      </div>
    </section>
  )
}
