import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import ParticleCanvas from './ParticleCanvas'
import DanChatWidget from './DanChatWidget'

const SLIDES = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80&fit=crop',
]

const PILLARS = ['Consultative', 'Visionary', 'Driven', 'Trusted']
const STATS = [
  { symbol: '◈', label: 'AI Agent On Site' },
  { symbol: '◉', label: 'Handles Intake' },
  { symbol: '◆', label: 'Follows Up' },
  { symbol: '◎', label: 'Schedules Calls' },
]

const ease = [0.22, 1, 0.36, 1]

export default function Hero({ onStartTour }) {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])
  const { scrollY } = useScroll()
  const particleY = useTransform(scrollY, [0, 600], [0, -80])
  const photoY = useTransform(scrollY, [0, 600], [0, -40])

  // React doesn't reliably apply the `muted` prop to video elements — set via ref
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !muted
      videoRef.current.muted = next
      setMuted(next)
    }
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="gradient-animate"
      style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Particle canvas — parallax */}
      <motion.div style={{ y: particleY, position: 'absolute', inset: 0, zIndex: 1 }}>
        <ParticleCanvas />
      </motion.div>

      {/* Ambient glows */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,136,42,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(30,58,95,0.5) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 2 }} />

      {/* Main split layout */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 10, paddingTop: 80 }}>

        {/* ── LEFT: Dan Carter photo ── */}
        <motion.div
          className="hidden lg:flex"
          style={{ width: '42%', position: 'relative', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', y: photoY }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', zIndex: 1 }}
          >
            <source src="/dan-welcome.mp4" type="video/mp4" />
          </video>

          {/* Unmute button */}
          <motion.button
            onClick={toggleMute}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            whileHover={{ scale: 1.05, borderColor: 'rgba(212,136,42,0.7)' }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '8px 14px',
              background: 'rgba(8,15,23,0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212,136,42,0.35)',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: 8,
              letterSpacing: '0.3em',
              color: 'var(--platinum)',
            }}
          >
            {muted ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
                UNMUTE
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                MUTE
              </>
            )}
          </motion.button>
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(90deg, rgba(8,15,23,0.35) 0%, transparent 40%, transparent 70%, rgba(8,15,23,0.5) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 180, zIndex: 3, background: 'linear-gradient(to top, var(--black-rich) 0%, rgba(8,15,23,0.6) 60%, transparent 100%)' }} />
          <div style={{ position: 'absolute', right: 0, top: '8%', bottom: 0, width: 1, zIndex: 5, background: 'linear-gradient(to bottom, transparent, rgba(212,136,42,0.4) 20%, rgba(212,136,42,0.4) 80%, transparent)' }} />
          <div style={{ position: 'absolute', top: 24, left: 24, width: 36, height: 36, borderTop: '1px solid rgba(212,136,42,0.5)', borderLeft: '1px solid rgba(212,136,42,0.5)', zIndex: 5 }} />
          <div style={{ position: 'absolute', top: 24, right: 24, width: 36, height: 36, borderTop: '1px solid rgba(212,136,42,0.5)', borderRight: '1px solid rgba(212,136,42,0.5)', zIndex: 5 }} />
        </motion.div>

        {/* ── RIGHT: Content ── */}
        <motion.div
          style={{ flex: 1, padding: 'clamp(32px, 5vw, 72px)', paddingTop: 'clamp(80px, 8vw, 110px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 680, position: 'relative', overflow: 'hidden' }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          {/* ── Cinematic slideshow background ── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            {SLIDES.map((src, i) => (
              <div
                key={src}
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: i === slideIdx ? 1 : 0,
                  transform: i === slideIdx ? 'scale(1.06)' : 'scale(1)',
                  transition: 'opacity 2s ease-in-out, transform 8s linear',
                }}
              />
            ))}
            {/* Multi-layer dark overlay — keeps text crisp */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,15,23,0.92) 0%, rgba(8,15,23,0.78) 50%, rgba(8,15,23,0.88) 100%)' }} />
            {/* Gold tint at top edge — ties into brand */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 180, background: 'linear-gradient(to bottom, rgba(212,136,42,0.04) 0%, transparent 100%)' }} />
            {/* Left edge blend into left panel */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,15,23,0.6) 0%, transparent 30%)' }} />
          </div>

          {/* Text content — above slideshow */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Parent company */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}
          >
            <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
            <span className="label" style={{ fontSize: 9, letterSpacing: '0.45em' }}>A Company from Making Power Moves LLC</span>
          </motion.div>

          {/* Wordmark */}
          <motion.div
            style={{ marginBottom: 6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease }}
          >
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, color: 'var(--white)', letterSpacing: '0.12em', lineHeight: 0.95 }}>
              MPM
            </h1>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1.5px var(--gold)', letterSpacing: '0.12em', lineHeight: 0.95 }}>
              SYSTEMS
            </h1>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.5, ease }}
            style={{ width: 72, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: 32, transformOrigin: 'left' }}
          />

          {/* Dan Carter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease }}
            style={{ marginBottom: 20 }}
          >
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>
              Dan Carter
            </div>
            <div className="label" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(232,168,85,0.95)' }}>
              Director of Client Solutions
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease }}
            style={{ fontSize: 15, color: 'var(--platinum)', lineHeight: 1.78, maxWidth: 500, marginBottom: 28 }}
          >
            Dan works directly with business owners to design and deliver AI-powered systems that automate operations, capture every lead, and scale without adding headcount. From discovery call to launch — he's in it with you.
          </motion.p>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.06, duration: 0.3 }}
                whileHover={{ borderColor: 'rgba(212,136,42,0.65)', background: 'rgba(212,136,42,0.1)', scale: 1.02 }}
                style={{
                  padding: '7px 16px',
                  border: '1px solid rgba(212,136,42,0.3)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'rgba(232,168,85,0.95)',
                  textTransform: 'uppercase',
                  background: 'rgba(212,136,42,0.06)',
                  cursor: 'default',
                  transition: 'all 0.2s',
                }}
              >{p}</motion.div>
            ))}
          </motion.div>

          {/* Guide Me button */}
          {onStartTour && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              style={{ marginBottom: 28 }}
            >
              <button
                onClick={onStartTour}
                style={{
                  background: 'none',
                  border: '1px solid rgba(212,136,42,0.35)',
                  color: 'rgba(232,168,85,0.9)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,136,42,0.55)'
                  e.currentTarget.style.color = 'var(--gold)'
                  e.currentTarget.style.background = 'rgba(212,136,42,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,136,42,0.35)'
                  e.currentTarget.style.color = 'rgba(232,168,85,0.9)'
                  e.currentTarget.style.background = 'none'
                }}
              >
                <div style={{ width: 22, height: 22, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(212,136,42,0.4)', flexShrink: 0 }}>
                  <img src="/dan-carter.png" alt="Dan" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
                LET DAN GUIDE YOU →
              </button>
            </motion.div>
          )}

          {/* Dan Chat Widget */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.55, ease }}
          >
            <DanChatWidget />
          </motion.div>

          {/* Phone CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.45, ease }}
            style={{ marginTop: 14 }}
          >
            <a
              href="tel:+16015318139"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                border: '1px solid rgba(212,136,42,0.22)',
                background: 'rgba(212,136,42,0.05)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
                maxWidth: 370,
                width: '100%',
                boxSizing: 'border-box',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(212,136,42,0.5)'
                e.currentTarget.style.background = 'rgba(212,136,42,0.09)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(212,136,42,0.22)'
                e.currentTarget.style.background = 'rgba(212,136,42,0.05)'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(232,168,85,0.9)', marginBottom: 3 }}>
                  CALL DAN DIRECTLY — AVAILABLE 24/7
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--white)', letterSpacing: '0.06em' }}>
                  +1 (601) 531-8139
                </div>
              </div>
            </a>
          </motion.div>

          </div>{/* end text content wrapper */}
        </motion.div>
      </div>

      {/* ── Bottom stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease }}
        style={{
          position: 'relative', zIndex: 10,
          borderTop: '1px solid rgba(212,136,42,0.18)',
          background: 'rgba(13,27,42,0.85)',
          backdropFilter: 'blur(12px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
        className="md:grid-cols-4"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            whileHover={{ background: 'rgba(212,136,42,0.04)' }}
            style={{
              padding: '18px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              borderRight: i < 3 ? '1px solid rgba(212,136,42,0.1)' : 'none',
              borderBottom: i < 2 ? '1px solid rgba(212,136,42,0.1)' : 'none',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ fontSize: 20, color: 'var(--gold)', lineHeight: 1 }}>{s.symbol}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 9.5, letterSpacing: '0.28em', color: 'var(--platinum)' }}>{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
