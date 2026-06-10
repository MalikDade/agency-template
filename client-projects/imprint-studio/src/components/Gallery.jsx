const pieces = [
  { label: "Custom Tees", tag: "Apparel", color: "#FF006E", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" },
  { label: "Branded Tumblers", tag: "Drinkware", color: "#00E5FF", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80" },
  { label: "Event Backdrop", tag: "Events", color: "#FFD600", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
  { label: "Welcome Mats", tag: "Auto", color: "#FF4D00", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
  { label: "Custom Hoodies", tag: "Apparel", color: "#7B2FFF", img: "https://images.unsplash.com/photo-1503341733017-1901578f9f1e?w=800&q=80" },
  { label: "Branded Napkins", tag: "Home", color: "#00FF94", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" },
]

export default function Gallery() {
  return (
    <section id="gallery" style={{ padding: "120px 48px", background: "#FFFFFF", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #7B2FFF, #FF006E, #FFD600)" }} />
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }} className="reveal">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "#FF006E", marginBottom: 16, fontWeight: 700 }}>Our Work</div>
          <h2 style={{ fontFamily: "var(--font-impact)", fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "0.05em", color: "#0A0A0A" }}>
            FRESH <span style={{ WebkitTextStroke: "2px #FFD600", WebkitTextFillColor: "transparent" }}>PRINTS</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
          {pieces.map((p, i) => (
            <div key={i} className="reveal" style={{ position: "relative", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ height: 300, backgroundImage: "url(" + p.img + ")", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: p.color }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px" }}>
                <span style={{ padding: "4px 12px", background: p.color, fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#fff", marginBottom: 8, display: "inline-block", fontWeight: 700 }}>{p.tag}</span>
                <div style={{ fontFamily: "var(--font-impact)", fontSize: 22, letterSpacing: "0.05em", color: "#FFFFFF" }}>{p.label.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}