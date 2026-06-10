import { useState, useRef, useEffect } from "react"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Yo! Welcome to Imprint Studio. What are you trying to get made today?" }
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
      setMessages(m => [...m, { role: "assistant", content: data.reply || "Let me help you with that." }])
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Connection issue. Try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{
        position: "fixed", bottom: 32, right: 32, zIndex: 1000,
        width: 60, height: 60,
        background: open ? "var(--black)" : "var(--electric)",
        border: open ? "2px solid var(--electric)" : "none",
        cursor: "pointer", fontSize: 24,
        boxShadow: "0 8px 32px rgba(0,229,255,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
        color: open ? "var(--electric)" : "var(--black)"
      }}>
        {open ? "✕" : "🎨"}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: 104, right: 32, zIndex: 999,
          width: 380, height: 520,
          background: "rgba(255,255,255,0.98)", border: "2px solid var(--black)",
          display: "flex", flexDirection: "column",
          boxShadow: "0 24px 64px rgba(0,0,0,0.8)"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--electric)" }} />
          <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "var(--electric)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-impact)", fontSize: 14, color: "var(--black)" }}>IS</div>
            <div>
              <div style={{ fontFamily: "var(--font-impact)", fontSize: 16, letterSpacing: "0.05em", color: "var(--white)" }}>IMPRINT STUDIO</div>
              <div style={{ fontSize: 11, color: "rgba(0,229,255,0.7)" }}>Custom Print Specialist · Online</div>
            </div>
          </div>
         <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%", padding: "12px 16px",
                  background: m.role === "user" ? "var(--electric)" : "rgba(0,0,0,0.04)",
                  border: m.role === "user" ? "none" : "1px solid rgba(0,0,0,0.1)",
                  color: m.role === "user" ? "var(--black)" : "var(--platinum)",
                  fontSize: 13, lineHeight: 1.6,
                  fontWeight: m.role === "user" ? 700 : 400
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 5, padding: "12px 16px", width: "fit-content", border: "1px solid rgba(0,0,0,0.1)" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, background: "var(--electric)", borderRadius: "50%", animation: "bounce 1s ease-in-out " + (i*0.15) + "s infinite" }} />)}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(0,0,0,0.08)", display: "flex", gap: 10 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="What do you need printed?"
              style={{ flex: 1, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.1)", color: "var(--ink)", fontFamily: "var(--font-body)", fontSize: 13, padding: "10px 14px", outline: "none" }}
            />
            <button onClick={send} disabled={loading} style={{ padding: "10px 18px", background: "var(--electric)", border: "none", color: "var(--black)", fontFamily: "var(--font-impact)", fontSize: 14, letterSpacing: "0.05em", cursor: "pointer", opacity: loading ? 0.5 : 1 }}>
              SEND
            </button>
          </div>
          <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }`}</style>
        </div>
      )}
    </>
  )
}
