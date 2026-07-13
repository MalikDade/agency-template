import { useState, useEffect, useRef, Fragment } from 'react'
import SlideshowBg from '../components/SlideshowBg'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1400&q=80&fit=crop',
]

const ADMIN_PASSWORD = 'MPM2026Admin'
const AUTH_KEY = 'mpm_admin_auth'
const TABS = ['Overview', 'Leads', 'Chat Logs', 'Bookings', 'Ask Dan', 'Settings']

function GoldParticles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random(),
    }))
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.alpha += (Math.random() - 0.5) * 0.02
        p.alpha = Math.max(0.05, Math.min(0.6, p.alpha))
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(212,136,42,' + p.alpha + ')'
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

function SparkleField({ count = 16 }) {
  const sparkles = useState(() => Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    bottom: Math.random() * 70,
    delay: Math.random() * 6,
    dur: 4 + Math.random() * 5,
    size: 2 + Math.random() * 3,
  })))[0]
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {sparkles.map((s, i) => (
        <span key={i} style={{
          position: 'absolute', left: s.left + '%', bottom: s.bottom + '%',
          width: s.size, height: s.size, borderRadius: '50%',
          background: '#E8A855', boxShadow: '0 0 6px 1px rgba(232,168,85,0.7)',
          animation: 'mpmSparkle ' + s.dur + 's ease-in-out ' + s.delay + 's infinite',
        }} />
      ))}
      <style>{'@keyframes mpmSparkle { 0%,100%{opacity:0;transform:translateY(0)} 50%{opacity:1;transform:translateY(-14px)} }'}</style>
    </div>
  )
}

function HeroBanner({ newToday, systemOk }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
  return (
    <div style={{
      position: 'relative', overflow: 'hidden', border: '1px solid rgba(212,136,42,0.4)',
      borderRadius: 4, padding: '40px 32px', marginBottom: 32,
      background: '#060D14',
      boxShadow: '0 0 0 1px rgba(212,136,42,0.15), 0 30px 80px -30px rgba(212,136,42,0.5)',
    }}>
      <SlideshowBg images={HERO_IMAGES} overlay="linear-gradient(100deg, rgba(6,13,20,0.82) 0%, rgba(6,13,20,0.6) 55%, rgba(6,13,20,0.42) 100%)" />
      <SparkleField count={18} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.35em', color: 'rgba(212,136,42,0.75)', textTransform: 'uppercase' }}>
          Command Center
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 700, color: 'var(--gold)', fontSize: 'clamp(30px, 4vw, 46px)', marginTop: 10, textShadow: '0 2px 24px rgba(0,0,0,0.7)' }}>
          {greeting}, Malik 👑
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: 10, fontSize: 15, maxWidth: 480 }}>
          {newToday > 0 ? newToday + ' new lead' + (newToday > 1 ? 's' : '') + ' came in today. Dan is on it.' : 'All quiet so far today — Dan is watching the phones and the site.'}
        </p>
        <div style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 999, border: '1px solid ' + (systemOk ? '#22c55e' : '#f87171'), background: 'rgba(0,0,0,0.5)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: systemOk ? '#22c55e' : '#f87171', boxShadow: systemOk ? '0 0 8px #22c55e' : '0 0 8px #f87171' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: systemOk ? '#9ff0bc' : '#ffb3b3' }}>
            {systemOk ? 'All systems healthy' : 'System issue detected — check Settings'}
          </span>
        </div>
      </div>
    </div>
  )
}

function LiveBadge({ lastSynced }) {
  const [, tick] = useState(0)
  useEffect(() => { const id = setInterval(() => tick(t => t + 1), 1000); return () => clearInterval(id) }, [])
  if (!lastSynced) return null
  const secs = Math.max(0, Math.round((Date.now() - lastSynced.getTime()) / 1000))
  const label = secs < 3 ? 'just now' : secs < 60 ? secs + 's ago' : Math.round(secs / 60) + 'm ago'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)' }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', animation: 'mpmPulse 2s ease-in-out infinite' }} />
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.2em', color: '#9ff0bc' }}>LIVE · SYNCED {label.toUpperCase()}</span>
      <style>{'@keyframes mpmPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }'}</style>
    </div>
  )
}

function StatCard({ label, value, icon, sub, accent }) {
  return (
    <div style={{ position: 'relative', padding: '28px 24px', background: 'rgba(8,15,23,0.85)', border: '1px solid ' + (accent || 'rgba(212,136,42,0.25)'), overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, ' + (accent || '#D4882A') + ', transparent)' }} />
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.3em', color: 'rgba(212,136,42,0.65)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{value !== undefined && value !== null ? value : '—'}</div>
      {sub && <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.68)', marginTop: 8 }}>{sub}</div>}
    </div>
  )
}

async function adminFetch(path, opts = {}) {
  const headers = { 'x-admin-password': 'MPM2026Admin', ...(opts.headers || {}) }
  if (opts.body) headers['Content-Type'] = 'application/json'
  const res = await fetch(path, { ...opts, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

function fmt(v) {
  if (!v) return '—'
  return new Date(v).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

const S = {
  page: { minHeight: '100vh', background: '#060D14', color: 'var(--platinum)', fontFamily: 'var(--font-body)', position: 'relative' },
  loginWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: '#060D14', position: 'relative', overflow: 'hidden' },
  loginCard: { position: 'relative', zIndex: 2, width: '100%', maxWidth: 420, border: '1px solid rgba(212,136,42,0.3)', background: 'rgba(8,15,23,0.97)', padding: '48px 40px' },
  input: { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,136,42,0.2)', color: 'var(--platinum)', fontFamily: 'var(--font-body)', fontSize: 14, padding: '14px 16px', outline: 'none', marginBottom: 16, boxSizing: 'border-box' },
  btn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #D4882A, #E8A855)', border: 'none', color: '#060D14', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer' },
  header: { borderBottom: '1px solid rgba(212,136,42,0.12)', padding: '18px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,13,20,0.95)', position: 'sticky', top: 0, zIndex: 100 },
  tabs: { display: 'flex', padding: '0 36px', borderBottom: '1px solid rgba(212,136,42,0.1)', background: 'rgba(6,13,20,0.9)' },
  tab: (active) => ({ padding: '16px 22px', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: active ? 'var(--gold)' : 'rgba(232,236,240,0.9)', cursor: 'pointer', background: 'none', border: 'none', borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent', whiteSpace: 'nowrap', transition: 'color 0.15s' }),
  content: { padding: '40px 36px', maxWidth: 1300, margin: '0 auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,136,42,0.6)', borderBottom: '1px solid rgba(212,136,42,0.15)' },
  td: { padding: '16px', borderBottom: '1px solid rgba(212,136,42,0.06)', verticalAlign: 'top', lineHeight: 1.6 },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212,136,42,0.6)', marginBottom: 24 },
}

function AskDan() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "What's up, Malik? I'm plugged into your leads and chat logs. Ask me anything — I've got you." }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  useEffect(() => {
    fetch('/api/admin/dan-chat', { headers: { 'x-admin-password': 'MPM2026Admin' } })
      .then(r => r.json())
      .then(data => { if (data.messages && data.messages.length) setMessages(data.messages.map(m => ({ role: m.role, content: m.content }))) })
      .catch(() => {})
  }, [])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    setMessages(m => [...m, { role: 'user', content: text, time: now }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/dan-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': 'MPM2026Admin' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      const t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      setMessages(m => [...m, { role: 'assistant', content: data.reply || 'No response.', time: t }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Connection error. Try again.' }])
    } finally { setLoading(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 580, border: '1px solid rgba(212,136,42,0.2)', background: 'rgba(8,15,23,0.8)' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(212,136,42,0.12)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(212,136,42,0.4)', flexShrink: 0 }}>
          <img src="/dan-carter.png" alt="Dan Carter" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>Dan Carter</div>
          <div style={{ fontSize: 11, color: 'rgba(212,136,42,0.7)' }}>AI Director · Live data access</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ fontSize: 11, color: 'rgba(168,178,193,0.72)' }}>Online</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '78%', padding: '14px 18px', background: m.role === 'user' ? 'linear-gradient(135deg, #D4882A, #E8A855)' : 'rgba(255,255,255,0.04)', border: m.role === 'user' ? 'none' : '1px solid rgba(212,136,42,0.15)', color: m.role === 'user' ? '#060D14' : 'var(--platinum)', fontSize: 13, lineHeight: 1.6, fontWeight: m.role === 'user' ? 600 : 400 }}>
              {m.content}
              {m.time && <div style={{ fontSize: 13, marginTop: 4, opacity: 0.35, textAlign: m.role === 'user' ? 'right' : 'left' }}>{m.time}</div>}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 6, padding: '14px 18px', width: 'fit-content', border: '1px solid rgba(212,136,42,0.15)' }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4882A', animation: 'bounce 1s ease-in-out ' + (i*0.15) + 's infinite' }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(212,136,42,0.12)', display: 'flex', gap: 12 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask Dan anything about your leads, bookings, activity..." style={{ ...S.input, marginBottom: 0, flex: 1 }} />
        <button onClick={send} disabled={loading} style={{ ...S.btn, width: 'auto', padding: '14px 24px', opacity: loading ? 0.5 : 1 }}>Send</button>
      </div>
      <style>{'@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }'}</style>
    </div>
  )
}

function Toggle({ label, checked, onChange, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, color: 'var(--white)', fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: 'rgba(168,178,193,0.72)', marginTop: 2 }}>{sub}</div>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        style={{
          width: 46, height: 26, borderRadius: 13, border: '1px solid rgba(212,136,42,0.3)',
          background: checked ? 'linear-gradient(135deg, #D4882A, #E8A855)' : 'rgba(255,255,255,0.06)',
          position: 'relative', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s',
        }}
      >
        <div style={{
          width: 20, height: 20, borderRadius: '50%', background: checked ? '#060D14' : 'rgba(232,236,240,0.6)',
          position: 'absolute', top: 2, left: checked ? 23 : 2, transition: 'left 0.2s',
        }} />
      </button>
    </div>
  )
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOUR_OPTIONS = Array.from({ length: 17 }, (_, i) => i + 6) // 6am..22 (10pm)

function formatHour(h) {
  const hh = h % 24
  const period = hh < 12 ? 'AM' : 'PM'
  const disp = hh % 12 === 0 ? 12 : hh % 12
  return `${disp}:00 ${period}`
}

function AvailabilityManager() {
  const [loading, setLoading] = useState(true)
  const [loadErr, setLoadErr] = useState('')
  const [weeklyHours, setWeeklyHours] = useState(null)
  const [savingHours, setSavingHours] = useState(false)
  const [hoursMsg, setHoursMsg] = useState('')
  const [blocks, setBlocks] = useState([])
  const [blockForm, setBlockForm] = useState({ type: 'block', start: '', end: '', label: '' })
  const [addingBlock, setAddingBlock] = useState(false)
  const [blockError, setBlockError] = useState('')
  const [removingId, setRemovingId] = useState(null)

  const load = () => {
    setLoading(true)
    setLoadErr('')
    return adminFetch('/api/admin/availability')
      .then(d => { setWeeklyHours(d.weeklyHours); setBlocks(d.blocks || []) })
      .catch(e => setLoadErr(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const saveHours = async () => {
    setSavingHours(true)
    setHoursMsg('')
    try {
      await adminFetch('/api/admin/availability', { method: 'PATCH', body: JSON.stringify({ weeklyHours }) })
      setHoursMsg('Saved ✓')
      setTimeout(() => setHoursMsg(''), 3000)
    } catch (e) {
      setHoursMsg('Failed: ' + e.message)
    } finally {
      setSavingHours(false)
    }
  }

  const addBlock = async () => {
    setBlockError('')
    if (!blockForm.start || !blockForm.end) { setBlockError('Start and end are required.'); return }
    setAddingBlock(true)
    try {
      await adminFetch('/api/admin/availability', {
        method: 'POST',
        body: JSON.stringify({
          type: blockForm.type,
          startTime: new Date(blockForm.start).toISOString(),
          endTime: new Date(blockForm.end).toISOString(),
          label: blockForm.label || undefined,
        }),
      })
      setBlockForm({ type: 'block', start: '', end: '', label: '' })
      await load()
    } catch (e) {
      setBlockError(e.message)
    } finally {
      setAddingBlock(false)
    }
  }

  const removeBlock = async (id) => {
    setRemovingId(id)
    try {
      await adminFetch(`/api/admin/availability?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      await load()
    } catch (e) {
      setBlockError(e.message)
    } finally {
      setRemovingId(null)
    }
  }

  if (loading) return <p style={{ fontSize: 13, color: 'rgba(168,178,193,0.65)' }}>Loading availability…</p>
  if (loadErr) return <p style={{ fontSize: 13, color: '#f87171' }}>{loadErr}</p>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
      <div style={{ padding: '20px 22px', border: '1px solid rgba(212,136,42,0.2)', background: 'rgba(8,15,23,0.7)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(232,168,85,0.9)', marginBottom: 14, textTransform: 'uppercase' }}>Weekly Hours</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {weeklyHours.map((w, i) => (
            <div key={w.day} style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div style={{ width: 90 }}>
                <Toggle
                  label={WEEKDAYS[w.day]}
                  checked={w.enabled}
                  onChange={v => setWeeklyHours(hrs => hrs.map((h, idx) => idx === i ? { ...h, enabled: v } : h))}
                />
              </div>
              {w.enabled && (
                <>
                  <select value={w.start} onChange={e => setWeeklyHours(hrs => hrs.map((h, idx) => idx === i ? { ...h, start: parseInt(e.target.value, 10) } : h))} style={{ ...S.input, marginBottom: 0, width: 'auto', padding: '8px 10px' }}>
                    {HOUR_OPTIONS.map(h => <option key={h} value={h}>{formatHour(h)}</option>)}
                  </select>
                  <span style={{ color: 'rgba(168,178,193,0.6)', fontSize: 12 }}>to</span>
                  <select value={w.end} onChange={e => setWeeklyHours(hrs => hrs.map((h, idx) => idx === i ? { ...h, end: parseInt(e.target.value, 10) } : h))} style={{ ...S.input, marginBottom: 0, width: 'auto', padding: '8px 10px' }}>
                    {HOUR_OPTIONS.map(h => <option key={h} value={h}>{formatHour(h)}</option>)}
                  </select>
                </>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16 }}>
          <button onClick={saveHours} disabled={savingHours} style={{ ...S.btn, width: 'auto', padding: '12px 20px', opacity: savingHours ? 0.6 : 1 }}>
            {savingHours ? 'Saving…' : 'Save Weekly Hours'}
          </button>
          {hoursMsg && <span style={{ fontSize: 12, color: hoursMsg.startsWith('Failed') ? '#f87171' : '#22c55e' }}>{hoursMsg}</span>}
        </div>
      </div>

      <div style={{ padding: '20px 22px', border: '1px solid rgba(212,136,42,0.2)', background: 'rgba(8,15,23,0.7)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(232,168,85,0.9)', marginBottom: 14, textTransform: 'uppercase' }}>Blocked / Extra Open Times</div>

        {blocks.length === 0 ? (
          <p style={{ fontSize: 13, color: 'rgba(168,178,193,0.6)', marginBottom: 16 }}>No upcoming blocks or extra-open windows.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {blocks.map(b => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: `1px solid ${b.type === 'block' ? 'rgba(248,113,113,0.3)' : 'rgba(34,197,94,0.3)'}`, background: b.type === 'block' ? 'rgba(248,113,113,0.05)' : 'rgba(34,197,94,0.05)', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontSize: 12, color: 'rgba(232,236,240,0.85)' }}>
                  <span style={{ color: b.type === 'block' ? '#f87171' : '#4ade80', fontWeight: 600, textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.1em', marginRight: 8 }}>{b.type === 'block' ? 'Blocked' : 'Open'}</span>
                  {new Date(b.start_time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })} – {new Date(b.end_time).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  {b.label && <span style={{ color: 'rgba(168,178,193,0.65)', marginLeft: 8 }}>· {b.label}</span>}
                </div>
                <button disabled={removingId === b.id} onClick={() => removeBlock(b.id)} style={{ fontSize: 11, padding: '5px 10px', background: 'transparent', border: '1px solid rgba(212,136,42,0.3)', color: 'rgba(232,236,240,0.75)', cursor: 'pointer' }}>Remove</button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={blockForm.type} onChange={e => setBlockForm(f => ({ ...f, type: e.target.value }))} style={{ ...S.input, marginBottom: 0, width: 'auto', padding: '10px 12px' }}>
            <option value="block">Block time off</option>
            <option value="open">Open extra time</option>
          </select>
          <input type="datetime-local" value={blockForm.start} onChange={e => setBlockForm(f => ({ ...f, start: e.target.value }))} style={{ ...S.input, marginBottom: 0, width: 'auto' }} />
          <span style={{ color: 'rgba(168,178,193,0.6)', fontSize: 12 }}>to</span>
          <input type="datetime-local" value={blockForm.end} onChange={e => setBlockForm(f => ({ ...f, end: e.target.value }))} style={{ ...S.input, marginBottom: 0, width: 'auto' }} />
          <input placeholder="Label (optional)" value={blockForm.label} onChange={e => setBlockForm(f => ({ ...f, label: e.target.value }))} style={{ ...S.input, marginBottom: 0, width: 160 }} />
          <button onClick={addBlock} disabled={addingBlock} style={{ ...S.btn, width: 'auto', padding: '10px 18px', opacity: addingBlock ? 0.6 : 1 }}>{addingBlock ? 'Adding…' : 'Add'}</button>
        </div>
        {blockError && <div style={{ fontSize: 12, color: '#f87171', marginTop: 10 }}>{blockError}</div>}
      </div>
    </div>
  )
}

function BookingsCalendar() {
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); d.setHours(0,0,0,0); return d })
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [selected, setSelected] = useState(() => new Date())
  const [showAddForm, setShowAddForm] = useState(false)
  const [addForm, setAddForm] = useState({ name: '', email: '', phone: '', businessType: '', when: '' })
  const [addSubmitting, setAddSubmitting] = useState(false)
  const [addError, setAddError] = useState('')
  const [reschedulingId, setReschedulingId] = useState(null)
  const [rescheduleValue, setRescheduleValue] = useState('')
  const [actionBusyId, setActionBusyId] = useState(null)
  const [actionError, setActionError] = useState('')
  const [showAvailability, setShowAvailability] = useState(false)

  const load = () => {
    setLoading(true)
    setErr(null)
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
    return adminFetch(`/api/admin/bookings?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`)
      .then(d => setEvents(d.events || []))
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setErr(null)
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
    const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
    adminFetch(`/api/admin/bookings?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`)
      .then(d => { if (!cancelled) setEvents(d.events || []) })
      .catch(e => { if (!cancelled) setErr(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [cursor])

  const submitAdd = async () => {
    setAddError('')
    if (!addForm.name.trim() || !addForm.when) { setAddError('Name and a time are required.'); return }
    setAddSubmitting(true)
    try {
      await adminFetch('/api/admin/bookings', {
        method: 'POST',
        body: JSON.stringify({
          name: addForm.name, email: addForm.email || undefined, phone: addForm.phone || undefined,
          businessType: addForm.businessType || undefined,
          scheduledAt: new Date(addForm.when).toISOString(),
        }),
      })
      setAddForm({ name: '', email: '', phone: '', businessType: '', when: '' })
      setShowAddForm(false)
      await load()
    } catch (e) {
      setAddError(e.message)
    } finally {
      setAddSubmitting(false)
    }
  }

  const runAction = async (id, action, extra = {}) => {
    setActionBusyId(id)
    setActionError('')
    try {
      await adminFetch('/api/admin/bookings', { method: 'PATCH', body: JSON.stringify({ id, action, ...extra }) })
      setReschedulingId(null)
      await load()
    } catch (e) {
      setActionError(e.message)
    } finally {
      setActionBusyId(null)
    }
  }

  const byDay = {}
  events.forEach(ev => {
    const key = new Date(ev.start_time).toDateString()
    ;(byDay[key] = byDay[key] || []).push(ev)
  })

  const firstDow = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay()
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d))

  const todayKey = new Date().toDateString()
  const selectedEvents = (byDay[selected.toDateString()] || []).sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
  const monthLabel = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const timeStr = iso => new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => setCursor(c => new Date(c.getFullYear(), c.getMonth() - 1, 1))} style={{ background: 'transparent', border: '1px solid rgba(212,136,42,0.3)', color: 'var(--gold)', padding: '8px 14px', cursor: 'pointer', fontSize: 14 }}>←</button>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--white)', minWidth: 170, textAlign: 'center' }}>{monthLabel}</div>
          <button onClick={() => setCursor(c => new Date(c.getFullYear(), c.getMonth() + 1, 1))} style={{ background: 'transparent', border: '1px solid rgba(212,136,42,0.3)', color: 'var(--gold)', padding: '8px 14px', cursor: 'pointer', fontSize: 14 }}>→</button>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setShowAvailability(s => !s)} style={{ background: 'transparent', border: '1px solid rgba(212,136,42,0.35)', color: 'var(--gold)', padding: '12px 20px', cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-display)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {showAvailability ? 'Hide Availability' : 'Manage Availability'}
          </button>
          <button onClick={() => setShowAddForm(s => !s)} style={{ ...S.btn, width: 'auto', padding: '12px 22px' }}>{showAddForm ? 'Cancel' : '+ New Appointment'}</button>
        </div>
      </div>

      {showAvailability && <AvailabilityManager />}

      {err && (
        <div style={{ marginBottom: 20, padding: '14px 20px', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.06)', fontSize: 12, color: '#f87171' }}>
          {err}
        </div>
      )}
      {actionError && (
        <div style={{ marginBottom: 20, padding: '14px 20px', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.06)', fontSize: 12, color: '#f87171' }}>
          {actionError}
        </div>
      )}

      {showAddForm && (
        <div style={{ marginBottom: 28, padding: '20px 22px', border: '1px solid rgba(212,136,42,0.2)', background: 'rgba(8,15,23,0.7)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <input placeholder="Name *" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} style={{ ...S.input, marginBottom: 0 }} />
            <input placeholder="Email" type="email" value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} style={{ ...S.input, marginBottom: 0 }} />
            <input placeholder="Phone" value={addForm.phone} onChange={e => setAddForm(f => ({ ...f, phone: e.target.value }))} style={{ ...S.input, marginBottom: 0 }} />
            <input placeholder="Business Type" value={addForm.businessType} onChange={e => setAddForm(f => ({ ...f, businessType: e.target.value }))} style={{ ...S.input, marginBottom: 0 }} />
            <input type="datetime-local" value={addForm.when} onChange={e => setAddForm(f => ({ ...f, when: e.target.value }))} style={{ ...S.input, marginBottom: 0 }} />
          </div>
          {addError && <div style={{ fontSize: 12, color: '#f87171' }}>{addError}</div>}
          <button onClick={submitAdd} disabled={addSubmitting} style={{ ...S.btn, width: 'auto', padding: '12px 22px', opacity: addSubmitting ? 0.6 : 1 }}>
            {addSubmitting ? 'Saving…' : 'Add Appointment'}
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(260px, 1fr)', gap: 24, alignItems: 'start' }} className="bookings-grid">
        <div style={{ border: '1px solid rgba(212,136,42,0.15)', background: 'rgba(8,15,23,0.7)', opacity: loading ? 0.6 : 1, transition: 'opacity 0.15s' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {WEEKDAYS.map(w => (
              <div key={w} style={{ padding: '10px 0', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.15em', color: 'rgba(212,136,42,0.55)', borderBottom: '1px solid rgba(212,136,42,0.12)' }}>{w}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {cells.map((d, i) => {
              if (!d) return <div key={'empty-' + i} style={{ minHeight: 76, borderRight: '1px solid rgba(212,136,42,0.05)', borderBottom: '1px solid rgba(212,136,42,0.05)' }} />
              const key = d.toDateString()
              const dayEvents = byDay[key] || []
              const isToday = key === todayKey
              const isSelected = key === selected.toDateString()
              return (
                <div
                  key={key}
                  onClick={() => setSelected(d)}
                  style={{
                    minHeight: 76, padding: 8, cursor: 'pointer',
                    borderRight: '1px solid rgba(212,136,42,0.05)', borderBottom: '1px solid rgba(212,136,42,0.05)',
                    background: isSelected ? 'rgba(212,136,42,0.12)' : 'transparent',
                    boxShadow: isSelected ? 'inset 0 0 0 1px rgba(212,136,42,0.4)' : 'none',
                  }}
                >
                  <div style={{ fontSize: 12, color: isToday ? 'var(--gold)' : 'rgba(168,178,193,0.75)', fontWeight: isToday ? 700 : 400 }}>{d.getDate()}</div>
                  {dayEvents.length > 0 && (
                    <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {dayEvents.slice(0, 3).map((ev, idx) => (
                        <div key={idx} style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4882A', boxShadow: '0 0 5px #D4882A' }} />
                      ))}
                      {dayEvents.length > 3 && <span style={{ fontSize: 12, color: 'rgba(212,136,42,0.7)' }}>+{dayEvents.length - 3}</span>}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ border: '1px solid rgba(212,136,42,0.15)', background: 'rgba(8,15,23,0.7)', padding: '20px 22px', minHeight: 200 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.2em', color: 'rgba(212,136,42,0.6)', marginBottom: 16 }}>
            {selected.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}
          </div>
          {selectedEvents.length === 0 ? (
            <p style={{ fontSize: 13, color: 'rgba(168,178,193,0.6)' }}>No calls booked this day.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {selectedEvents.map(ev => {
                const busy = actionBusyId === ev.id
                const isRescheduling = reschedulingId === ev.id
                return (
                  <div key={ev.id} style={{ padding: '12px 14px', borderLeft: '2px solid #D4882A', background: 'rgba(212,136,42,0.05)', opacity: ev.status === 'cancelled' ? 0.45 : 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600 }}>{timeStr(ev.start_time)} – {timeStr(ev.end_time)}</div>
                    <div style={{ fontSize: 13, color: 'rgba(232,236,240,0.85)', marginTop: 4 }}>{ev.invitee_name || ev.name || 'Booked call'}</div>
                    {ev.invitee_email && <div style={{ fontSize: 11, color: 'rgba(212,136,42,0.75)', marginTop: 2 }}>{ev.invitee_email}</div>}
                    {ev.status && ev.status !== 'scheduled' && (
                      <div style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(232,168,85,0.9)', marginTop: 4, textTransform: 'uppercase' }}>{ev.status.replace('_', ' ')}</div>
                    )}

                    {isRescheduling ? (
                      <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <input type="datetime-local" value={rescheduleValue} onChange={e => setRescheduleValue(e.target.value)} style={{ ...S.input, marginBottom: 0, width: 'auto' }} />
                        <button disabled={busy} onClick={() => runAction(ev.id, 'reschedule', { scheduledAt: new Date(rescheduleValue).toISOString() })} style={{ fontSize: 11, padding: '8px 12px', background: 'var(--gold)', color: '#060D14', border: 'none', cursor: 'pointer' }}>Save</button>
                        <button disabled={busy} onClick={() => setReschedulingId(null)} style={{ fontSize: 11, padding: '8px 12px', background: 'transparent', border: '1px solid rgba(212,136,42,0.3)', color: 'rgba(232,236,240,0.8)', cursor: 'pointer' }}>Cancel</button>
                      </div>
                    ) : (
                      ev.status !== 'cancelled' && (
                        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <button disabled={busy} onClick={() => { setReschedulingId(ev.id); setRescheduleValue('') }} style={{ fontSize: 11, padding: '6px 10px', background: 'transparent', border: '1px solid rgba(212,136,42,0.3)', color: 'var(--gold)', cursor: 'pointer' }}>Reschedule</button>
                          <button disabled={busy} onClick={() => runAction(ev.id, 'complete')} style={{ fontSize: 11, padding: '6px 10px', background: 'transparent', border: '1px solid rgba(34,197,94,0.35)', color: '#4ade80', cursor: 'pointer' }}>Complete</button>
                          <button disabled={busy} onClick={() => runAction(ev.id, 'cancel')} style={{ fontSize: 11, padding: '6px 10px', background: 'transparent', border: '1px solid rgba(248,113,113,0.35)', color: '#f87171', cursor: 'pointer' }}>Cancel</button>
                        </div>
                      )
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <style>{'@media (max-width: 860px) { .bookings-grid { grid-template-columns: 1fr !important; } }'}</style>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState('Overview')
  const [leads, setLeads] = useState([])
  const [chats, setChats] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    business_hours: 'Mon–Fri 9am–6pm CST',
    dan_title: 'Director of Client Solutions',
    contact_email: 'makingpowermovesllc@gmail.com',
    contact_phone: '',
    vapi_available: 'true',
    accepting_new_leads: 'true',
  })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const formInit = useRef(false)
  const [leadSearch, setLeadSearch] = useState('')
  const [expandedLead, setExpandedLead] = useState(null)

  const login = e => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) { sessionStorage.setItem(AUTH_KEY, '1'); setAuthed(true); setLoginError('') }
    else setLoginError('Incorrect password')
  }
  const logout = () => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); setPassword('') }

  const [lastSynced, setLastSynced] = useState(null)

  useEffect(() => {
    if (!authed) return
    let cancelled = false
    const load = async (silent) => {
      if (!silent) setLoading(true)
      if (!silent) setError(null)
      try {
        const [ld, ch, st] = await Promise.all([adminFetch('/api/admin/leads'), adminFetch('/api/admin/chats'), adminFetch('/api/admin/settings')])
        if (cancelled) return
        setLeads(ld.leads || [])
        setChats(ch.chats || [])
        setSettings(st)
        setError(null)
        setLastSynced(new Date())
      } catch(err) { if (!cancelled) setError(err.message) }
      finally { if (!silent && !cancelled) setLoading(false) }
    }
    load(false)
    const poll = setInterval(() => load(true), 15000)
    return () => { cancelled = true; clearInterval(poll) }
  }, [authed])

  useEffect(() => {
    if (settings?.business && !formInit.current) {
      setForm(settings.business)
      formInit.current = true
    }
  }, [settings])

  const saveSettings = async () => {
    if (!form || saving) return
    setSaving(true)
    setSaveMsg('')
    try {
      await adminFetch('/api/admin/settings', { method: 'POST', body: JSON.stringify(form) })
      setSaveMsg('Saved ✓')
      setTimeout(() => setSaveMsg(''), 3000)
    } catch (err) {
      setSaveMsg('Failed to save: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const todayLeads = leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString())

  if (!authed) {
    return (
      <div style={S.loginWrap}>
        <GoldParticles />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,136,42,0.06) 0%, transparent 70%)', zIndex: 1 }} />
        <form style={S.loginCard} onSubmit={login}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #D4882A, transparent)' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.3em', color: 'rgba(212,136,42,0.7)', marginBottom: 8 }}>MPM SYSTEMS</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>Command Center</div>
          <p style={{ fontSize: 13, color: 'rgba(168,178,193,0.68)', marginBottom: 36 }}>Restricted access. Authorized personnel only.</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Admin password" style={S.input} autoFocus />
          {loginError && <p style={{ fontSize: 12, color: '#f87171', marginBottom: 16 }}>{loginError}</p>}
          <button type="submit" style={S.btn}>Access Dashboard</button>
        </form>
      </div>
    )
  }

  return (
    <div style={S.page}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <GoldParticles />
      </div>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at top, rgba(212,136,42,0.04) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <header style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #D4882A, #E8A855)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: '#060D14' }}>M</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.25em', color: 'rgba(212,136,42,0.7)' }}>MPM SYSTEMS</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--white)' }}>Command Center</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <LiveBadge lastSynced={lastSynced} />
          {todayLeads.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(212,136,42,0.1)', border: '1px solid rgba(212,136,42,0.3)' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#D4882A', boxShadow: '0 0 8px #D4882A' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.2em', color: 'var(--gold)' }}>{todayLeads.length} NEW TODAY</span>
            </div>
          )}
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid rgba(212,136,42,0.25)', color: 'rgba(168,178,193,0.6)', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.2em', padding: '10px 18px', cursor: 'pointer' }}>Sign Out</button>
        </div>
      </header>
      <nav style={S.tabs}>
        {TABS.map(t => <button key={t} type="button" style={S.tab(tab === t)} onClick={() => setTab(t)}>{t}</button>)}
      </nav>
      <div style={{ ...S.content, position: 'relative', zIndex: 1 }}>
        {error && <div style={{ padding: '14px 18px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)', color: '#fca5a5', fontSize: 13, marginBottom: 24 }}>{error}</div>}
        {loading && tab === 'Overview' && <p style={{ color: 'rgba(168,178,193,0.65)', fontSize: 13 }}>Loading...</p>}

        {tab === 'Overview' && !loading && (
          <div>
            <HeroBanner newToday={todayLeads.length} systemOk={!error} />
            <div style={{ marginBottom: 40 }}>
              <div style={S.sectionTitle}>Live Intelligence</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                <StatCard label="Total Leads" value={leads.length} icon="🎯" sub="All time" />
                <StatCard label="New Today" value={todayLeads.length} icon="⚡" sub="Since midnight" accent="rgba(34,197,94,0.5)" />
                <StatCard label="Chat Sessions" value={chats.length} icon="💬" sub="All conversations" />
                <StatCard label="Conversion" value={leads.length > 0 ? Math.round((todayLeads.length / leads.length) * 100) + '%' : '—'} icon="📈" sub="Today vs total" accent="rgba(168,85,247,0.4)" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <div style={S.sectionTitle}>Recent Leads</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {leads.slice(0,5).map(l => (
                    <div key={l.id} style={{ padding: '16px 20px', background: 'rgba(8,15,23,0.8)', border: '1px solid rgba(212,136,42,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, color: 'var(--white)', fontWeight: 600 }}>{l.name || 'Unknown'}</div>
                        <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.72)', marginTop: 2 }}>{l.email}</div>
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(212,136,42,0.6)' }}>{fmt(l.created_at)}</div>
                    </div>
                  ))}
                  {leads.length === 0 && <p style={{ color: 'rgba(168,178,193,0.6)', fontSize: 13 }}>No leads yet.</p>}
                </div>
              </div>
              <div>
                <div style={S.sectionTitle}>Recent Chat Activity</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {chats.slice(0,5).map(c => (
                    <div key={c.id} style={{ padding: '16px 20px', background: 'rgba(8,15,23,0.8)', border: '1px solid rgba(212,136,42,0.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600 }}>{c.lead_name || 'Visitor'}</span>
                        <span style={{ fontSize: 11, color: 'rgba(212,136,42,0.6)' }}>{fmt(c.updated_at || c.created_at)}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.72)', lineHeight: 1.5 }}>{c.summary ? c.summary.slice(0,100) + '...' : 'No summary'}</div>
                    </div>
                  ))}
                  {chats.length === 0 && <p style={{ color: 'rgba(168,178,193,0.6)', fontSize: 13 }}>No chat sessions yet.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'Leads' && (() => {
          const q = leadSearch.trim().toLowerCase()
          const filtered = !q ? leads : leads.filter(l =>
            (l.name || '').toLowerCase().includes(q) ||
            (l.email || '').toLowerCase().includes(q) ||
            (l.phone || '').toLowerCase().includes(q) ||
            (l.business_type || '').toLowerCase().includes(q)
          )
          const isToday = l => new Date(l.created_at).toDateString() === new Date().toDateString()
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 20, flexWrap: 'wrap' }}>
                <div style={S.sectionTitle}>All Leads</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.2em', color: 'rgba(212,136,42,0.6)' }}>
                  {filtered.length}{filtered.length !== leads.length ? ` OF ${leads.length}` : ' TOTAL'}
                </div>
              </div>
              <input
                value={leadSearch}
                onChange={e => setLeadSearch(e.target.value)}
                placeholder="Search by name, email, phone, or business type..."
                style={{ ...S.input, maxWidth: 420 }}
              />
              {filtered.length === 0 ? (
                <p style={{ color: 'rgba(168,178,193,0.65)', fontSize: 13 }}>{leads.length === 0 ? 'No leads yet.' : 'No leads match your search.'}</p>
              ) : (
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Name</th>
                      <th style={S.th}>Contact</th>
                      <th style={S.th}>Business Type</th>
                      <th style={S.th}>Source</th>
                      <th style={S.th}>Created</th>
                      <th style={S.th}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(l => {
                      const open = expandedLead === l.id
                      return (
                        <Fragment key={l.id}>
                          <tr onClick={() => setExpandedLead(open ? null : l.id)} style={{ cursor: 'pointer' }}>
                            <td style={{ padding:'16px', borderBottom: open ? 'none' : '1px solid rgba(212,136,42,0.06)', color:'var(--white)', fontWeight:600 }}>
                              {l.name || '—'}
                              {isToday(l) && <span style={{ marginLeft: 8, padding: '2px 8px', fontSize: 12, letterSpacing: '0.1em', background: 'rgba(212,136,42,0.15)', border: '1px solid rgba(212,136,42,0.35)', color: 'var(--gold)' }}>NEW</span>}
                            </td>
                            <td style={{ padding:'16px', borderBottom: open ? 'none' : '1px solid rgba(212,136,42,0.06)' }}>
                              <div style={{ color:'rgba(212,136,42,0.8)' }}>{l.email || '—'}</div>
                              {l.phone && <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.65)', marginTop: 2 }}>{l.phone}</div>}
                            </td>
                            <td style={{ padding:'16px', borderBottom: open ? 'none' : '1px solid rgba(212,136,42,0.06)', fontSize:12, color:'rgba(168,178,193,0.75)' }}>{l.business_type || '—'}{l.budget ? ` · ${l.budget}` : ''}</td>
                            <td style={{ padding:'16px', borderBottom: open ? 'none' : '1px solid rgba(212,136,42,0.06)' }}><span style={{ padding:'3px 10px', background:'rgba(212,136,42,0.1)', border:'1px solid rgba(212,136,42,0.2)', fontSize:11 }}>{l.source || 'chat'}</span></td>
                            <td style={{ padding:'16px', borderBottom: open ? 'none' : '1px solid rgba(212,136,42,0.06)', fontSize:12, color:'rgba(168,178,193,0.72)', whiteSpace:'nowrap' }}>{fmt(l.created_at)}</td>
                            <td style={{ padding:'16px', borderBottom: open ? 'none' : '1px solid rgba(212,136,42,0.06)', fontSize:12, color:'rgba(212,136,42,0.7)', whiteSpace:'nowrap' }}>{open ? '▲ Less' : '▼ More'}</td>
                          </tr>
                          {open && (
                            <tr>
                              <td colSpan={6} style={{ padding: '0 16px 20px', borderBottom: '1px solid rgba(212,136,42,0.06)' }}>
                                <div style={{ padding: '16px 20px', background: 'rgba(212,136,42,0.04)', border: '1px solid rgba(212,136,42,0.15)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                  <div style={{ fontSize: 13, color: 'rgba(232,236,240,0.85)', lineHeight: 1.6 }}>{l.summary || l.message || 'No message on file.'}</div>
                                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                                    {l.email && <a href={`mailto:${l.email}`} onClick={e => e.stopPropagation()} style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', border: '1px solid rgba(212,136,42,0.3)', padding: '6px 12px' }}>Email</a>}
                                    {l.phone && <a href={`tel:${l.phone}`} onClick={e => e.stopPropagation()} style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', border: '1px solid rgba(212,136,42,0.3)', padding: '6px 12px' }}>Call</a>}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )
        })()}

        {tab === 'Chat Logs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div style={S.sectionTitle}>Chat Sessions</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.2em', color: 'rgba(212,136,42,0.6)' }}>{chats.length} SESSIONS</div>
            </div>
            {chats.length === 0 ? <p style={{ color: 'rgba(168,178,193,0.65)', fontSize: 13 }}>No chat logs yet.</p> : (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Session</th>
                    <th style={S.th}>Lead</th>
                    <th style={S.th}>Summary</th>
                    <th style={S.th}>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {chats.map(c => (
                    <tr key={c.id}>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', fontFamily:'monospace', fontSize:11, color:'rgba(168,178,193,0.65)' }}>{c.session_id ? c.session_id.slice(0,8) : '—'}...</td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)' }}>
                        <div style={{ color:'var(--white)', fontWeight:600 }}>{c.lead_name || '—'}</div>
                        {c.lead_email && <div style={{ fontSize:12, color:'rgba(212,136,42,0.7)', marginTop:2 }}>{c.lead_email}</div>}
                      </td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', maxWidth:480, fontSize:12, color:'rgba(168,178,193,0.65)' }}>{c.summary || '—'}</td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', fontSize:12, color:'rgba(168,178,193,0.72)', whiteSpace:'nowrap' }}>{fmt(c.updated_at || c.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'Bookings' && (
          <div>
            <div style={S.sectionTitle}>Discovery Call Bookings</div>
            {todayLeads.length > 0 && (
              <div style={{ padding:'16px 20px', background:'rgba(212,136,42,0.07)', border:'1px solid rgba(212,136,42,0.3)', marginBottom:28, display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'#D4882A', boxShadow:'0 0 10px #D4882A' }} />
                <span style={{ fontSize:13, color:'var(--gold)' }}><strong>{todayLeads.length} new lead{todayLeads.length > 1 ? 's' : ''}</strong> came in today</span>
              </div>
            )}
            <BookingsCalendar />
          </div>
        )}

        {tab === 'Ask Dan' && (
          <div>
            <div style={S.sectionTitle}>Ask Dan · Live Intelligence</div>
            <AskDan />
          </div>
        )}

        {tab === 'Settings' && (
          <div style={{ maxWidth: 600 }}>
            {!settings && (
              <div style={{ marginBottom: 20, padding: '14px 20px', border: '1px solid rgba(212,136,42,0.25)', background: 'rgba(212,136,42,0.06)', fontSize: 12, color: 'rgba(232,236,240,0.85)' }}>
                Live status unavailable — API routes only run on Vercel, not local `npm run dev`. Editing works below; Save will confirm once deployed.
              </div>
            )}
            <div style={S.sectionTitle}>Business Settings</div>

            {form && (
              <>
                <div style={{ marginBottom: 20, padding: '24px 28px', background: 'rgba(8,15,23,0.8)', border: '1px solid rgba(212,136,42,0.15)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.25em', color: 'rgba(212,136,42,0.5)' }}>Contact</div>
                  <div>
                    <label style={{ fontSize: 11, color: 'rgba(168,178,193,0.72)', display: 'block', marginBottom: 6 }}>Contact Phone</label>
                    <input value={form.contact_phone || ''} onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))} placeholder="(601) 531-8139" style={{ ...S.input, marginBottom: 0 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'rgba(168,178,193,0.72)', display: 'block', marginBottom: 6 }}>Contact Email</label>
                    <input value={form.contact_email || ''} onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))} style={{ ...S.input, marginBottom: 0 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'rgba(168,178,193,0.72)', display: 'block', marginBottom: 6 }}>Business Hours</label>
                    <input value={form.business_hours || ''} onChange={e => setForm(f => ({ ...f, business_hours: e.target.value }))} style={{ ...S.input, marginBottom: 0 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'rgba(168,178,193,0.72)', display: 'block', marginBottom: 6 }}>Dan's Title</label>
                    <input value={form.dan_title || ''} onChange={e => setForm(f => ({ ...f, dan_title: e.target.value }))} style={{ ...S.input, marginBottom: 0 }} />
                  </div>
                </div>

                <div style={{ marginBottom: 20, padding: '24px 28px', background: 'rgba(8,15,23,0.8)', border: '1px solid rgba(212,136,42,0.15)', display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.25em', color: 'rgba(212,136,42,0.5)' }}>Availability</div>
                  <Toggle
                    label="Accepting New Leads"
                    sub="Turn off if you're at capacity — the site can reflect this."
                    checked={form.accepting_new_leads !== 'false'}
                    onChange={v => setForm(f => ({ ...f, accepting_new_leads: v ? 'true' : 'false' }))}
                  />
                  <Toggle
                    label="Vapi AI Assistant (Phone Calls)"
                    sub="On: callers can book through the AI voice assistant. Off: it politely redirects them to the site."
                    checked={form.vapi_available !== 'false'}
                    onChange={v => setForm(f => ({ ...f, vapi_available: v ? 'true' : 'false' }))}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                  <button onClick={saveSettings} disabled={saving} style={{ ...S.btn, width: 'auto', padding: '14px 28px', opacity: saving ? 0.6 : 1 }}>
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                  {saveMsg && <span style={{ fontSize: 12, color: saveMsg.startsWith('Failed') ? '#f87171' : '#22c55e' }}>{saveMsg}</span>}
                </div>
              </>
            )}

            <div style={S.sectionTitle}>System Configuration</div>
            <div style={{ marginBottom:32, padding:'20px 24px', background:'rgba(8,15,23,0.8)', border:'1px solid rgba(212,136,42,0.15)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize: 12, letterSpacing:'0.25em', color:'rgba(212,136,42,0.5)', marginBottom:8 }}>Environment</div>
              <div style={{ fontSize:16, color:'var(--white)', fontWeight:600 }}>{settings?.environment || '—'}</div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {Object.entries(settings?.variables || {}).map(([key, configured]) => (
                <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 20px', border:'1px solid rgba(212,136,42,0.1)', background:'rgb(8,15,23,0.6)' }}>
                  <span style={{ fontFamily:'monospace', fontSize:13, color:'rgba(168,178,193,0.8)' }}>{key}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background: configured ? '#22c55e' : '#f87171', boxShadow: configured ? '0 0 6px #22c55e' : '0 0 6px #f87171' }} />
                    <span style={{ fontSize:11, color: configured ? '#22c55e' : '#f87171' }}>{configured ? 'Configured' : 'Missing'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
