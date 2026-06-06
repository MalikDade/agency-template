export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--black-rich)',
      }}
    >
      {/* Radial gold glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        pointerEvents: 'none',
      }} />

      {/* Vertical gold side rules */}
      <div style={{ position: 'absolute', left: 40, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent)' }} />
      <div style={{ position: 'absolute', right: 40, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent)' }} />

      {/* Content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '120px 24px 100px' }}>

        {/* Emblem */}
        <div style={{
          width: 88,
          height: 88,
          border: '1px solid rgba(201,168,76,0.45)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 48px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: -6,
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '50%',
          }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            color: 'var(--gold)',
            letterSpacing: '0.1em',
            fontWeight: 700,
          }}>MPM</span>
        </div>

        {/* Eyebrow */}
        <p className="label" style={{ marginBottom: 24, fontSize: 10, letterSpacing: '0.55em' }}>
          Making Power Moves
        </p>

        {/* Main headline — stacked for impact */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 13vw, 148px)',
          fontWeight: 900,
          color: 'var(--white)',
          lineHeight: 0.88,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          POWER
        </h1>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(52px, 13vw, 148px)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '2px var(--gold)',
          lineHeight: 0.88,
          letterSpacing: '-0.02em',
          margin: '0 0 40px',
        }}>
          MOVES
        </h1>

        {/* LLC divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 40 }}>
          <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
          <span className="label" style={{ fontSize: 9, letterSpacing: '0.6em' }}>LLC</span>
          <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(17px, 2.2vw, 22px)',
          fontStyle: 'italic',
          color: 'rgba(232,228,221,0.65)',
          maxWidth: 520,
          margin: '0 auto 56px',
          lineHeight: 1.65,
        }}>
          Building the future through technology, innovation, and unrelenting purpose.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#companies" className="btn-gold">Our Companies</a>
          <a href="#contact" className="btn-outline">Work With Us</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: 'absolute',
        bottom: 36,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.45em', color: 'rgba(201,168,76,0.4)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)' }} />
      </div>
    </section>
  )
}
