import { useState } from 'react'

const BUDGETS = ['$2,500 – Foundation', '$5,000 – The System', '$10,000+ – The Full Empire', 'Not sure yet']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = e => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', phone: '', business: '', budget: '', message: '' })
  }

  const inputBase = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(201,168,76,0.16)',
    color: 'var(--platinum)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    padding: '13px 16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    WebkitAppearance: 'none',
  }
  const label = {
    fontFamily: 'var(--font-display)',
    fontSize: 9,
    letterSpacing: '0.42em',
    textTransform: 'uppercase',
    color: 'rgba(201,168,76,0.6)',
    display: 'block',
    marginBottom: 8,
  }
  const onFocus = e => (e.target.style.borderColor = 'rgba(201,168,76,0.45)')
  const onBlur  = e => (e.target.style.borderColor = 'rgba(201,168,76,0.16)')

  return (
    <section id="contact" style={{ padding: '120px 40px', background: '#070707' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 80 }} className="lg:grid-cols-2">

          {/* Left: Info */}
          <div className="reveal-left">
            <p className="section-number" style={{ marginBottom: 12 }}>07</p>
            <p className="label" style={{ marginBottom: 24 }}>Book a Discovery Call</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.08, letterSpacing: '-0.01em', marginBottom: 28 }}>
              Let's figure out<br />
              exactly what your<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>business needs.</em>
            </h2>

            <p style={{ fontSize: 16, color: 'rgba(232,228,221,0.58)', lineHeight: 1.78, marginBottom: 44 }}>
              No templates. No upsells. Just a real conversation with Dan about what you're trying to build and whether MPM Systems is the right fit. Most calls are 20 minutes.
            </p>

            {/* What to expect */}
            <div style={{ marginBottom: 44 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(201,168,76,0.5)', marginBottom: 18, textTransform: 'uppercase' }}>
                What Happens Next
              </div>
              {[
                'You fill out the form — takes 2 minutes.',
                'Dan reviews your business and reaches out within 24 hours.',
                'We jump on a 20-minute discovery call.',
                'You receive a custom scope and quote within 48 hours.',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ width: 22, height: 22, border: '1px solid rgba(201,168,76,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, color: 'var(--gold)' }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(232,228,221,0.62)', lineHeight: 1.6, paddingTop: 2 }}>{step}</span>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { lbl: 'Email', val: 'makingpowermovesllc@gmail.com', href: 'mailto:makingpowermovesllc@gmail.com' },
                { lbl: 'Response time', val: 'Within 24 hours', href: null },
              ].map(c => (
                <div key={c.lbl}>
                  <span style={label}>{c.lbl}</span>
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

          {/* Right: Form */}
          <div className="reveal-right" style={{ transitionDelay: '0.15s' }}>
            {sent ? (
              <div style={{ border: '1px solid rgba(201,168,76,0.3)', padding: '64px 40px', textAlign: 'center', background: 'rgba(201,168,76,0.025)' }}>
                <div style={{ fontSize: 40, marginBottom: 20, color: 'var(--gold)' }}>✦</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: 'var(--white)', marginBottom: 14 }}>
                  Request Received
                </div>
                <p style={{ fontSize: 15, color: 'rgba(232,228,221,0.55)', lineHeight: 1.65, maxWidth: 320, margin: '0 auto' }}>
                  Dan will review your submission and reach out within 24 hours. Power moves incoming.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={label}>Your Name</label>
                    <input name="name" value={form.name} onChange={onChange} required placeholder="Full name" style={inputBase} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={label}>Email</label>
                    <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@email.com" style={inputBase} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={label}>Phone</label>
                    <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="(601) 000-0000" style={inputBase} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label style={label}>Business Name</label>
                    <input name="business" value={form.business} onChange={onChange} required placeholder="Your business" style={inputBase} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>

                <div>
                  <label style={label}>Investment Range</label>
                  <select name="budget" value={form.budget} onChange={onChange} style={{ ...inputBase, cursor: 'pointer' }} onFocus={onFocus} onBlur={onBlur}>
                    <option value="" style={{ background: '#0a0a0a' }}>Select a tier</option>
                    {BUDGETS.map(b => <option key={b} value={b} style={{ background: '#0a0a0a' }}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label style={label}>Tell Us About Your Business</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    placeholder="What does your business do? What's the biggest bottleneck right now?"
                    style={{ ...inputBase, resize: 'vertical', minHeight: 120 }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', padding: '16px', fontSize: 11 }}>
                  Submit & Book a Discovery Call →
                </button>

                <p style={{ fontSize: 11, color: 'rgba(232,228,221,0.3)', textAlign: 'center', fontFamily: 'var(--font-display)', letterSpacing: '0.15em' }}>
                  No spam. No pressure. Just a conversation.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
