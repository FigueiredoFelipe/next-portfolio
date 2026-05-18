import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'CLAUDE.md Token Optimization — Case Study',
  description:
    'From score 42 to 96. A real audit that cut 59% of tokens with zero functionality lost.',
  openGraph: {
    title: 'CLAUDE.md Token Optimization — Case Study',
    description:
      'From score 42 to 96. A real audit that cut 59% of tokens with zero functionality lost.',
    url: 'https://felipefigueiredodev.vercel.app/writing/token-optimization',
    images: [
      {
        url: '/og/token-optimization.png',
        width: 1200,
        height: 627,
        alt: 'CLAUDE.md Token Optimization Case Study',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CLAUDE.md Token Optimization — Case Study',
    description:
      'From score 42 to 96. A real audit that cut 59% of tokens with zero functionality lost.',
    images: ['/og/token-optimization.png'],
  },
}

function parseCaseStudyHtml() {
  const htmlPath = join(process.cwd(), 'public', 'case-studies', 'token-optimization.html')
  const html = readFileSync(htmlPath, 'utf-8')

  // Extract CSS and scope to #cs-content (avoids polluting portfolio :root variables)
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/)
  let css = styleMatch?.[1] ?? ''
  css = css
    .replace(':root {', '#cs-content {')
    .replace('html { scroll-behavior: smooth; }', '')
    .replace('body::before {', '#cs-content::before {')
    .replace('body::after {', '#cs-content::after {')
    .replace('body {', '#cs-content {')

  // #cs-content must be the positioning context for its pseudo-elements,
  // and pseudo-elements must be absolute (not fixed) so they stay within the page flow
  css += `
#cs-content {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 64px);
}
#cs-content::before, #cs-content::after {
  position: absolute !important;
}
/* Stick lang-bar below the portfolio navbar (h-16 = 64px, z-50 = 50) */
.lang-bar {
  top: 64px !important;
  z-index: 49 !important;
}
/* Sections are visible by default — scroll-reveal is progressive enhancement */
.reveal {
  opacity: 1 !important;
  transform: none !important;
}`

  // Extract body content
  const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/)
  let bodyContent = bodyMatch?.[1] ?? ''

  // Remove the original footer (replaced by CTA below)
  bodyContent = bodyContent.replace(/<footer class="footer">[\s\S]*?<\/footer>/, '')

  // Extract and remove the inline script (dangerouslySetInnerHTML doesn't execute scripts)
  const scriptMatch = bodyContent.match(/<script>([\s\S]*?)<\/script>/)
  const scriptContent = scriptMatch?.[1] ?? ''
  bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/, '')

  // Pre-activate EN button — no PT→EN flash on load
  bodyContent = bodyContent
    .replace('class="lang-btn active" id="btn-pt"', 'class="lang-btn" id="btn-pt"')
    .replace('class="lang-btn"        id="btn-en"', 'class="lang-btn active" id="btn-en"')
    .replace(
      'id="btn-pt" onclick="setLang(\'pt\')" aria-pressed="true"',
      'id="btn-pt" onclick="setLang(\'pt\')" aria-pressed="false"',
    )
    .replace(
      'id="btn-en" onclick="setLang(\'en\')" aria-pressed="false"',
      'id="btn-en" onclick="setLang(\'en\')" aria-pressed="true"',
    )

  return { css, bodyContent, scriptContent }
}

export default function TokenOptimizationPage() {
  const { css, bodyContent, scriptContent } = parseCaseStudyHtml()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* suppressHydrationWarning prevents noise from browser extensions modifying the DOM */}
      <div
        id="cs-content"
        dangerouslySetInnerHTML={{ __html: bodyContent }}
        suppressHydrationWarning
      />

      {/* CTA Footer */}
      <div
        style={{
          background: '#09090e',
          borderTop: '1px solid #1c1c2a',
          padding: '56px 0 64px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '0 28px' }}>
          <p
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 'clamp(20px, 3vw, 26px)',
              fontWeight: 400,
              color: '#e8e8f2',
              letterSpacing: '-0.02em',
              marginBottom: '10px',
            }}
          >
            Enjoyed this? Let&apos;s build something together.
          </p>
          <p
            style={{
              fontSize: '14px',
              color: '#8a8aa8',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto 36px',
            }}
          >
            I work with teams that care about craft, performance, and AI-native workflows.
          </p>
          <div
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a
              href="/writing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 22px',
                border: '1px solid #2a2a3e',
                borderRadius: '8px',
                color: '#8a8aa8',
                fontSize: '13px',
                fontFamily: "'Consolas', 'Courier New', monospace",
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              ← All Writing
            </a>
            <a
              href="/#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 22px',
                background: '#00e599',
                border: '1px solid #00e599',
                borderRadius: '8px',
                color: '#000',
                fontSize: '13px',
                fontFamily: "'Consolas', 'Courier New', monospace",
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}
            >
              Get in Touch →
            </a>
          </div>
        </div>
      </div>

      {/* Case study interactivity — next/script guarantees execution after hydration */}
      <Script id="case-study-init" strategy="afterInteractive">
        {scriptContent + '\nsetLang("en");'}
      </Script>
    </>
  )
}
