import { Link } from 'react-router-dom'
import SlideshowBg from './SlideshowBg'

const IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80&fit=crop',
]

export default function FounderTeaser() {
  return (
    <section style={{ padding: '80px 40px', position: 'relative' }}>
      <div
        className="reveal"
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: '48px 56px',
          border: '1px solid rgba(212,136,42,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <SlideshowBg images={IMAGES} overlay="linear-gradient(135deg, rgba(8,15,23,0.93) 0%, rgba(8,15,23,0.86) 50%, rgba(212,136,42,0.07) 100%)" />
        <div style={{ position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)', width: 280, height: 280, background: 'radial-gradient(circle, rgba(212,136,42,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Malik's photo */}
        <div
          style={{
            width: 84, height: 84, flexShrink: 0,
            borderRadius: '50%',
            border: '1px solid rgba(212,136,42,0.5)',
            background: 'rgba(212,136,42,0.08)',
            overflow: 'hidden',
            position: 'relative', zIndex: 1,
          }}
        >
          <img src="/malik-office.jpg" alt="Malik Dade" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        </div>

        <div style={{ flex: 1, minWidth: 260, position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 15, color: 'var(--platinum)', lineHeight: 1.75, marginBottom: 14 }}>
            "Well, I see you've already met my assistant, Dan Carter. I'm Malik Dade — I built him. Making Power Moves exists to give people their time and their freedom back, and MPM Systems is how I do that for business owners: systems that run the busywork so you can get back to why you started."
          </p>
          <Link
            to="/about"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'rgba(232,168,85,0.95)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,168,85,0.95)')}
          >
            Meet the guy behind the guy →
          </Link>
        </div>
      </div>
    </section>
  )
}
