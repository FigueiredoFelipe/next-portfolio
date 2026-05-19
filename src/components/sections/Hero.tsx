'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

interface Props {
  openToWork: boolean
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero({ openToWork }: Props) {
  const reduced = useReducedMotion()

  const Wrapper = reduced ? 'div' : motion.div
  const wrapperProps = reduced ? {} : { variants: stagger, initial: 'hidden', animate: 'visible' }
  const Item = reduced ? 'div' : motion.div
  const itemProps = reduced ? {} : { variants: fadeUp }

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
      <div className="grid md:grid-cols-[300px_1fr] gap-10 md:gap-16 items-start">
        {/* Photo — rectangular, no circular mask. Breaks the avatar trope. */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 12 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-1 md:order-none"
        >
          <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-sm overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
            <Image
              src="/profile-new.jpg"
              alt="Felipe Figueiredo"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 300px"
            />
          </div>
          <p className="mt-4 text-[11px] tracking-[0.06em] text-[var(--text-muted)]">
            Belo Horizonte, BR · Working remote
          </p>
        </motion.div>

        {/* Prose */}
        <Wrapper {...(wrapperProps as object)} className="order-2 md:order-none pt-2">
          {openToWork && (
            <Item {...(itemProps as object)}>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--text-muted)]">
                  Open to senior roles · 2026
                </span>
              </div>
            </Item>
          )}

          <Item {...(itemProps as object)}>
            <h1
              className="font-display tracking-tight text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.03em' }}
            >
              <span className="font-medium">Hey, I&rsquo;m </span>
              <span className="font-extrabold">Felipe</span>
              <span className="font-medium">.</span>
            </h1>
          </Item>

          <div className="mt-6 max-w-[600px] text-[var(--text-secondary)] text-[17px] leading-[1.6]" style={{ textWrap: 'pretty' as 'pretty' }}>
            <Item {...(itemProps as object)}>
              <p className="mb-4">
                I&rsquo;m a{' '}
                <span className="text-[var(--text-primary)] font-semibold">Senior Product Engineer</span>{' '}
                building AI-native apps with Next.js, Supabase and LLMs. Six years shipping production
                web and mobile — currently focused on{' '}
                <span className="text-[var(--text-primary)] font-semibold">GPT-4 features</span>{' '}
                on iOS and Android, and going deep on{' '}
                <span className="text-[var(--text-primary)] font-semibold">Anthropic&rsquo;s Claude Code</span>{' '}
                for AI-native dev workflows.
              </p>
            </Item>
            <Item {...(itemProps as object)}>
              <p className="mb-4">
                Unusual route in: a decade of law before I switched to engineering full-time,
                CS50 from Harvard on the side. The legal training shows up in how I think about
                architecture — precision, edge cases, what happens when things go wrong.
              </p>
            </Item>
            <Item {...(itemProps as object)}>
              <p className="text-[15px] text-[var(--text-muted)] m-0">
                Looking for senior remote roles with hard problems and product-minded teams.
              </p>
            </Item>
          </div>

          <Item {...(itemProps as object)}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/writing"
                className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors"
              >
                Read case studies →
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-[var(--text-secondary)] border-b border-transparent hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] pb-0.5 transition-colors"
              >
                Get in touch
              </Link>
              <a
                href="https://github.com/FigueiredoFelipe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <FaGithub size={20} />
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
            </div>
          </Item>
        </Wrapper>
      </div>
    </section>
  )
}
