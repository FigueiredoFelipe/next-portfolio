# Token Optimization Case Study — Integration Design

**Date:** 2026-05-18  
**Status:** Implemented  
**Route:** `/writing/token-optimization`

## Context

A static HTML case study (830 lines, self-contained dark theme) documenting a CLAUDE.md token optimization audit. The goal: drive LinkedIn readers directly to the portfolio to read the case study, then convert them into portfolio visitors via CTAs.

## User Journey

```
LinkedIn Post → /writing/token-optimization (SSR) → read case study → Get in Touch / View Portfolio
```

`/writing` redirects to `/writing/token-optimization` (one-liner, ready for future expansion).

## Architecture

| Piece | Decision |
|---|---|
| Route | `/app/writing/token-optimization/page.tsx` — Server Component |
| Isolation | `/app/writing/token-optimization/layout.tsx` — `position: fixed; inset: 0; z-index: 1000` wrapper |
| HTML source | `/public/case-studies/token-optimization.html` — read at request time via `fs.readFileSync` |
| CSS scoping | `:root` → `#cs-root`, `body` → `#cs-root`, `body::before/after` → `#cs-root::before/after` |
| OG image | `/public/og/token-optimization.png` (LinkedIn cover, 1200×627) |
| Default lang | EN — button states pre-set in HTML, `setLang('en')` appended to script |
| `/writing` index | `redirect('/writing/token-optimization')` — one-liner, extensible |
| Sitemap | `/writing/token-optimization` added |

## Isolation Strategy

The portfolio root layout renders `<Navbar />` and `<Footer />` on every page. The case study layout creates a `position: fixed; inset: 0; z-index: 1000` wrapper (`#cs-root`) that covers the portfolio chrome completely, acting as a full-viewport overlay with its own scroll container.

The case study CSS is scoped to `#cs-root` to avoid polluting the portfolio's `:root` CSS variables (the two designs define conflicting values for `--bg`, `--text`, etc.).

## CTAs

**Top nav** (sticky, z-index 201, always visible):
```
← felipefigueiredo.dev
```

**Bottom footer** (replaces original case study footer):
```
Enjoyed this? Let's build something together.
[← View Portfolio]  [Get in Touch →]  ← goes to /#contact
```

## SSR Metadata

```ts
title:       "CLAUDE.md Token Optimization — Case Study"
description: "From score 42 to 96. A real audit that cut 59% of tokens with zero functionality lost."
og:image:    /og/token-optimization.png
og:url:      https://felipefigueiredodev.vercel.app/writing/token-optimization
```

## Files Created

- `src/app/writing/page.tsx` — redirect
- `src/app/writing/token-optimization/layout.tsx` — viewport isolation + portfolio nav
- `src/app/writing/token-optimization/page.tsx` — SSR page with metadata + dangerouslySetInnerHTML
- `public/case-studies/token-optimization.html` — HTML source
- `public/og/token-optimization.png` — OG image (LinkedIn cover)
- `src/app/sitemap.ts` — updated to include writing route

## Post-Deploy

Add LinkedIn post URL once live. No code changes needed — the `[LINK]` in the post points to:
```
https://felipefigueiredodev.vercel.app/writing/token-optimization
```
