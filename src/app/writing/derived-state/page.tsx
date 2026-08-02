import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/UI/AnimatedSection'

export const metadata: Metadata = {
  title: 'Deriving State Is a Correctness Guarantee, Not a Performance Trick — Essay',
  description:
    "Your agent hands you clean, working, 'optimized' React. It can still be wrong — in a way that won't surface until it costs you something.",
  openGraph: {
    title: 'Deriving State Is a Correctness Guarantee, Not a Performance Trick',
    description:
      "Your agent hands you clean, working, 'optimized' React. It can still be wrong — in a way that won't surface until it costs you something.",
    url: 'https://felipefigueiredodev.vercel.app/writing/derived-state',
    images: [
      {
        url: '/og/derived-state.png',
        width: 1200,
        height: 627,
        alt: 'One authoritative source of truth versus two copies drifting out of sync',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deriving State Is a Correctness Guarantee, Not a Performance Trick',
    description:
      "Your agent hands you clean, working, 'optimized' React. It can still be wrong — in a way that won't surface until it costs you something.",
    images: ['/og/derived-state.png'],
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

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] md:text-base text-[var(--text-secondary)] leading-[1.85] mb-5 max-w-prose">
      {children}
    </p>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[0.8em] text-[var(--text-primary)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
      {children}
    </code>
  )
}

function CodeBlock({
  label,
  children,
  highlight,
}: {
  label: string
  children: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-sm overflow-hidden font-mono text-xs border ${
        highlight
          ? 'border-emerald-500/40 shadow-[0_0_20px_rgba(0,229,153,0.06)]'
          : 'border-[#252b38]'
      }`}
    >
      <div className="bg-[#131620] border-b border-[#252b38] px-4 py-2.5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#252b38]" />
        <span className="w-2 h-2 rounded-full bg-[#252b38]" />
        <span className="w-2 h-2 rounded-full bg-[#252b38]" />
        <span className="ml-1 text-[#4a5568] tracking-wide">{label}</span>
      </div>
      <div className="bg-[#0d0f14] p-4 space-y-0.5 overflow-x-auto">{children}</div>
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
  variant?: 'normal' | 'bad' | 'good' | 'key' | 'dim'
}) {
  const color = {
    normal: 'text-[#8892a4]',
    bad: 'text-[#ff4757] bg-[rgba(255,71,87,0.08)] px-1 rounded',
    good: 'text-emerald-400 bg-[rgba(0,229,153,0.06)] px-1 rounded',
    key: 'text-amber-400',
    dim: 'text-[#3a4252]',
  }[variant]

  return (
    <div className="flex gap-4 min-h-[20px]">
      {n !== undefined && (
        <span className="text-[#3a4252] text-right min-w-[18px] shrink-0 select-none">{n}</span>
      )}
      <span className={`${color} whitespace-pre`}>{children}</span>
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
    bad: 'bg-[rgba(255,71,87,0.08)] border-l-2 border-red-500 text-red-700 dark:text-red-300',
    good: 'bg-[rgba(0,229,153,0.08)] border-l-2 border-emerald-500 text-emerald-700 dark:text-emerald-300',
    note: 'bg-[rgba(245,158,11,0.08)] border-l-2 border-amber-500 text-amber-800 dark:text-amber-300',
  }[variant]
  const icon = { bad: '✕', good: '✓', note: '→' }[variant]

  return (
    <div className={`flex gap-3 px-4 py-2.5 rounded-sm text-xs leading-relaxed my-3 ${styles}`}>
      <span className="shrink-0 font-bold">{icon}</span>
      <span>{children}</span>
    </div>
  )
}

function Principle({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-5 py-4 my-6 max-w-prose">
      <span className="font-mono text-[0.6rem] tracking-widest text-emerald-500 shrink-0">{n}</span>
      <p className="font-display text-sm md:text-[0.95rem] leading-snug text-[var(--text-primary)]">
        {children}
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DerivedStatePage() {
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
          Essay · React &amp; AI-Native Engineering
        </p>

        <h1 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-4">
          Deriving state is a correctness guarantee, not a performance trick
        </h1>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-10 max-w-prose">
          Your agent hands you clean, working, &ldquo;optimized&rdquo; React. It can still be
          wrong &mdash; in a way that won&apos;t surface until it costs you something.
        </p>
      </AnimatedSection>

      {/* ── Hero image ── */}
      <AnimatedSection delay={0.05}>
        <div className="relative aspect-[1.9/1] w-full overflow-hidden rounded-sm border border-[var(--border)]">
          <Image
            src="/og/derived-state.png"
            alt="One authoritative source of truth versus two copies drifting out of sync"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <p className="text-center text-[0.6rem] font-mono tracking-widest uppercase text-[var(--text-muted)] mt-3 mb-16">
          One source of truth stays intact &mdash; the copies drift
        </p>
      </AnimatedSection>

      {/* ── Lead ── */}
      <AnimatedSection delay={0.07}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <p className="font-display font-light text-2xl md:text-[1.75rem] leading-snug tracking-tight text-[var(--text-primary)] mb-8">
            The most expensive React bug I know doesn&apos;t throw. It quietly serves the wrong data.
          </p>
          <P>
            You ask your agent for a product list with a search filter. Ten seconds later you have
            clean, working code. It even looks optimized &mdash; no obvious waste. You skim it, it
            renders, you move on. Here is what came back:
          </P>

          <CodeBlock label="what the agent returned — store & sync">
            <CodeLine n={1}>{'const [query, setQuery] = useState("");'}</CodeLine>
            <CodeLine n={2} variant="bad">{'const [results, setResults] = useState(products);'}</CodeLine>
            <CodeLine n={3} variant="dim">{' '}</CodeLine>
            <CodeLine n={4}>{'useEffect(() => {'}</CodeLine>
            <CodeLine n={5}>{'  setResults(products.filter(p =>'}</CodeLine>
            <CodeLine n={6}>{'    p.title.toLowerCase().includes(query.toLowerCase())'}</CodeLine>
            <CodeLine n={7}>{'  ));'}</CodeLine>
            <CodeLine n={8} variant="key">{'}, [query]);'}</CodeLine>
          </CodeBlock>

          <Annotation variant="note">
            Nothing in that dependency array watches <Code>products</Code>. The day it changes
            without <Code>query</Code> changing, the list goes stale &mdash; silently.
          </Annotation>

          <P>
            This passes review at most shops. It runs. It filters. And it is wrong &mdash; not slow,{' '}
            <em className="italic text-[var(--text-primary)]">wrong</em> &mdash; in a way that
            won&apos;t surface until it costs you something.
          </P>
        </div>
      </AnimatedSection>

      {/* ── 01 The reframe ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="01" title="The reframe" />
          <P>
            The usual objection to storing derived state is performance: you triggered an extra
            render, you&apos;re doing work React could skip. True, and almost irrelevant. That extra
            render is a rounding error.
          </P>
          <P>
            The real cost is correctness. The moment you copy <Code>products</Code> into{' '}
            <Code>results</Code>, you have a <strong className="text-[var(--text-primary)] font-semibold">second
            source of truth</strong>. <Code>products</Code> knows the answer. <Code>results</Code>{' '}
            <em className="italic text-[var(--text-primary)]">remembers</em> one &mdash; the answer
            that was correct the last time the effect happened to run. Those two can disagree, and
            the entire job of that <Code>useEffect</Code> is to keep papering over the gap.
          </P>
          <P>
            Look at the dependency array. It watches <Code>query</Code>. It does not watch{' '}
            <Code>products</Code>. So the day <Code>products</Code> changes without <Code>query</Code>{' '}
            changing &mdash; a refetch, a prop update, an optimistic insert &mdash; the list on screen
            is stale. No exception. No red console. No failing test, because the test filtered a static
            array. Just the wrong data, rendered with total confidence.
          </P>
          <Principle n="P-01">
            A stored copy of derivable data is a bug with a delay. It doesn&apos;t fail when you write
            it. It fails when the inputs drift &mdash; which is precisely when nobody is watching.
          </Principle>
          <P>
            That is the shape of it: a production bug at midnight, on a weekend, that{' '}
            <Code>git blame</Code> traces back to a line everyone approved because it &ldquo;looked
            optimized.&rdquo;
          </P>
        </div>
      </AnimatedSection>

      {/* ── 02 The fix ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="02" title="The senior fix is shorter" />
          <CodeBlock label="derive during render" highlight>
            <CodeLine n={1}>{'const [query, setQuery] = useState("");'}</CodeLine>
            <CodeLine n={2} variant="good">{'const results = products.filter(p =>'}</CodeLine>
            <CodeLine n={3} variant="good">{'  p.title.toLowerCase().includes(query.toLowerCase())'}</CodeLine>
            <CodeLine n={4} variant="good">{');'}</CodeLine>
          </CodeBlock>
          <div className="mt-6">
            <P>
              No effect. No second state. No dependency array to forget. <Code>results</Code> cannot
              go stale because it does not persist &mdash; it is recomputed from <Code>products</Code>{' '}
              and <Code>query</Code> on every render, which makes it{' '}
              <em className="italic text-[var(--text-primary)]">always</em> exactly what those two
              inputs imply. There is nothing to keep in sync because there is nothing to sync.
            </P>
          </div>
          <Principle n="P-02">
            If you can compute it, don&apos;t store it. State is only for what you cannot derive.
            Everything else is a function of state &mdash; and functions belong in render, not in
            memory.
          </Principle>
        </div>
      </AnimatedSection>

      {/* ── 03 Not against useEffect ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="03" title="This is not an argument against useEffect" />
          <P>
            Be precise here, because the lazy version of this take is &ldquo;effects bad,&rdquo; and
            that is wrong. <Code>useEffect</Code> is the correct tool for synchronizing with systems
            that live <em className="italic text-[var(--text-primary)]">outside</em> React: fetching
            data, opening a subscription, wiring up a non-React widget, touching the DOM directly.
            Those are real synchronization problems &mdash; two worlds that genuinely need reconciling.
          </P>
          <P>
            Filtering an array you already hold is not that. It is a calculation, and store-and-sync
            uses a synchronization primitive to do arithmetic. The React docs have a page named for
            exactly this reflex &mdash;{' '}
            <a
              href="https://react.dev/learn/you-might-not-need-an-effect"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] underline underline-offset-2 decoration-[var(--text-muted)] hover:decoration-[var(--text-primary)] transition-colors"
            >
              You Might Not Need an Effect
            </a>{' '}
            &mdash; and the tell is the pattern above: an effect whose only job is to call{' '}
            <Code>setState</Code> with a value computed from other state or props. Effects for the
            outside world; derivation for everything you can calculate.
          </P>
          <p className="text-[0.65rem] font-mono text-[var(--text-muted)] mt-2">
            Link accessed Aug 2, 2026 · react.dev/learn/you-might-not-need-an-effect
          </p>
        </div>
      </AnimatedSection>

      {/* ── 04 The governing principle ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="04" title="Minimize your sources of truth" />
          <Principle n="P-03">
            One authoritative value, derived everywhere it is needed. One source of truth means
            nothing to keep in sync, which means nothing can drift.
          </Principle>
          <div className="border-l-2 border-amber-500 bg-[rgba(245,158,11,0.06)] rounded-sm px-6 py-6 max-w-prose">
            <p className="text-sm text-[var(--text-secondary)] leading-[1.8]">
              A decade in law taught me this before anything else: when two clauses can each claim to
              be binding, you don&apos;t have redundancy &mdash; you have a dispute. A component is no
              different.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 05 Keeping it out of an AI-written codebase ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="05" title="How you keep this out of a codebase the AI mostly writes" />
          <P>
            This is the part that actually changed. The agent reaches for store-and-sync by default,
            because it is the statistically common pattern in its training data. You will not
            out-type that. You govern it instead.
          </P>
          <ul className="flex flex-col gap-3 max-w-prose">
            {[
              [
                'Make the guardrail explicit.',
                'Put it in your prompt and your project rules: prefer deriving values during render; never store in state what can be computed from existing state or props. You get the output you specify, and "optimize this" specifies nothing.',
              ],
              [
                'Treat every generated line as something you must defend.',
                "If you can't say out loud why a value is state and not a derivation, it isn't reviewed — it's just present.",
              ],
              [
                'Add one question to code review:',
                'is this state, or is it derivable? It catches this entire class of bug on sight.',
              ],
              [
                'Turn on react-hooks/exhaustive-deps.',
                "It won't stop you from storing derived state, but it screams about the missing dependency that makes store-and-sync silently rot.",
              ],
              [
                'Keep "You Might Not Need an Effect" as a review reflex,',
                'not a link you read once.',
              ],
            ].map(([lead, body]) => (
              <li
                key={lead}
                className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm px-5 py-4 text-sm text-[var(--text-secondary)] leading-relaxed"
              >
                <span className="text-[var(--text-primary)] font-semibold">{lead}</span> {body}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* ── 06 The skill that's left ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="06" title="The skill that's left" />
          <P>
            Generating the component is no longer the work. The agent does that, and does it fast.
            What it can&apos;t do is own the decision &mdash; it will hand you a plausible second
            source of truth with a straight face and call it optimized.
          </P>
          <Principle n="P-04">
            The senior contribution is no longer the keystroke. It is the audit &mdash; reading what
            the agent decided, knowing which decisions drift, and defending every line as if you had
            typed it. Because in the only sense that matters, you did.
          </Principle>
          <p className="font-display font-light text-xl md:text-2xl leading-snug tracking-tight text-[var(--text-primary)] mt-6 max-w-prose">
            The shorter version filters a list. It also happens to be correct by construction. Those
            are the same decision &mdash; and knowing that is the job now.
          </p>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 text-center">
          <p className="font-display font-light text-xl text-[var(--text-primary)] mb-2">
            Shipping AI-native software you need to trust?
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            I&apos;m a senior fullstack engineer available for remote work &mdash; from architecture
            to auditing the code your agents write.
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
