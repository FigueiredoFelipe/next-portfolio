'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiSun, HiMoon } from 'react-icons/hi'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
    >
      {theme === 'dark' ? <HiSun size={18} /> : <HiMoon size={18} />}
    </button>
  )
}
