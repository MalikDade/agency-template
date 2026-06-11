import BarberPole from "./BarberPole"

export default function Footer() {
  return (
    <footer style={{ padding: "60px 48px 40px", background: "var(--black)", borderTop: "4px solid var(--red)" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <BarberPole height={50} width={18} />
              <div>
                <div style={{ fontFamily: "var(--font-impact)", fontSize: 24, letterSpacing: "0.1em", color: "var(--white)" }}>FRESH CUTZ</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.3em", color: "var(--chrome)", textTransform: "uppercase" }}>Premium Barbershop</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(192,192,192,0.4)", lineHeight: 1.8, maxWidth: 280 }}>
              Where every cut is a craft. Walk in. Look sharp. Walk out sharper.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-impact)", fontSize: 14, letterSpacing: "0.2em", color: "var(--red)", marginBottom: 20 }}>SERVICES</div>
            {["Classic Cut", "Skin Fade", "Beard Trim", "Straight Razor", "Kids Cut"].map(s => (
              <div key={s} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(192,192,192,0.4)", marginBottom: 10 }}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-impact)", fontSize: 14, letterSpacing: "0.2em", color: "var(--red)", marginBottom: 20 }}>HOURS</div>
            {[["Mon - Fri", "9am - 7pm"], ["Saturday", "8am - 6pm"], ["Sunday", "10am - 4pm"]].map(([day, hrs]) => (
              <div key={day} style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(192,192,192,0.6)", fontWeight: 600 }}>{day}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(192,192,192,0.35)" }}>{hrs}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-impact)", fontSize: 14, letterSpacing: "0.2em", color: "var(--red)", marginBottom: 20 }}>CONTACT</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(192,192,192,0.4)", marginBottom: 10 }}>freshcutz.com</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(192,192,192,0.4)", marginBottom: 10 }}>24/7 AI Assistant</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(192,192,192,0.4)" }}>Powered by <span style={{ color: "var(--red)" }}>MPM Systems</span></div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2026 Fresh Cutz Barbershop. All rights reserved.</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Built by <span style={{ color: "var(--red)" }}>MPM Systems</span></div>
        </div>
      </div>
    </footer>
  )
}
