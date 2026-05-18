export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="cs-root"
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: 'auto',
        zIndex: 1000,
      }}
    >
      <style>{`
        #cs-portfolio-nav a { color: #484860; text-decoration: none; transition: color 0.15s; }
        #cs-portfolio-nav a:hover { color: #8a8aa8; }
      `}</style>
      <nav
        id="cs-portfolio-nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 201,
          padding: '10px 28px',
          background: 'rgba(9, 9, 14, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #1c1c2a',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "'Consolas', 'Courier New', monospace",
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          ← felipefigueiredo.dev
        </a>
      </nav>
      {children}
    </div>
  )
}
