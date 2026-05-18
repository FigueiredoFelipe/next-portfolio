# Token Optimization Case Study — Integration Design

**Date:** 2026-05-18
**Status:** Implemented & committed (branch: `feature/portfolio-v2`)
**Route:** `https://felipefigueiredodev.vercel.app/writing/token-optimization`

## Context

An 830-line self-contained HTML case study documenting a CLAUDE.md token optimization
audit (score 42 → 96, −59% tokens). Goal: drive LinkedIn readers to the portfolio to
read the case study, then convert them via bottom CTAs.

`/writing` permanently redirects to `/writing/token-optimization`, leaving the index
route extensible for future writing entries without touching the LinkedIn link.

## User Journey

```
LinkedIn Post → /writing/token-optimization → case study (EN default) → Get in Touch / View Portfolio
```

## Architecture

| Piece | Decision | Rationale |
|---|---|---|
| Route type | Server Component (SSR) | OG metadata must be server-rendered for LinkedIn link preview |
| HTML delivery | `fs.readFileSync` + `dangerouslySetInnerHTML` | Preserves original design; iframe rejected — CTAs couldn't span iframe boundary |
| CSS isolation | `:root`/`body`/`body::before`/`body::after` → `#cs-root` equivalents | Portfolio and case study define conflicting CSS variables (`--bg`, `--text`, etc.) |
| Viewport isolation | `layout.tsx`: `position:fixed; inset:0; z-index:1000` | Root layout's `<Navbar>` and `<Footer>` are always rendered; fixed overlay covers them |
| OG image | `/public/og/token-optimization.png` (1200×627) | Same cover used on the LinkedIn post — visual consistency |
| Default language | EN — button states pre-set in parse step, `setLang('en')` appended to script | No PT→EN flash on load |
| PT/EN toggle | Preserved and functional | Original case study feature; bilingual accessibility maintained |
| Cache behavior | No `revalidate` set — Next.js default (static at build for prod) | HTML source is stable; update requires redeploy if content changes |

## CTAs

**Top** (sticky, `z-index: 201`, always visible while scrolling):
```
← felipefigueiredo.dev          [links to /]
```

**Bottom** (replaces original case study footer):
```
Enjoyed this? Let's build something together.
[← View Portfolio]   [Get in Touch →]    ← /#contact anchor
```

## SSR Metadata (LinkedIn OG)

```
title:       "CLAUDE.md Token Optimization — Case Study"
description: "From score 42 to 96. A real audit that cut 59% of tokens with zero functionality lost."
og:image:    /og/token-optimization.png
og:url:      https://felipefigueiredodev.vercel.app/writing/token-optimization
twitter:     summary_large_image
```

## Files Changed

| File | Change |
|---|---|
| `src/app/writing/page.tsx` | New — `redirect('/writing/token-optimization')` |
| `src/app/writing/token-optimization/layout.tsx` | New — viewport isolation + sticky portfolio nav |
| `src/app/writing/token-optimization/page.tsx` | New — SSR page, metadata, CSS scoping, CTAs |
| `public/case-studies/token-optimization.html` | New — HTML source (do not edit directly; redeploy to update) |
| `public/og/token-optimization.png` | New — OG/LinkedIn cover image |
| `src/app/sitemap.ts` | Updated — `/writing/token-optimization` added |

## Deploy & Post-Deploy Checklist

```
[ ] Open PR: feature/portfolio-v2 → master
[ ] Merge and wait for Vercel deploy
[ ] Visit /writing/token-optimization — verify EN is default, both CTAs work
[ ] Test OG preview: paste URL into https://www.linkedin.com/post-inspector/
    → confirm title, description, and cover image appear correctly
[ ] Paste final URL into LinkedIn post draft where [LINK] placeholder is
[ ] Publish LinkedIn post
```
