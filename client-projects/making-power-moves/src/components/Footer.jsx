export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--black-rich)',
      borderTop: '1px solid rgba(201,168,76,0.12)',
      padding: '56px 40px 40px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 40,
          marginBottom: 56,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40,
                height: 40,
                border: '1px solid rgba(201,168,76,0.45)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--gold)', fontWeight: 700 }}>MPM</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'var(--white)', letterSpacing: '0.15em' }}>
                  MAKING POWER MOVES
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: 'var(--gold)', letterSpacing: '0.4em', marginTop: 2 }}>LLC</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(232,228,221,0.4)', maxWidth: 280, lineHeight: 1.6 }}>
              Building the future through technology, innovation, and unrelenting purpose.
            </p>
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(201,168,76,0.5)', marginBottom: 20 }}>
                NAVIGATE
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['About', '#about'],
                  ['Companies', '#companies'],
                  ['Contact', '#contact'],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    style={{ fontSize: 13, color: 'rgba(232,228,221,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(232,228,221,0.5)')}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(201,168,76,0.5)', marginBottom: 20 }}>
                COMPANIES
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['MPM Tech', '#companies'],
                  ['MPM Consulting', '#companies'],
                  ['MPM Capital', '#companies'],
                  ['MPM Creative', '#companies'],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    style={{ fontSize: 13, color: 'rgba(232,228,221,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--gold)')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(232,228,221,0.5)')}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gold rule */}
        <div className="gold-rule" style={{ marginBottom: 28, opacity: 0.4 }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{ fontSize: 12, color: 'rgba(232,228,221,0.3)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
            © {year} Making Power Moves LLC. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 12, fontStyle: 'italic', color: 'rgba(201,168,76,0.35)' }}>
            Power. Purpose. Progress.
          </span>
        </div>
      </div>
    </footer>
  )
}
