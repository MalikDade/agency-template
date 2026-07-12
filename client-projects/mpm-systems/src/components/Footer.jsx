import { Link } from 'react-router-dom'

const COLS = [
  {
    heading: 'Services',
    links: [
      ['AI Voice Agent',    '/services'],
      ['Booking System',    '/services'],
      ['Admin Dashboard',   '/services'],
      ['Client Portal',     '/services'],
      ['AI Chat Assistant', '/services'],
    ],
  },
  {
    heading: 'Invest',
    links: [
      ['Foundation – $2,500',       '/pricing'],
      ['The System – $5,000',       '/pricing'],
      ['The Full Empire – $10k+',   '/pricing'],
      ['Maintenance Plans',         '/pricing'],
    ],
  },
  {
    heading: 'Company',
    links: [
      ['Case Study',              '/case-study'],
      ['Why MPM Systems',         '/why-us'],
      ['Book a Call',             '/book'],
      ['Making Power Moves LLC',  'https://makingpowermovesllc.com'],
    ],
  },
]

const linkStyle = {
  fontSize: 14,
  fontWeight: 500,
  color: 'rgba(232,236,240,0.88)',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--black-rich)', borderTop: '1px solid rgba(212,136,42,0.1)', padding: '64px 40px 40px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, marginBottom: 64 }} className="md:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, textDecoration: 'none' }}>
              <div style={{ width: 38, height: 38, border: '1px solid rgba(212,136,42,0.45)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,136,42,0.06)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>MPM</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900, color: 'var(--white)', letterSpacing: '0.18em' }}>MPM SYSTEMS</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'rgba(212,136,42,0.65)', letterSpacing: '0.2em', marginTop: 3 }}>BY MAKING POWER MOVES LLC</div>
              </div>
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(232,236,240,0.8)', lineHeight: 1.65, maxWidth: 240 }}>
              AI-powered business systems for small businesses ready to scale without limits.
            </p>
            <a
              href="tel:+16015318139"
              style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 20, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.85 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(212,136,42,0.65)', marginBottom: 3 }}>
                  CALL DAN DIRECTLY — 24/7
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'rgba(212,136,42,0.9)', letterSpacing: '0.05em' }}>
                  +1 (601) 531-8139
                </div>
              </div>
            </a>

            <a
              href="https://makingpowermovesllc.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.18em', color: 'rgba(212,136,42,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,136,42,0.5)')}
            >
              <span>◈</span> MAKING POWER MOVES LLC →
            </a>
          </div>

          {/* Nav columns */}
          {COLS.map(c => (
            <div key={c.heading}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(232,168,85,0.95)', marginBottom: 20, textTransform: 'uppercase' }}>
                {c.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.links.map(([label, to]) =>
                  to.startsWith('http') ? (
                    <a
                      key={label}
                      href={to}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      onMouseEnter={e => (e.target.style.color = 'var(--gold)')}
                      onMouseLeave={e => (e.target.style.color = 'rgba(232,236,240,0.88)')}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={label}
                      to={to}
                      style={linkStyle}
                      onMouseEnter={e => (e.target.style.color = 'var(--gold)')}
                      onMouseLeave={e => (e.target.style.color = 'rgba(232,236,240,0.88)')}
                    >
                      {label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="gold-rule" style={{ marginBottom: 28 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'rgba(232,236,240,0.85)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
            © {year} MPM Systems. A Making Power Moves LLC Company.
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 12, fontStyle: 'italic', color: 'rgba(212,136,42,0.3)' }}>
            Built by the people who use it.
          </span>
        </div>
      </div>
    </footer>
  )
}
