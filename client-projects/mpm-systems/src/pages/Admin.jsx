import { useState, useEffect, useRef } from 'react'
import CalendlyEmbed from '../components/CalendlyEmbed'

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

function StatCard({ label, value, icon, sub, accent }) {
  return (
    <div style={{ position: 'relative', padding: '28px 24px', background: 'rgba(8,15,23,0.85)', border: '1px solid ' + (accent || 'rgba(212,136,42,0.25)'), overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, ' + (accent || '#D4882A') + ', transparent)' }} />
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(212,136,42,0.65)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{value !== undefined && value !== null ? value : '—'}</div>
      {sub && <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.45)', marginTop: 8 }}>{sub}</div>}
    </div>
  )
}

async function adminFetch(path) {
  const res = await fetch(path, { headers: { 'x-admin-password': 'MPM2026Admin' } })
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
  btn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #D4882A, #E8A855)', border: 'none', color: '#060D14', fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer' },
  header: { borderBottom: '1px solid rgba(212,136,42,0.12)', padding: '18px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6,13,20,0.95)', position: 'sticky', top: 0, zIndex: 100 },
  tabs: { display: 'flex', padding: '0 36px', borderBottom: '1px solid rgba(212,136,42,0.1)', background: 'rgba(6,13,20,0.9)' },
  tab: (active) => ({ padding: '16px 22px', fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: active ? 'var(--gold)' : 'rgba(168,178,193,0.4)', cursor: 'pointer', background: 'none', border: 'none', borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent', whiteSpace: 'nowrap' }),
  content: { padding: '40px 36px', maxWidth: 1300, margin: '0 auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '12px 16px', fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,136,42,0.6)', borderBottom: '1px solid rgba(212,136,42,0.15)' },
  td: { padding: '16px', borderBottom: '1px solid rgba(212,136,42,0.06)', verticalAlign: 'top', lineHeight: 1.6 },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212,136,42,0.6)', marginBottom: 24 },
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
      .then(data => { if (data.messages && data.meages.length) setMessages(data.messages.map(m => ({ role: m.role, content: m.content }))) })
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
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #D4882A, #E8A855)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎯</div>
        <div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: 'var(--white)' }}>Dan Carter</div>
          <div style={{ fontSize: 11, color: 'rgba(212,136,42,0.7)' }}>AI Director · Live data access</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ fontSize: 11, color: 'rgba(168,178,193,0.5)' }}>Online</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '78%', padding: '14px 18px', background: m.role === 'user' ? 'linear-gradient(135deg, #D4882A, #E8A855)' : 'rgba(255,255,255,0.04)', border: m.role === 'user' ? 'none' : '1px solid rgba(212,136,42,0.15)', color: m.role === 'user' ? '#060D14' : 'var(--platinum)', fontSize: 13, lineHeight: 1.6, fontWeight: m.role === 'user' ? 600 : 400 }}>
              {m.content}
              {m.time && <div style={{ fontSize: 10, marginTop: 4, opacity: 0.35, textAlign: m.role === 'user' ? 'right' : 'left' }}>{m.time}</div>}
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

  const login = e => {
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
        const [ld, ch, st] = await Promise.all([adminFetch('/api/admin/leads'), adminFetch('/api/admin/chats'), adminFetch('/api/admin/settings')])
        setLeads(ld.leads || [])
        setChats(ch.chats || [])
        setSettings(st)
      } catch(err) { setError(err.message) }
      finally { setLoading(false) }
    }
    load()
  }, [authed])

  const todayLeads = leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString())

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
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid rgba(212,136,42,0.25)', color: 'rgba(168,178,193,0.6)', fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.2em', padding: '10px 18px', cursor: 'pointer' }}>Sign Out</button>
        </div>
      </header>
      <nav style={S.tabs}>
        {TABS.map(t => <button key={t} type="button" style={S.tab(tab === t)} onClick={() => setTab(t)}>{t}</button>)}
      </nav>
      <div style={{ ...S.content, position: 'relative', zIndex: 1 }}>
        {error && <div style={{ padding: '14px 18px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)', color: '#fca5a5', fontSize: 13, marginBottom: 24 }}>{error}</div>}
        {loading && tab === 'Overview' && <p style={{ color: 'rgba(168,178,193,0.4)', fontSize: 13 }}>Loading...</p>}

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
                  {leads.slice(0,5).map(l => (
                    <div key={l.id} style={{ padding: '16px 20px', background: 'rgba(8,15,23,0.8)', border: '1px solid rgba(212,136,42,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, color: 'var(--white)', fontWeight: 600 }}>{l.name || 'Unknown'}</div>
                        <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.5)', marginTop: 2 }}>{l.email}</div>
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(212,136,42,0.6)' }}>{fmt(l.created_at)}</div>
                    </div>
                  ))}
                  {leads.length === 0 && <p style={{ color: 'rgba(168,178,193,0.35)', fontSize: 13 }}>No leads yet.</p>}
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
                      <div style={{ fontSize: 12, color: 'rgba(168,178,193,0.5)', lineHeight: 1.5 }}>{c.summary ? c.summary.slice(0,100) + '...' : 'No summary'}</div>
                    </div>
                  ))}
                  {chats.length === 0 && <p style={{ color: 'rgba(168,178,193,0.35)', fontSize: 13 }}>No chat sessions yet.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'Leads' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div style={S.sectionTitle}>All Leads</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(212,136,42,0.6)' }}>{leads.length} TOTAL</div>
            </div>
            {leads.length === 0 ? <p style={{ color: 'rgba(168,178,193,0.4)', fontSize: 13 }}>No leads yet.</p> : (
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th}>Name</th>
                    <th style={S.th}>Email</th>
                    <th style={S.th}>Source</th>
                    <th style={S.th}>Summary</th>
                    <th style={S.th}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(l => (
                    <tr key={l.id}>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', color:'var(--white)', fontWeight:600 }}>{l.name || '—'}</td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', color:'rgba(212,136,42,0.8)' }}>{l.email || '—'}</td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)' }}><span style={{ padding:'3px 10px', background:'rgba(212,136,42,0.1)', border:'1px solid rgba(212,136,42,0.2)', fontSize:11 }}>{l.source || 'chat'}</span></td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', maxWidth:380, color:'rgba(168,178,193,0.7)', fontSize:12 }}>{l.summary || '—'}</td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', fontSize:12, color:'rgba(168,178,193,0.5)', whiteSpace:'nowrap' }}>{fmt(l.created_at)}</td>
              </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'Chat Logs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div style={S.sectionTitle}>Chat Sessions</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(212,136,42,0.6)' }}>{chats.length} SESSIONS</div>
            </div>
            {chats.length === 0 ? <p style={{ color: 'rgba(168,178,193,0.4)', fontSize: 13 }}>No chat logs yet.</p> : (
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
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', fontFamily:'monospace', fontSize:11, color:'rgba(168,178,193,0.4)' }}>{c.session_id ? c.session_id.slice(0,8) : '—'}...</td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)' }}>
                        <div style={{ color:'var(--white)', fontWeight:600 }}>{c.lead_name || '—'}</div>
                        {c.lead_email && <div style={{ fontSize:12, color:'rgba(212,136,42,0.7)', marginTop:2 }}>{c.lead_email}</div>}
                      </td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', maxWidth:480, fontSize:12, color:'rgba(168,178,193,0.65)' }}>{c.summary || '—'}</td>
                      <td style={{ padding:'16px', borderBottom:'1px solid rgba(212,136,42,0.06)', fontSize:12, color:'rgba(168,178,193,0.5)', whiteSpace:'nowrap' }}>{fmt(c.upat || c.created_at)}</td>
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
            <CalendlyEmbed height={750} minWidth={320} />
          </div>
        )}

        {tab === 'Ask Dan' && (
          <div>
            <div style={S.sectionTitle}>Ask Dan · Live Intelligence</div>
            <AskDan />
          </div>
        )}

        {tab === 'Settings' && settings && (
          <div style={{ maxWidth: 600 }}>
            <div style={S.sectionTitle}>System Configuration</div>
            <div style={{ marginBottom:32, padding:'20px 24px', background:'rgba(8,15,23,0.8)', border:'1px solid rgba(212,136,42,0.15)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:9, letterSpacing:'0.25em', color:'rgba(212,136,42,0.5)', marginBottom:8 }}>Environment</div>
              <div style={{ fontSize:16, color:'var(--white)', fontWeight:600 }}>{settings.environment}</div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {Object.entries(settings.variables || {}).map(([key, configured]) => (
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
