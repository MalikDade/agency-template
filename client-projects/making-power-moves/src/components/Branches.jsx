const ACTIVE_COMPANY = {
  tag: 'MPM Systems',
  headline: 'AI-Powered Business Systems',
  description:
    'MPM Systems builds intelligent automation systems for small businesses — from AI voice receptionists and 24/7 booking agents to full-stack digital infrastructure. We give growing businesses the operational leverage of an enterprise.',
  features: [
    'AI Voice & Chat Assistants',
    'Automated Booking & CRM',
    'Custom Web & App Development',
    'Business Intelligence Dashboards',
  ],
  status: 'Live',
  href: 'https://mpmsystems.net',
}

const COMING_SOON = [
  {
    tag: 'MPM Consulting',
    headline: 'Strategic Growth Advisory',
    description: 'Hands-on strategy, operations, and growth consulting for founders ready to scale with precision.',
    status: 'Coming Soon',
  },
  {
    tag: 'MPM Capital',
    headline: 'Investment & Development',
    description: 'Early-stage investment and development capital for high-potential ventures within the MPM ecosystem.',
    status: 'Coming Soon',
  },
  {
    tag: 'MPM Creative',
    headline: 'Brand & Digital Experiences',
    description: 'Premium branding, content, and digital experience design that commands attention and drives trust.',
    status: 'Coming Soon',
  },
]

export default function Branches() {
  return (
    <section id="companies" style={{ padding: '120px 24px', background: '#070707' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: 72, maxWidth: 640 }} className="reveal">
          <p className="label" style={{ marginBottom: 20 }}>The MPM Portfolio</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 4.5vw, 54px)',
            fontWeight: 900,
            color: 'var(--white)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}>
            One holding company.{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Multiple industries.</em>
          </h2>
        </div>

        {/* Featured: MPM Tech */}
        <div
          className="reveal"
          style={{
            border: '1px solid rgba(201,168,76,0.3)',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, rgba(201,168,76,0.01) 100%)',
            marginBottom: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 40,
            padding: 'clamp(40px, 5vw, 64px)',
            position: 'relative',
          }} className="lg:grid-cols-2">
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 9,
                  letterSpacing: '0.45em',
                  color: 'var(--black)',
                  background: 'var(--gold)',
                  padding: '5px 14px',
                  fontWeight: 700,
                }}>LIVE</span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 9,
                  letterSpacing: '0.35em',
                  color: 'rgba(201,168,76,0.6)',
                }}>FLAGSHIP COMPANY</span>
              </div>

              <div style={{ marginBottom: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 4vw, 42px)',
                  fontWeight: 900,
                  color: 'var(--gold)',
                  letterSpacing: '0.02em',
                }}>
                  {ACTIVE_COMPANY.tag}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: 20,
                lineHeight: 1.2,
              }}>
                {ACTIVE_COMPANY.headline}
              </h3>

              <p style={{ fontSize: 16, color: 'rgba(232,228,221,0.65)', lineHeight: 1.75, marginBottom: 36 }}>
                {ACTIVE_COMPANY.description}
              </p>

              <a href={ACTIVE_COMPANY.href} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: 11 }}>
                Visit MPM Systems →
              </a>
            </div>

            {/* Right: features */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 9,
                letterSpacing: '0.4em',
                color: 'rgba(201,168,76,0.5)',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}>
                What We Build
              </p>
              {ACTIVE_COMPANY.features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    border: '1px solid rgba(201,168,76,0.1)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontSize: 15, color: 'var(--platinum)', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coming soon grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {COMING_SOON.map((c, i) => (
            <div
              key={c.tag}
              className="reveal"
              style={{
                padding: '44px 36px',
                border: '1px solid rgba(201,168,76,0.1)',
                background: 'rgba(255,255,255,0.015)',
                position: 'relative',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 2.5vw, 22px)',
                  fontWeight: 900,
                  color: 'rgba(201,168,76,0.45)',
                  letterSpacing: '0.03em',
                }}>
                  {c.tag}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 8,
                  letterSpacing: '0.35em',
                  color: 'rgba(232,228,221,0.3)',
                  border: '1px solid rgba(232,228,221,0.15)',
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                }}>
                  {c.status.toUpperCase()}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 20,
                fontWeight: 700,
                color: 'rgba(232,228,221,0.5)',
                marginBottom: 14,
              }}>
                {c.headline}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(232,228,221,0.35)', lineHeight: 1.7 }}>{c.description}</p>

              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                bottom: -1,
                right: -1,
                width: 24,
                height: 24,
                borderBottom: '1px solid rgba(201,168,76,0.2)',
                borderRight: '1px solid rgba(201,168,76,0.2)',
              }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
