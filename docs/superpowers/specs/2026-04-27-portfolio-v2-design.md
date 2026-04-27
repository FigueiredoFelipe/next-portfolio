# Portfolio v2 — Design Spec

**Date:** 2026-04-27
**Status:** Approved
**Branch:** `feature/portfolio-v2` (created)

---

## Overview

Full overhaul of Felipe Figueiredo's portfolio. The current site is a functional Next.js 13 SPA with a manually maintained JSON data file, minimal SEO, no mobile navigation, and no animations. This spec defines a comprehensive upgrade: new visual identity, Sanity CMS integration, individual project pages, and complete SEO implementation. The project is **not** rebuilt from scratch — it is a redesign of the existing Next.js 13 App Router codebase.

---

## 1. Visual Identity

### Colors

| Token | Light | Dark |
|---|---|---|
| Background | `#f8f7f4` | `#0d0f14` |
| Surface (cards) | `#ffffff` | `#111318` |
| Border | `#e5e7eb` | `#1f2937` |
| Text primary | `#111827` | `#f8fafc` |
| Text secondary | `#6b7280` | `#4b5563` |
| Text muted | `#9ca3af` | `#374151` |

### Texture

Dot-grid via CSS background:
```css
background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0);
background-size: 20px 20px;
```
Dark mode: `rgba(255,255,255,0.03)` instead.

### Typography

- Keep existing `Inter` + `Poppins` from `next/font/google`
- Hero name: `font-weight: 300` (first name) / `font-weight: 800` (last name), `letter-spacing: -0.04em`, `font-size: clamp(2.5rem, 6vw, 5rem)`
- Section labels: `font-size: 0.65rem`, `letter-spacing: 0.15em`, `text-transform: uppercase`, color: muted
- Body text: `Inter`, `font-size: 1rem`, `line-height: 1.7`

### Theme

- `next-themes` already installed — keep it, `attribute="class"`, `defaultTheme="light"`
- Dark toggle in navbar: accessible `<button>` with `aria-label="Toggle dark mode"`, sun/moon icon from `react-icons`

### Motion — Framer Motion

All animations are subtle. Settings:

```ts
// Shared animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}
```

- Hero text: stagger with `fadeUp` on page load
- Profile photo: `{ opacity: 0 } → { opacity: 1 }`, `duration: 0.7`, `delay: 0.3`
- Section entry: `whileInView="visible"`, `initial="hidden"`, `viewport={{ once: true, amount: 0.2 }}`
- Mobile menu: `x: '100%' → x: 0`, `duration: 0.25`, `ease: 'easeInOut'`
- Respect `prefers-reduced-motion`: wrap all motion in `useReducedMotion()` check — if true, skip transforms

**Language:** English throughout — all UI copy rewritten.

---

## 2. Site Structure

### Routes

| Route | Description | Rendering | Status |
|---|---|---|---|
| `/` | Homepage — Hero, About, Selected Work, Contact | Static (no dynamic data) | Redesign |
| `/projects` | All projects grid | ISR — `revalidate: 60` | New |
| `/projects/[slug]` | Individual project case study | SSG — `generateStaticParams` | New |
| `/studio/[[...tool]]` | Embedded Sanity Studio | Client-only (`'use client'`) | New |
| `/not-found` | 404 page | Static | New |

### Data Fetching Strategy

- **`/projects`**: ISR with `revalidate: 60` — rebuilds every 60 seconds after a request. Handles new projects published in Sanity without full redeploy.
- **`/projects/[slug]`**: SSG with `generateStaticParams` — all slugs pre-rendered at build time. `notFound: true` returned when slug doesn't exist.
- **Homepage "Selected Work"**: also ISR `revalidate: 60` to pick up `featured` changes.
- **Fallback for Sanity unavailability**: if a fetch throws, log the error and return an empty array (no crash). Show a graceful empty state rather than a broken page.

### GROQ Queries

```ts
// All projects ordered
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id, title, slug, summary, coverImage, techs, githubUrl, liveUrl, featured, order
  }
`

// Featured projects for homepage
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc)[0...4] {
    _id, title, slug, summary, coverImage, techs, githubUrl, liveUrl
  }
`

// Single project by slug
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, summary, body, coverImage, techs, githubUrl, liveUrl
  }
`

// All slugs for generateStaticParams
export const projectSlugsQuery = groq`
  *[_type == "project"]{ "slug": slug.current }
`

// Site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{ openToWork }
`
```

### Homepage Sections (scroll order)

1. **Navbar** — sticky top, `z-50`, logo left, nav links right, dark toggle, mobile hamburger
2. **Hero** — split layout: text left, photo right
3. **About** — bio + tech stack icons
4. **Selected Work** — up to 4 featured projects from Sanity
5. **Contact** — static email + socials
6. **Footer** — copyright + links

---

## 3. Navbar

### Desktop (`md` and above)

```
Felipe Figueiredo    Work  About  Contact  [🌙]
```

- Logo is the text "Felipe Figueiredo" in `font-weight: 300`, `letter-spacing: 0.15em`, uppercase
- Links: `Work` → `/projects`, `About` → `/#about`, `Contact` → `/#contact`
- On `/projects` and `/projects/[slug]`: same navbar, `Work` link is active (underline)
- Dark toggle button, far right

### Mobile (below `md`)

- Logo left, hamburger icon right (`HiMenu` / `HiX` from `react-icons/hi`)
- On hamburger click: slide-in drawer from the right, full viewport height
- Drawer contains the same 3 links + dark toggle, vertically stacked, large tap targets (`min-height: 48px` per item)
- Clicking any link closes the drawer
- Focus trap inside drawer when open (`tabIndex`, `aria-modal="true"`)
- `aria-expanded` on hamburger button reflects open/closed state

---

## 4. Hero Section

### Layout (desktop)

```
┌───────────────────────────────────────────────────────┐
│ FELIPE FIGUEIREDO            Work  About  Contact  🌙  │
├───────────────────────────────────────────────────────┤
│                                                       │
│  FULLSTACK DEVELOPER                    ┌──────────┐  │
│                                         │          │  │
│  Hello, I'm                             │  photo   │  │
│  Felipe                                 │          │  │
│  Figueiredo.                            └──────────┘  │
│                                                       │
│  React · NestJS · TypeScript · AI                     │
│  Belo Horizonte, Brazil                               │
│                                          [ open to    │
│  View my work ——   GitHub ↗  LinkedIn ↗    work ✓ ]  │
│                                                       │
└───────────────────────────────────────────────────────┘
```

- Photo: `width: 200px, height: 200px`, `border-radius: 50%`, `object-fit: cover`, `next/image` with `priority={true}`
- On mobile: stacked, photo centered above text, `width: 140px, height: 140px`
- "Open to work" badge: small pill below the CTA buttons, only rendered if `siteSettings.openToWork === true` (from Sanity)
- CTA: "View my work" scrolls to `#selected-work` on homepage; on other pages links to `/projects`

---

## 5. About Section

- `id="about"` for anchor linking
- Two-column on desktop: text left (~60%), tech stack right (~40%)
- Mobile: stacked
- Bio text (English): 3–4 sentences, first person. Example tone: "I'm a Fullstack Developer based in Belo Horizonte, Brazil, with experience building scalable web applications using React, NestJS, and TypeScript. I care about clean architecture, developer experience, and shipping things that work."
- Tech stack: keep existing 8 icons (HTML5, CSS3, JS, TS, React, Tailwind, Next.js, Angular) + add NestJS, Docker icons from `react-icons/si`
- No home office photo (removed for cleaner design)

---

## 6. Selected Work Section

- `id="selected-work"` for anchor linking
- Section label: "Selected Work" (uppercase, muted)
- Grid: 2 columns on desktop, 1 column on mobile
- Up to 4 cards (projects with `featured: true`, sorted by `order`)
- Each card:
  - Cover image (`next/image`, aspect ratio 16:9, `object-fit: cover`)
  - Project title
  - Summary text (max 2 lines, `line-clamp-2`)
  - Tech tags (horizontal, max 3 visible, `+N more` if overflow)
  - Links: "View project" → `/projects/[slug]`, optional GitHub icon link
- "View all projects →" link below the grid, goes to `/projects`

---

## 7. Projects Page (`/projects`)

- Page title: "Projects" (h1), subtitle: "All the things I've built."
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Same card component as Selected Work
- All projects from Sanity, sorted by `order`
- No pagination needed (≤20 projects for now)
- Empty state: "No projects yet." (defensive fallback for Sanity errors)

---

## 8. Project Page (`/projects/[slug]`)

- `generateStaticParams` returns all slugs from `projectSlugsQuery`
- Returns `notFound()` if slug not found
- Layout:
  1. Back link: `← All Projects` → `/projects`
  2. Cover image (full width, `aspect-ratio: 16/9`, `priority={true}`)
  3. Title (h1)
  4. Tech tags (pills)
  5. Links row: GitHub button + Live Demo button (only rendered if URL exists)
  6. Divider
  7. Rich text body (`<PortableText>` with custom components for `h2`, `h3`, `ul`, `code`, links)
- No sidebar, no comments, no related projects (out of scope)

---

## 9. Contact Section

- `id="contact"` for anchor linking
- Centered, minimal
- Content:
  - Heading: "Get in touch"
  - Short line: "I'm open to new opportunities. Feel free to reach out."
  - Email: `fjnfigueiredo@gmail.com` (mailto link)
  - LinkedIn and GitHub icon links
- No form

---

## 10. Footer

- One line: `© {year} Felipe Figueiredo` + LinkedIn icon + GitHub icon
- Year: `new Date().getFullYear()` — safe because Footer is a Server Component (no `'use client'`), so there is no client hydration and no mismatch risk.

---

## 11. Content Management — Sanity CMS

**Project:** `felipe-snr`
**Project ID:** `8yzpbmmx`
**Dataset:** `production`
**Credentials:** `.env.local` (gitignored)

### Schema — `project` document

```ts
defineType({
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
    defineField({ name: 'order', type: 'number', description: 'Lower number = shown first' }),
  ],
})
```

### Schema — `siteSettings` document (singleton)

```ts
defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({
      name: 'openToWork',
      type: 'boolean',
      description: 'Show "Open to work" badge in hero',
      initialValue: true,
    }),
  ],
})
```

Singleton enforced via Structure Builder in `sanity.config.ts`:

```ts
import { structureTool } from 'sanity/plugins/structure'

structureTool({
  structure: (S) =>
    S.list().title('Content').items([
      S.listItem().title('Site Settings').id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(t => !['siteSettings'].includes(t.getId()!)),
    ]),
}),
```

This prevents creating multiple `siteSettings` documents without using the deprecated `__experimental_actions` API.

### `sanity.config.ts` structure

```ts
export default defineConfig({
  projectId: '8yzpbmmx',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: [projectType, siteSettingsType] },
})
```

### Sanity client (`src/lib/sanity.ts`)

```ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '8yzpbmmx',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Safe fetch wrapper — returns null on error, never throws
export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params ?? {})
  } catch (err) {
    console.error('[Sanity fetch error]', err)
    return null
  }
}
```

**`siteSettings` null safety:** `siteSettingsQuery` may return `null` if the document hasn't been created yet in the Studio. Always default: `const openToWork = siteSettings?.openToWork ?? false`

### CORS

Add `https://felipefigueiredodev.vercel.app` to CORS origins in Sanity dashboard (API → CORS origins) before deploying to production.

### Data Migration

1. Deploy schema (`sanity deploy`) before migrating content
2. Enter all 8 projects from `portData.json` manually in the Studio (no automated script — 8 projects is fast enough and allows uploading proper images)
3. Upload project images directly to Sanity (removes need for local image files)
4. Set `featured: true` on Tiny Chat App AI, CRUD Angular, Investment Calculator, To-Do List (top 4)
5. Set `order` 1–8 matching current JSON order
6. Create one `siteSettings` document, set `openToWork: true`
7. After verifying all projects display correctly → delete `portData.json` and local project images

---

## 12. SEO

Every route gets full metadata. Target: zero Google Search Console alerts.

### Homepage metadata

```ts
export const metadata: Metadata = {
  title: 'Felipe Figueiredo — Fullstack Developer',
  description: 'Fullstack Developer from Belo Horizonte, Brazil. Building scalable web apps with React, NestJS, and TypeScript.',
  metadataBase: new URL('https://felipefigueiredodev.vercel.app'),
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
}
```

### Project page metadata (dynamic)

```ts
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return {}
  const ogImage = project.coverImage
    ? urlFor(project.coverImage).width(1200).height(630).url()
    : '/og-image.png'
  return {
    title: `${project.title} — Felipe Figueiredo`,
    description: project.summary,
    alternates: { canonical: `/projects/${params.slug}` },
    openGraph: { title: `${project.title} — Felipe Figueiredo`, description: project.summary, images: [{ url: ogImage, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: `${project.title} — Felipe Figueiredo`, images: [ogImage] },
  }
}
```

### Additional SEO

- `app/sitemap.ts` — exports function returning `/`, `/projects`, and all `/projects/[slug]`
- `app/robots.ts` — `allow: '/'`, `sitemap: 'https://felipefigueiredodev.vercel.app/sitemap.xml'`
- `public/og-image.png` — static 1200×630 PNG. Generate using `@vercel/og` as a one-off: run `next dev`, hit `app/api/og/route.tsx` once to download the rendered image, save as `public/og-image.png`, then delete the route. Design: off-white `#f8f7f4` background, "Felipe Figueiredo" in `font-size: 64px font-weight: 800` dark text, "Fullstack Developer" in `font-size: 28px` muted below, URL `felipefigueiredodev.vercel.app` bottom-right in small muted text.
- `schema.org/Person` JSON-LD in homepage `<head>` (name, url, sameAs LinkedIn/GitHub)
- `schema.org/SoftwareApplication` JSON-LD in each project page (name, url, applicationCategory: "WebApplication")
- Favicon: existing files from `src/components/UI/img/favicon_io/` moved to `public/` and registered in `app/layout.tsx` via `metadata.icons`
- `<html lang="en">` — already set, keep it

---

## 13. `next.config.js` Changes

```js
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}
```

Remove the deprecated `domains` array. Remove `media.licdn.com` (never used).

---

## 14. Mobile Navigation Detail

**Choice:** Slide-in drawer from the right (not full-screen overlay — drawer keeps context visible).

```
[open state]
┌─────────────────────┬──────────────────────┐
│   (blurred main)    │   Felipe Figueiredo  │
│                     │   ─────────────      │
│                     │   Work               │
│                     │   About              │
│                     │   Contact            │
│                     │                      │
│                     │   [🌙 Dark toggle]   │
│                     │                      │
│                     │              [✕]     │
└─────────────────────┴──────────────────────┘
```

- Drawer width: `min(280px, 80vw)`
- Main content: `pointer-events: none`, slight opacity reduction while drawer open
- Backdrop: semi-transparent, clicking it closes the drawer
- `aria-modal="true"`, focus returns to hamburger on close

---

## 15. Error & Loading States

- `app/not-found.tsx` — 404 page: centered, "Page not found.", link back to `/`
- `app/projects/loading.tsx` — skeleton grid (3 placeholder cards) shown while ISR revalidates
- `app/projects/[slug]/loading.tsx` — skeleton: full-width image placeholder, text lines
- `app/projects/error.tsx` — "Something went wrong." with retry button
- Sanity fetch errors: caught in each fetch function, logged to console, return `null` or `[]`. Components handle empty/null gracefully.

---

## 16. Component File Structure

New and modified files:

```
src/
  app/
    layout.tsx              (update metadata, favicon, lang)
    page.tsx                (redesign homepage)
    not-found.tsx           (new)
    sitemap.ts              (new)
    robots.ts               (new)
    projects/
      page.tsx              (new — /projects)
      loading.tsx           (new)
      error.tsx             (new)
      [slug]/
        page.tsx            (new — /projects/[slug])
        loading.tsx         (new)
    studio/
      [[...tool]]/
        page.tsx            (new — Sanity Studio)
  components/
    layout/
      Navbar.tsx            (rewrite)
      MobileDrawer.tsx      (new)
      Footer.tsx            (rewrite)
    sections/
      Hero.tsx              (rewrite)
      About.tsx             (rewrite)
      SelectedWork.tsx      (new — replaces Portfolio.tsx)
      Contact.tsx           (rewrite)
    projects/
      ProjectCard.tsx       (new — shared card)
      ProjectGrid.tsx       (new)
      PortableTextRenderer.tsx (new)
    ui/
      ThemeToggle.tsx       (rename from ThemeSwitcher.tsx)
      AnimatedSection.tsx   (new — wraps whileInView logic)
      TechTag.tsx           (new — reusable pill)
      OpenToWorkBadge.tsx   (new)
  lib/
    sanity.ts               (new — client + queries)
    types.ts                (new — Project, SiteSettings TS interfaces)
  sanity/
    schema/
      project.ts            (new)
      siteSettings.ts       (new)
      index.ts              (new)
```

---

## 17. Code Cleanup (delete these files)

- `src/components/Portfolio/_ProjectCopy.tsx`
- `src/app/container.tsx`
- `src/components/_Container/Container.tsx`
- `src/components/UI/img/ScrollToTop.tsx`
- `src/components/UI/img/MODELO.xcf`
- `src/components/UI/img/__goalslistapp.png`
- `src/components/UI/img/___goalslistapp.png`
- `src/data/portData.json` (after Sanity migration is verified)
- Remaining project images in `src/components/UI/img/` (after Sanity migration)

---

## 18. Image Optimization

- `profile-pic.png` (965 KB): convert to `profile-pic.webp` at 400×400px, save to `/public/`
- All project images: uploaded to Sanity (served via CDN with automatic optimization)
- `next/image` used for all images throughout — no `<img>` tags

---

## 19. New Dependencies

```bash
npm install framer-motion next-sanity sanity @portabletext/react @sanity/image-url
```

| Package | Version | Purpose |
|---|---|---|
| `framer-motion` | `^11` | Animations |
| `next-sanity` | `^9` | Sanity client for Next.js |
| `sanity` | `^3` | Studio + schema |
| `@portabletext/react` | `^3` | Render rich text |
| `@sanity/image-url` | `^1` | Image URL builder |

---

## 20. Out of Scope

Explicitly excluded:

- Blog / articles
- Contact form
- Tech tag filtering on `/projects`
- Authentication / admin beyond Sanity Studio
- Analytics
- i18n / Portuguese version
- Pagination on `/projects`

---

## 21. Implementation Notes & Order

1. Create branch `feature/portfolio-v2` ✓ (done)
2. Install new dependencies
3. Write Sanity schemas → deploy schema (`sanity deploy`)
4. Add CORS origin in Sanity dashboard
5. Enter all 8 projects in Sanity Studio + upload images
6. Verify all project data is correct in Studio
7. Delete `portData.json` and local project images
8. Implement `src/lib/sanity.ts` (client + queries + types)
9. Implement new component structure (see §16)
10. Redesign all sections following this spec
11. Implement SEO (metadata, sitemap, robots, JSON-LD)
12. Add `app/not-found.tsx` and loading/error states
13. Convert `profile-pic.png` → `.webp`, move to `/public/`
14. Run `next build` — fix all type errors and warnings
15. Test SEO with Google Rich Results Test
16. Verify Google Search Console preview (no missing fields)
17. Open PR from `feature/portfolio-v2` → `master`
