<<<<<<< HEAD
import { useState, useEffect, useCallback } from 'react'

const TOKEN_KEY = 'mpm_admin_token'
const C = {
  navy: '#0D1B2A',
  navyMid: '#0F2132',
  navyCard: '#132639',
  gold: '#D4882A',
  goldDim: 'rgba(212,136,42,0.18)',
  goldFaint: 'rgba(212,136,42,0.07)',
  white: '#F0F4F8',
  muted: 'rgba(168,178,193,0.55)',
  border: 'rgba(212,136,42,0.15)',
}

const TABS = ['Overview', 'Leads', 'Chat Logs', 'Bookings', 'Settings']

function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  })
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function Cell({ children, muted }) {
  return (
    <td style={{ padding: '12px 14px', fontSize: 13, color: muted ? C.muted : C.white, borderBottom: `1px solid ${C.goldDim}`, verticalAlign: 'middle' }}>
      {children || <span style={{ color: C.muted }}>—</span>}
    </td>
  )
}

function Badge({ n }) {
  if (!n) return null
  return (
    <span style={{ marginLeft: 6, background: C.gold, color: C.navy, borderRadius: 10, padding: '1px 7px', fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }}>
      {n}
    </span>
  )
}

function Section({ title, sub, children }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 4 }}>{title}</h2>
        {sub && <p style={{ fontSize: 13, color: C.muted }}>{sub}</p>}
      </div>
      {children}
=======
import { useState, useEffect, useRef } from 'react'
import CalendlyEmbed from '../components/CalendlyEmbed'

const ADMIN_PASSWORD = 'MPM2026Admin'
const AUTH_KEY = 'mpm_admin_auth'
const TABS = ['Overview', 'Leads', 'Chat Logs', 'Bookings', 'Ask Dan', 'Settings']

// ── Gold particle canvas ──────────────────────────────────────────────────────
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
        ctx.fillStyle = `rgba(212,136,42,${p.alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, sub, accent }) {
  return (
    <div style={{
      position: 'relative',
      padding: '28px 24px',
      background: 'rgba(8,15,23,0.85)',
      border: `1px solid ${accent || 'rgba(212,136,42,0.25)'}`,
      overflow: 'hidden',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${accent || '#D4882A'}, transparent)` }} />
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,136,42,0.65)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{value ?? '—'}</div>
      {sub && <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.45)', marginTop: 8 }}>{sub}</div>}
>>>>>>> b89e58092111efe5732fce104d159b80ed7436d0
    </div>
  )
}

<<<<<<< HEAD
function Spinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: C.muted, fontSize: 13, padding: '32px 0' }}>
      <div style={{ width: 16, height: 16, border: `2px solid ${C.goldDim}`, borderTopColor: C.gold, borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      Loading…
    </div>
  )
}

function ErrorBox({ msg }) {
  return (
    <div style={{ padding: '14px 18px', border: '1px solid rgba(220,60,60,0.3)', background: 'rgba(220,60,60,0.07)', color: '#F87171', fontSize: 13, borderRadius: 2 }}>
      {msg}
    </div>
  )
}

// ── Login ────────────────────────────────────────────────────────────────────

function Login({ onLogin }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid password')
      localStorage.setItem(TOKEN_KEY, data.token)
      onLogin(data.token)
    } catch (e) {
      setErr(e.message)
=======
// ── Helpers ───────────────────────────────────────────────────────────────────
async function adminFetch(path) {
  const res = await fetch(path, { headers: { 'x-admin-password': ADMIN_PASSWORD } })
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
  loginCard: { position: 'relative', zIndex: 2, width: '100%', maxWidth: 420, border: '1px solid rgba(212,136,42,0.3)', background: 'rgba(8,15,23,0.97)', padding: '48px 40px', backdropFilter: 'blur(20px)' },
  input: { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,136,42,0.2)', color: 'var(--platinum)', fontFamily: 'var(--font-body)', fontSize: 14, padding: '14px 16px', outline: 'none', marginBottom: 16, boxSizing: 'border-box', transition: 'border-color 0.2s' },
  btn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #D4882A, #E8A855)', border: 'none', color: '#060D14', fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer' },
  header: { borderBottom: '1px solid rgba(212,136,42,0.12)', padding: '18px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,13,20,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 },
  tabs: { display: 'flex', gap: 0, padding: '0 36px', borderBottom: '1px solid rgba(212,136,42,0.1)', background: 'rgba(6,13,20,0.9)', backdropFilter: 'blur(12px)' },
  tab: (active) => ({ padding: '16px 22px', fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: active ? 'var(--gold)' : 'rgba(168,178,193,0.4)', cursor: 'pointer', background: 'none', border: 'none', borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent', transition: 'color 0.2s', whiteSpace: 'nowrap' }),
  content: { padding: '40px 36px', maxWidth: 1300, margin: '0 auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,136,42,0.6)', borderBottom: '1px solid rgba(212,136,42,0.15)' },
  td: { padding: '16px', borderBottom: '1px solid rgba(212,136,42,0.06)', verticalAlign: 'top', lineHeight: 1.6 },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212,136,42,0.6)', marginBottom: 24 },
}

// ── Ask Dan chat ──────────────────────────────────────────────────────────────
function AskDan({ leads, chats }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "What's up, Malik? I'm plugged into your leads and chat logs. Ask me anything — \"How many leads today?\", \"What's the last booking request?\", \"Summarize recent activity\" — I've got you." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const now=new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})
    const userMsg={role:"user",content:text,time:now}
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)


    try {
      const res = await fetch('/api/admin/dan-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': 'MPM2026Admin' },
        body: JSON.stringify({ message: text }),



      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply || 'No response.', time: new Date().toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'}) }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Connection error. Try again.' }])
>>>>>>> b89e58092111efe5732fce104d159b80ed7436d0
    } finally {
      setLoading(false)
    }
  }

  return (
<<<<<<< HEAD
    <div style={{ minHeight: '100vh', background: C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 380, padding: 48, border: `1px solid ${C.border}`, background: C.navyCard }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 44, height: 44, border: `1px solid rgba(212,136,42,0.4)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', background: C.goldFaint }}>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: C.gold, fontWeight: 700 }}>MPM</span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 4 }}>Admin Dashboard</h1>
          <p style={{ fontSize: 12, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>MPM Systems</p>
        </div>

        <form onSubmit={submit}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Enter password"
            style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, color: C.white, fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 12 }}
            autoFocus
          />
          {err && <ErrorBox msg={err} />}
          <button
            type="submit"
            disabled={loading || !pw}
            style={{ width: '100%', padding: '13px', background: loading ? C.goldDim : C.gold, border: 'none', color: C.navy, fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 12 }}
          >
            {loading ? 'Verifying…' : 'Sign In →'}
          </button>
        </form>
      </div>
=======
    <div style={{ display: 'flex', flexDirection: 'column', height: 580, border: '1px solid rgba(212,136,42,0.2)', background: 'rgba(8,15,23,0.8)' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(212,136,42,0.12)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #D4882A, #E8A855)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🎯</div>
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>Dan Carter</div>
          <div style={{ fontSize: 11, color: 'rgba(212,136,42,0.7)' }}>AI Director · Live data access</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          <span style={{ fontSize: 11, color: 'rgba(168,178,193,0.5)' }}>Online</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '78%',
              padding: '14px 18px',
              background: m.role === 'user' ? 'linear-gradient(135deg, #D4882A, #E8A855)' : 'rgba(255,255,255,0.04)',
              border: m.role === 'user' ? 'none' : '1px solid rgba(212,136,42,0.15)',
              color: m.role === 'user' ? '#060D14' : 'var(--platinum)',
              fontSize: 13,
              lineHeight: 1.6,
              fontWeight: m.role === 'user' ? 600 : 400,
            }}>
              {m.content}
              {m.time && <div style={{fontSize:10,marginTop:4,opacity:0.35,textAlign:m.role==='user'?'right':'left'}}>{m.time}</div>}
              {m.time && <div style={{fontSize:10,marginTop:4,opacity:0.35,textAlign:m.role==='user'?'right':'left'}}>{m.time}</div>}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 6, padding: '14px 18px', width: 'fit-content', border: '1px solid rgba(212,136,42,0.15)' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4882A', animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(212,136,42,0.12)', display: 'flex', gap: 12 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask Dan anything about your leads, bookings, activity..."
          style={{ ...S.input, marginBottom: 0, flex: 1 }}
        />
        <button onClick={send} disabled={loading} style={{ ...S.btn, width: 'auto', padding: '14px 24px', opacity: loading ? 0.5 : 1 }}>
          Send
        </button>
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
>>>>>>> b89e58092111efe5732fce104d159b80ed7436d0
    </div>
  )
}

<<<<<<< HEAD
// ── Overview ─────────────────────────────────────────────────────────────────

function Overview({ leads, chats, bookings }) {
  const today = new Date().toDateString()
  const newToday = leads.filter(l => new Date(l.created_at).toDateString() === today).length

  const stats = [
    { label: 'Total Leads', value: leads.length, note: `${newToday} today` },
    { label: 'Chat Sessions', value: chats.length, note: 'all time' },
    { label: 'Upcoming Bookings', value: bookings.length, note: 'via Calendly' },
    { label: 'New Today', value: newToday, note: 'leads captured', highlight: true },
  ]

  return (
    <Section title="Overview">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, marginBottom: 40 }}>
        {stats.map(s => (
          <div key={s.label} style={{ padding: '28px 24px', border: `1px solid ${s.highlight && s.value > 0 ? 'rgba(212,136,42,0.45)' : C.border}`, background: s.highlight && s.value > 0 ? C.goldFaint : C.navyCard }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: 700, color: s.highlight ? C.gold : C.white, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.white, marginTop: 8, fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{s.note}</div>
          </div>
        ))}
      </div>

      {leads.length > 0 && (
        <div>
          <p style={{ fontSize: 12, color: C.muted, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 14 }}>Recent Leads</p>
          <div style={{ border: `1px solid ${C.border}`, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: C.navyMid }}>
                  {['Name', 'Business', 'Phone', 'Date'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, color: C.muted, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 5).map(l => (
                  <tr key={l.id} style={{ background: C.navyCard }}>
                    <Cell>{l.name}</Cell>
                    <Cell muted={!l.business_type}>{l.business_type}</Cell>
                    <Cell muted={!l.phone}>{l.phone}</Cell>
                    <Cell muted>{fmtDate(l.created_at)}</Cell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {leads.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', border: `1px dashed ${C.border}`, color: C.muted, fontSize: 14 }}>
          No leads yet. When Dan captures contact info from chat visitors, they'll appear here.
        </div>
      )}
    </Section>
  )
}

// ── Leads ────────────────────────────────────────────────────────────────────

function LeadsTable({ leads }) {
  return (
    <Section title="Leads" sub="Contact info captured from Dan's chat conversations.">
      {leads.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', border: `1px dashed ${C.border}`, color: C.muted, fontSize: 14 }}>
          No leads captured yet. Leads are saved when visitors share contact info in the chat.
        </div>
      ) : (
        <div style={{ border: `1px solid ${C.border}`, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: C.navyMid }}>
                {['Name', 'Phone', 'Email', 'Business Type', 'Budget', 'Date'].map(h => (
                  <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 10, color: C.muted, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, borderBottom: `1px solid ${C.goldDim}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l, i) => (
                <tr key={l.id} style={{ background: i % 2 === 0 ? C.navyCard : C.navyMid, transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,136,42,0.05)')}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? C.navyCard : C.navyMid)}
                >
                  <Cell>{l.name}</Cell>
                  <Cell muted={!l.phone}>{l.phone}</Cell>
                  <Cell muted={!l.email}>{l.email}</Cell>
                  <Cell muted={!l.business_type}>{l.business_type}</Cell>
                  <Cell muted={!l.budget}>{l.budget}</Cell>
                  <Cell muted>{fmtDate(l.created_at)}</Cell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  )
}

// ── Chat Logs ────────────────────────────────────────────────────────────────

function ChatLogs({ chats }) {
  const [open, setOpen] = useState(null)

  return (
    <Section title="Chat Logs" sub="All Dan Carter conversations, newest first.">
      {chats.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', border: `1px dashed ${C.border}`, color: C.muted, fontSize: 14 }}>
          No chat sessions yet. Sessions are logged after each conversation.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {chats.map(chat => {
            const msgs = Array.isArray(chat.messages) ? chat.messages : []
            const preview = msgs.find(m => m.role === 'user')?.content?.slice(0, 80) || 'No messages'
            const isOpen = open === chat.session_id

            return (
              <div key={chat.session_id} style={{ border: `1px solid ${isOpen ? 'rgba(212,136,42,0.35)' : C.border}`, background: C.navyCard }}>
                <button
                  onClick={() => setOpen(isOpen ? null : chat.session_id)}
                  style={{ width: '100%', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' }}
                >
                  <span style={{ fontSize: 11, color: C.gold, transform: `rotate(${isOpen ? 90 : 0}deg)`, transition: 'transform 0.2s', flexShrink: 0 }}>▶</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 3, fontFamily: 'monospace' }}>{chat.session_id}</div>
                    <div style={{ fontSize: 13, color: C.white, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>"{preview}"</div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: C.muted }}>{msgs.length} msgs</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{fmtDate(chat.updated_at)}</div>
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${C.goldDim}` }}>
                    <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 400, overflowY: 'auto' }}>
                      {msgs.map((m, i) => (
                        <div key={i} style={{
                          padding: '9px 14px',
                          background: m.role === 'user' ? 'rgba(212,136,42,0.08)' : 'rgba(30,58,95,0.5)',
                          border: `1px solid ${m.role === 'user' ? 'rgba(212,136,42,0.2)' : 'rgba(255,255,255,0.06)'}`,
                          alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                          maxWidth: '80%',
                          fontSize: 13,
                          color: C.white,
                          lineHeight: 1.55,
                        }}>
                          <div style={{ fontSize: 9, color: m.role === 'user' ? C.gold : C.muted, marginBottom: 4, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            {m.role === 'user' ? 'Visitor' : 'Dan'}
                          </div>
                          {m.content}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </Section>
  )
}

// ── Bookings ─────────────────────────────────────────────────────────────────

function Bookings({ bookings, warning }) {
  return (
    <Section title="Booked Calls" sub="Upcoming Calendly appointments.">
      {warning && (
        <div style={{ padding: '12px 16px', border: `1px solid rgba(212,136,42,0.3)`, background: C.goldFaint, color: C.gold, fontSize: 13, marginBottom: 20 }}>
          ⚠ {warning} — Add CALENDLY_TOKEN to your Vercel environment variables.
        </div>
      )}
      {!warning && bookings.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', border: `1px dashed ${C.border}`, color: C.muted, fontSize: 14 }}>
          No upcoming bookings.
        </div>
      ) : (
        <div style={{ border: `1px solid ${C.border}`, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: C.navyMid }}>
                {['Event', 'Invitee', 'Email', 'Date & Time', 'Status'].map(h => (
                  <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 10, color: C.muted, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, borderBottom: `1px solid ${C.goldDim}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? C.navyCard : C.navyMid }}>
                  <Cell>{b.name}</Cell>
                  <Cell muted={!b.invitee_name}>{b.invitee_name}</Cell>
                  <Cell muted={!b.invitee_email}>{b.invitee_email}</Cell>
                  <Cell>{fmt(b.start_time)}</Cell>
                  <Cell>
                    <span style={{ padding: '2px 8px', background: b.status === 'active' ? 'rgba(34,197,94,0.15)' : 'rgba(220,60,60,0.15)', color: b.status === 'active' ? '#4ade80' : '#f87171', fontSize: 10, letterSpacing: '0.15em' }}>
                      {(b.status || 'active').toUpperCase()}
                    </span>
                  </Cell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  )
}

// ── Settings ─────────────────────────────────────────────────────────────────

function SettingsPanel({ token }) {
  const [form, setForm] = useState({
    business_hours: '',
    dan_title: '',
    contact_email: '',
    contact_phone: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [err, setErr] = useState(null)

  useEffect(() => {
    fetch('/api/settings', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        if (d.settings) setForm(f => ({ ...f, ...d.settings }))
      })
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false))
  }, [token])

  const save = async () => {
    setSaving(true)
    setSaved(false)
    setErr(null)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setErr(e.message)
    } finally {
      setSaving(false)
    }
  }

  const fields = [
    { key: 'business_hours', label: 'Business Hours', placeholder: 'Mon–Fri 9am–6pm CST' },
    { key: 'dan_title', label: "Dan's Title", placeholder: 'Director of Client Solutions' },
    { key: 'contact_email', label: 'Contact Email', placeholder: 'makingpowermovesllc@gmail.com' },
    { key: 'contact_phone', label: 'Contact Phone', placeholder: '(601) 555-0000' },
  ]

  return (
    <Section title="Settings" sub="Business details shown on the site and in notifications.">
      {loading ? <Spinner /> : (
        <div style={{ maxWidth: 560 }}>
          {err && <ErrorBox msg={err} />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
            {fields.map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontSize: 11, color: C.muted, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8 }}>{f.label}</label>
                <input
                  value={form[f.key] || ''}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{ width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, color: C.white, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(212,136,42,0.45)')}
                  onBlur={e => (e.target.style.borderColor = C.border)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={save}
            disabled={saving}
            style={{ padding: '12px 28px', background: saved ? 'rgba(34,197,94,0.2)' : C.gold, border: saved ? '1px solid #4ade80' : 'none', color: saved ? '#4ade80' : C.navy, fontWeight: 700, fontSize: 13, cursor: saving ? 'not-allowed' : 'pointer', letterSpacing: '0.05em' }}
          >
            {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save Settings'}
          </button>
        </div>
      )}
    </Section>
  )
}

// ── Dashboard Shell ───────────────────────────────────────────────────────────

function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState('Overview')
  const [leads, setLeads] = useState([])
  const [chats, setChats] = useState([])
  const [bookings, setBookings] = useState([])
  const [bookingsWarning, setBookingsWarning] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const headers = { Authorization: `Bearer ${token}` }

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [leadsRes, chatsRes, bookingsRes] = await Promise.all([
        fetch('/api/leads', { headers }),
        fetch('/api/chats', { headers }),
        fetch('/api/calendly', { headers }),
      ])
      const [ld, cd, bd] = await Promise.all([leadsRes.json(), chatsRes.json(), bookingsRes.json()])
      if (ld.error) throw new Error(ld.error)
      setLeads(ld.leads || [])
      setChats(cd.chats || [])
      setBookings(bd.bookings || [])
      setBookingsWarning(bd.warning || null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { fetchAll() }, [fetchAll])

  const tabLabel = t => {
    if (t === 'Leads') return <>{t}<Badge n={leads.length} /></>
    if (t === 'Bookings') return <>{t}<Badge n={bookings.length} /></>
    return t
  }

  return (
    <div style={{ minHeight: '100vh', background: C.navy, color: C.white, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

      {/* Header */}
      <header style={{ borderBottom: `1px solid ${C.border}`, background: C.navyMid, padding: '0 32px', display: 'flex', alignItems: 'center', gap: 0, height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 'auto' }}>
          <div style={{ width: 30, height: 30, border: `1px solid rgba(212,136,42,0.35)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.goldFaint }}>
            <span style={{ fontFamily: 'monospace', fontSize: 8, color: C.gold, fontWeight: 700 }}>MPM</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.white, letterSpacing: '0.06em' }}>MPM SYSTEMS</div>
            <div style={{ fontSize: 9, color: C.muted, letterSpacing: '0.2em' }}>ADMIN DASHBOARD</div>
          </div>
        </div>
        <button onClick={fetchAll} disabled={loading} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.muted, padding: '5px 14px', fontSize: 11, cursor: 'pointer', marginRight: 12 }}>
          {loading ? '…' : '↻ Refresh'}
        </button>
        <button onClick={onLogout} style={{ background: 'none', border: `1px solid ${C.border}`, color: C.muted, padding: '5px 14px', fontSize: 11, cursor: 'pointer' }}>
          Sign Out
        </button>
      </header>

      {/* Tab bar */}
      <div style={{ borderBottom: `1px solid ${C.border}`, background: C.navyMid, padding: '0 32px', display: 'flex', gap: 0 }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{ padding: '13px 18px', background: 'none', border: 'none', borderBottom: t === tab ? `2px solid ${C.gold}` : '2px solid transparent', color: t === tab ? C.gold : C.muted, fontSize: 13, cursor: 'pointer', marginBottom: -1, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', fontWeight: t === tab ? 600 : 400 }}
          >
            {tabLabel(t)}
          </button>
        ))}
      </div>

      {/* Content */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px' }}>
        {error && <ErrorBox msg={`Failed to load data: ${error}. Check that SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in Vercel.`} />}
        {loading && <Spinner />}
        {!loading && !error && (
          <>
            {tab === 'Overview' && <Overview leads={leads} chats={chats} bookings={bookings} />}
            {tab === 'Leads' && <LeadsTable leads={leads} />}
            {tab === 'Chat Logs' && <ChatLogs chats={chats} />}
            {tab === 'Bookings' && <Bookings bookings={bookings} warning={bookingsWarning} />}
            {tab === 'Settings' && <SettingsPanel token={token} />}
          </>
        )}
      </main>
    </div>
  )
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  if (!token) return <Login onLogin={setToken} />
  return <Dashboard token={token} onLogout={logout} />
}
=======
// ── Main Admin ────────────────────────────────────────────────────────────────
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

  const login = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) { sessionStorage.setItem(AUTH_KEY, '1'); setAuthed(true); setLoginError('') }
    else setLoginError('Incorrect password')
  }
  const logout = () => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); setPassword('') }

  useEffect(() => {
    if (!authed) return
    const load = async () => {
      setLoading(true); setError(null)
      try {
        const [ld, ch, st] = await Promise.all([
          adminFetch('/api/admin/leads'),
          adminFetch('/api/admin/chats'),
          adminFetch('/api/admin/settings'),
        ])
        setLeads(ld.leads || [])
        setChats(ch.chats || [])
        setSettings(st)
      } catch (err) { setError(err.message) }
      finally { setLoading(false) }
    }
    load()
  }, [authed])

  const todayLeads = leads.filter(l => {
    const d = new Date(l.created_at)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  })

  if (!authed) {
    return (
      <div style={S.loginWrap}>
        <GoldParticles />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,136,42,0.06) 0%, transparent 70%)', zIndex: 1 }} />
        <form style={S.loginCard} onSubmit={login}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #D4882A, transparent)' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.3em', color: 'rgba(212,136,42,0.7)', marginBottom: 8 }}>MPM SYSTEMS</div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>Command Center</div>
          <p style={{ fontSize: 13, color: 'rgba(168,178,193,0.45)', marginBottom: 36 }}>Restricted access. Authorized personnel only.</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Admin password" style={S.input} autoFocus />
          {loginError && <p style={{ fontSize: 12, color: '#f87171', marginBottom: 16 }}>{loginError}</p>}
          <button type="submit" style={S.btn}>Access Dashboard</button>
        </form>
      </div>
    )
  }

  return (
    <div style={S.page}>
      {/* Ambient background */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at top, rgba(212,136,42,0.04) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      <header style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #D4882A, #E8A855)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: '#060D14' }}>M</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.25em', color: 'rgba(212,136,42,0.7)' }}>MPM SYSTEMS</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--white)' }}>Command Center</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {todayLeads.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(212,136,42,0.1)', border: '1px solid rgba(212,136,42,0.3)' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#D4882A', boxShadow: '0 0 8px #D4882A' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold)' }}>{todayLeads.length} NEW TODAY</span>
            </div>
          )}
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid rgba(212,136,42,0.25)', color: 'rgba(168,178,193,0.6)', fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.2em', padding: '10px 18px', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      </header>

      <nav style={S.tabs}>
        {TABS.map(t => (
          <button key={t} type="button" style={S.tab(tab === t)} onClick={() => setTab(t)}>{t}</button>
        ))}
      </nav>

      <div style={{ ...S.content, position: 'relative', zIndex: 1 }}>
        {error && <div style={{ padding: '14px 18px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)', color: '#fca5a5', fontSize: 13, marginBottom: 24 }}>{error}</div>}
        {loading && tab === 'Overview' && <p style={{ color: 'rgba(168,178,193,0.4)', fontSize: 13 }}>Loading…</p>}

        {/* OVERVIEW */}
        {tab === 'Overview' && !loading && (
          <div>
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
                  {leads.slice(0, 5).map(l => (
                    <div key={l.id} style={{ padding: '16px 20px', background: 'rgba(8,15,23,0.8)', border: '1px solid rgba(212,136,42,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, color: 'var(--white)', fontWeight: 600 }}>{l.name || 'Unknown'}</div>
                        <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.5)', marginTop: 2 }}>{l.email}</div>
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(212,136,42,0.6)', textAlign: 'right' }}>{fmt(l.created_at)}</div>
                    </div>
                  ))}
                  {leads.length === 0 && <p style={{ color: 'rgba(168,178,193,0.35)', fontSize: 13 }}>No leads yet. Dan is warming up the pipeline.</p>}
                </div>
              </div>

              <div>
                <div style={S.sectionTitle}>Recent Chat Activity</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {chats.slice(0, 5).map(c => (
                    <div key={c.id} style={{ padding: '16px 20px', background: 'rgba(8,15,23,0.8)', border: '1px solid rgba(212,136,42,0.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600 }}>{c.lead_name || 'Visitor'}</span>
                        <span style={{ fontSize: 11, color: 'rgba(212,136,42,0.6)' }}>{fmt(c.updated_at || c.created_at)}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.5)', lineHeight: 1.5 }}>{c.summary ? c.summary.slice(0, 100) + '…' : 'No summary'}</div>
                    </div>
                  ))}
                  {chats.length === 0 && <p style={{ color: 'rgba(168,178,193,0.35)', fontSize: 13 }}>No chat sessions recorded yet.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LEADS */}
        {tab === 'Leads' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div style={S.sectionTitle}>All Leads</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(212,136,42,0.6)' }}>{leads.length} TOTAL</div>
            </div>
            {leads.length === 0 ? (
              <p style={{ color: 'rgba(168,178,193,0.4)', fontSize: 13 }}>No leads yet.</p>
            ) : (
              <table style={S.table}>
                <thead><tr>
                  <th style={S.th}>Name</th>
                  <th style={S.th}>Email</th>
                  <th style={S.th}>Source</th>
                  <th style={S.th}>Summary</th>
                  <th style={S.th}>Created</th>
                </tr></thead>
                <tbody>
                  {leads.map(l => (
                    <tr key={l.id} style={{ transition: 'background 0.15s' }}>
                      <td style={{ ...S.td, color: 'var(--white)', fontWeight: 600 }}>{l.name || '—'}</td>
                      <td style={{ ...S.td, color: 'rgba(212,136,42,0.8)' }}>{l.email || '—'}</td>
                      <td style={S.td}><span style={{ padding: '3px 10px', background: 'rgba(212,136,42,0.1)', border: '1px solid rgba(212,136,42,0.2)', fontSize: 11, fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>{l.source || 'chat'}</span></td>
                      <td style={{ ...S.td, maxWidth: 380, whiteSpace: 'pre-wrap', color: 'rgba(168,178,193,0.7)', fontSize: 12 }}>{l.summary || '—'}</td>
                      <td style={{ ...S.td, fontSize: 12, color: 'rgba(168,178,193,0.5)', whiteSpace: 'nowrap' }}>{fmt(l.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* CHAT LOGS */}
        {tab === 'Chat Logs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div style={S.sectionTitle}>Chat Sessions</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(212,136,42,0.6)' }}>{chats.length} SESSIONS</div>
            </div>
            {chats.length === 0 ? (
              <p style={{ color: 'rgba(168,178,193,0.4)', fontSize: 13 }}>No chat logs yet.</p>
            ) : (
              <table style={S.table}>
                <thead><tr>
                  <th style={S.th}>Session</th>
                  <th style={S.th}>Lead</th>
                  <th style={S.th}>Summary</th>
                  <th style={S.th}>Updated</th>
                </tr></thead>
                <tbody>
                  {chats.map(c => (
                    <tr key={c.id}>
                      <td style={{ ...S.td, fontFamily: 'monospace', fontSize: 11, color: 'rgba(168,178,193,0.4)' }}>{c.session_id?.slice(0, 8)}…</td>
                      <td style={S.td}>
                        <div style={{ color: 'var(--white)', fontWeight: 600 }}>{c.lead_name || '—'}</div>
                        {c.lead_email && <div style={{ fontSize: 12, color: 'rgba(212,136,42,0.7)', marginTop: 2 }}>{c.lead_email}</div>}
                      </td>
                      <td style={{ ...S.td, maxWidth: 480, whiteSpace: 'pre-wrap', fontSize: 12, color: 'rgba(168,178,193,0.65)' }}>{c.summary || '—'}</td>
                      <td style={{ ...S.td, fontSize: 12, color: 'rgba(168,178,193,0.5)', whiteSpace: 'nowrap' }}>{fmt(c.updated_at || c.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* BOOKINGS */}
        {tab === 'Bookings' && (
          <div>
            <div style={S.sectionTitle}>Discovery Call Bookings</div>
            {todayLeads.length > 0 && (
              <div style={{ padding: '16px 20px', background: 'rgba(212,136,42,0.07)', border: '1px solid rgba(212,136,42,0.3)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4882A', boxShadow: '0 0 10px #D4882A', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--gold)' }}><strong>{todayLeads.length} new lead{todayLeads.length > 1 ? 's' : ''}</strong> came in today — {todayLeads.map(l => l.name || l.email).join(', ')}</span>
              </div>
            )}
            <CalendlyEmbed height={750} minWidth={320} />
          </div>
        )}

        {/* ASK DAN */}
        {tab === 'Ask Dan' && (
          <div>
            <div style={S.sectionTitle}>Ask Dan · Live Intelligence</div>
            <AskDan leads={leads} chats={chats} />
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'Settings' && settings && (
          <div style={{ maxWidth: 600 }}>
            <div style={S.sectionTitle}>System Configuration</div>
            <div style={{ marginBottom: 32, padding: '20px 24px', background: 'rgba(8,15,23,0.8)', border: '1px solid rgba(212,136,42,0.15)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.25em', color: 'rgba(212,136,42,0.5)', marginBottom: 8 }}>Environment</div>
              <div style={{ fontSize: 16, color: 'var(--white)', fontWeight: 600 }}>{settings.environment}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Object.entries(settings.variables || {}).map(([key, configured]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', border: '1px solid rgba(212,136,42,0.1)', background: 'rgba(8,15,23,0.6)' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'rgba(168,178,193,0.8)' }}>{key}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: configured ? '#22c55e' : '#f87171', boxShadow: configured ? '0 0 6px #22c55e' : '0 0 6px #f87171' }} />
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-display)', letterSpacing: '0.15em', color: configured ? '#22c55e' : '#f87171' }}>{configured ? 'Configured' : 'Missing'}</span>
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
>>>>>>> b89e58092111efe5732fce104d159b80ed7436d0
