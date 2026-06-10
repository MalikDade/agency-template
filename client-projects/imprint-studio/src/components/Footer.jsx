export default function Footer() {
  return (
    <footer style={{ padding: "60px 48px 40px", background: "var(--black)", color: "var(--white)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-impact)", fontSize: 18, color: "var(--black)" }}>IS</div>
            <div style={{ fontFamily: "var(--font-impact)", fontSize: 22, letterSpacing: "0.1em", color: "var(--white)" }}>IMPRINT <span style={{ color: "#FF006E" }}>STUDIO</span></div>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 300 }}>
              Every surface. Your brand. Custom printing for businesses, events, and individuals who refuse to blend in.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-impact)", fontSize: 14, letterSpacing: "0.2em", color: "#FF006E", marginBottom: 20 }}>PRODUCTS</div>
            {["Apparel", "Drinkware", "Events", "Home & Office", "Auto", "Business"].map(d => (
              <div key={d} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>{d}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-impact)", fontSize: 14, letterSpacing: "0.2em", color: "#FF006E", marginBottom: 20 }}>SERVICES</div>
            {["Custom Orders", "Bulk Pricing", "Rush Orders", "Design Help", "Corporate Accounts"].map(s => (
              <div key={s} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-impact)", fontSize: 14, letterSpacing: "0.2em", color: "#FF006E", marginBottom: 20 }}>CONTACT</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>imprintstudio.com</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>24/7 AI Quote Assistant</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Powered by <span style={{ color: "#FF006E" }}>MPM Systems</span></div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 Imprint Studio. All rights reserved.</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Built by <span style={{ color: "#FF006E" }}>MPM Systems</span></div>
        </div>
      </div>
    </footer>
  )
}
