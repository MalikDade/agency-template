import { Link } from 'react-router-dom'

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
          background: 'linear-gradient(135deg, rgba(212,136,42,0.05) 0%, rgba(212,136,42,0.01) 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)', width: 280, height: 280, background: 'radial-gradient(circle, rgba(212,136,42,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Avatar placeholder — swap for a real photo when ready */}
        <div
          style={{
            width: 84, height: 84, flexShrink: 0,
            borderRadius: '50%',
            border: '1px solid rgba(212,136,42,0.5)',
            background: 'rgba(212,136,42,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 1,
          }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--gold)' }}>MD</span>
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
