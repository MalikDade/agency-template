import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Companies', href: '#companies' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '16px 40px' : '28px 40px',
        background: scrolled ? 'rgba(6,6,6,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.35s ease',
      }}
    >
      {/* Wordmark */}
      <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36,
          height: 36,
          border: '1px solid rgba(201,168,76,0.6)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(201,168,76,0.06)',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.05em', fontWeight: 700 }}>MPM</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--white)', letterSpacing: '0.15em', lineHeight: 1 }}>
            MAKING POWER MOVES
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 8, color: 'var(--gold)', letterSpacing: '0.4em', marginTop: 3 }}>LLC</div>
        </div>
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="hidden md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(232,228,221,0.7)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--gold)')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(232,228,221,0.7)')}
          >
            {l.label}
          </a>
        ))}
        <a href="#contact" className="btn-gold" style={{ padding: '10px 24px', fontSize: 10 }}>
          Work With Us
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: 24,
              height: 1.5,
              background: 'var(--gold)',
              transition: 'transform 0.25s, opacity 0.25s',
              transformOrigin: 'center',
              transform: menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(6,6,6,0.98)',
            borderBottom: '1px solid rgba(201,168,76,0.2)',
            padding: '24px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--platinum)',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold" style={{ textAlign: 'center', padding: '12px 24px', fontSize: 10 }} onClick={() => setMenuOpen(false)}>
            Work With Us
          </a>
        </div>
      )}
    </nav>
  )
}
