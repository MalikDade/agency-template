const SERVICES = [
  { symbol: '◈', title: 'AI Voice Agent',      tag: 'Core',    desc: 'Answers every call, books appointments, and handles objections — 24/7, in any language. Never miss a lead again.' },
  { symbol: '◉', title: 'Booking System',       tag: 'Core',    desc: 'Smart scheduling that syncs with your calendar and sends automated confirmations and reminders to every client.' },
  { symbol: '◎', title: 'Client Portal',        tag: 'Core',    desc: 'A branded dashboard where clients track their project, view invoices, upload files, and communicate with you.' },
  { symbol: '◆', title: 'Admin Dashboard',      tag: 'Core',    desc: 'Your command center: leads, bookings, payments, and analytics — all live, all in one place.' },
  { symbol: '◐', title: 'AI Chat Assistant',    tag: 'AI',      desc: 'A custom-trained AI that lives on your website, answers questions, and converts visitors into booked clients.' },
  { symbol: '⬡', title: 'Payment Integration',  tag: 'Revenue', desc: 'Stripe-powered invoicing, deposits, and recurring billing — built in from day one. Get paid automatically.' },
  { symbol: '⊞', title: 'Live Feed',            tag: 'Brand',   desc: 'Real-time gallery and social feed that auto-updates to keep your site fresh and your work front and center.' },
  { symbol: '⊕', title: 'Multilingual',         tag: 'Reach',   desc: 'Serve English and Spanish-speaking markets simultaneously — your AI agent switches languages automatically.' },
  { symbol: '⊗', title: 'SEO + AIOS',           tag: 'Growth',  desc: 'Search-optimized and AI-search-optimized so you get found on Google, ChatGPT, and everywhere clients look.' },
]

const TAG_COLORS = {
  Core:    { bg: 'rgba(212,136,42,0.1)',  color: 'var(--gold)' },
  AI:      { bg: 'rgba(99,179,237,0.1)',  color: '#63B3ED' },
  Revenue: { bg: 'rgba(72,187,120,0.1)',  color: '#48BB78' },
  Brand:   { bg: 'rgba(246,173,85,0.1)',  color: '#F6AD55' },
  Reach:   { bg: 'rgba(159,122,234,0.1)', color: '#9F7AEA' },
  Growth:  { bg: 'rgba(252,129,74,0.1)',  color: '#FC814A' },
}

export default function WhatWeBuild() {
  return (
    <section id="build" style={{ padding: '120px 40px', background: 'var(--black)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 80 }}>
          <div className="reveal">
            <p className="section-number" style={{ marginBottom: 12 }}>02</p>
            <p className="label" style={{ marginBottom: 20 }}>What We Build</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 20 }}>
              Every system. Custom-built.<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Owned entirely by you.</em>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(168,178,193,0.55)', maxWidth: 520, lineHeight: 1.75 }}>
              We don't install plugins. We engineer systems — AI-integrated, fully yours, built to run your business while you sleep.
            </p>
          </div>
        </div>

        {/* Gold rule */}
        <div className="gold-rule reveal" style={{ marginBottom: 64 }} />

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
          {SERVICES.map((s, i) => {
            const tagStyle = TAG_COLORS[s.tag] || TAG_COLORS.Core
            return (
              <div
                key={s.title}
                className={`service-card reveal`}
                style={{
                  padding: '40px 36px',
                  border: '1px solid rgba(212,136,42,0.1)',
                  background: 'var(--black-card)',
                  position: 'relative',
                  cursor: 'default',
                  transitionDelay: `${(i % 3) * 0.08}s`,
                }}
              >
                {/* Top accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', opacity: 0, transition: 'opacity 0.3s' }}
                  onMouseEnter={e => (e.target.style.opacity = '1')}
                  onMouseLeave={e => (e.target.style.opacity = '0')}
                />

                {/* Symbol + tag row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontSize: 28, color: 'var(--gold)', lineHeight: 1, opacity: 0.8 }}>{s.symbol}</span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 8,
                    letterSpacing: '0.35em',
                    padding: '4px 10px',
                    background: tagStyle.bg,
                    color: tagStyle.color,
                    textTransform: 'uppercase',
                  }}>{s.tag}</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--white)', marginBottom: 12, lineHeight: 1.2 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(168,178,193,0.55)', lineHeight: 1.72 }}>{s.desc}</p>

                {/* Corner mark */}
                <div style={{ position: 'absolute', bottom: 14, right: 14, fontFamily: 'var(--font-display)', fontSize: 9, color: 'rgba(212,136,42,0.18)', letterSpacing: '0.2em' }}>
                  0{i + 1}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
