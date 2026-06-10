const products = [
  { name: "Apparel", color: "#FF006E", img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80", items: ["T-Shirts", "Hoodies", "Polos", "Jerseys", "Hats", "Uniforms"] },
  { name: "Drinkware", color: "#00E5FF", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80", items: ["Cups", "Mugs", "Tumblers", "Water Bottles", "Shot Glasses", "Koozies"] },
  { name: "Events", color: "#FFD600", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80", items: ["Backdrops", "Banners", "Table Covers", "Step & Repeat", "Tent Wraps", "Signage"] },
  { name: "Home & Office", color: "#00FF94", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", items: ["Rugs", "Pillows", "Blankets", "Napkins", "Towels", "Wall Art"] },
  { name: "Auto", color: "#FF4D00", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80", items: ["Seat Covers", "Floor Mats", "Steering Covers", "Sun Shades", "Headrests", "Decals"] },
  { name: "Business", color: "#7B2FFF", img: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&q=80", items: ["Bags", "Lanyards", "Pens", "Notebooks", "Stickers", "Patches"] },
]

export default function Products() {
  return (
    <section id="products" style={{ padding: "120px 48px", background: "#F8F8F6", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #FF006E, #FFD600, #00E5FF, #FF4D00, #7B2FFF)" }} />
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }} className="reveal">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "#FF006E", marginBottom: 16, fontWeight: 700 }}>What We Print</div>
          <h2 style={{ fontFamily: "var(--font-impact)", fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "0.05em", color: "#0A0A0A", marginBottom: 20 }}>WE PRINT EVERYTHING</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(10,10,10,0.5)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>From one custom shirt to 500 branded event setups. Professional quality, fast turnaround.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 3 }}>
          {products.map((p, i) => (
            <div key={i} className="reveal" style={{ position: "relative", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ height: 220, backgroundImage: "url(" + p.img + ")", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: p.color }} />
              <div style={{ padding: "28px 32px", background: "#FFFFFF" }}>
                <h3 style={{ fontFamily: "var(--font-impact)", fontSize: 28, letterSpacing: "0.05em", color: "#0A0A0A", marginBottom: 16 }}>{p.name.toUpperCase()}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.items.map(item => (
                    <span key={item} style={{ padding: "4px 12px", background: p.color + "15", border: "1px solid " + p.color + "40", fontFamily: "var(--font-body)", fontSize: 12, color: "#0A0A0A", fontWeight: 500 }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}