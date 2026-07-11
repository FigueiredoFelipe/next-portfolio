import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/UI/AnimatedSection'

export const metadata: Metadata = {
  title: 'Where Do the Senior Engineers of 2035 Come From? — Essay',
  description:
    "AI absorbed the exact work that used to forge juniors. The market hasn't priced the bill it's about to receive.",
  openGraph: {
    title: 'Where Do the Senior Engineers of 2035 Come From?',
    description:
      "AI absorbed the exact work that used to forge juniors. The market hasn't priced the bill it's about to receive.",
    url: 'https://felipefigueiredodev.vercel.app/writing/seniority-2035',
    images: [
      {
        url: '/og/seniority-2035.png',
        width: 1200,
        height: 627,
        alt: 'A floating staircase ascending toward the light with its bottom steps missing',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where Do the Senior Engineers of 2035 Come From?',
    description:
      "AI absorbed the exact work that used to forge juniors. The market hasn't priced the bill it's about to receive.",
    images: ['/og/seniority-2035.png'],
  },
}

// ─── Content ──────────────────────────────────────────────────────────────────

const LEAD = "Seniority isn't hired. It's forged."

const INTRO = [
  "And it's forged one way only: by doing, breaking, and fixing. It's the CRUD you wrote three times before you realized the query was missing an index. It's the bug you shipped to production at eleven at night and chased until sunrise. It's the call that felt right and billed you for it six months later. No course teaches that. No degree fast-forwards it. It's scar tissue. It takes years, and there's no shortcut.",
  "Let me cut straight to the spreadsheet, because that's where this story ends: cutting the entry-level rung to save money is the most expensive financial decision a tech company can make right now — it just doesn't show up this quarter. And AI just made that bill far bigger than almost anyone is willing to admit.",
]

const LADDER = [
  "The public conversation has the problem backwards. Everyone asks whether AI will replace the engineer. The useful question is a different one: which task did it absorb first? The answer is uncomfortable. The boilerplate. The trivial React component. The FastAPI endpoint that does nothing but an insert. The obvious test. The simple migration. The one-line bug.",
  "That was the apprentice's work. And not by accident — it was cheap to hand to a junior precisely because it was low-risk and high-repetition. It was the training ground, where your hands built calluses before you touched anything that mattered. AI didn't remove the top of the profession. It dissolved the bottom rung, the only one you can start climbing from — and nobody has redesigned the ladder you're supposed to climb now.",
]

const OBJECTIONS_INTRO =
  'The seasoned skeptic has three rebuttals, and they deserve to be met without a discount.'

const OBJECTIONS = [
  {
    tag: 'Objection 01',
    lead: 'The track record',
    body: 'The compiler, the high-level language, Stack Overflow, the framework — each leap ate a rung of learning, and seniority kept forming anyway. True. But those leaps automated the typing: they wrote the code for you. AI automates the repetitive judgment — it decides, and deciding was exactly the muscle the bottom rung trained. Offloading the grunt work is one thing. Absorbing the discernment that grunt work was teaching is another.',
  },
  {
    tag: 'Objection 02',
    lead: 'Productivity',
    body: "If AI makes every senior five times faster, teams need fewer people and demand falls alongside supply. Except generation throughput isn't delivery throughput. Every line the machine spits out is a liability until someone confirms it's correct. The bottleneck doesn't vanish — it shifts from writing to judgment, and judgment doesn't scale with a prompt.",
  },
  {
    tag: 'Objection 03 · strongest',
    lead: 'Demand',
    body: "Cheaper software has historically increased the appetite for software — that's Jevons paradox. But the bridge that closes the argument usually stays implicit, so let me make it explicit: more cheap systems in production means more surface that fails, integrates wrong, and needs maintaining. And every one of those surfaces needs someone who can judge whether it's still standing. Not just any software pulls on senior judgment — software that lives in production does. And that's exactly the kind that multiplies.",
  },
]

const FLANK =
  "There's one hypothesis that would dissolve all of this, and it would be dishonest not to name it: if AI climbs the value chain and starts reliably verifying its own output, the scarcity never materializes. Then there's no shortage of people to judge — the machine judges. The entire thesis rests on a single axiom: judgment remains the thing AI does worst, and verifying what it produces still takes someone who has actually broken things for real. If that axiom falls, the bill disappears. But betting on it is betting on a capability far beyond what today's tools can sustain. I don't build market strategy on a promise that hasn't shipped."

const BILL_TAIL = [
  "And don't count on importing your way out. The training pipelines dry up at different rates by region — the culture of hiring juniors varies — but they dry up everywhere, because AI ate the apprentice's work in every language. Geographic arbitrage only works when one reservoir is full while another runs low. This time, they all run low.",
  "The senior supply is a cohort that ages, and the pipeline has hysteresis: it takes five to eight years of exposure to real risk for a beginner to mature into someone who decides alone. The entry you cut today doesn't become a shortage tomorrow — it becomes a shortage when that cohort should be seasoned and simply isn't there. Fewer people climbing, demand for judgment rising, and the price of the one profile that can verify what AI produces rises right along with it. None of this is destiny: it depends on where AI goes and on who decides to switch the conveyor back on in time. But on the current trajectory, whoever saved on training buys the same engineer back later — marked up, and fought over tooth and nail.",
]

const WHATTODO = [
  "This isn't nostalgia. Nobody's going to hand the boilerplate back to the junior just to make them suffer. The point is finer than that: AI moved where the entry rung sits, it didn't abolish the need for one. Training today means pairing the beginner with the machine and teaching them to distrust it — review what it generates, understand why it works, break it on purpose to see how it fails. That's more work than handing off a CRUD. Which is exactly why almost nobody is doing it.",
  "Whoever forges seniors today is building the one asset that's about to go scarce. Whoever only consumes them is burning a resource nobody is replacing. AI didn't end the making of engineers. It just put a higher price on it — and handed the market a chance to pretend the bill doesn't exist.",
]

const CLOSER = 'It exists. And it comes due at double — in the very engineer nobody bothered to forge.'

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

function ObjectionCard({ tag, lead, body }: { tag: string; lead: string; body: string }) {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm p-5">
      <p className="font-mono text-[0.6rem] tracking-widest uppercase text-emerald-500 mb-3">{tag}</p>
      <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-2">{lead}</h3>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{body}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SeniorityPage() {
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
          Essay · AI &amp; Engineering Careers
        </p>

        <h1 className="font-display font-semibold text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-4">
          Where do the senior engineers of 2035 come from?
        </h1>

        <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-10 max-w-prose">
          AI absorbed the exact work that used to forge juniors. The market hasn&apos;t priced the
          bill it&apos;s about to receive.
        </p>
      </AnimatedSection>

      {/* ── Hero image ── */}
      <AnimatedSection delay={0.05}>
        <div className="relative aspect-[1.9/1] w-full overflow-hidden rounded-sm border border-[var(--border)]">
          <Image
            src="/og/seniority-2035.png"
            alt="A floating staircase ascending toward the light with its bottom steps missing"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <p className="text-center text-[0.6rem] font-mono tracking-widest uppercase text-[var(--text-muted)] mt-3 mb-16">
          The ladder still climbs — the first steps are gone
        </p>
      </AnimatedSection>

      {/* ── Lead ── */}
      <AnimatedSection delay={0.07}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <p className="font-display font-light text-2xl md:text-[1.75rem] leading-snug tracking-tight text-[var(--text-primary)] mb-8">
            {LEAD}
          </p>
          {INTRO.map((p, i) => (
            <P key={i}>{p}</P>
          ))}
        </div>
      </AnimatedSection>

      {/* ── 01 The ladder ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="01" title="The machine didn't replace the senior. It moved the ladder" />
          {LADDER.map((p, i) => (
            <P key={i}>{p}</P>
          ))}
        </div>
      </AnimatedSection>

      {/* ── 02 Three objections ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="02" title="Three objections, head-on" />
          <P>{OBJECTIONS_INTRO}</P>
          <div className="grid md:grid-cols-3 gap-3 mt-6">
            {OBJECTIONS.map((o) => (
              <ObjectionCard key={o.tag} tag={o.tag} lead={o.lead} body={o.body} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 03 The honest flank ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="03" title="The honest flank" />
          <div className="border-l-2 border-amber-500 bg-[rgba(245,158,11,0.06)] rounded-sm px-6 py-6">
            <p className="text-sm text-[var(--text-secondary)] leading-[1.8]">{FLANK}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 04 The bill ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="04" title="The bill is economic, it's global, and it's coming" />
          <P>
            {'Individually, cutting the entry rung is rational. Why should '}
            <em className="italic text-[var(--text-primary)]">I</em>
            {" pay to train someone, when AI covers the junior work and the person can walk anyway? Every company runs that math, every one is right for its own quarter, and together they break the next decade's market. It's the tragedy of the commons in software form: everyone consumes seniors, nobody restocks the shelf."}
          </P>
          {BILL_TAIL.map((p, i) => (
            <P key={i}>{p}</P>
          ))}
        </div>
      </AnimatedSection>

      {/* ── 05 What to do ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 pb-10">
          <SectionLabel n="05" title="What to do with this" />
          {WHATTODO.map((p, i) => (
            <P key={i}>{p}</P>
          ))}
          <p className="font-display font-light text-xl md:text-2xl leading-snug tracking-tight text-[var(--text-primary)] mt-6 max-w-prose">
            {CLOSER}
          </p>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection delay={0.05}>
        <div className="border-t border-[var(--border)] pt-10 text-center">
          <p className="font-display font-light text-xl text-[var(--text-primary)] mb-2">
            Building an engineering team that lasts?
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-8">
            I&apos;m a senior fullstack engineer available for remote work — from architecture to
            AI-native systems.
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
