<<<<<<< HEAD
import { useEffect } from 'react'
import SlideshowBg from './SlideshowBg'

const CALENDLY_URL = 'https://calendly.com/malikdade20?background_color=0d1b2a&text_color=ffffff&primary_color=d4882a&hide_gdpr_banner=1'

const IMAGES = [
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1400&q=80&fit=crop',
]

export default function Contact() {
  useEffect(() => {
    if (document.querySelector('script[src*="calendly"]')) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  const labelStyle = {
=======
import CalendlyEmbed from './CalendlyEmbed'

export default function Contact() {
  const label = {
>>>>>>> b89e58092111efe5732fce104d159b80ed7436d0
    fontFamily: 'var(--font-display)',
    fontSize: 9,
    letterSpacing: '0.42em',
    textTransform: 'uppercase',
    color: 'rgba(212,136,42,0.6)',
    display: 'block',
    marginBottom: 8,
  }

  return (
    <section id="contact" style={{ padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
      <SlideshowBg images={IMAGES} overlay="rgba(8,15,23,0.90)" />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 80 }} className="lg:grid-cols-2">

          <div className="reveal-left">
            <p className="section-number" style={{ marginBottom: 12 }}>07</p>
            <p className="label" style={{ marginBottom: 24 }}>Book a Discovery Call</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.08, letterSpacing: '-0.01em', marginBottom: 28 }}>
              Let's figure out<br />
              exactly what your<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>business needs.</em>
            </h2>

            <p style={{ fontSize: 16, color: 'rgba(168,178,193,0.58)', lineHeight: 1.78, marginBottom: 44 }}>
              No templates. No upsells. Just a real conversation with Dan about what you're trying to build and whether MPM Systems is the right fit. Pick a time that works for you — most calls are 20 minutes.
            </p>

            <div style={{ marginBottom: 44 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(212,136,42,0.5)', marginBottom: 18, textTransform: 'uppercase' }}>
                What Happens Next
              </div>
              {[
<<<<<<< HEAD
                'Pick a time that works for you — takes 30 seconds.',
                'Get an instant confirmation email with call details.',
                'Show up and talk to Dan — no prep needed.',
                'Receive a custom scope and quote within 48 hours.',
=======
                'Chat with Dan or pick a time on the calendar.',
                'Choose an available date and time that fits your schedule.',
                'We jump on a 20-minute discovery call.',
                'You receive a custom scope and quote within 48 hours.',
>>>>>>> b89e58092111efe5732fce104d159b80ed7436d0
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ width: 22, height: 22, border: '1px solid rgba(212,136,42,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: 'var(--gold)' }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(168,178,193,0.62)', lineHeight: 1.6, paddingTop: 2 }}>{step}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { lbl: 'Email', val: 'makingpowermovesllc@gmail.com', href: 'mailto:makingpowermovesllc@gmail.com' },
                { lbl: 'Response Time', val: 'Within 24 hours', href: null },
              ].map(c => (
                <div key={c.lbl}>
                  <span style={labelStyle}>{c.lbl}</span>
                  {c.href ? (
                    <a href={c.href} style={{ fontSize: 14, color: 'var(--platinum)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.target.style.color = 'var(--gold)')}
                      onMouseLeave={e => (e.target.style.color = 'var(--platinum)')}>
                      {c.val}
                    </a>
                  ) : (
                    <span style={{ fontSize: 14, color: 'var(--platinum)' }}>{c.val}</span>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48, width: 80, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          </div>

<<<<<<< HEAD
          {/* Right: Calendly Embed */}
          <div className="reveal-right" style={{ transitionDelay: '0.15s' }}>
            <div style={{
              border: '1px solid rgba(212,136,42,0.22)',
              background: 'rgba(8,15,23,0.7)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Top gold accent bar */}
              <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold), rgba(212,136,42,0.3), transparent)' }} />

              {/* Corner accent — top right */}
              <div style={{ position: 'absolute', top: 2, right: 0, width: 64, height: 1, background: 'linear-gradient(270deg, rgba(212,136,42,0.25), transparent)', pointerEvents: 'none' }} />
              {/* Corner accent — bottom left */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 64, height: 1, background: 'linear-gradient(90deg, rgba(212,136,42,0.2), transparent)', pointerEvents: 'none' }} />

              <div
                className="calendly-inline-widget"
                data-url={CALENDLY_URL}
                style={{ minWidth: 280, height: 660 }}
              />
            </div>

            <p style={{ textAlign: 'center', marginTop: 16, fontSize: 10, color: 'rgba(168,178,193,0.25)', fontFamily: 'var(--font-display)', letterSpacing: '0.2em' }}>
              NO SPAM. NO PRESSURE. JUST A CONVERSATION.
=======
          <div className="reveal-right" style={{ transitionDelay: '0.15s' }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.35em', color: 'rgba(212,136,42,0.55)', textTransform: 'uppercase' }}>
                Select Your Time
              </div>
            </div>
            <CalendlyEmbed height={720} minWidth={280} />
            <p style={{ fontSize: 11, color: 'rgba(168,178,193,0.3)', textAlign: 'center', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', marginTop: 16 }}>
              No spam. No pressure. Just a conversation.
>>>>>>> b89e58092111efe5732fce104d159b80ed7436d0
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
