'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ThemeToggle from '../UI/ThemeToggle'

const links = [
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileDrawer({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed top-0 right-0 h-full w-[min(280px,80vw)] bg-[var(--bg)] border-l border-[var(--border)] z-50 flex flex-col p-8 md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="flex justify-end mb-12">
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-2xl"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-8">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="text-xl font-light tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors min-h-[48px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
