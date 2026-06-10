import { useEffect, useRef, useState } from "react"

const slides = [
  { label: "Custom Shirts", sub: "Screen print, DTG, embroidery", color: "#FF006E", emoji: "👕" },
  { label: "Branded Cups", sub: "Tumblers, mugs, water bottles", color: "#00E5FF", emoji: "☕" },
  { label: "Event Backdrops", sub: "Step & repeat, banners, signage", color: "#FFD600", emoji: "🎪" },
  { label: "Floor Mats & Rugs", sub: "Logo mats, custom rugs, runners", color: "#7B2FFF", emoji: "🏠" },
  { label: "Seat Covers", sub: "Cars, trucks, SUVs — fully custom", color: "#FF4D00", emoji: "🚗" },
  { label: "Napkins & Linens", sub: "Events, restaurants, weddings", color: "#00FF94", emoji: "✨" },
]

export default function Hero() {
  const canvasRef = useRef(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCurrent(c => (c + 1) % slides.length), 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const colors = ["#FF006E", "#FFD600", "#00E5FF", "#FF4D00", "#7B2FFF", "#00FF94"]
    const splats = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 70 + 15,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.18 + 0.04,
      drops: Array.from({ length: Math.floor(Math.random() * 10 + 4) }, () => ({
        angle: Math.random() * Math.PI * 2,
        len: Math.random() * 100 + 20,
        w: Math.random() * 7 + 2,
      }))
    }))
    splats.forEach(s => {
      ctx.save()
      ctx.globalAlpha = s.alpha
      ctx.fillStyle = s.color
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
      s.drops.forEach(d => {
        const ex = s.x + Math.cos(d.angle) * d.len
        const ey = s.y + Math.sin(d.angle) * d.len
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(ex, ey)
        ctx.lineWidth = d.w
        ctx.strokeStyle = s.color
        ctx.lineCap = "round"
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(ex, ey, d.w * 2, 0, Math.PI * 2)
        ctx.fill()
        for (let i = 0; i < 4; i++) {
          const sa = d.angle + (Math.random() - 0.5) * 1.5
          const sl = Math.random() * 25 + 5
          ctx.globalAlpha = s.alpha * 0.5
          ctx.beginPath()
          ctx.arc(ex + Math.cos(sa) * sl, ey + Math.sin(sa) * sl, Math.random() * 4 + 1, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = s.alpha
        }
      })
      ctx.restore()
    })
  }, [])

  const slide = slides[current]

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.5)" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "120px 48px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        
        {/* Left — text */}
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "#FF006E", marginBottom: 24, fontWeight: 700 }}>Custom Everything</div>
          <h1 style={{ fontFamily: "var(--font-impact)", fontSize: "clamp(56px, 8vw, 120px)", letterSpacing: "0.03em", color: "#0A0A0A", lineHeight: 0.9, marginBottom: 24 }}>
            EVERY<br />
            <span style={{ WebkitTextStroke: "3px #FF006E", WebkitTextFillColor: "transparent" }}>SURFACE.</span><br />
            YOUR BRAND.
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "rgba(10,10,10,0.6)", marginBottom: 40, lineHeight: 1.7 }}>
            Shirts. Cups. Backdrops. Rugs. Seat covers. Napkins. If it has a surface, we put your brand on it.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#contact" style={{ padding: "18px 48px", background: "#0A0A0A", color: "#FFFFFF", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>Get A Quote</a>
            <a href="#products" style={{ padding: "18px 48px", border: "3px solid #0A0A0A", color: "#0A0A0A", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>See Products</a>
          </div>
        </div>

        {/* Right — product slideshow */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: slide.color, padding: "60px 40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, transition: "background 0.5s ease", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
            <div style={{ position: "absolute", bottom: -30, left: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(0,0,0,0.1)" }} />
            <div style={{ fontSize: 80, marginBottom: 20, position: "relative", zIndex: 1 }}>{slide.emoji}</div>
            <div style={{ fontFamily: "var(--font-impact)", fontSize: 36, letterSpacing: "0.05em", color: "#FFFFFF", textAlign: "center", position: "relative", zIndex: 1 }}>{slide.label.toUpperCase()}</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 10, textAlign: "center", position: "relative", zIndex: 1 }}>{slide.sub}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {slides.map((s, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ flex: 1, height: 8, background: i === current ? s.color : "rgba(0,0,0,0.1)", border: "none", cursor: "pointer", transition: "background 0.3s", borderRadius: 4 }} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {slides.map((s, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ padding: "12px 8px", background: i === current ? s.color : "rgba(0,0,0,0.04)", border: i === current ? "none" : "2px solid rgba(0,0,0,0.08)", cursor: "pointer", transition: "all 0.3s", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: i === current ? "#FFFFFF" : "#0A0A0A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {s.emoji} {s.label.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}