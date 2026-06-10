import { useState, useRef, useEffect, useMemo } from 'react'

// Initial greeting is UI-only — not sent to the API as an assistant turn
const GREETING = "Hi, I'm Dan — what kind of business do you run? I'd love to learn more about what you're working on."

function genSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function DanChatWidget() {
<<<<<<< HEAD
  const sessionId = useMemo(() => {
    const key = 'mpm_chat_session'
    const existing = sessionStorage.getItem(key)
    if (existing) return existing
    const id = genSessionId()
    sessionStorage.setItem(key, id)
    return id
  }, [])

=======
  const [sessionId] = useState(() => crypto.randomUUID())
>>>>>>> b89e58092111efe5732fce104d159b80ed7436d0
  // apiHistory tracks only what's been sent/received by the API
  const [apiHistory, setApiHistory] = useState([])
  // uiMessages is what's displayed (includes the greeting)
  const [uiMessages, setUiMessages] = useState([
    { from: 'dan', text: GREETING },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [uiMessages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setError(null)

    const userMsg = { from: 'user', text }
    setUiMessages(prev => [...prev, userMsg])

    const newHistory = [...apiHistory, { role: 'user', content: text }]
    setApiHistory(newHistory)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory, sessionId }),
      })

      const data = await res.json()

      if (!res.ok || !data.reply) {
        throw new Error(data.error || 'No reply')
      }

      setUiMessages(prev => [...prev, { from: 'dan', text: data.reply }])
      setApiHistory(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      console.error('[DanChat]', err)
      setError("Something went wrong — try again in a moment.")
      // Roll back the user message from api history so retry works
      setApiHistory(apiHistory)
    } finally {
      setLoading(false)
    }
  }

  const onKey = e => e.key === 'Enter' && !e.shiftKey && send()

  const S = {
    wrap: {
      border: '1px solid rgba(212,136,42,0.3)',
      background: 'rgba(8,15,23,0.92)',
      backdropFilter: 'blur(12px)',
      maxWidth: 370,
    },
    header: {
      padding: '12px 16px',
      borderBottom: '1px solid rgba(212,136,42,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'rgba(30,58,95,0.4)',
    },
    avatar: {
      width: 36, height: 36, borderRadius: '50%',
      border: '1px solid rgba(212,136,42,0.5)',
      flexShrink: 0, position: 'relative',
      overflow: 'hidden',
      background: 'rgba(30,58,95,0.6)',
    },
    onlineDot: {
      position: 'absolute', bottom: 1, right: 1,
      width: 8, height: 8, background: '#22c55e',
      borderRadius: '50%', border: '1.5px solid #080F17',
    },
    body: {
      padding: '14px 14px 10px',
      maxHeight: 200,
      overflowY: 'auto',
      display: 'flex', flexDirection: 'column', gap: 10,
    },
    danBubble: {
      background: 'rgba(30,58,95,0.6)',
      border: '1px solid rgba(212,136,42,0.18)',
      padding: '10px 14px', fontSize: 13,
      color: 'var(--platinum)', lineHeight: 1.6,
      maxWidth: '88%', alignSelf: 'flex-start',
    },
    userBubble: {
      background: 'rgba(212,136,42,0.12)',
      border: '1px solid rgba(212,136,42,0.2)',
      padding: '10px 14px', fontSize: 13,
      color: 'var(--white)', lineHeight: 1.6,
      maxWidth: '88%', alignSelf: 'flex-end',
    },
    dot: {
      display: 'inline-block', width: 5, height: 5,
      borderRadius: '50%', background: 'var(--gold)',
      animation: 'blink-cursor 1s infinite',
    },
    footer: {
      borderTop: '1px solid rgba(212,136,42,0.12)',
      padding: '10px 12px', display: 'flex', gap: 8,
    },
    input: {
      flex: 1,
      background: 'rgba(30,58,95,0.3)',
      border: '1px solid rgba(212,136,42,0.2)',
      color: 'var(--platinum)', fontFamily: 'var(--font-body)',
      fontSize: 13, padding: '9px 12px', outline: 'none',
    },
    sendBtn: {
      padding: '9px 16px',
      background: loading ? 'rgba(212,136,42,0.4)' : 'linear-gradient(135deg, var(--gold), #E8A855)',
      border: 'none', color: '#080F17',
      fontFamily: 'var(--font-display)', fontSize: 9,
      fontWeight: 700, letterSpacing: '0.25em',
      cursor: loading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
    },
  }

  return (
    <div style={S.wrap}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.avatar}>
          <img
            src="/dan-carter.png"
            alt="Dan Carter"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
          <div style={S.onlineDot} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: 'var(--white)', letterSpacing: '0.08em' }}>
            Dan Carter
          </div>
          <div style={{ fontSize: 10, color: 'rgba(212,136,42,0.8)', marginTop: 1 }}>
            Director of Client Solutions
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 8, letterSpacing: '0.25em', color: '#22c55e' }}>LIVE</span>
        </div>
      </div>

      {/* Messages */}
      <div style={S.body}>
        {uiMessages.map((msg, i) => (
          <div key={i} style={msg.from === 'dan' ? S.danBubble : S.userBubble}>
            {msg.text}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{ ...S.danBubble, display: 'flex', gap: 5, alignItems: 'center', padding: '12px 16px' }}>
            {[0, 0.3, 0.6].map((d, i) => (
              <div key={i} style={{ ...S.dot, animationDelay: `${d}s`, opacity: 0.7 }} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div style={{ fontSize: 11, color: 'rgba(212,136,42,0.6)', alignSelf: 'center', fontStyle: 'italic' }}>
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={S.footer}>
        <input
          style={S.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder={loading ? 'Dan is typing...' : 'Ask Dan anything...'}
          disabled={loading}
          onFocus={e => (e.target.style.borderColor = 'rgba(212,136,42,0.5)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(212,136,42,0.2)')}
        />
        <button style={S.sendBtn} onClick={send} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
