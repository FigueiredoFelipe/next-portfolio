import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'

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

  // Extract CSS and scope all body/root selectors to #cs-root
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/)
  let css = styleMatch?.[1] ?? ''
  css = css
    .replace(':root {', '#cs-root {')
    .replace('html { scroll-behavior: smooth; }', '')
    .replace('body::before {', '#cs-root::before {')
    .replace('body::after {', '#cs-root::after {')
    .replace('body {', '#cs-root {')
  // Offset lang-bar below the portfolio nav (40px)
  css += '\n.lang-bar { top: 40px !important; }'

  // Extract body content
  const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/)
  let bodyContent = bodyMatch?.[1] ?? ''

  // Remove the original footer (replaced by our CTA)
  bodyContent = bodyContent.replace(/<footer class="footer">[\s\S]*?<\/footer>/, '')

  // Extract and remove the inline script (injected separately so it executes)
  const scriptMatch = bodyContent.match(/<script>([\s\S]*?)<\/script>/)
  const scriptContent = scriptMatch?.[1] ?? ''
  bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/, '')

  // Pre-activate EN button so there's no PT→EN flash on load
  bodyContent = bodyContent
    .replace('class="lang-btn active" id="btn-pt"', 'class="lang-btn" id="btn-pt"')
    .replace('class="lang-btn"        id="btn-en"', 'class="lang-btn active" id="btn-en"')
    .replace('id="btn-pt" onclick="setLang(\'pt\')" aria-pressed="true"',
             'id="btn-pt" onclick="setLang(\'pt\')" aria-pressed="false"')
    .replace('id="btn-en" onclick="setLang(\'en\')" aria-pressed="false"',
             'id="btn-en" onclick="setLang(\'en\')" aria-pressed="true"')

  return { css, bodyContent, scriptContent }
}

export default function TokenOptimizationPage() {
  const { css, bodyContent, scriptContent } = parseCaseStudyHtml()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />

      {/* CTA Footer */}
      <footer
        style={{
          borderTop: '1px solid #1c1c2a',
          padding: '56px 0 64px',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '880px',
            margin: '0 auto',
            padding: '0 28px',
          }}
        >
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
              marginBottom: '36px',
              maxWidth: '480px',
              margin: '0 auto 36px',
            }}
          >
            I work with teams that care about craft, performance, and AI-native workflows.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/"
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
              ← View Portfolio
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
      </footer>

      {/* Case study interactivity — runs after DOM is ready, defaults to English */}
      <script
        dangerouslySetInnerHTML={{
          __html: scriptContent + '\nsetLang("en");',
        }}
      />
    </>
  )
}
