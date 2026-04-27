# Portfolio v2 — Design Spec

**Date:** 2026-04-27
**Status:** Approved
**Branch:** feature/portfolio-v2 (to be created)

---

## Overview

Full overhaul of Felipe Figueiredo's portfolio. The current site is a functional Next.js 13 SPA with a manually maintained JSON data file, minimal SEO, no mobile navigation, and no animations. This spec defines a comprehensive upgrade: new visual identity, Sanity CMS integration, individual project pages, and complete SEO implementation.

---

## 1. Visual Identity

**Style:** Elegant & Minimal
- Off-white background (`#f8f7f4`) with a subtle dot-grid texture
- Generous whitespace, refined typography, thin divider lines
- No heavy shadows, no rounded blobs, no gradient overload

**Typography:**
- Keep existing Google Fonts (`Inter` + `Poppins`) — already optimized via `next/font`
- Hero name: large weight contrast (300 light / 800 bold) with negative letter-spacing

**Theme:** Light default with dark toggle
- `next-themes` already installed — keep it
- Dark variant: background `#0d0f14`, text `#f8fafc`, borders `#1f2937`
- Toggle must be accessible and visible in the navbar

**Motion:** Framer Motion — subtle only
- Fade-in + slide-up on section entry (triggered by scroll via `whileInView`)
- Hero text staggered reveal on page load
- No looping animations, no parallax, no distracting effects
- Respect `prefers-reduced-motion`

**Language:** English throughout — all UI copy rewritten.

---

## 2. Site Structure

### Routes

| Route | Description | Status |
|---|---|---|
| `/` | Homepage — Hero, About, Selected Work, Contact | Redesign existing |
| `/projects` | All projects grid | New |
| `/projects/[slug]` | Individual project case study | New |
| `/studio` | Embedded Sanity Studio | New |

### Homepage Sections (scroll order)

1. **Navbar** — sticky, logo left, links right, dark toggle, mobile hamburger menu
2. **Hero** — split layout: text left, circular profile photo right
3. **About** — bio text + tech stack icons
4. **Selected Work** — 3–4 featured projects pulled from Sanity (`featured: true`)
5. **Contact** — email + LinkedIn + GitHub links (static, no form)
6. **Footer** — copyright, social links

### `/projects` page

- Full grid of all projects from Sanity, ordered by `order` field
- Filter by tech tag (optional stretch goal — skip if it adds complexity)

### `/projects/[slug]` page

- Cover image (full width)
- Title, tech tags, links (GitHub + live demo)
- Rich text body (rendered via `@portabletext/react`)
- Back link to `/projects`
- Individual SEO metadata per project

---

## 3. Hero Section

**Layout:** Split — text left, photo right

```
┌─────────────────────────────────────────┐
│ Felipe          Work  About  Contact  🌙 │
├─────────────────────────────────────────┤
│                                         │
│  Fullstack Developer          [photo]   │
│                                         │
│  Hello, I'm                    ○○○      │
│  Felipe                                 │
│  Figueiredo.                            │
│                                         │
│  React · NestJS · TypeScript            │
│  BH, Brazil · Open to work              │
│                                         │
│  View my work    GitHub ↗  LinkedIn ↗   │
│                                         │
└─────────────────────────────────────────┘
```

- Profile photo: circular, existing `profile-pic.png` (converted to `.webp`)
- "Open to work" badge: controlled via a `siteSettings` Sanity document with a boolean field `openToWork`. When `true`, badge is visible in hero. This lets you toggle it without a redeploy.
- Framer Motion: text slides up staggered on load, photo fades in

---

## 4. Content Management — Sanity CMS

**Project:** `felipe-snr`
**Project ID:** `8yzpbmmx`
**Dataset:** `production`
**Credentials:** stored in `.env.local` (gitignored)

### Sanity Schema — `project` document type

```ts
{
  name: 'project',
  type: 'document',
  fields: [
    { name: 'title',       type: 'string',   required: true },
    { name: 'slug',        type: 'slug',     source: 'title', required: true },
    { name: 'coverImage',  type: 'image',    hotspot: true },
    { name: 'summary',     type: 'text',     description: 'Short description for cards (~120 chars)' },
    { name: 'body',        type: 'array',    of: [{ type: 'block' }], description: 'Rich text for project page' },
    { name: 'techs',       type: 'array',    of: [{ type: 'string' }] },
    { name: 'githubUrl',   type: 'url' },
    { name: 'liveUrl',     type: 'url' },
    { name: 'featured',    type: 'boolean',  description: 'Show in Selected Work on homepage' },
    { name: 'order',       type: 'number',   description: 'Display order (lower = first)' },
  ]
}
```

**Data migration:** All 8 existing projects from `portData.json` migrated to Sanity documents. After migration, `portData.json` and the local image files in `src/components/UI/img/` are removed.

**Image delivery:** All project images served via Sanity CDN via `@sanity/image-url`. Profile photo remains local (converted to `.webp` in `/public/`).

**Studio route:** Embedded Sanity Studio at `/studio` (Next.js App Router `app/studio/[[...tool]]/page.tsx`). Access restricted — not linked from the public site.

---

## 5. SEO

Every route gets full metadata. Zero Google Search Console alerts.

### Homepage (`/`)

```ts
metadata = {
  title: 'Felipe Figueiredo — Fullstack Developer',
  description: 'Fullstack Developer from Belo Horizonte, Brazil. Building scalable web apps with React, NestJS, and TypeScript.',
  openGraph: {
    title: 'Felipe Figueiredo — Fullstack Developer',
    description: '...',
    url: 'https://felipefigueiredodev.vercel.app',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Felipe Figueiredo — Fullstack Developer',
    description: 'Fullstack Developer from Belo Horizonte, Brazil. Building scalable web apps with React, NestJS, and TypeScript.',
    images: ['/og-image.png'],
  },
}
```

### Project pages (`/projects/[slug]`)

- Title: `{project.title} — Felipe Figueiredo`
- Description: `project.summary`
- OG image: `project.coverImage` (via Sanity image URL builder, 1200×630)
- Canonical: `https://felipefigueiredodev.vercel.app/projects/{slug}`

### Additional SEO files

- `app/sitemap.ts` — dynamic, includes `/`, `/projects`, and all `/projects/[slug]` routes
- `app/robots.ts` — allows all, points to sitemap
- `public/og-image.png` — static 1200×630 OG image created during implementation: dark background, name in large type, role and URL below. Simple, consistent with the visual identity.
- `<script type="application/ld+json">` on homepage with `schema.org/Person`
- `<script type="application/ld+json">` on each project page with `schema.org/SoftwareApplication`
- Favicon: moved to `app/icon.png`, `app/apple-icon.png` (App Router convention)
- `<html lang="en">` — already set, keep it

---

## 6. Mobile Navigation

Current state: `<nav>` uses `hidden md:flex` — completely invisible on mobile.

**Solution:** Hamburger menu
- Below `md` breakpoint: show hamburger icon button in navbar
- On click: full-screen overlay menu or slide-in drawer from right
- Links close the menu on click
- Framer Motion for open/close animation
- Trap focus when open (accessibility)

---

## 7. New Dependencies

```json
{
  "framer-motion": "^11",
  "next-sanity": "^9",
  "sanity": "^3",
  "@portabletext/react": "^3",
  "@sanity/image-url": "^1"
}
```

All other existing dependencies remain unchanged.

---

## 8. Code Cleanup

Files to delete during implementation:

- `src/components/Portfolio/_ProjectCopy.tsx` — debug version with hardcoded links
- `src/app/container.tsx` — 100% commented out
- `src/components/_Container/Container.tsx` — unused
- `src/components/UI/img/ScrollToTop.tsx` — empty placeholder
- `src/components/UI/img/MODELO.xcf` — Gimp binary
- `src/components/UI/img/__goalslistapp.png` + `___goalslistapp.png` — discarded duplicates
- `src/data/portData.json` — replaced by Sanity

---

## 9. Image Optimization

- `profile-pic.png` (965 KB) → convert to `profile-pic.webp`, place in `/public/`
- All project images → hosted on Sanity CDN after migration (no local copies needed)
- `next.config.js`: add `sanity.io` and CDN domain to `images.remotePatterns`
- Remove `media.licdn.com` from image domains (never used)

---

## 10. Out of Scope

The following were considered and explicitly excluded to keep scope focused:

- Blog / articles section
- Contact form (email link only)
- Animations beyond subtle scroll-triggered fades
- Tech tag filtering on `/projects` page
- Authentication / admin panel (Sanity Studio handles this)

---

## Implementation Notes

- All work on branch `feature/portfolio-v2` — never commit to `main` directly
- `.superpowers/` added to `.gitignore`
- Sanity schema deployed before migrating content
- Migrate existing 8 projects to Sanity before removing `portData.json`
- Test SEO with `next build` + Google Rich Results Test before merging
