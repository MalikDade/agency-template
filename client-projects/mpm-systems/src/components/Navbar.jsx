import { useState, useEffect } from 'react'

const LINKS = [
  { label: 'What We Build', href: '#build' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Case Study', href: '#case-study' },
  { label: 'Why Us', href: '#why' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 200,
      padding: scrolled ? '14px 48px' : '26px 48px',
      background: scrolled ? 'rgba(5,5,5,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
    }}>
      {/* Logo */}
      <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34,
          border: '1px solid rgba(201,168,76,0.55)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(201,168,76,0.06)',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.03em' }}>MPM</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 900, color: 'var(--white)', letterSpacing: '0.18em', lineHeight: 1 }}>
            MPM SYSTEMS
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 7.5, color: 'rgba(201,168,76,0.6)', letterSpacing: '0.38em', marginTop: 3 }}>
            BY MAKING POWER MOVES LLC
          </div>
        </div>
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
        {LINKS.map(l => (
          <a key={l.href} href={l.href} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 9,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(232,228,221,0.65)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.target.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.target.style.color = 'rgba(232,228,221,0.65)')}
          >{l.label}</a>
        ))}
        <a href="#contact" className="btn-gold" style={{ padding: '10px 24px', fontSize: 10 }}>Book a Call</a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(v => !v)}
        className="md:hidden"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', flexDirection: 'column', gap: 5 }}
        aria-label="Menu"
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block', width: 22, height: 1.5, background: 'var(--gold)',
            transition: 'transform 0.25s, opacity 0.25s',
            transform: menuOpen ? (i === 0 ? 'translateY(6.5px) rotate(45deg)' : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'scaleX(0)') : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(5,5,5,0.98)',
          borderBottom: '1px solid rgba(201,168,76,0.18)',
          padding: '24px 40px',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--platinum)', textDecoration: 'none' }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold" style={{ textAlign: 'center', padding: '12px', fontSize: 10 }} onClick={() => setMenuOpen(false)}>
            Book a Call
          </a>
        </div>
      )}
    </nav>
  )
}
