const PLANS = [
  {
    name: 'Basic',
    price: '$150',
    period: '/month',
    desc: 'Keep the lights on. Perfect for businesses that want peace of mind without daily involvement.',
    items: [
      'Hosting & domain management',
      'Uptime monitoring (24/7)',
      '1 content update per month',
      'Security patches & updates',
      'Monthly status report',
    ],
  },
  {
    name: 'Standard',
    price: '$300',
    period: '/month',
    desc: 'Stay sharp. Recommended for businesses actively generating leads from their system.',
    items: [
      'Everything in Basic',
      'AI model tuning & retraining',
      'Performance optimization',
      'Up to 3 content updates/month',
      'Priority support (48-hr response)',
      'Monthly analytics report',
    ],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$500',
    period: '/month',
    desc: 'Full partnership. For high-volume businesses that need a dedicated technical partner on standby.',
    items: [
      'Everything in Standard',
      'Unlimited content & copy changes',
      'New feature additions',
      'Monthly strategy call with Dan',
      'Quarterly full system audit',
      '24-hour priority response',
    ],
  },
]

export default function Maintenance() {
  return (
    <section id="maintenance" style={{ padding: '80px 40px 120px', background: 'var(--black)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }} className="reveal">
          <p className="label" style={{ marginBottom: 16 }}>Maintenance Plans</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.1, marginBottom: 16 }}>
            Keep your system{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>running at full power.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(168,178,193,0.72)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            After launch, your system needs fuel. Monthly plans keep your AI sharp, your site fast, and your business growing.
          </p>
        </div>

        <div className="gold-rule reveal" style={{ marginBottom: 56 }} />

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className="pricing-card reveal"
              style={{
                padding: '40px 36px',
                border: plan.highlight ? '1px solid rgba(212,136,42,0.4)' : '1px solid rgba(212,136,42,0.1)',
                background: plan.highlight ? 'rgba(212,136,42,0.04)' : 'var(--black-card)',
                position: 'relative',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {plan.highlight && (
                <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
              )}

              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: plan.highlight ? 'var(--gold)' : 'var(--platinum)', letterSpacing: '0.15em', marginBottom: 16 }}>
                {plan.name}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, color: 'var(--white)' }}>{plan.price}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(168,178,193,0.65)' }}>{plan.period}</span>
              </div>

              <p style={{ fontSize: 13, color: 'rgba(168,178,193,0.75)', lineHeight: 1.65, marginBottom: 28, minHeight: 52 }}>{plan.desc}</p>

              <div style={{ height: 1, background: 'rgba(212,136,42,0.1)', marginBottom: 24 }} />

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {plan.items.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'rgba(168,178,193,0.68)', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--gold)', fontSize: 10, marginTop: 3, flexShrink: 0 }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#contact" className={plan.highlight ? 'btn-gold' : 'btn-outline'} style={{ width: '100%', display: 'block', textAlign: 'center', padding: '13px' }}>
                Select {plan.name} →
              </a>
            </div>
          ))}
        </div>

        <p className="reveal" style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'rgba(168,178,193,0.56)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
          Maintenance plans begin 30 days after project launch. Cancel anytime with 30 days notice.
        </p>
      </div>
    </section>
  )
}
