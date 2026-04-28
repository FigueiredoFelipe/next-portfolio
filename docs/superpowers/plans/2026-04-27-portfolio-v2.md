# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full overhaul of felipefigueiredodev.vercel.app — Elegant & Minimal redesign, Sanity CMS, individual project pages, mobile nav, Framer Motion animations, and complete SEO. Zero Google Search Console alerts.

**Architecture:** Next.js 13 App Router codebase. Sanity CMS (project `felipe-snr`, ID `8yzpbmmx`) serves all project content. Homepage and `/projects` use ISR (`revalidate: 60`); `/projects/[slug]` uses SSG (`generateStaticParams`). New component tree replaces existing components. All work on branch `feature/portfolio-v2`.

**Tech Stack:** Next.js 13 (App Router), TypeScript strict, Tailwind CSS, Framer Motion ^11, Sanity v3, next-sanity ^9, @portabletext/react ^3, @sanity/image-url ^1

**⚠️ Test checkpoint:** After Task 15 (homepage composed), run `npm run dev` and open `http://localhost:3000` to verify the full redesign visually.

---

## Task 1: Install dependencies + update next.config.js

**Files:**
- Modify: `package.json`
- Modify: `next.config.js`

- [ ] **Step 1.1: Install new packages**

```bash
cd /Users/figueiredo/code/next-portfolio
npm install framer-motion next-sanity sanity @portabletext/react @sanity/image-url
```

Expected output: `added N packages` with no errors.

- [ ] **Step 1.2: Replace next.config.js**

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}

module.exports = nextConfig
```

- [ ] **Step 1.3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 1.4: Commit**

```bash
git add package.json package-lock.json next.config.js
git commit -m "feat: install framer-motion, sanity, portabletext deps"
```

---

## Task 2: TypeScript types

**Files:**
- Create: `src/lib/types.ts`

- [ ] **Step 2.1: Create types file**

```ts
// src/lib/types.ts
export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  coverImage?: SanityImage
  summary?: string
  body?: unknown[]
  techs?: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  order?: number
}

export interface SiteSettings {
  openToWork: boolean
}
```

- [ ] **Step 2.2: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 2.3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add TypeScript types for Sanity documents"
```

---

## Task 3: Sanity client + GROQ queries

**Files:**
- Create: `src/lib/sanity.ts`

- [ ] **Step 3.1: Create sanity client file**

```ts
// src/lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { groq } from 'next-sanity'
import { Project, SiteSettings, SanityImage } from './types'

export const client = createClient({
  projectId: '8yzpbmmx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export function urlFor(source: SanityImage) {
  return builder.image(source)
}

async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params ?? {})
  } catch (err) {
    console.error('[Sanity fetch error]', err)
    return null
  }
}

// Queries
const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id, title, slug, summary, coverImage, techs, githubUrl, liveUrl, featured, order
  }
`

const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc)[0...4] {
    _id, title, slug, summary, coverImage, techs, githubUrl, liveUrl
  }
`

const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, summary, body, coverImage, techs, githubUrl, liveUrl
  }
`

const projectSlugsQuery = groq`
  *[_type == "project"]{ "slug": slug.current }
`

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{ openToWork }
`

// Exported fetch functions
export async function getAllProjects(): Promise<Project[]> {
  return (await sanityFetch<Project[]>(projectsQuery)) ?? []
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await sanityFetch<Project[]>(featuredProjectsQuery)) ?? []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project>(projectBySlugQuery, { slug })
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const results = await sanityFetch<{ slug: string }[]>(projectSlugsQuery)
  return results?.map(r => r.slug) ?? []
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await sanityFetch<SiteSettings>(siteSettingsQuery)
  return { openToWork: result?.openToWork ?? false }
}
```

- [ ] **Step 3.2: Verify**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3.3: Commit**

```bash
git add src/lib/sanity.ts
git commit -m "feat: add Sanity client, image builder, and GROQ query functions"
```

---

## Task 4: Sanity schemas

**Files:**
- Create: `src/sanity/schema/project.ts`
- Create: `src/sanity/schema/siteSettings.ts`
- Create: `src/sanity/schema/index.ts`

- [ ] **Step 4.1: Create project schema**

```ts
// src/sanity/schema/project.ts
import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'summary', type: 'text', description: 'Short card description (~120 chars)' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'techs', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'githubUrl', type: 'url' }),
    defineField({ name: 'liveUrl', type: 'url' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', type: 'number', description: 'Lower = shown first' }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
```

- [ ] **Step 4.2: Create siteSettings schema**

```ts
// src/sanity/schema/siteSettings.ts
import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({
      name: 'openToWork',
      type: 'boolean',
      description: 'Show "Open to work" badge in the hero section',
      initialValue: true,
    }),
  ],
})
```

- [ ] **Step 4.3: Create schema index**

```ts
// src/sanity/schema/index.ts
import { projectType } from './project'
import { siteSettingsType } from './siteSettings'

export const schemaTypes = [projectType, siteSettingsType]
```

- [ ] **Step 4.4: Commit**

```bash
git add src/sanity/
git commit -m "feat: add Sanity schemas for project and siteSettings"
```

---

## Task 5: Configure sanity.config.ts + Studio route

**Files:**
- Modify: `sanity.config.ts` (currently empty)
- Create: `src/app/studio/[[...tool]]/page.tsx`

- [ ] **Step 5.1: Write sanity.config.ts**

```ts
// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/plugins/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'felipe-snr',
  projectId: '8yzpbmmx',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title('Content').items([
          S.listItem()
            .title('Site Settings')
            .id('siteSettings')
            .child(
              S.document()
                .schemaType('siteSettings')
                .documentId('siteSettings')
            ),
          S.divider(),
          ...S.documentTypeListItems().filter(
            (t) => !['siteSettings'].includes(t.getId()!)
          ),
        ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 5.2: Create studio route**

```bash
mkdir -p src/app/studio/\[\[...tool\]\]
```

```tsx
// src/app/studio/[[...tool]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 5.3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5.4: Commit**

```bash
git add sanity.config.ts src/app/studio/
git commit -m "feat: configure Sanity Studio at /studio route"
```

---

## Task 6: Deploy schema + migrate data

**Files:** No code changes — manual steps in Sanity Studio.

- [ ] **Step 6.1: Start dev server**

```bash
npm run dev
```

Open `http://localhost:3000/studio` in the browser.

- [ ] **Step 6.2: Create siteSettings document**

In the Studio sidebar, click "Site Settings" → fill `openToWork: true` → click Publish.

- [ ] **Step 6.3: Migrate all 8 projects**

For each project from `src/data/portData.json`, create a new "Project" document in Studio:

| portData field | Sanity field |
|---|---|
| `title` | `title` |
| `details` | `summary` |
| `techs` | `techs` (split by comma into array) |
| `github` | `githubUrl` |
| `liveDemo` | `liveUrl` |
| image file | `coverImage` (upload from `src/components/UI/img/`) |

Set `featured: true` for: Tiny Chat App AI, CRUD Angular, Investment Calculator, To-Do List.
Set `order` 1–8 matching current JSON order.
Publish each document.

- [ ] **Step 6.4: Add CORS origin**

In Sanity dashboard → `felipe-snr` project → API → CORS Origins → Add:
- `http://localhost:3000` (for dev)
- `https://felipefigueiredodev.vercel.app` (for prod)

- [ ] **Step 6.5: Verify data via GROQ**

In Studio → Vision tab, run:

```groq
*[_type == "project"] | order(order asc) { title, featured, order }
```

Expected: 8 documents returned.

---

## Task 7: Delete dead code

**Files:** Delete the following.

- [ ] **Step 7.1: Delete dead files**

```bash
rm src/components/Portfolio/_ProjectCopy.tsx
rm src/app/container.tsx
rm "src/components/_Container/Container.tsx"
rm "src/components/UI/img/ScrollToTop.tsx"
rm "src/components/UI/img/MODELO.xcf"
rm "src/components/UI/img/__goalslistapp.png"
rm "src/components/UI/img/___goalslistapp.png"
```

- [ ] **Step 7.2: Verify build still compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (these files were unused).

- [ ] **Step 7.3: Commit**

```bash
git add -A
git commit -m "chore: delete dead code and unused assets"
```

---

## Task 8: Global CSS tokens + dot-grid texture

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 8.1: Replace globals.css**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #f8f7f4;
  --bg-surface: #ffffff;
  --border: #e5e7eb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
}

.dark {
  --bg: #0d0f14;
  --bg-surface: #111318;
  --border: #1f2937;
  --text-primary: #f8fafc;
  --text-secondary: #4b5563;
  --text-muted: #374151;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--text-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Dot-grid texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0);
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 0;
}

.dark body::before {
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0);
}

/* Ensure content sits above the dot grid */
main, header, footer {
  position: relative;
  z-index: 1;
}
```

- [ ] **Step 8.2: Update tailwind.config.js to expose CSS vars**

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--bg-surface)',
        border: 'var(--border)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 8.3: Commit**

```bash
git add src/app/globals.css tailwind.config.js
git commit -m "feat: add CSS design tokens and dot-grid texture"
```

---

## Task 9: AnimatedSection utility component

**Files:**
- Create: `src/components/ui/AnimatedSection.tsx`

- [ ] **Step 9.1: Create AnimatedSection**

```tsx
// src/components/ui/AnimatedSection.tsx
'use client'

import { motion, useReducedMotion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        ...fadeUp,
        visible: {
          ...fadeUp.visible,
          transition: { duration: 0.5, ease: 'easeOut', delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 9.2: Commit**

```bash
git add src/components/ui/AnimatedSection.tsx
git commit -m "feat: add AnimatedSection with scroll-triggered fade-up"
```

---

## Task 10: ThemeToggle component

**Files:**
- Create: `src/components/ui/ThemeToggle.tsx`

- [ ] **Step 10.1: Create ThemeToggle**

```tsx
// src/components/ui/ThemeToggle.tsx
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
```

- [ ] **Step 10.2: Commit**

```bash
git add src/components/ui/ThemeToggle.tsx
git commit -m "feat: add accessible ThemeToggle component"
```

---

## Task 11: Navbar with mobile drawer

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/MobileDrawer.tsx`

- [ ] **Step 11.1: Create MobileDrawer**

```tsx
// src/components/layout/MobileDrawer.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ThemeToggle from '../ui/ThemeToggle'

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
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Drawer */}
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
```

- [ ] **Step 11.2: Create Navbar**

```tsx
// src/components/layout/Navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HiMenu } from 'react-icons/hi'
import ThemeToggle from '../ui/ThemeToggle'
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
          {/* Logo */}
          <Link
            href="/"
            className="text-xs font-light tracking-[0.25em] uppercase text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Felipe Figueiredo
          </Link>

          {/* Desktop nav */}
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

          {/* Mobile: hamburger */}
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
```

- [ ] **Step 11.3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 11.4: Commit**

```bash
git add src/components/layout/Navbar.tsx src/components/layout/MobileDrawer.tsx
git commit -m "feat: add Navbar with accessible mobile drawer"
```

---

## Task 12: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 12.1: Create Footer**

```tsx
// src/components/layout/Footer.tsx
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <p className="text-xs text-[var(--text-muted)] tracking-wider">
          © {year} Felipe Figueiredo
        </p>
        <div className="flex gap-4">
          <a
            href="https://linkedin.com/in/felipefigueiredo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://github.com/FigueiredoFelipe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 12.2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add Footer with dynamic year"
```

---

## Task 13: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Requires: `public/profile-pic.webp` (see Task 22 for conversion — use existing PNG for now)

- [ ] **Step 13.1: Create Hero**

```tsx
// src/components/sections/Hero.tsx
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
        {/* Text */}
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
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-2">
              React · NestJS · TypeScript · AI Integrations
            </p>
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
                href="https://linkedin.com/in/felipefigueiredo"
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

        {/* Photo */}
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
```

- [ ] **Step 13.2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 13.3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with split layout and Framer Motion"
```

---

## Task 14: About section

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 14.1: Create About**

```tsx
// src/components/sections/About.tsx
import AnimatedSection from '../ui/AnimatedSection'
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact,
  SiTailwindcss, SiNextdotjs, SiAngular, SiNestjs, SiDocker,
} from 'react-icons/si'

const techStack = [
  { icon: SiHtml5,       label: 'HTML5',      color: '#E34F26' },
  { icon: SiCss3,        label: 'CSS3',       color: '#1572B6' },
  { icon: SiJavascript,  label: 'JavaScript', color: '#F7DF1E' },
  { icon: SiTypescript,  label: 'TypeScript', color: '#3178C6' },
  { icon: SiReact,       label: 'React',      color: '#61DAFB' },
  { icon: SiTailwindcss, label: 'Tailwind',   color: '#06B6D4' },
  { icon: SiNextdotjs,   label: 'Next.js',    color: 'var(--text-primary)' },
  { icon: SiAngular,     label: 'Angular',    color: '#DD0031' },
  { icon: SiNestjs,      label: 'NestJS',     color: '#E0234E' },
  { icon: SiDocker,      label: 'Docker',     color: '#2496ED' },
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
        {/* Bio */}
        <AnimatedSection className="md:col-span-3">
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-4">
            I&apos;m a Fullstack Developer based in Belo Horizonte, Brazil, with experience building
            scalable web applications using React, NestJS, and TypeScript.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-4">
            I care about clean architecture, developer experience, and shipping things that work.
            Recently I&apos;ve been integrating AI models — like Gemini LLM — into fullstack applications.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed text-sm">
            Open to new opportunities — feel free to reach out.
          </p>
        </AnimatedSection>

        {/* Tech Stack */}
        <AnimatedSection className="md:col-span-2" delay={0.1}>
          <p className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-6 font-light">
            Tech Stack
          </p>
          <div className="grid grid-cols-5 gap-4">
            {techStack.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 group">
                <Icon
                  size={24}
                  style={{ color }}
                  className="opacity-70 group-hover:opacity-100 transition-opacity"
                  title={label}
                />
                <span className="text-[0.6rem] text-[var(--text-muted)] tracking-wide hidden sm:block">
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
```

- [ ] **Step 14.2: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: add About section with bio and tech stack icons"
```

---

## Task 15: ProjectCard + SelectedWork section

**Files:**
- Create: `src/components/projects/ProjectCard.tsx`
- Create: `src/components/sections/SelectedWork.tsx`

- [ ] **Step 15.1: Create ProjectCard**

```tsx
// src/components/projects/ProjectCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Project, SanityImage } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface Props {
  project: Project
}

function TechTag({ label }: { label: string }) {
  return (
    <span className="text-[0.6rem] tracking-widest uppercase px-2 py-0.5 border border-[var(--border)] text-[var(--text-muted)] rounded-sm">
      {label}
    </span>
  )
}

export default function ProjectCard({ project }: Props) {
  const imgSrc = project.coverImage
    ? urlFor(project.coverImage as SanityImage).width(800).height(450).url()
    : null

  const visibleTechs = project.techs?.slice(0, 3) ?? []
  const extraCount = (project.techs?.length ?? 0) - 3

  return (
    <Link
      href={`/projects/${project.slug.current}`}
      className="group block bg-[var(--bg-surface)] border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--text-muted)] transition-colors"
    >
      {/* Cover image */}
      <div className="relative aspect-video bg-[var(--border)] overflow-hidden">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)] text-xs tracking-wider uppercase">
            No image
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-[var(--text-primary)] mb-2 text-sm leading-snug">
          {project.title}
        </h3>
        {project.summary && (
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
            {project.summary}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {visibleTechs.map((tech) => (
            <TechTag key={tech} label={tech} />
          ))}
          {extraCount > 0 && (
            <TechTag label={`+${extraCount}`} />
          )}
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 15.2: Create SelectedWork section**

```tsx
// src/components/sections/SelectedWork.tsx
import Link from 'next/link'
import { Project } from '@/lib/types'
import ProjectCard from '../projects/ProjectCard'
import AnimatedSection from '../ui/AnimatedSection'

interface Props {
  projects: Project[]
}

export default function SelectedWork({ projects }: Props) {
  return (
    <section id="selected-work" className="max-w-5xl mx-auto px-6 py-20 border-t border-[var(--border)]">
      <AnimatedSection className="flex items-baseline justify-between mb-10">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] font-light">
          Selected Work
        </p>
        <Link
          href="/projects"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border-b border-transparent hover:border-[var(--text-muted)] pb-0.5"
        >
          View all →
        </Link>
      </AnimatedSection>

      {projects.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No projects yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project._id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 15.3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 15.4: Commit**

```bash
git add src/components/projects/ProjectCard.tsx src/components/sections/SelectedWork.tsx
git commit -m "feat: add ProjectCard and SelectedWork section"
```

---

## Task 16: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 16.1: Create Contact**

```tsx
// src/components/sections/Contact.tsx
import AnimatedSection from '../ui/AnimatedSection'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Contact() {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-20 border-t border-[var(--border)]">
      <AnimatedSection>
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-10 font-light">
          Contact
        </p>
        <h2 className="font-display font-light text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-4">
          Get in touch.
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-8 max-w-md leading-relaxed">
          I&apos;m open to new opportunities. Feel free to reach out — I reply to everyone.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="mailto:fjnfigueiredo@gmail.com"
            className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors"
          >
            fjnfigueiredo@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/felipefigueiredo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/FigueiredoFelipe"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </AnimatedSection>
    </section>
  )
}
```

- [ ] **Step 16.2: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: add Contact section"
```

---

## Task 17: Compose homepage + update layout

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/Providers.tsx`

> **⚠️ TEST CHECKPOINT** — after this task, run `npm run dev` and open `http://localhost:3000`

- [ ] **Step 17.1: Update Providers.tsx**

```tsx
// src/app/Providers.tsx
'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}
```

- [ ] **Step 17.2: Update layout.tsx**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Providers from './Providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://felipefigueiredodev.vercel.app'),
  title: 'Felipe Figueiredo — Fullstack Developer',
  description: 'Fullstack Developer from Belo Horizonte, Brazil. Building scalable web apps with React, NestJS, and TypeScript.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Felipe Figueiredo — Fullstack Developer',
    description: 'Fullstack Developer from Belo Horizonte, Brazil. Building scalable web apps with React, NestJS, and TypeScript.',
    url: 'https://felipefigueiredodev.vercel.app',
    siteName: 'Felipe Figueiredo',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Felipe Figueiredo — Fullstack Developer' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Figueiredo — Fullstack Developer',
    description: 'Fullstack Developer from Belo Horizonte, Brazil. Building scalable web apps with React, NestJS, and TypeScript.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
```

- [ ] **Step 17.3: Rewrite homepage page.tsx**

```tsx
// src/app/page.tsx
import { getFeaturedProjects, getSiteSettings } from '@/lib/sanity'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import SelectedWork from '@/components/sections/SelectedWork'
import Contact from '@/components/sections/Contact'

export const revalidate = 60

export default async function HomePage() {
  const [featuredProjects, siteSettings] = await Promise.all([
    getFeaturedProjects(),
    getSiteSettings(),
  ])

  return (
    <>
      <Hero openToWork={siteSettings.openToWork} />
      <About />
      <SelectedWork projects={featuredProjects} />
      <Contact />
    </>
  )
}
```

- [ ] **Step 17.4: Start dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000` — verify:
- [ ] Navbar with logo left, links right, dark toggle
- [ ] Hero: name, photo, CTA, Open to Work badge (if openToWork=true in Sanity)
- [ ] About: bio text + tech stack icons
- [ ] Selected Work: project cards from Sanity
- [ ] Contact: email + social links
- [ ] Footer: year + social links
- [ ] Dark mode toggle works
- [ ] Mobile: hamburger opens drawer

- [ ] **Step 17.5: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx src/app/Providers.tsx
git commit -m "feat: compose homepage with Sanity data — Elegant & Minimal redesign"
```

---

## Task 18: /projects page

**Files:**
- Create: `src/app/projects/page.tsx`
- Create: `src/app/projects/loading.tsx`
- Create: `src/app/projects/error.tsx`

- [ ] **Step 18.1: Create projects page**

```tsx
// src/app/projects/page.tsx
import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/sanity'
import ProjectCard from '@/components/projects/ProjectCard'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Projects — Felipe Figueiredo',
  description: 'All the things I\'ve built — React, NestJS, TypeScript, and more.',
  alternates: { canonical: '/projects' },
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      <AnimatedSection className="mb-16">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-4 font-light">
          Work
        </p>
        <h1 className="font-display font-light text-4xl md:text-5xl tracking-tight text-[var(--text-primary)]">
          All the things<br />
          <span className="font-extrabold">I&apos;ve built.</span>
        </h1>
      </AnimatedSection>

      {projects.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No projects yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project._id} delay={i * 0.06}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 18.2: Create loading skeleton**

```tsx
// src/app/projects/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-20 pb-24">
      <div className="h-16 w-64 bg-[var(--border)] rounded animate-pulse mb-16" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border border-[var(--border)] rounded-sm overflow-hidden">
            <div className="aspect-video bg-[var(--border)] animate-pulse" />
            <div className="p-5 space-y-2">
              <div className="h-4 bg-[var(--border)] rounded animate-pulse w-3/4" />
              <div className="h-3 bg-[var(--border)] rounded animate-pulse" />
              <div className="h-3 bg-[var(--border)] rounded animate-pulse w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 18.3: Create error boundary**

```tsx
// src/app/projects/error.tsx
'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Something went wrong.</h2>
      <button
        onClick={reset}
        className="text-sm text-[var(--text-muted)] border border-[var(--border)] px-4 py-2 rounded-sm hover:text-[var(--text-primary)] transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
```

- [ ] **Step 18.4: Verify at `http://localhost:3000/projects`**

- [ ] **Step 18.5: Commit**

```bash
git add src/app/projects/
git commit -m "feat: add /projects page with grid, loading skeleton, and error boundary"
```

---

## Task 19: /projects/[slug] page

**Files:**
- Create: `src/components/projects/PortableTextRenderer.tsx`
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/app/projects/[slug]/loading.tsx`

- [ ] **Step 19.1: Create PortableText renderer**

```tsx
// src/components/projects/PortableTextRenderer.tsx
import { PortableText, PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-semibold text-xl text-[var(--text-primary)] mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-[var(--text-secondary)] leading-relaxed mb-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1 mb-4 pl-2">{children}</ul>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="bg-[var(--border)] text-[var(--text-primary)] px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--text-primary)] border-b border-[var(--text-muted)] hover:border-[var(--text-primary)] transition-colors"
      >
        {children}
      </a>
    ),
  },
}

export default function PortableTextRenderer({ value }: { value: unknown[] }) {
  return <PortableText value={value} components={components} />
}
```

- [ ] **Step 19.2: Create slug page**

```tsx
// src/app/projects/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug, getAllProjectSlugs, urlFor } from '@/lib/sanity'
import { SanityImage } from '@/lib/types'
import PortableTextRenderer from '@/components/projects/PortableTextRenderer'
import AnimatedSection from '@/components/ui/AnimatedSection'

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}
  const ogImage = project.coverImage
    ? urlFor(project.coverImage as SanityImage).width(1200).height(630).url()
    : '/og-image.png'
  return {
    title: `${project.title} — Felipe Figueiredo`,
    description: project.summary ?? 'A project by Felipe Figueiredo.',
    alternates: { canonical: `/projects/${params.slug}` },
    openGraph: {
      title: `${project.title} — Felipe Figueiredo`,
      description: project.summary ?? 'A project by Felipe Figueiredo.',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Felipe Figueiredo`,
      images: [ogImage],
    },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  const coverSrc = project.coverImage
    ? urlFor(project.coverImage as SanityImage).width(1200).height(675).url()
    : null

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">
      {/* Back link */}
      <AnimatedSection>
        <Link
          href="/projects"
          className="text-xs tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-2 mb-10"
        >
          ← All Projects
        </Link>
      </AnimatedSection>

      {/* Cover image */}
      {coverSrc && (
        <AnimatedSection className="mb-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-[var(--border)]">
            <Image src={coverSrc} alt={project.title} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        </AnimatedSection>
      )}

      {/* Title */}
      <AnimatedSection className="mb-6">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-[var(--text-primary)] mb-4">
          {project.title}
        </h1>

        {/* Tech tags */}
        {project.techs && project.techs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="text-[0.6rem] tracking-widest uppercase px-2.5 py-1 border border-[var(--border)] text-[var(--text-muted)] rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors"
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </AnimatedSection>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-8" />

      {/* Rich text body */}
      {project.body && project.body.length > 0 && (
        <AnimatedSection>
          <PortableTextRenderer value={project.body as unknown[]} />
        </AnimatedSection>
      )}
    </div>
  )
}
```

- [ ] **Step 19.3: Create slug loading skeleton**

```tsx
// src/app/projects/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-24 space-y-6 animate-pulse">
      <div className="h-4 w-24 bg-[var(--border)] rounded" />
      <div className="aspect-video bg-[var(--border)] rounded-sm" />
      <div className="h-8 w-3/4 bg-[var(--border)] rounded" />
      <div className="space-y-2">
        <div className="h-4 bg-[var(--border)] rounded" />
        <div className="h-4 bg-[var(--border)] rounded w-5/6" />
        <div className="h-4 bg-[var(--border)] rounded w-4/6" />
      </div>
    </div>
  )
}
```

- [ ] **Step 19.4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 19.5: Verify at `http://localhost:3000/projects/[any-slug]`**

- [ ] **Step 19.6: Commit**

```bash
git add src/app/projects/\[slug\]/ src/components/projects/PortableTextRenderer.tsx
git commit -m "feat: add /projects/[slug] page with generateStaticParams and dynamic SEO"
```

---

## Task 20: 404 page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 20.1: Create not-found page**

```tsx
// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
      <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-6 font-light">404</p>
      <h1 className="font-display font-light text-4xl tracking-tight text-[var(--text-primary)] mb-4">
        Page not found.
      </h1>
      <p className="text-sm text-[var(--text-secondary)] mb-10">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-sm font-semibold text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-secondary)] hover:border-[var(--text-secondary)] transition-colors"
      >
        ← Back home
      </Link>
    </div>
  )
}
```

- [ ] **Step 20.2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: add 404 not-found page"
```

---

## Task 21: sitemap + robots

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 21.1: Create sitemap**

```ts
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllProjectSlugs } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProjectSlugs()
  const base = 'https://felipefigueiredodev.vercel.app'

  const projectRoutes = slugs.map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...projectRoutes,
  ]
}
```

- [ ] **Step 21.2: Create robots.ts**

```ts
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/studio/' },
    sitemap: 'https://felipefigueiredodev.vercel.app/sitemap.xml',
  }
}
```

- [ ] **Step 21.3: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: add sitemap.ts and robots.ts for SEO"
```

---

## Task 22: JSON-LD structured data

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 22.1: Add Person schema to homepage**

Add this at the top of the JSX returned by `HomePage`, before `<Hero>`:

```tsx
// Add to src/app/page.tsx — inside the return, as first child
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Felipe Figueiredo',
      url: 'https://felipefigueiredodev.vercel.app',
      jobTitle: 'Fullstack Developer',
      sameAs: [
        'https://github.com/FigueiredoFelipe',
        'https://linkedin.com/in/felipefigueiredo',
      ],
    }),
  }}
/>
```

Wrap the return in a Fragment (`<>...</>`).

- [ ] **Step 22.2: Add SoftwareApplication schema to project page**

Add inside the `ProjectPage` return, before the back link:

```tsx
// Add to src/app/projects/[slug]/page.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.title,
      description: project.summary,
      url: project.liveUrl ?? `https://felipefigueiredodev.vercel.app/projects/${params.slug}`,
      applicationCategory: 'WebApplication',
      author: {
        '@type': 'Person',
        name: 'Felipe Figueiredo',
      },
    }),
  }}
/>
```

- [ ] **Step 22.3: Commit**

```bash
git add src/app/page.tsx src/app/projects/\[slug\]/page.tsx
git commit -m "feat: add schema.org JSON-LD for Person and SoftwareApplication"
```

---

## Task 23: Move favicons to correct location

**Files:**
- Move files from `src/components/UI/img/favicon_io/` → `public/`

- [ ] **Step 23.1: Copy favicons to public**

```bash
cp src/components/UI/img/favicon_io/favicon.ico public/
cp src/components/UI/img/favicon_io/favicon-16x16.png public/
cp src/components/UI/img/favicon_io/favicon-32x32.png public/
cp "src/components/UI/img/favicon_io/apple-touch-icon.png" public/apple-touch-icon.png
cp "src/components/UI/img/favicon_io/android-chrome-192x192.png" public/
cp "src/components/UI/img/favicon_io/android-chrome-512x512.png" public/
cp "src/components/UI/img/favicon_io/site.webmanifest" public/
```

- [ ] **Step 23.2: Verify icons appear in layout.tsx**

`layout.tsx` already has `icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' }` — no change needed.

- [ ] **Step 23.3: Commit**

```bash
git add public/
git commit -m "chore: move favicons to /public for App Router convention"
```

---

## Task 24: Convert profile photo to webp

- [ ] **Step 24.1: Convert using sips (macOS built-in)**

```bash
sips -s format webp src/components/UI/img/profile-pic.png --out public/profile-pic.webp
```

Expected: `public/profile-pic.webp` created, much smaller than original 965 KB.

- [ ] **Step 24.2: Update Hero.tsx to use webp**

In `src/components/sections/Hero.tsx`, change:
```tsx
src="/profile-pic.png"
```
to:
```tsx
src="/profile-pic.webp"
```

- [ ] **Step 24.3: Commit**

```bash
git add public/profile-pic.webp src/components/sections/Hero.tsx
git commit -m "perf: convert profile photo to webp and serve from /public"
```

---

## Task 25: Final build verification

- [ ] **Step 25.1: Run production build**

```bash
npm run build
```

Expected: no TypeScript errors, no build failures. Note any warnings.

- [ ] **Step 25.2: Run production server**

```bash
npm run start
```

Open `http://localhost:3000` — verify everything works in production mode.

- [ ] **Step 25.3: Check sitemap**

Open `http://localhost:3000/sitemap.xml` — verify all routes listed.

- [ ] **Step 25.4: Check robots**

Open `http://localhost:3000/robots.txt` — verify content.

- [ ] **Step 25.5: Test SEO**

Go to [Google Rich Results Test](https://search.google.com/test/rich-results) and test:
- `https://felipefigueiredodev.vercel.app` (after deploy) or use a URL inspection tool locally

- [ ] **Step 25.6: Verify Open Graph**

Use [opengraph.xyz](https://www.opengraph.xyz) to preview how the site looks when shared on LinkedIn/WhatsApp. (After deploy.)

- [ ] **Step 25.7: Final commit**

```bash
git add -A
git status  # ensure nothing untracked is left
git commit -m "feat: portfolio v2 complete — Elegant & Minimal redesign with Sanity CMS and full SEO" --allow-empty
```

- [ ] **Step 25.8: Open PR**

```bash
gh pr create \
  --title "feat: portfolio v2 — Elegant & Minimal redesign" \
  --body "Full overhaul per spec docs/superpowers/specs/2026-04-27-portfolio-v2-design.md

## Changes
- Elegant & Minimal visual redesign (light default + dark toggle)
- Sanity CMS integration — projects managed via Studio at /studio
- Individual project pages at /projects/[slug] with SSG
- Framer Motion scroll-triggered animations
- Mobile hamburger drawer navigation
- Full SEO: OG tags, Twitter Card, sitemap, robots, JSON-LD
- Code cleanup: removed dead files and legacy assets
- Profile photo converted to .webp

## Test
- \`npm run build\` passes with zero errors
- All routes verified visually on localhost:3000" \
  --base master
```

---

## Summary

| Phase | Tasks | Test checkpoint |
|---|---|---|
| Foundation | 1–3 | `npx tsc --noEmit` passes |
| Sanity | 4–6 | Studio at `/studio`, 8 projects in DB |
| Cleanup | 7 | Build still passes |
| UI Foundation | 8–10 | CSS tokens, AnimatedSection, ThemeToggle |
| Layout | 11–12 | Navbar + Footer components |
| Sections | 13–16 | Hero, About, SelectedWork, Contact |
| **Homepage** | **17** | **⚠️ `http://localhost:3000` — full visual check** |
| Project pages | 18–19 | `/projects` and `/projects/[slug]` |
| SEO | 20–23 | sitemap.xml, robots.txt, JSON-LD, 404 |
| Assets | 24 | profile-pic.webp |
| **Final** | **25** | **`npm run build` passes + PR opened** |
