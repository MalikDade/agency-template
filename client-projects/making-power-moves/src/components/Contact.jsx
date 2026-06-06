import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sent')
    setForm({ name: '', email: '', company: '', message: '' })
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(201,168,76,0.18)',
    color: 'var(--platinum)',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    padding: '14px 18px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: 9,
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'rgba(201,168,76,0.6)',
    display: 'block',
    marginBottom: 8,
  }

  return (
    <section id="contact" style={{ padding: '120px 24px', background: 'var(--black)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 80 }} className="lg:grid-cols-2">

          {/* Left: Intro */}
          <div className="reveal">
            <p className="label" style={{ marginBottom: 24 }}>Let's Build Together</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 900,
              color: 'var(--white)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              marginBottom: 32,
            }}>
              Ready to make<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>power moves?</em>
            </h2>

            <p style={{ fontSize: 16, color: 'rgba(232,228,221,0.6)', lineHeight: 1.75, marginBottom: 48 }}>
              Whether you're looking to automate your business, partner with MPM, or explore what's possible — reach out. We respond to every serious inquiry.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'Email', value: 'makingpowermovesllc@gmail.com', href: 'mailto:makingpowermovesllc@gmail.com' },
                { label: 'Location', value: 'Mississippi, USA', href: null },
              ].map((c) => (
                <div key={c.label}>
                  <span style={labelStyle}>{c.label}</span>
                  {c.href ? (
                    <a href={c.href} style={{ fontSize: 15, color: 'var(--platinum)', textDecoration: 'none' }}
                      onMouseEnter={(e) => (e.target.style.color = 'var(--gold)')}
                      onMouseLeave={(e) => (e.target.style.color = 'var(--platinum)')}>
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ fontSize: 15, color: 'var(--platinum)' }}>{c.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Gold accent bar */}
            <div style={{ marginTop: 56, height: 2, width: 80, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
          </div>

          {/* Right: Form */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            {status === 'sent' ? (
              <div style={{
                border: '1px solid rgba(201,168,76,0.3)',
                padding: '56px 40px',
                textAlign: 'center',
                background: 'rgba(201,168,76,0.03)',
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>✦</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--gold)', marginBottom: 12 }}>
                  Message Received
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(232,228,221,0.6)' }}>
                  We'll be in touch soon. Power moves are in motion.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.18)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.18)')}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Company / Business</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your company name (optional)"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.18)')}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us what you're building or what you need..."
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.18)')}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', textAlign: 'center', padding: '16px 24px' }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
