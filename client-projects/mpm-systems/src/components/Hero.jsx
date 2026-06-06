import ParticleCanvas from './ParticleCanvas'
import DanChatWidget from './DanChatWidget'

const PILLARS = ['Consultative', 'Visionary', 'Driven', 'Trusted']
const STATS = [
  { symbol: '◈', label: 'AI Agent On Site' },
  { symbol: '◉', label: 'Handles Intake' },
  { symbol: '◆', label: 'Follows Up' },
  { symbol: '◎', label: 'Schedules Calls' },
]

export default function Hero() {
  return (
    <section id="home" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--black-rich)', display: 'flex', flexDirection: 'column' }}>

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Ambient glow — top center */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,136,42,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 2 }} />
      {/* Left edge glow */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(30,58,95,0.5) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 2 }} />

      {/* Main content — split layout */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 10, paddingTop: 80 }}>

        {/* ── LEFT: Dan Carter photo ── */}
        <div className="hidden lg:flex" style={{ width: '42%', position: 'relative', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>

          {/* Full-panel photo */}
          <img
            src="/dan-carter.png"
            alt="Dan Carter — Director of Client Solutions, MPM Systems"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              zIndex: 1,
            }}
          />

          {/* Subtle vignette overlay — keeps left edge tied to navy bg */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'linear-gradient(90deg, rgba(8,15,23,0.35) 0%, transparent 40%, transparent 70%, rgba(8,15,23,0.5) 100%)',
          }} />

          {/* Bottom fade into the content background */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, zIndex: 3,
            background: 'linear-gradient(to top, var(--black-rich) 0%, rgba(8,15,23,0.6) 60%, transparent 100%)',
          }} />

          {/* Right vertical accent */}
          <div style={{ position: 'absolute', right: 0, top: '8%', bottom: 0, width: 1, zIndex: 5, background: 'linear-gradient(to bottom, transparent, rgba(212,136,42,0.4) 20%, rgba(212,136,42,0.4) 80%, transparent)' }} />

          {/* Corner accents */}
          <div style={{ position: 'absolute', top: 24, left: 24, width: 36, height: 36, borderTop: '1px solid rgba(212,136,42,0.5)', borderLeft: '1px solid rgba(212,136,42,0.5)', zIndex: 5 }} />
          <div style={{ position: 'absolute', top: 24, right: 24, width: 36, height: 36, borderTop: '1px solid rgba(212,136,42,0.5)', borderRight: '1px solid rgba(212,136,42,0.5)', zIndex: 5 }} />
        </div>

        {/* ── RIGHT: Content ── */}
        <div style={{ flex: 1, padding: 'clamp(32px, 5vw, 72px)', paddingTop: 'clamp(80px, 8vw, 110px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 680 }}>

          {/* Parent company */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
            <span className="label" style={{ fontSize: 9, letterSpacing: '0.45em' }}>A Company from Making Power Moves LLC</span>
          </div>

          {/* MPM Systems wordmark */}
          <div style={{ marginBottom: 6 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, color: 'var(--white)', letterSpacing: '0.12em', lineHeight: 0.95 }}>
              MPM
            </h1>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1.5px var(--gold)', letterSpacing: '0.12em', lineHeight: 0.95 }}>
              SYSTEMS
            </h1>
          </div>
          <div style={{ width: 72, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: 32 }} />

          {/* Dan Carter */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>
              Dan Carter
            </div>
            <div className="label" style={{ fontSize: 9, letterSpacing: '0.38em', color: 'rgba(212,136,42,0.85)' }}>
              Director of Client Solutions
            </div>
          </div>

          {/* Bio */}
          <p style={{ fontSize: 15, color: 'var(--platinum)', lineHeight: 1.78, maxWidth: 500, marginBottom: 28 }}>
            Dan works directly with business owners to design and deliver AI-powered systems that automate operations, capture every lead, and scale without adding headcount. From discovery call to launch — he's in it with you.
          </p>

          {/* Pillars */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {PILLARS.map(p => (
              <div key={p} style={{
                padding: '6px 16px',
                border: '1px solid rgba(212,136,42,0.3)',
                fontFamily: 'var(--font-display)',
                fontSize: 9,
                letterSpacing: '0.3em',
                color: 'rgba(212,136,42,0.9)',
                textTransform: 'uppercase',
                background: 'rgba(212,136,42,0.06)',
              }}>{p}</div>
            ))}
          </div>

          {/* Dan Chat Widget */}
          <DanChatWidget />
        </div>
      </div>

      {/* ── Bottom stats bar ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        borderTop: '1px solid rgba(212,136,42,0.18)',
        background: 'rgba(13,27,42,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
      }} className="md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            padding: '18px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            borderRight: i < 3 ? '1px solid rgba(212,136,42,0.1)' : 'none',
            borderBottom: i < 2 ? '1px solid rgba(212,136,42,0.1)' : 'none',
          }}>
            <span style={{ fontSize: 20, color: 'var(--gold)', lineHeight: 1 }}>{s.symbol}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 9.5, letterSpacing: '0.28em', color: 'var(--platinum)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
