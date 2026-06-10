import { useState, useEffect } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = ["Products", "Gallery", "About", "Contact"]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "18px 48px",
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: scrolled ? "2px solid var(--black)" : "1px solid rgba(0,0,0,0.08)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s ease"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, background: "var(--black)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-impact)", fontSize: 18, color: "var(--white)", fontWeight: 900, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -4, right: -4, width: 12, height: 12, borderRadius: "50%", background: "#FF006E" }} />
          IS
        </div>
        <div style={{ fontFamily: "var(--font-impact)", fontSize: 24, letterSpacing: "0.1em", color: "var(--black)" }}>IMPRINT <span style={{ color: "#FF006E" }}>STUDIO</span></div>
      </div>
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {links.map(l => (
          <a key={l} href={"#" + l.toLowerCase()} style={{ fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(10,10,10,0.6)", textDecoration: "none", transition: "color 0.2s", fontWeight: 600 }}
            onMouseEnter={e => e.target.style.color = "#FF006E"}
            onMouseLeave={e => e.target.style.color = "rgba(10,10,10,0.6)"}
          >{l}</a>
        ))}
        <a href="#contact" style={{ padding: "12px 28px", background: "var(--black)", color: "var(--white)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s" }}
          onMouseEnter={e => e.target.style.background = "#FF006E"}
          onMouseLeave={e => e.target.style.background = "var(--black)"}
        >Get A Quote</a>
      </div>
    </nav>
  )
}
