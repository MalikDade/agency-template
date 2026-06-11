const services = [
  { name: "Classic Cut", price: "$25+", desc: "Clean scissor or clipper cut tailored to your style. Every time.", icon: "✂️", time: "30 min" },
  { name: "Skin Fade", price: "$35+", desc: "Precision fade from skin to any length. Sharp lines guaranteed.", icon: "💈", time: "45 min" },
  { name: "Beard Trim", price: "$20+", desc: "Shape, line, and define your beard to perfection.", icon: "🧔", time: "20 min" },
  { name: "Straight Razor Shave", price: "$40+", desc: "Hot towel, pre-shave oil, and a classic straight razor shave experience.", icon: "🪒", time: "45 min" },
  { name: "Cut & Beard Combo", price: "$50+", desc: "Full haircut plus beard trim and lineup. The complete package.", icon: "👑", time: "60 min" },
  { name: "Kids Cut", price: "$20+", desc: "Patient, precise cuts for boys 12 and under. Fun and stress-free.", icon: "⭐", time: "25 min" },
]

export default function Services() {
  return (
    <section id="services" style={{ padding: "120px 48px", background: "var(--off-white)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, var(--red), var(--blue), var(--red))" }} />
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }} className="reveal">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--red)", marginBottom: 16, fontWeight: 700 }}>What We Offer</div>
          <h2 style={{ fontFamily: "var(--font-impact)", fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "0.05em", color: "var(--black)", marginBottom: 20 }}>
            THE <span style={{ color: "var(--red)" }}>MENU</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(15,15,15,0.55)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Every cut is a craft. Every client leaves looking fresh. No exceptions.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 3 }}>
          {services.map((s, i) => (
            <div key={i} className="reveal" style={{ padding: "36px 32px", background: "var(--white)", border: "2px solid transparent", position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.transform = "translateY(-4px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "translateY(0)" }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, var(--red), var(--blue))" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ fontSize: 40 }}>{s.icon}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-impact)", fontSize: 28, color: "var(--red)", letterSpacing: "0.05em" }}>{s.price}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--chrome)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{s.time}</div>
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-impact)", fontSize: 28, letterSpacing: "0.05em", color: "var(--black)", marginBottom: 12 }}>{s.name.toUpperCase()}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(15,15,15,0.55)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
