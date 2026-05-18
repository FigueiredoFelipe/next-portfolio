import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/UI/AnimatedSection'

export const metadata: Metadata = {
  title: 'CLAUDE.md Token Optimization — Case Study',
  description:
    'From score 42 to 96. A real audit that cut 59% of tokens with zero functionality lost.',
  openGraph: {
    title: 'CLAUDE.md Token Optimization — Case Study',
    description:
      'From score 42 to 96. A real audit that cut 59% of tokens with zero functionality lost.',
    url: 'https://felipefigueiredodev.vercel.app/writing/token-optimization',
    images: [
      {
        url: '/og/token-optimization.png',
        width: 1200,
        height: 627,
        alt: 'CLAUDE.md Token Optimization Case Study',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CLAUDE.md Token Optimization — Case Study',
    description:
      'From score 42 to 96. A real audit that cut 59% of tokens with zero functionality lost.',
    images: ['/og/token-optimization.png'],
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="font-mono text-[0.65rem] text-emerald-500 tracking-[0.15em]">{n}</span>
      <h2 className="font-display font-semibold text-xl tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
    </div>
  )
}

function CodeBlock({
  label,
  children,
  dim,
  highlight,
}: {
  label: string
  children: React.ReactNode
  dim?: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-sm overflow-hidden font-mono text-xs border ${
        highlight
          ? 'border-emerald-500/40 shadow-[0_0_20px_rgba(0,229,153,0.06)]'
          : 'border-[#252b38]'
      } ${dim ? 'opacity-60' : ''}`}
    >
      <div className="bg-[#131620] border-b border-[#252b38] px-4 py-2.5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#252b38]" />
        <span className="w-2 h-2 rounded-full bg-[#252b38]" />
        <span className="w-2 h-2 rounded-full bg-[#252b38]" />
        <span className="ml-1 text-[#4a5568] tracking-wide">{label}</span>
      </div>
      <div className="bg-[#0d0f14] p-4 space-y-0.5">{children}</div>
    </div>
  )
}

function CodeLine({
  n,
  children,
  variant = 'normal',
}: {
  n?: number
  children: React.ReactNode
  variant?: 'normal' | 'bad' | 'good' | 'key' | 'dim' | 'heading'
}) {
  const color = {
    normal: 'text-[#8892a4]',
    bad: 'text-[#ff4757] bg-[rgba(255,71,87,0.08)] px-1 rounded',
    good: 'text-emerald-400',
    key: 'text-amber-400',
    dim: 'text-[#3a4252]',
    heading: 'text-[#c792ea]',
  }[variant]

  return (
    <div className="flex gap-4 min-h-[20px]">
      {n !== undefined && (
        <span className="text-[#3a4252] text-right min-w-[18px] shrink-0 select-none">{n}</span>
      )}
      <span className={color}>{children}</span>
    </div>
  )
}

function Annotation({
  variant,
  children,
}: {
  variant: 'bad' | 'good' | 'note'
  children: React.ReactNode
}) {
  const styles = {
    bad: 'bg-[rgba(255,71,87,0.08)] border-l-2 border-red-500 text-red-300',
    good: 'bg-[rgba(0,229,153,0.08)] border-l-2 border-emerald-500 text-emerald-300',
    note: 'bg-[rgba(245,158,11,0.08)] border-l-2 border-amber-500 text-amber-300',
  }[variant]
  const icon = { bad: '✕', good: '✓', note: '→' }[variant]

  return (
    <div className={`flex gap-3 px-4 py-2.5 rounded-sm text-xs leading-relaxed my-1.5 ${styles}`}>
      <span className="shrink-0 font-bold">{icon}</span>
      <span>{children}</span>
    </div>
  )
}

function Metric({
  value,
  label,
  color,
}: {
  value: string
  label: string
  color: 'green' | 'amber' | 'indigo' | 'default'
}) {
  const valueColor = {
    green: 'text-emerald-400',
    amber: 'text-amber-400',
    indigo: 'text-indigo-400',
    default: 'text-[var(--text-primary)]',
  }[color]

  return (
    <div className="bg-[var(--bg-surface)] px-5 py-5 text-center">
      <div className={`font-display text-3xl font-light tracking-tight mb-1.5 ${valueColor}`}>
        {value}
      </div>
      <div className="text-[0.6rem] tracking-widest uppercase text-[var(--text-muted)]">{label}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TokenOptimizationPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 pt-24 pb-20">

      {/* ── Header ── */}
      <AnimatedSection>
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8"
        >
          ← All Writing
        </Link>

        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4 font-light">
          Prompt Engineering · Case Study
        </p>

        <h1 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-4">
          CLAUDE.md Token Optimization
        </h1>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-10 max-w-prose">
          How I applied systematic diagnosis and iterative refinement to transform a verbose AI
          instruction file into high-density directives — eliminating noise without losing
          functionality.
        </p>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-sm overflow-hidden mb-3">
          <Metric value="42" label="Initial Score" color="amber" />
          <Metric value="96" label="Final Score" color="green" />
          <Metric value="−59%" label="Tokens Saved" color="green" />
          <Metric value="3" label="Iterations" color="indigo" />
        </div>
        <p className="text-center text-[0.6rem] font-mono tracking-widest uppercase text-[var(--text-muted)] mb-16">
          Score via /refine — rates clarity · completeness · efficiency · goal alignment
        </p>
      </AnimatedSection>

      {/* ── 01 The Problem ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="01" title="The Problem" />

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-prose">
            The{' '}
            <code className="font-mono text-[0.8em] text-[var(--text-primary)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
              CLAUDE.md
            </code>{' '}
            is loaded on{' '}
            <strong className="text-[var(--text-primary)] font-medium">
              every conversation turn
            </strong>{' '}
            with the model. Every unnecessary token is a cost that multiplies across hundreds of
            interactions. The original file mixed personal narrative, user documentation, and
            justifications — none of which instruct behavior.
          </p>

          <CodeBlock label="CLAUDE.md — original version · ~220 tokens">
            <CodeLine n={1} variant="heading"># HQ — Quartel General</CodeLine>
            <CodeLine n={2} variant="bad">This is Felipe Figueiredo&apos;s central life management space...</CodeLine>
            <CodeLine n={3} variant="dim">&nbsp;</CodeLine>
            <CodeLine n={4} variant="heading">## Context</CodeLine>
            <CodeLine n={5} variant="bad">- Email: user@example.com</CodeLine>
            <CodeLine n={6} variant="bad">- Main environment: Claude Code via terminal...</CodeLine>
            <CodeLine n={7} variant="bad">- Why here and not the browser: access to MCPs...</CodeLine>
            <CodeLine n={8} variant="dim">&nbsp;</CodeLine>
            <CodeLine n={9} variant="heading">## Work Preferences</CodeLine>
            <CodeLine n={10}>- Short, direct responses — no fluff</CodeLine>
            <CodeLine n={11}>- Portuguese by default</CodeLine>
            <CodeLine n={12} variant="dim">&nbsp;</CodeLine>
            <CodeLine n={13} variant="bad">## How to Use This Space</CodeLine>
            <CodeLine n={14} variant="bad">Each area can have its own subfolder as needs grow...</CodeLine>
          </CodeBlock>

          <div className="mt-4 space-y-1">
            <Annotation variant="bad">
              <strong>Descriptive narrative</strong> — the model doesn&apos;t need to know the
              project&apos;s history. Profile context already lives in persistent memory.
            </Annotation>
            <Annotation variant="bad">
              <strong>Justifications</strong> — explaining <em>why</em> a preference exists
              doesn&apos;t instruct model behavior.
            </Annotation>
            <Annotation variant="bad">
              <strong>User documentation</strong> — &ldquo;How to Use This Space&rdquo; is a README.
              It is not a directive.
            </Annotation>
            <Annotation variant="bad">
              <strong>Memory duplicates</strong> — email and profile context already exist in the
              memory system, making these lines pure overhead.
            </Annotation>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 02 The Iterations ── */}
      <AnimatedSection delay={0.07}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="02" title="The Iterations" />

          <div className="grid md:grid-cols-3 gap-3 mb-6">
            {/* Iteration 1 */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm p-5">
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[var(--text-muted)] mb-3">
                Iteration 01
              </p>
              <div className="font-display text-4xl font-light text-amber-400 mb-3">65</div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                Removal of all narrative, justifications, and duplicates. Preferences converted into
                direct, compact directives.
              </p>
              <p className="text-[0.65rem] font-mono text-[var(--text-muted)] leading-relaxed mb-3 italic">
                First cut: &ldquo;## How to Use This Space&rdquo; — describes the tool, doesn&apos;t instruct behavior.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="font-mono text-[0.6rem] px-2 py-0.5 rounded bg-red-500/10 text-red-400">
                  − narrative
                </span>
                <span className="font-mono text-[0.6rem] px-2 py-0.5 rounded bg-red-500/10 text-red-400">
                  − justifications
                </span>
                <span className="font-mono text-[0.6rem] px-2 py-0.5 rounded bg-red-500/10 text-red-400">
                  − user docs
                </span>
              </div>
            </div>

            {/* Iteration 2 */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm p-5">
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[var(--text-muted)] mb-3">
                Iteration 02
              </p>
              <div className="font-display text-4xl font-light text-orange-400 mb-3">84</div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                Added workflow directives mapping the sequence of available skills and tools.
                Explicit instruction about the persistent memory system.
              </p>
              <p className="text-[0.65rem] font-mono text-[var(--text-muted)] leading-relaxed mb-3 italic">
                Key add: explicit skill sequence — model stops inferring the right tool per task.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="font-mono text-[0.6rem] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                  + workflows
                </span>
                <span className="font-mono text-[0.6rem] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                  + skills map
                </span>
              </div>
            </div>

            {/* Iteration 3 */}
            <div className="bg-[var(--bg-surface)] border border-emerald-500/30 rounded-sm p-5 shadow-[0_0_20px_rgba(0,229,153,0.04)]">
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-emerald-500 mb-3">
                Iteration 03 — Final
              </p>
              <div className="font-display text-4xl font-light text-emerald-400 mb-3">96</div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
                Skill sequence clarified, zero memory redundancies, ultra-compact format with maximum
                instruction density.
              </p>
              <p className="text-[0.65rem] font-mono text-[var(--text-muted)] leading-relaxed mb-3 italic">
                Final cut: profile and stack moved to memory — CLAUDE.md left with pure directives only.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="font-mono text-[0.6rem] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                  + explicit sequence
                </span>
                <span className="font-mono text-[0.6rem] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                  + zero redundancies
                </span>
              </div>
            </div>
          </div>

          {/* Score progression */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm p-5">
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-[var(--text-muted)] mb-4">
              Score Progression
            </p>
            <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full"
                style={{
                  width: '96%',
                  background: 'linear-gradient(90deg, #f59e0b 0%, #f97316 40%, #00e599 100%)',
                }}
              />
            </div>
            <div className="flex justify-between font-mono text-xs">
              {[
                { val: '42', lbl: 'initial' },
                { val: '65', lbl: 'v1' },
                { val: '84', lbl: 'v2' },
                { val: '96', lbl: 'final', highlight: true },
              ].map((s) => (
                <div key={s.lbl} className="text-center">
                  <div
                    className={`font-medium ${s.highlight ? 'text-emerald-400' : 'text-[var(--text-primary)]'}`}
                  >
                    {s.val}
                  </div>
                  <div className="text-[0.6rem] text-[var(--text-muted)] mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 03 Final Result ── */}
      <AnimatedSection delay={0.09}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="03" title="Final Result" />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-red-400 mb-2">
                Before — ~220 tokens
              </p>
              <CodeBlock label="" dim>
                <CodeLine variant="heading"># HQ — Quartel General</CodeLine>
                <CodeLine variant="bad">This is the central management space...</CodeLine>
                <CodeLine variant="heading">## Context</CodeLine>
                <CodeLine variant="bad">- Email: user@example.com</CodeLine>
                <CodeLine variant="bad">- Main environment: Claude Code...</CodeLine>
                <CodeLine variant="bad">- Why here and not the browser:...</CodeLine>
                <CodeLine variant="heading">## Work Preferences</CodeLine>
                <CodeLine>- Short, direct responses</CodeLine>
                <CodeLine>- Portuguese by default</CodeLine>
                <CodeLine variant="bad">## How to Use This Space</CodeLine>
                <CodeLine variant="bad">Each area can have its own subfolder...</CodeLine>
              </CodeBlock>
            </div>

            <div>
              <p className="font-mono text-[0.6rem] tracking-widest uppercase text-emerald-400 mb-2">
                After — ~90 tokens
              </p>
              <CodeBlock label="" highlight>
                <CodeLine variant="good"># HQ</CodeLine>
                <CodeLine variant="dim">&nbsp;</CodeLine>
                <CodeLine>
                  <span className="text-amber-400">- Language:</span>
                  <span className="text-[#8892a4]"> Portuguese always</span>
                </CodeLine>
                <CodeLine>
                  <span className="text-amber-400">- Tone:</span>
                  <span className="text-[#8892a4]"> Direct. No summaries, no emojis.</span>
                </CodeLine>
                <CodeLine variant="dim">&nbsp;</CodeLine>
                <CodeLine variant="good">## Workflows</CodeLine>
                <CodeLine>- New project → brainstorming required</CodeLine>
                <CodeLine>- Approved → writing-plans</CodeLine>
                <CodeLine>- Implementation → executing-plans</CodeLine>
                <CodeLine>- Review → requesting-code-review</CodeLine>
                <CodeLine variant="dim">&nbsp;</CodeLine>
                <CodeLine variant="good">## Technical context</CodeLine>
                <CodeLine>- Profile and stack → in persistent memory.</CodeLine>
              </CodeBlock>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 04 Key Principles ── */}
      <AnimatedSection delay={0.11}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="04" title="Key Principles" />

          <div className="grid md:grid-cols-2 gap-3">
            {[
              {
                id: 'P-01',
                title: 'CLAUDE.md ≠ README',
                desc: 'The file is read by the model every turn, not the human. Every sentence must instruct behavior — not describe context.',
              },
              {
                id: 'P-02',
                title: 'Memory stores, CLAUDE.md activates',
                desc: 'Static context (profile, history, stack) goes into persistent memory. CLAUDE.md contains only active behavior directives.',
              },
              {
                id: 'P-03',
                title: 'Explicit workflows beat implicit ones',
                desc: 'Mapping the skill and tool sequence guarantees consistency without relying on repeated verbal instruction every session.',
              },
              {
                id: 'P-04',
                title: 'Tokens accumulate — always measure',
                desc: '220 tokens × 500 daily sessions × $0.003/1k ≈ $0.33/day — ~$120/year. At Opus pricing, multiply ×5. Context optimization is an engineering discipline, not just an aesthetic choice.',
              },
            ].map((p) => (
              <div
                key={p.id}
                className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm p-5"
              >
                <p className="font-mono text-[0.6rem] tracking-widest uppercase text-emerald-500 mb-2">
                  {p.id}
                </p>
                <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection delay={0.13}>
        <div className="border-t border-[var(--border)] pt-10 text-center">
          <p className="font-display font-light text-xl text-[var(--text-primary)] mb-2">
            Building something AI-native?
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            I&apos;m a senior fullstack engineer available for remote work — from architecture to prompt engineering.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/writing"
              className="text-xs tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border)] px-5 py-2.5 rounded-sm hover:border-[var(--text-muted)]"
            >
              ← All Writing
            </Link>
            <Link
              href="/#contact"
              className="text-xs tracking-widest uppercase font-medium bg-[var(--text-primary)] text-[var(--bg)] px-5 py-2.5 rounded-sm hover:opacity-80 transition-opacity"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
      </AnimatedSection>

    </article>
  )
}
