# next-portfolio

## Branch workflow — obrigatório

Toda feature, fix ou mudança de conteúdo deve seguir este fluxo:

1. `git checkout master && git pull origin master`
2. `git checkout -b feature/<nome-descritivo>`
3. Implementar e commitar na branch
4. `gh pr create` → aguardar CI (Vercel preview) passar
5. `gh pr merge --squash --delete-branch`
6. Verificar deploy de produção na Vercel

**Nunca commitar direto no `master`.**

## Stack

- Next.js 15 App Router · TypeScript · Tailwind CSS · Framer Motion
- Sanity CMS (projectId: `8yzpbmmx`, dataset: `production`)
- Deploy: Vercel (`next-portfolio-a67y-kwfr`)

## Convenções

- Idioma do código e commits: inglês
- Commits: `feat:` / `fix:` / `style:` / `docs:` / `chore:`
- CSS: CSS custom properties (`var(--bg)`, `var(--text-primary)`, etc.) — não usar valores hardcoded de cor exceto em code blocks que precisam ser sempre dark
