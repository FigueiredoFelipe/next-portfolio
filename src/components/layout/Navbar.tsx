'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HiMenu } from 'react-icons/hi'
import ThemeToggle from '../UI/ThemeToggle'
import MobileDrawer from './MobileDrawer'

const links = [
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-light tracking-[0.25em] uppercase text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Felipe Figueiredo
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <HiMenu size={22} />
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
