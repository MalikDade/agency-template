import { useEffect, useRef } from "react"
import BarberPole from "./BarberPole"

export default function Hero() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Floating barbershop icons
    const icons = ["✂", "💈", "🪒", "✂", "✂", "💈"]
    const particles = Array.from({ length: 25 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
      size: Math.random() * 20 + 10,
      alpha: Math.random() * 0.12 + 0.03,
      icon: icons[i % icons.length],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
    }))

    // Checkered floor tiles
    const drawFloor = () => {
      const tileSize = 60
      for (let x = 0; x < canvas.width; x += tileSize) {
        for (let y = canvas.height * 0.72; y < canvas.height; y += tileSize) {
          const isLight = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0
          ctx.fillStyle = isLight ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.2)"
          ctx.fillRect(x, y, tileSize, tileSize)
        }
      }
    }

    // Barber chair
    const drawChair = () => {
      const cx = canvas.width * 0.72
      const cy = canvas.height * 0.52
      ctx.save()
      ctx.globalAlpha = 0.13
      ctx.fillStyle = "#B8B8B8"
      ctx.fillRect(cx - 8, cy + 80, 16, 120)
      ctx.beginPath()
      ctx.ellipse(cx, cy + 200, 50, 12, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = "#C41E3A"
      ctx.beginPath()
      ctx.roundRect(cx - 55, cy + 20, 110, 60, 8)
      ctx.fill()
      ctx.beginPath()
      ctx.roundRect(cx - 50, cy - 120, 100, 150, 8)
      ctx.fill()
      ctx.beginPath()
      ctx.roundRect(cx - 30, cy - 160, 60, 45, 6)
      ctx.fill()
      ctx.fillStyle = "#B8B8B8"
      ctx.beginPath()
      ctx.roundRect(cx - 65, cy + 30, 15, 50, 4)
      ctx.fill()
      ctx.beginPath()
      ctx.roundRect(cx + 50, cy + 30, 15, 50, 4)
      ctx.fill()
      ctx.fillStyle = "#E0E0E0"
      ctx.beginPath()
      ctx.roundRect(cx - 45, cy + 78, 90, 10, 3)
      ctx.fill()
      ctx.restore()
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawFloor()
      drawChair()

      // Floating particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed
        if (p.y < -40) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width }
        if (p.x < -40) p.x = canvas.width + 20
        if (p.x > canvas.width + 40) p.x = -20

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.font = p.size + "px serif"
        ctx.fillStyle = "#FFFFFF"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(p.icon, 0, 0)
        ctx.restore()
      })

      // Red dot particles
      for (let i = 0; i < 3; i++) {
        if (Math.random() < 0.02) {
          particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.8 - 0.3,
            size: Math.random() * 3 + 1,
            alpha: Math.random() * 0.15,
            icon: "•",
            rotation: 0,
            rotSpeed: 0,
          })
        }
      }

      animRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", background: "var(--black)" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, var(--red), var(--blue), var(--red))" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "140px 48px 80px", display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center", width: "100%" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <BarberPole height={60} width={22} />
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--chrome)", fontWeight: 700 }}>Est. 2024 · Premium Barbershop</div>
          </div>
          <h1 style={{ fontFamily: "var(--font-impact)", fontSize: "clamp(64px, 10vw, 140px)", letterSpacing: "0.03em", color: "var(--white)", lineHeight: 0.88, marginBottom: 24 }}>
            LOOK<br />
            <span style={{ color: "var(--red)" }}>SHARP.</span><br />
            FEEL<br />
            <span style={{ WebkitTextStroke: "2px var(--chrome-light)", WebkitTextFillColor: "transparent" }}>SHARP.</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--chrome)", marginBottom: 40, lineHeight: 1.7, maxWidth: 500 }}>
            Premium cuts, clean fades, and straight razor shaves. Walk in looking good. Walk out looking great.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#book-now" style={{ padding: "18px 48px", background: "var(--red)", color: "var(--white)", fontFamily: "var(--font-impact)", fontSize: 20, letterSpacing: "0.1em", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.target.style.background = "var(--red-light)"}
              onMouseLeave={e => e.target.style.background = "var(--red)"}
            >BOOK YOUR CUT</a>
            <a href="#services" style={{ padding: "18px 48px", border: "2px solid var(--chrome)", color: "var(--chrome-light)", fontFamily: "var(--font-impact)", fontSize: 20, letterSpacing: "0.1em", textDecoration: "none", background: "transparent" }}
              onMouseEnter={e => { e.target.style.borderColor = "var(--white)"; e.target.style.color = "var(--white)" }}
              onMouseLeave={e => { e.target.style.borderColor = "var(--chrome)"; e.target.style.color = "var(--chrome-light)" }}
            >VIEW SERVICES</a>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <BarberPole height={300} width={48} />
          <BarberPole height={220} width={36} />
          <BarberPole height={160} width={28} />
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, var(--blue), var(--red), var(--blue))" }} />
    </section>
  )
}