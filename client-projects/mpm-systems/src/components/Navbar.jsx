import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

const LINKS = [
  { label: 'Home',        to: '/',           end: true },
  { label: 'Services',    to: '/services' },
  { label: 'Pricing',     to: '/pricing' },
  { label: 'Case Study',  to: '/case-study' },
  { label: 'Why Us',      to: '/why-us' },
]

const linkBase = {
  fontFamily: 'var(--font-display)',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'color 0.2s',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}

export default function Navbar({ onStartTour }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const getNavStyle = ({ isActive }) => ({
    ...linkBase,
    color: isActive ? 'var(--gold)' : 'rgba(168,178,193,0.75)',
  })

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 200,
      padding: scrolled ? '14px 48px' : '26px 48px',
      background: scrolled ? 'rgba(8,15,23,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(212,136,42,0.12)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34,
          border: '1px solid rgba(212,136,42,0.55)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(212,136,42,0.08)',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.03em' }}>MPM</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 900, color: 'var(--white)', letterSpacing: '0.18em', lineHeight: 1 }}>
            MPM SYSTEMS
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 7.5, color: 'rgba(212,136,42,0.65)', letterSpacing: '0.38em', marginTop: 3 }}>
            BY MAKING POWER MOVES LLC
          </div>
        </div>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex" style={{ alignItems: 'center', gap: 26 }}>
        {LINKS.map(l => (
          <NavLink key={l.to} to={l.to} end={!!l.end} style={getNavStyle}
            onMouseEnter={e => { if (!e.currentTarget.style.color.includes('212')) e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { const isActive = e.currentTarget.getAttribute('data-active') === 'true'; if (!isActive) e.currentTarget.style.color = 'rgba(168,178,193,0.75)' }}
          >
            {l.label}
          </NavLink>
        ))}

        {/* Dan tour trigger */}
        {onStartTour && (
          <button
            onClick={onStartTour}
            style={{
              ...linkBase,
              background: 'none',
              border: 'none',
              color: 'rgba(212,136,42,0.55)',
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,136,42,0.55)')}
          >
            <div style={{ width: 18, height: 18, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(212,136,42,0.4)', flexShrink: 0 }}>
              <img src="/dan-carter.png" alt="Dan" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
            GUIDE ME
          </button>
        )}

        <Link to="/book" className="btn-gold" style={{ padding: '10px 24px', fontSize: 10, textDecoration: 'none' }}>
          Book a Call
        </Link>
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
          background: 'rgba(8,15,23,0.98)',
          borderBottom: '1px solid rgba(212,136,42,0.18)',
          padding: '24px 40px',
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                ...linkBase,
                fontSize: 15,
                color: isActive ? 'var(--gold)' : 'var(--platinum)',
              })}
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="btn-gold"
            style={{ textAlign: 'center', padding: '12px', fontSize: 10, textDecoration: 'none' }}
            onClick={() => setMenuOpen(false)}
          >
            Book a Call
          </Link>
        </div>
      )}
    </nav>
  )
}
