import { useState, useRef, useEffect } from "react"
import BarberPole from "./BarberPole"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "What's good! Welcome to Fresh Cutz. Looking to book a cut, check our prices, or got a question? I got you." }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setMessages(m => [...m, { role: "user", content: text }])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: text }] })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: "assistant", content: data.reply || "Let me check on that for you." }])
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "My bad, connection dropped. Try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 1000,
        width: 64, height: 64,
        background: open ? "var(--black)" : "var(--red)",
        border: open ? "2px solid var(--red)" : "none",
        cursor: "pointer",
        boxShadow: "0 8px 32px rgba(196,30,58,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
        borderRadius: 2,
        color: "var(--white)",
        fontSize: open ? 20 : 0,
        fontWeight: 700
      }}>
        {open ? "✕" : <BarberPole height={40} width={16} />}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: 108, right: 32, zIndex: 999,
          width: 380, height: 520,
          background: "rgba(15,15,15,0.98)", border: "2px solid var(--red)",
          display: "flex", flexDirection: "column",
          boxShadow: "0 24px 64px rgba(0,0,0,0.8)"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background:"linear-gradient(90deg, var(--red), var(--blue), var(--red))" }} />
          <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(192,192,192,0.1)", display: "flex", alignItems: "center", gap: 12 }}>
            <BarberPole height={40} width={16} />
            <div>
              <div style={{ fontFamily: "var(--font-impact)", fontSize: 18, letterSpacing: "0.05em", color: "var(--white)" }}>FRESH CUTZ</div>
              <div style={{ fontSize: 11, color: "var(--red)" }}>AI Barber Assistant · Online</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
              <span style={{ fontSize: 11, color: "rgba(192,192,192,0.5)" }}>Online</span>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
           {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%", padding: "12px 16px",
                  background: m.role === "user" ? "var(--red)" : "rgba(255,255,255,0.06)",
                  border: m.role === "user" ? "none" : "1px solid rgba(192,192,192,0.15)",
                  color: "var(--white)", fontSize: 13, lineHeight: 1.6,
                  fontWeight: m.role === "user" ? 600 : 400
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 5, padding: "12px 16px", width: "fit-content", border: "1px solid rgba(192,192,192,0.15)" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, background: "var(--red)", borderRadius: "50%", animation: "bounce 1s ease-in-out " + (i*0.15) + "s infinite" }} />)}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(192,192,192,0.1)", display: "flex", gap: 10 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about services, pricing, hours..."
              style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(192,192,192,0.2)", color: "var(--white)", fontFamily: "var(--font-body)", fontSize: 13, padding: "10px 14px", outline: "none" }}
            />
            <button onClick={send} disabled={loading} style={{ padding: "10px 18px", background: "var(--red)", border: "none", color: "var(--white)", fontFamily: "var(--font-impact)", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer", opacity: loading ? 0.5 : 1 }}>
              SEND
            </button>
          </div>
          <style>{"@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }"}</style>
        </div>
      )}
    </>
  )
}
