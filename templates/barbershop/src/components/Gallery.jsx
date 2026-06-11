const cuts = [
  { label: "Skin Fade", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80" },
  { label: "Classic Cut", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80" },
  { label: "Beard Lineup", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80" },
  { label: "Low Fade", img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80" },
  { label: "Straight Razor", img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80" },
  { label: "Shape Up", img: "https://images.unsplash.com/photo-1593702288056-f5a46f332e0d?w=800&q=80" },
]

export default function Gallery() {
  return (
    <section id="gallery" style={{ padding: "120px 48px", background: "var(--black)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, var(--blue), var(--red), var(--blue))" }} />
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }} className="reveal">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--red)", marginBottom: 16, fontWeight: 700 }}>The Work</div>
          <h2 style={{ fontFamily: "var(--font-impact)", fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "0.05em", color: "var(--white)" }}>
            FRESH <span style={{ WebkitTextStroke: "2px var(--red)", WebkitTextFillColor: "transparent" }}>CUTS</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
          {cuts.map((c, i) => (
            <div key={i} className="reveal" style={{ position: "relative", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div style={{ height: 300, backgroundImage: "url(" + c.img + ")", backgroundSize: "cover", backgroundPosition: "center top" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, var(--red), var(--blue))" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px" }}>
                <div style={{ fontFamily: "var(--font-impact)", fontSize: 24, letterSpacing: "0.05em", color: "var(--white)" }}>{c.label.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
