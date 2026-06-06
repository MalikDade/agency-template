export default function Footer() {
  const year = new Date().getFullYear()

  const col = [
    {
      heading: 'Services',
      links: [
        ['AI Voice Agent', '#build'],
        ['Booking System', '#build'],
        ['Admin Dashboard', '#build'],
        ['Client Portal', '#build'],
        ['AI Chat Assistant', '#build'],
      ],
    },
    {
      heading: 'Invest',
      links: [
        ['Foundation – $2,500', '#pricing'],
        ['The System – $5,000', '#pricing'],
        ['The Full Empire – $10k+', '#pricing'],
        ['Maintenance Plans', '#maintenance'],
      ],
    },
    {
      heading: 'Company',
      links: [
        ['Case Study', '#case-study'],
        ['Why MPM Systems', '#why'],
        ['Book a Call', '#contact'],
        ['Making Power Moves LLC', 'https://makingpowermovesllc.com'],
      ],
    },
  ]

  return (
    <footer style={{ background: 'var(--black-rich)', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '64px 40px 40px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, marginBottom: 64 }} className="md:grid-cols-4">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 38, height: 38, border: '1px solid rgba(201,168,76,0.45)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,168,76,0.06)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: 'var(--gold)', fontWeight: 700 }}>MPM</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 900, color: 'var(--white)', letterSpacing: '0.18em' }}>MPM SYSTEMS</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 7, color: 'rgba(201,168,76,0.55)', letterSpacing: '0.3em', marginTop: 2 }}>BY MAKING POWER MOVES LLC</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(232,228,221,0.38)', lineHeight: 1.65, maxWidth: 240 }}>
              AI-powered business systems for small businesses ready to scale without limits.
            </p>
            {/* Parent company link */}
            <a
              href="https://makingpowermovesllc.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.3em', color: 'rgba(201,168,76,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.5)')}
            >
              <span>◈</span> MAKING POWER MOVES LLC →
            </a>
          </div>

          {/* Nav columns */}
          {col.map(c => (
            <div key={c.heading}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(201,168,76,0.5)', marginBottom: 20, textTransform: 'uppercase' }}>
                {c.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.links.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ fontSize: 13, color: 'rgba(232,228,221,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.target.style.color = 'var(--gold)')}
                    onMouseLeave={e => (e.target.style.color = 'rgba(232,228,221,0.45)')}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="gold-rule" style={{ marginBottom: 28 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, color: 'rgba(232,228,221,0.28)', fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}>
            © {year} MPM Systems. A Making Power Moves LLC Company.
          </span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 12, fontStyle: 'italic', color: 'rgba(201,168,76,0.3)' }}>
            Built by the people who use it.
          </span>
        </div>
      </div>
    </footer>
  )
}
