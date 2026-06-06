const BUILT = [
  { symbol: '◈', name: 'AI Voice Agent',    detail: 'Selena — answers calls, books appointments, handles FAQs in English & Spanish' },
  { symbol: '◉', name: 'Custom Website',    detail: '8-page luxury nail studio site with gallery, services, pricing, and booking' },
  { symbol: '◎', name: 'Admin Dashboard',   detail: 'Full CRM for Cynthia to manage clients, appointments, and call logs' },
  { symbol: '◆', name: 'Booking System',    detail: 'Automated scheduling with calendar sync and SMS/email confirmations' },
  { symbol: '◐', name: 'AI Chat Widget',    detail: 'Selena on-site — converts website visitors into booked appointments' },
  { symbol: '⊕', name: 'Multilingual AI',   detail: 'Full English & Spanish AI support across voice and chat channels' },
]

const RESULTS = [
  { number: '24/7', label: 'Phone coverage' },
  { number: '0',   label: 'Missed calls' },
  { number: '2×',  label: 'Languages served' },
  { number: '100%', label: 'Automated intake' },
]

export default function CaseStudy() {
  return (
    <section id="case-study" style={{ padding: '120px 40px', background: '#070707', position: 'relative', overflow: 'hidden' }}>

      {/* Background accent */}
      <div style={{ position: 'absolute', right: -200, top: '50%', transform: 'translateY(-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 72 }} className="reveal">
          <p className="section-number" style={{ marginBottom: 12 }}>05</p>
          <p className="label" style={{ marginBottom: 20 }}>Proof of Work</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
              Real client.<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Real results.</em>
            </h2>
          </div>
        </div>

        {/* Main card */}
        <div style={{ border: '1px solid rgba(201,168,76,0.25)', background: 'rgba(201,168,76,0.025)', position: 'relative', overflow: 'hidden' }}>

          {/* Gold top bar */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, var(--gold), rgba(201,168,76,0.2))' }} />

          <div style={{ padding: 'clamp(36px, 5vw, 64px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 56 }} className="lg:grid-cols-2">

              {/* Left: Client info */}
              <div className="reveal-left">
                <div style={{ display: 'flex', align: 'center', gap: 16, marginBottom: 32 }}>
                  {/* Brand badge */}
                  <div style={{
                    width: 72, height: 72,
                    border: '1px solid rgba(201,168,76,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(201,168,76,0.06)',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--gold)', letterSpacing: '0.05em', textAlign: 'center', lineHeight: 1.4 }}>THE<br />PLT<br />LINE</span>
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>
                      The Platinum Line
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(201,168,76,0.7)' }}>Luxury Nail Studio · Stringer, Mississippi</div>
                    <div style={{ fontSize: 13, color: 'rgba(232,228,221,0.4)', marginTop: 2 }}>Owner: Cynthia</div>
                  </div>
                </div>

                {/* Challenge */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(201,168,76,0.55)', marginBottom: 10 }}>THE CHALLENGE</div>
                  <p style={{ fontSize: 15, color: 'rgba(232,228,221,0.65)', lineHeight: 1.72 }}>
                    Cynthia was missing calls every day. No online presence. Manual bookings. No way to serve Spanish-speaking clients. Her talent was undeniable — her systems were holding her back.
                  </p>
                </div>

                {/* Solution */}
                <div style={{ marginBottom: 36 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(201,168,76,0.55)', marginBottom: 10 }}>THE SOLUTION</div>
                  <p style={{ fontSize: 15, color: 'rgba(232,228,221,0.65)', lineHeight: 1.72 }}>
                    We built the full MPM Systems stack — a luxury website, a custom AI voice agent named Selena, an admin dashboard, automated booking, and a bilingual AI chat assistant. Her business now runs 24/7 without her being on the phone.
                  </p>
                </div>

                {/* Results */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, marginBottom: 36 }}>
                  {RESULTS.map(r => (
                    <div key={r.label} style={{ padding: '16px 12px', border: '1px solid rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.03)', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>{r.number}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.25em', color: 'rgba(232,228,221,0.45)', marginTop: 6, textTransform: 'uppercase' }}>{r.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="https://theplatinumline.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ fontSize: 10 }}
                >
                  Visit theplatinumline.com →
                </a>
              </div>

              {/* Right: What we built */}
              <div className="reveal-right">
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.45em', color: 'rgba(201,168,76,0.55)', marginBottom: 28, textTransform: 'uppercase' }}>
                  What We Built
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {BUILT.map(item => (
                    <div key={item.name} style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      padding: '18px 20px',
                      border: '1px solid rgba(201,168,76,0.08)',
                      background: 'rgba(255,255,255,0.02)',
                      transition: 'border-color 0.25s, background 0.25s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'; e.currentTarget.style.background = 'rgba(201,168,76,0.04)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                    >
                      <span style={{ color: 'var(--gold)', fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.symbol}</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: 'var(--white)', letterSpacing: '0.1em', marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: 'rgba(232,228,221,0.5)', lineHeight: 1.55 }}>{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pull quote */}
        <div className="reveal" style={{ marginTop: 56, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '32px 48px', border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.02)', maxWidth: 640 }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(17px, 2vw, 21px)', fontStyle: 'italic', color: 'rgba(232,228,221,0.75)', lineHeight: 1.65, marginBottom: 16 }}>
              "This is what it looks like when small business gets the same tools as a Fortune 500."
            </p>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(201,168,76,0.6)' }}>
              — DAN CARTER, MPM SYSTEMS
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
