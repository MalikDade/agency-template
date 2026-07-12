import SlideshowBg from './SlideshowBg'
import { Link } from 'react-router-dom'

const IMAGES = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1400&q=80&fit=crop',
]

const REASONS = [
  {
    symbol: '⚡',
    title: 'Fast Delivery',
    body: 'Most builds ship in 2–4 weeks. We don\'t disappear into sprints and stand-ups. We move fast because we work directly with you.',
  },
  {
    symbol: '◈',
    title: 'AI-Powered Everything',
    body: 'Every system we build has AI at its core — trained specifically on your business, not a generic plugin someone else uses too.',
  },
  {
    symbol: '◎',
    title: 'You Own Everything',
    body: 'Your code. Your domain. Your data. Zero platform lock-in. We build, hand it off, and you keep it forever.',
  },
  {
    symbol: '◆',
    title: 'Direct Access to the Builder',
    body: 'You work with Dan directly — not an account manager or junior dev. The person who builds your system is the person you talk to.',
  },
  {
    symbol: '✦',
    title: 'Proven Results',
    body: 'The Platinum Line isn\'t a concept — it\'s a live business, running on the exact system we\'d build for you. The proof is at theplatinumline.com.',
  },
  {
    symbol: '⊕',
    title: 'Full-Stack Delivery',
    body: 'Design + Development + AI + SEO. One team, one system, one price. No juggling five vendors who don\'t talk to each other.',
  },
]

export default function WhyMPM() {
  return (
    <section id="why" style={{ padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
      <SlideshowBg images={IMAGES} />
      <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, marginBottom: 80 }} className="lg:grid-cols-2">
          <div className="reveal-left">
            <p className="section-number" style={{ marginBottom: 12 }}>06</p>
            <p className="label" style={{ marginBottom: 20 }}>Why MPM Systems</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.08, letterSpacing: '-0.01em' }}>
              There are a lot of<br />web agencies.
              <br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>We are not one of them.</em>
            </h2>
          </div>
          <div className="reveal-right" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p style={{ fontSize: 16, color: 'rgba(168,178,193,0.76)', lineHeight: 1.78 }}>
              Web agencies build websites. We build systems — AI-integrated, revenue-generating machines that work for your business 24 hours a day. The difference isn't just technical. It's the outcome your clients actually get.
            </p>
          </div>
        </div>

        {/* Gold rule */}
        <div className="gold-rule reveal" style={{ marginBottom: 72 }} />

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              className="service-card reveal"
              style={{
                padding: '40px 36px',
                border: '1px solid rgba(212,136,42,0.1)',
                background: 'var(--black-card)',
                position: 'relative',
                transitionDelay: `${(i % 3) * 0.09}s`,
              }}
            >
              {/* Top-left corner mark */}
              <div style={{ position: 'absolute', top: -1, left: -1, width: 20, height: 20, borderTop: '2px solid rgba(212,136,42,0.35)', borderLeft: '2px solid rgba(212,136,42,0.35)' }} />

              <div style={{ fontSize: 28, color: 'var(--gold)', marginBottom: 20, lineHeight: 1 }}>{r.symbol}</div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--white)', marginBottom: 14, lineHeight: 1.25 }}>
                {r.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(168,178,193,0.75)', lineHeight: 1.75 }}>{r.body}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="reveal" style={{ marginTop: 80, padding: '48px 56px', border: '1px solid rgba(212,136,42,0.22)', background: 'linear-gradient(135deg, rgba(212,136,42,0.05) 0%, rgba(212,136,42,0.01) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)', width: 280, height: 280, background: 'radial-gradient(circle, rgba(212,136,42,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: 'var(--white)', marginBottom: 8, lineHeight: 1.2 }}>
              Ready to build something that <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>works?</em>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(168,178,193,0.75)' }}>20-minute discovery call. Free. No pitch.</p>
          </div>
          <Link to="/book" className="btn-gold" style={{ fontSize: 11, whiteSpace: 'nowrap', textDecoration: 'none' }}>
            Book a Discovery Call →
          </Link>
        </div>

      </div>
    </section>
  )
}
