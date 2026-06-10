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
    </div>
  )
}

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
    } finally {
      setLoading(false)
    }
  }

  return (
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
    </div>
  )
}

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
