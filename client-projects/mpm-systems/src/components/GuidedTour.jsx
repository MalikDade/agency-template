import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const TOUR = [
  {
    path: '/',
    label: 'Home',
    text: "This is where it all starts. I'm Dan — I help businesses like yours replace manual work with AI systems that run 24/7. Scroll down or let me walk you through what we build.",
  },
  {
    path: '/services',
    label: 'Services',
    text: "Every system we build is custom — no templates, no plugins. From AI voice agents to full admin dashboards, it all connects into one infrastructure built for your business.",
  },
  {
    path: '/pricing',
    label: 'Pricing',
    text: "Most clients start with The System at $5K. It's a one-time build — you own everything. No subscriptions, no platform lock-in. We also offer maintenance if you want us to keep running it.",
  },
  {
    path: '/case-study',
    label: 'Case Study',
    text: "The Platinum Line is a real, live example of what we build. Selena — the AI voice agent — has been answering calls and booking appointments 24/7 since launch. This is our proof.",
  },
  {
    path: '/why-us',
    label: 'Why MPM Systems',
    text: "We're not a freelancer or a template shop. We're a systems company. Everything we build is custom-engineered, handed off to you, and built to outlast any agency relationship.",
  },
  {
    path: '/book',
    label: 'Book a Call',
    text: "Pick any time on the calendar — the call is 20 minutes. I'll ask about your business, your bottlenecks, and your goals. Then I'll put together a custom scope within 48 hours.",
  },
]

export default function GuidedTour({ active, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!active) return
    const idx = TOUR.findIndex(t => t.path === location.pathname)
    if (idx !== -1) setStep(idx)
  }, [location.pathname, active])

  const goTo = (idx) => {
    setStep(idx)
    navigate(TOUR[idx].path)
  }

  const current = TOUR[step]

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          style={{
            position: 'fixed',
            bottom: 32,
            left: 32,
            zIndex: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 12,
            maxWidth: 340,
          }}
        >
          {/* Speech bubble */}
          <motion.div
            key={current.path}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(8,15,23,0.96)',
              border: '1px solid rgba(212,136,42,0.3)',
              backdropFilter: 'blur(14px)',
              padding: '18px 20px',
              position: 'relative',
            }}
          >
            {/* Top accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, rgba(212,136,42,0.6), transparent)' }} />

            {/* Header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.35em', color: 'rgba(212,136,42,0.7)' }}>
                {step + 1} / {TOUR.length} — {current.label.toUpperCase()}
              </span>
              <button
                onClick={onClose}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(168,178,193,0.72)', fontSize: 14, lineHeight: 1, padding: '0 0 0 12px' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 13, color: 'rgba(168,178,193,0.82)', lineHeight: 1.65, marginBottom: 16 }}>
              {current.text}
            </p>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
              {TOUR.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === step ? 18 : 6,
                    height: 4,
                    background: i === step ? 'var(--gold)' : 'rgba(212,136,42,0.25)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    borderRadius: 2,
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => goTo(Math.max(0, step - 1))}
                disabled={step === 0}
                style={{
                  flex: 1, padding: '8px', border: '1px solid rgba(212,136,42,0.25)',
                  background: 'transparent', color: step === 0 ? 'rgba(168,178,193,0.72)' : 'var(--platinum)',
                  fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.25em',
                  cursor: step === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
                }}
              >
                ← PREV
              </button>
              {step < TOUR.length - 1 ? (
                <button
                  onClick={() => goTo(step + 1)}
                  style={{
                    flex: 1, padding: '8px',
                    background: 'linear-gradient(135deg, var(--gold), #E8A855)',
                    border: 'none', color: '#080F17',
                    fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.25em',
                    cursor: 'pointer',
                  }}
                >
                  NEXT →
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/book'); onClose() }}
                  style={{
                    flex: 1, padding: '8px',
                    background: 'linear-gradient(135deg, var(--gold), #E8A855)',
                    border: 'none', color: '#080F17',
                    fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.25em',
                    cursor: 'pointer',
                  }}
                >
                  BOOK CALL →
                </button>
              )}
            </div>
          </motion.div>

          {/* Dan avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div
              style={{
                width: 48, height: 48, borderRadius: '50%',
                overflow: 'hidden',
                border: '1.5px solid rgba(212,136,42,0.55)',
                boxShadow: '0 0 20px rgba(212,136,42,0.15)',
                flexShrink: 0,
              }}
            >
              <img src="/dan-carter.png" alt="Dan" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            </motion.div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, color: 'var(--white)', letterSpacing: '0.1em' }}>Dan Carter</div>
              <div style={{ fontSize: 10, color: 'rgba(212,136,42,0.6)', marginTop: 1 }}>Guiding your tour</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
