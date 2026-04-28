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
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero({ openToWork }: Props) {
  const reduced = useReducedMotion()

  const Wrapper = reduced ? 'div' : motion.div
  const wrapperProps = reduced ? {} : { variants: stagger, initial: 'hidden', animate: 'visible' }
  const Item = reduced ? 'div' : motion.div
  const itemProps = reduced ? {} : { variants: fadeUp }

  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-12">
        <Wrapper {...(wrapperProps as object)} className="flex-1">
          <Item {...(itemProps as object)}>
            <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4 font-light">
              Fullstack Developer
            </p>
          </Item>
          <Item {...(itemProps as object)}>
            <h1 className="font-display leading-[1.1] tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              <span className="font-light text-[var(--text-primary)]">Hello, I&apos;m</span>
              <br />
              <span className="font-light text-[var(--text-primary)]">Felipe</span>
              <br />
              <span className="font-extrabold text-[var(--text-primary)]">Figueiredo.</span>
            </h1>
          </Item>
          <Item {...(itemProps as object)}>
            <p className="text-sm text-[var(--text-muted)] mb-8">
              Belo Horizonte, Brazil
            </p>
          </Item>
          <Item {...(itemProps as object)}>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/projects"
                className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors"
              >
                View my work
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
          {openToWork && (
            <Item {...(itemProps as object)}>
              <div className="inline-flex items-center gap-2 mt-6 px-3 py-1.5 border border-[var(--border)] rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-[var(--text-muted)] tracking-wider">Open to work</span>
              </div>
            </Item>
          )}
        </Wrapper>

        <motion.div
          className="flex justify-center md:justify-end"
          initial={reduced ? {} : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
            <Image
              src="/profile-pic.png"
              alt="Felipe Figueiredo"
              fill
              priority
              className="object-cover rounded-full"
              sizes="(max-width: 768px) 160px, 200px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
