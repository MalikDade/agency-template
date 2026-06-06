import { useState, useRef, useEffect } from 'react'

const RESPONSES = {
  price: "Our builds start at $2,500 for the Foundation package and go up to $10,000+ for The Full Empire. Most small businesses land in the $5k Business tier — it's the one that truly transforms operations. What kind of business are you running?",
  timeline: "Most builds ship in 2–4 weeks. We move fast because you work directly with me — no account managers, no back-and-forth delays. I stay in it with you from discovery call to launch.",
  services: "We build full-stack AI systems: a voice agent that answers your phone 24/7, a booking system, client portal, admin dashboard, AI chat assistant, payment integration, and more. Everything custom — nothing generic.",
  contact: "Let's jump on a quick 20-minute discovery call. No pitch, just clarity on what your business needs. Hit 'Book a Call' below or scroll to the contact section.",
  default: "That's a great question — best answered on a quick call where I can understand your business properly. Discovery calls are free, 20 minutes, and always worth it. Want to book one?",
}

const getResponse = (msg) => {
  const m = msg.toLowerCase()
  if (/price|cost|how much|pricing|\$|investment|package/.test(m)) return RESPONSES.price
  if (/how long|timeline|fast|quick|week|deliver/.test(m)) return RESPONSES.timeline
  if (/build|make|create|do|service|offer|include|what/.test(m)) return RESPONSES.services
  if (/contact|call|book|meet|schedule|talk/.test(m)) return RESPONSES.contact
  return RESPONSES.default
}

export default function DanChatWidget() {
  const [messages, setMessages] = useState([
    { from: 'dan', text: "Hi, I'm Dan — Chat with me 24/7. Ask me anything about MPM Systems or what we can build for your business." }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(m => [...m, { from: 'user', text }])
    setTyping(true)
    setTimeout(() => {
      setMessages(m => [...m, { from: 'dan', text: getResponse(text) }])
      setTyping(false)
    }, 900 + Math.random() * 600)
  }

  const onKey = (e) => e.key === 'Enter' && !e.shiftKey && send()

  const S = {
    wrap: {
      border: '1px solid rgba(201,168,76,0.28)',
      background: 'rgba(5,5,5,0.9)',
      backdropFilter: 'blur(12px)',
      maxWidth: 370,
    },
    header: {
      padding: '12px 16px',
      borderBottom: '1px solid rgba(201,168,76,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'rgba(201,168,76,0.04)',
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))',
      border: '1px solid rgba(201,168,76,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontFamily: 'var(--font-display)',
      color: 'var(--gold)',
      fontWeight: 700,
      flexShrink: 0,
      position: 'relative',
    },
    onlineDot: {
      position: 'absolute',
      bottom: 1,
      right: 1,
      width: 8,
      height: 8,
      background: '#22c55e',
      borderRadius: '50%',
      border: '1.5px solid #050505',
    },
    body: {
      padding: '14px 14px 10px',
      maxHeight: 180,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
    danBubble: {
      background: 'rgba(201,168,76,0.08)',
      border: '1px solid rgba(201,168,76,0.15)',
      padding: '10px 14px',
      fontSize: 13,
      color: 'var(--platinum)',
      lineHeight: 1.6,
      maxWidth: '88%',
      alignSelf: 'flex-start',
    },
    userBubble: {
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      padding: '10px 14px',
      fontSize: 13,
      color: 'var(--white)',
      lineHeight: 1.6,
      maxWidth: '88%',
      alignSelf: 'flex-end',
    },
    typingDot: {
      display: 'inline-block',
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: 'var(--gold)',
      animation: 'blink-cursor 1s infinite',
    },
    footer: {
      borderTop: '1px solid rgba(201,168,76,0.12)',
      padding: '10px 12px',
      display: 'flex',
      gap: 8,
    },
    input: {
      flex: 1,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(201,168,76,0.18)',
      color: 'var(--platinum)',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      padding: '9px 12px',
      outline: 'none',
    },
    sendBtn: {
      padding: '9px 16px',
      background: 'linear-gradient(135deg, var(--gold), #E8C97A)',
      border: 'none',
      color: '#050505',
      fontFamily: 'var(--font-display)',
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '0.25em',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
  }

  return (
    <div style={S.wrap}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.avatar}>
          DC
          <div style={S.onlineDot} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: 'var(--white)', letterSpacing: '0.08em' }}>
            Dan Carter
          </div>
          <div style={{ fontSize: 10, color: 'rgba(201,168,76,0.7)', marginTop: 1 }}>
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
        {messages.map((msg, i) => (
          <div key={i} style={msg.from === 'dan' ? S.danBubble : S.userBubble}>
            {msg.text}
          </div>
        ))}
        {typing && (
          <div style={{ ...S.danBubble, display: 'flex', gap: 5, alignItems: 'center', padding: '12px 16px' }}>
            {[0, 0.3, 0.6].map((d, i) => (
              <div
                key={i}
                style={{ ...S.typingDot, animationDelay: `${d}s`, opacity: 0.6 }}
              />
            ))}
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
          placeholder="Ask Dan anything..."
          onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.45)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.18)')}
        />
        <button style={S.sendBtn} onClick={send}>Send</button>
      </div>
    </div>
  )
}
