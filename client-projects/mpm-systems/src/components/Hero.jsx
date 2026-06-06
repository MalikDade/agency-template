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

      {/* Radial gold glow — top center */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 2 }} />
      {/* Left edge glow */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 2 }} />

      {/* Main content — split layout */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 10, paddingTop: 80 }}>

        {/* ── LEFT: Dan Carter photo panel ── */}
        <div className="hidden lg:flex" style={{ width: '40%', position: 'relative', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>

          {/* Photo container — replace src with Dan Carter's actual photo */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #0d0d0d 0%, #111 60%, #0a0a0a 100%)' }}>

            {/* Decorative grid */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

            {/* Corner accents */}
            {[['0','0','borderTop','borderLeft'],['0','auto','borderTop','borderRight'],['auto','0','borderBottom','borderLeft'],['auto','auto','borderBottom','borderRight']].map(([t,r,b1,b2], i) => (
              <div key={i} style={{ position: 'absolute', top: t === 'auto' ? 'auto' : 24, right: r === 'auto' ? 'auto' : 24, bottom: t === 'auto' ? 24 : 'auto', left: r === 'auto' ? 24 : 'auto', width: 40, height: 40, [b1]: '1px solid rgba(201,168,76,0.35)', [b2]: '1px solid rgba(201,168,76,0.35)' }} />
            ))}

            {/* Photo placeholder — swap with: <img src="dan-carter.jpg" alt="Dan Carter" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, position: 'relative', zIndex: 2 }}>
              <div style={{
                width: 160, height: 160, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%)',
                border: '1px solid rgba(201,168,76,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {/* Outer ring */}
                <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.12)' }} />
                {/* Pulse ring */}
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.2)', animation: 'pulse-ring 3s ease-out infinite' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'rgba(201,168,76,0.5)', letterSpacing: '0.05em' }}>DC</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.4em', color: 'rgba(201,168,76,0.4)', marginBottom: 6 }}>PHOTO PLACEHOLDER</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.3em', color: 'rgba(232,228,221,0.2)' }}>Replace with Dan Carter headshot</div>
              </div>
            </div>

            {/* Scanning line effect */}
            <div style={{ position: 'absolute', left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)', animation: 'scan-line 4s linear infinite', zIndex: 3 }} />
          </div>

          {/* Bottom gradient fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, background: 'linear-gradient(to top, var(--black-rich), transparent)', zIndex: 4 }} />

          {/* Right vertical accent */}
          <div style={{ position: 'absolute', right: 0, top: '8%', bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3) 20%, rgba(201,168,76,0.3) 80%, transparent)', zIndex: 5 }} />
        </div>

        {/* ── RIGHT: Content ── */}
        <div style={{ flex: 1, padding: 'clamp(32px, 5vw, 80px)', paddingTop: 'clamp(80px, 8vw, 110px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 680 }}>

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
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: 'var(--platinum)', marginBottom: 4 }}>
              Dan Carter
            </div>
            <div className="label" style={{ fontSize: 9, letterSpacing: '0.38em', color: 'rgba(201,168,76,0.75)' }}>
              Director of Client Solutions
            </div>
          </div>

          {/* Bio */}
          <p style={{ fontSize: 15, color: 'rgba(232,228,221,0.62)', lineHeight: 1.78, maxWidth: 500, marginBottom: 28 }}>
            Dan works directly with business owners to design and deliver AI-powered systems that automate operations, capture every lead, and scale without adding headcount. From discovery call to launch — he's in it with you.
          </p>

          {/* Pillars */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {PILLARS.map(p => (
              <div key={p} style={{
                padding: '6px 16px',
                border: '1px solid rgba(201,168,76,0.22)',
                fontFamily: 'var(--font-display)',
                fontSize: 9,
                letterSpacing: '0.3em',
                color: 'rgba(201,168,76,0.8)',
                textTransform: 'uppercase',
                background: 'rgba(201,168,76,0.03)',
              }}>{p}</div>
            ))}
          </div>

          {/* Dan Chat Widget */}
          <DanChatWidget />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        borderTop: '1px solid rgba(201,168,76,0.14)',
        background: 'rgba(201,168,76,0.025)',
        backdropFilter: 'blur(10px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
      }} className="md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            padding: '18px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            borderRight: i < 3 ? '1px solid rgba(201,168,76,0.08)' : 'none',
            borderBottom: i < 2 ? '1px solid rgba(201,168,76,0.08)' : 'none',
          }}>
            <span style={{ fontSize: 20, color: 'var(--gold)', lineHeight: 1 }}>{s.symbol}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 9.5, letterSpacing: '0.28em', color: 'var(--platinum)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
