import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2600)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#080F17',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 24,
        overflow: 'hidden',
      }}
    >
      {/* SVG logo build */}
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ overflow: 'visible' }}>
        {/* Outer ring */}
        <motion.circle
          cx="70" cy="70" r="64"
          fill="none" stroke="rgba(212,136,42,0.25)" strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />
        {/* Inner accent ring */}
        <motion.circle
          cx="70" cy="70" r="56"
          fill="none" stroke="rgba(212,136,42,0.12)" strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
        />
        {/* MPM text */}
        <motion.text
          x="70" y="77"
          textAnchor="middle"
          fill="#D4882A"
          fontFamily="'Cinzel', serif"
          fontSize="26"
          fontWeight="700"
          letterSpacing="5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          MPM
        </motion.text>
      </svg>

      {/* SYSTEMS label */}
      <motion.div
        initial={{ opacity: 0, letterSpacing: '0.8em', y: 6 }}
        animate={{ opacity: 1, letterSpacing: '0.55em', y: 0 }}
        transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 11,
          color: 'rgba(212,136,42,0.65)',
          textTransform: 'uppercase',
          marginTop: -8,
        }}
      >
        Systems
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(212,136,42,0.6), transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Scan line sweep */}
      <motion.div
        initial={{ x: '-110%' }}
        animate={{ x: '110%' }}
        transition={{ delay: 1.3, duration: 0.6, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(212,136,42,0.5) 40%, rgba(232,168,85,0.8) 50%, rgba(212,136,42,0.5) 60%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Corner accents */}
      {[
        { top: 32, left: 32, borderTop: '1px solid rgba(212,136,42,0.3)', borderLeft: '1px solid rgba(212,136,42,0.3)' },
        { top: 32, right: 32, borderTop: '1px solid rgba(212,136,42,0.3)', borderRight: '1px solid rgba(212,136,42,0.3)' },
        { bottom: 32, left: 32, borderBottom: '1px solid rgba(212,136,42,0.3)', borderLeft: '1px solid rgba(212,136,42,0.3)' },
        { bottom: 32, right: 32, borderBottom: '1px solid rgba(212,136,42,0.3)', borderRight: '1px solid rgba(212,136,42,0.3)' },
      ].map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
          style={{ position: 'absolute', width: 28, height: 28, ...s }}
        />
      ))}
    </motion.div>
  )
}
