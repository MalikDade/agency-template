import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SlideshowBg from './SlideshowBg'

const IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80&fit=crop',
]

const PLANS = [
  {
    tier: 'Starter',
    subtitle: 'Foundation',
    price: '$2,500',
    period: 'one-time',
    tagline: 'Everything you need to get online and start converting.',
    featured: false,
    cta: 'Get Started',
    items: [
      'Custom website design (5–7 pages)',
      'AI Chat Assistant (site-trained)',
      'Contact & booking form',
      'Mobile responsive build',
      'Google Analytics setup',
      'On-page SEO foundation',
      'Domain & hosting guidance',
      '30-day post-launch support',
    ],
  },
  {
    tier: 'Business',
    subtitle: 'The System',
    price: '$5,000',
    period: 'one-time',
    tagline: 'Full AI-powered infrastructure. Built to run itself.',
    featured: true,
    cta: 'Get The System',
    items: [
      'Everything in Foundation',
      'AI Voice Agent (24/7 phone answering)',
      'Automated booking & calendar sync',
      'Admin dashboard + CRM',
      'Branded client portal',
      'Stripe payment integration',
      'English + Spanish AI support',
      'Custom AI model trained on your business',
      '60-day post-launch support',
    ],
  },
  {
    tier: 'Enterprise',
    subtitle: 'The Full Empire',
    price: '$10,000+',
    period: 'custom quote',
    tagline: 'The complete ecosystem. Nothing held back.',
    featured: false,
    cta: "Let's Talk",
    items: [
      'Everything in The System',
      'Fully custom AI model & training pipeline',
      'Live social media feed integration',
      'AIOS — AI Search Optimization',
      'Real-time analytics & reporting',
      'Priority builds & rolling updates',
      'Monthly strategy calls (12 months)',
      '90-day dedicated support',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
      <SlideshowBg images={IMAGES} overlay="rgba(8,15,23,0.91)" />
      <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <p className="section-number" style={{ marginBottom: 12 }}>03</p>
          <p className="label" style={{ marginBottom: 20 }}>Investment</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.1, marginBottom: 20 }}>
            Choose your level of{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>power.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(168,178,193,0.5)', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            Every build is a one-time investment. You own everything. No subscriptions, no platform fees, no lock-in.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, alignItems: 'start' }}>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: plan.featured ? -6 : -4,
                boxShadow: plan.featured
                  ? '0 24px 64px rgba(212,136,42,0.22), 0 0 48px rgba(212,136,42,0.12)'
                  : '0 16px 48px rgba(0,0,0,0.5)',
                transition: { duration: 0.25 },
              }}
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
              style={{
                border: plan.featured ? '1px solid rgba(212,136,42,0.55)' : '1px solid rgba(212,136,42,0.12)',
                background: plan.featured
                  ? 'linear-gradient(160deg, rgba(212,136,42,0.07) 0%, rgba(212,136,42,0.02) 100%)'
                  : 'var(--black-card)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Featured glow */}
              {plan.featured && (
                <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, background: 'radial-gradient(circle, rgba(212,136,42,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
              )}

              {/* Popular badge */}
              {plan.featured && (
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--gold), #E8A855)', padding: '5px 24px', fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', color: '#080F17' }}>
                  MOST POPULAR
                </div>
              )}

              <div style={{ padding: plan.featured ? '52px 40px 40px' : '40px 40px' }}>
                <div style={{ marginBottom: 4 }}>
                  <span className="label" style={{ fontSize: 9 }}>{plan.tier}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 900, color: plan.featured ? 'var(--gold)' : 'var(--white)', marginBottom: 20, fontStyle: 'italic' }}>
                  {plan.subtitle}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: 'var(--white)', letterSpacing: '-0.02em' }}>
                    {plan.price}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(168,178,193,0.4)', marginBottom: 20, textTransform: 'uppercase' }}>
                  {plan.period}
                </div>

                <p style={{ fontSize: 14, color: 'rgba(168,178,193,0.6)', lineHeight: 1.65, marginBottom: 28 }}>{plan.tagline}</p>

                <div style={{ height: 1, background: plan.featured ? 'rgba(212,136,42,0.25)' : 'rgba(255,255,255,0.06)', marginBottom: 28 }} />

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                  {plan.items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: 'rgba(168,178,193,0.72)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--gold)', fontSize: 12, marginTop: 2, flexShrink: 0 }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/book"
                  className={plan.featured ? 'btn-gold' : 'btn-outline'}
                  style={{ width: '100%', display: 'block', textAlign: 'center', padding: '15px', textDecoration: 'none' }}
                >
                  {plan.cta} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <p className="reveal" style={{ textAlign: 'center', marginTop: 40, fontSize: 13, color: 'rgba(168,178,193,0.35)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
          All builds include a discovery call, project scope document, and final delivery handoff. Pricing is fixed — no surprise bills.
        </p>
      </div>
    </section>
  )
}
