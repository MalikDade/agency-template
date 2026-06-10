import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FULL_TEXT = "Welcome to MPM Systems. I'm Dan Carter, your Director of Client Solutions. Let me show you what we build."

export default function DanWelcome({ onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [visible, setVisible] = useState(true)
  const indexRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current++
      setDisplayed(FULL_TEXT.slice(0, indexRef.current))
      if (indexRef.current >= FULL_TEXT.length) {
        clearInterval(interval)
        setTyping(false)
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 550)
        }, 1800)
      }
    }, 28)
    return () => clearInterval(interval)
  }, [onComplete])

  const dismiss = () => {
    setVisible(false)
    setTimeout(onComplete, 550)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 5000,
            background: 'rgba(8,15,23,0.97)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 32, padding: 24,
          }}
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.5, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 18 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              width: 108, height: 108,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(212,136,42,0.65)',
              boxShadow: '0 0 48px rgba(212,136,42,0.2)',
            }}>
              <img
                src="/dan-carter.png"
                alt="Dan Carter"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>
            {/* Pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: -10, borderRadius: '50%',
                border: '1px solid rgba(212,136,42,0.35)',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              style={{
                position: 'absolute', inset: -20, borderRadius: '50%',
                border: '1px solid rgba(212,136,42,0.2)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Name + title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'var(--white)', letterSpacing: '0.22em', marginBottom: 5 }}>
              DAN CARTER
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.35em', color: 'rgba(212,136,42,0.65)' }}>
              DIRECTOR OF CLIENT SOLUTIONS
            </div>
          </motion.div>

          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            style={{
              maxWidth: 560, width: '100%',
              padding: '32px 40px',
              border: '1px solid rgba(212,136,42,0.25)',
              background: 'rgba(30,58,95,0.35)',
              backdropFilter: 'blur(8px)',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {/* Top accent */}
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,136,42,0.5), transparent)' }} />

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              fontWeight: 400,
              color: 'var(--white)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              minHeight: 84,
            }}>
              "{displayed}
              {typing && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ display: 'inline-block', width: 2, height: '1em', background: 'var(--gold)', marginLeft: 2, verticalAlign: 'middle' }}
                />
              )}"
            </p>

            {/* Speaking indicator */}
            <motion.div
              animate={{ opacity: typing ? [0.5, 1, 0.5] : 0 }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <motion.div
                animate={typing ? { scaleY: [0.4, 1, 0.6, 1, 0.4] } : { scaleY: 0.4 }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ width: 3, height: 14, background: '#22c55e', borderRadius: 2 }}
              />
              <motion.div
                animate={typing ? { scaleY: [1, 0.4, 1, 0.7, 1] } : { scaleY: 0.4 }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                style={{ width: 3, height: 14, background: '#22c55e', borderRadius: 2 }}
              />
              <motion.div
                animate={typing ? { scaleY: [0.6, 1, 0.4, 1, 0.6] } : { scaleY: 0.4 }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                style={{ width: 3, height: 14, background: '#22c55e', borderRadius: 2 }}
              />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.35em', color: '#22c55e', marginLeft: 4 }}>
                SPEAKING
              </span>
            </motion.div>
          </motion.div>

          {/* Skip */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            onClick={dismiss}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontSize: 9,
              letterSpacing: '0.4em', color: 'var(--platinum)',
              padding: '8px 16px',
            }}
          >
            SKIP INTRO →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
