const PILLARS = [
  {
    number: '01',
    title: 'Technology',
    body: 'We deploy AI-powered systems that automate, optimize, and scale — giving small businesses enterprise-level capability.',
  },
  {
    number: '02',
    title: 'Innovation',
    body: 'Every company under the MPM umbrella is built on a bold premise: that the future belongs to those bold enough to build it.',
  },
  {
    number: '03',
    title: 'Growth',
    body: 'We invest in people, products, and processes that compound over time — building lasting power, not short-term wins.',
  },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '120px 24px', background: 'var(--black)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Top row: label + headline */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, marginBottom: 80 }}
          className="md:grid-cols-2">
          <div className="reveal">
            <p className="label" style={{ marginBottom: 24 }}>Who We Are</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 900,
              color: 'var(--white)',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
            }}>
              We don't build<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>companies.</em><br />
              We build empires.
            </h2>
          </div>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: 17, color: 'rgba(232,228,221,0.65)', lineHeight: 1.75, marginBottom: 24 }}>
              Making Power Moves LLC is a holding company with a singular mission: to give small businesses the tools, systems, and intelligence once reserved for billion-dollar corporations.
            </p>
            <p style={{ fontSize: 17, color: 'rgba(232,228,221,0.65)', lineHeight: 1.75 }}>
              Under the MPM umbrella, every company we build is purposeful, scalable, and engineered to compound in value over time.
            </p>
          </div>
        </div>

        {/* Gold rule */}
        <div className="gold-rule reveal" style={{ marginBottom: 80 }} />

        {/* Pillars */}
        <div style={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {PILLARS.map((p, i) => (
            <div
              key={p.number}
              className="reveal"
              style={{
                padding: '48px 40px',
                border: '1px solid rgba(201,168,76,0.12)',
                position: 'relative',
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                letterSpacing: '0.4em',
                color: 'rgba(201,168,76,0.35)',
                marginBottom: 24,
              }}>
                {p.number}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: 16,
              }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(232,228,221,0.6)', lineHeight: 1.7 }}>{p.body}</p>

              {/* Hover accent corner */}
              <div style={{
                position: 'absolute',
                top: -1,
                left: -1,
                width: 32,
                height: 32,
                borderTop: '2px solid var(--gold)',
                borderLeft: '2px solid var(--gold)',
                opacity: 0.6,
              }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
