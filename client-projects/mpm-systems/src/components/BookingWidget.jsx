import { useState, useEffect, useMemo } from 'react'

function fmtDay(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}
function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}
function dayKey(iso) {
  return new Date(iso).toDateString()
}

export default function BookingWidget() {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', businessType: '' })
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(null)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError(null)
    const start = new Date()
    const end = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    fetch(`/api/book-appointment?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error)
        setSlots(d.slots || [])
      })
      .catch(e => setError(e.message || 'Could not load available times.'))
      .finally(() => setLoading(false))
  }, [])

  const days = useMemo(() => {
    const map = new Map()
    for (const iso of slots) {
      const k = dayKey(iso)
      if (!map.has(k)) map.set(k, { date: new Date(iso), slots: [] })
      map.get(k).slots.push(iso)
    }
    return Array.from(map.values()).sort((a, b) => a.date - b.date)
  }, [slots])

  useEffect(() => {
    if (!selectedDay && days.length > 0) setSelectedDay(dayKey(days[0].slots[0]))
  }, [days, selectedDay])

  const activeDay = days.find(d => dayKey(d.slots[0]) === selectedDay)

  const submit = async () => {
    setFormError('')
    if (!form.name.trim() || !form.email.trim()) {
      setFormError('Name and email are required.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, scheduledAt: selectedSlot }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setConfirmed(data)
    } catch (e) {
      setFormError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const box = {
    border: '1px solid rgba(212,136,42,0.22)',
    background: 'rgba(8,15,23,0.7)',
    padding: '28px 26px',
    position: 'relative',
  }
  const label = { fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(232,168,85,0.9)', textTransform: 'uppercase', marginBottom: 14, display: 'block' }
  const input = { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,136,42,0.25)', color: 'var(--platinum)', fontSize: 14, padding: '12px 14px', outline: 'none', marginBottom: 14, boxSizing: 'border-box' }

  if (confirmed) {
    return (
      <div style={box}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold), rgba(212,136,42,0.3), transparent)', position: 'absolute', top: 0, left: 0, right: 0 }} />
        <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--white)', marginBottom: 10 }}>You're booked, {form.name.split(' ')[0]}!</h3>
        <p style={{ fontSize: 14, color: 'rgba(232,236,240,0.85)', lineHeight: 1.7 }}>
          Your discovery call is set for <strong style={{ color: 'var(--gold)' }}>{confirmed.formattedTime}</strong>. A confirmation email is on its way to {form.email}.
        </p>
      </div>
    )
  }

  return (
    <div style={box}>
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold), rgba(212,136,42,0.3), transparent)', position: 'absolute', top: 0, left: 0, right: 0 }} />

      {loading && <p style={{ fontSize: 13, color: 'rgba(232,236,240,0.7)' }}>Loading available times…</p>}
      {error && <p style={{ fontSize: 13, color: '#f87171' }}>{error}</p>}

      {!loading && !error && days.length === 0 && (
        <p style={{ fontSize: 13, color: 'rgba(232,236,240,0.7)' }}>No open times in the next two weeks — email us and we'll find a slot.</p>
      )}

      {!loading && !error && days.length > 0 && (
        <>
          <span style={label}>Pick a Day</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
            {days.map(d => {
              const k = dayKey(d.slots[0])
              const active = k === selectedDay
              return (
                <button
                  key={k}
                  onClick={() => { setSelectedDay(k); setSelectedSlot(null) }}
                  style={{
                    padding: '8px 14px', fontSize: 12, cursor: 'pointer',
                    border: `1px solid ${active ? 'var(--gold)' : 'rgba(212,136,42,0.25)'}`,
                    background: active ? 'rgba(212,136,42,0.15)' : 'transparent',
                    color: active ? 'var(--gold)' : 'rgba(232,236,240,0.8)',
                  }}
                >
                  {fmtDay(d.date)}
                </button>
              )
            })}
          </div>

          {activeDay && (
            <>
              <span style={label}>Pick a Time (Central)</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 8, marginBottom: 22 }}>
                {activeDay.slots.map(s => {
                  const active = s === selectedSlot
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      style={{
                        padding: '10px 8px', fontSize: 12, cursor: 'pointer',
                        border: `1px solid ${active ? 'var(--gold)' : 'rgba(212,136,42,0.2)'}`,
                        background: active ? 'linear-gradient(135deg, #D4882A, #E8A855)' : 'rgba(255,255,255,0.03)',
                        color: active ? '#060D14' : 'rgba(232,236,240,0.85)',
                        fontWeight: active ? 700 : 400,
                      }}
                    >
                      {fmtTime(s)}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {selectedSlot && (
            <div style={{ borderTop: '1px solid rgba(212,136,42,0.15)', paddingTop: 20 }}>
              <span style={label}>Your Info</span>
              <input placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={input} />
              <input placeholder="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={input} />
              <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={input} />
              <input placeholder="What kind of business? (optional)" value={form.businessType} onChange={e => setForm(f => ({ ...f, businessType: e.target.value }))} style={{ ...input, marginBottom: 6 }} />
              {formError && <p style={{ fontSize: 12, color: '#f87171', marginBottom: 12 }}>{formError}</p>}
              <button
                onClick={submit}
                disabled={submitting}
                className="btn-gold"
                style={{ width: '100%', padding: '14px', fontSize: 12, border: 'none', cursor: 'pointer', opacity: submitting ? 0.6 : 1, marginTop: 8 }}
              >
                {submitting ? 'Booking…' : `Confirm ${fmtDay(new Date(selectedSlot))} at ${fmtTime(selectedSlot)}`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
