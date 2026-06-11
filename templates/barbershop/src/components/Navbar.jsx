import { useState, useEffect } from "react"
import BarberPole from "./BarberPole"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = ["Services", "Gallery", "About", "Book Now"]

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      padding: "14px 48px",
      background: scrolled ? "rgba(15,15,15,0.97)" : "rgba(15,15,15,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "3px solid var(--red)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.4s ease"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <BarberPole height={44} width={16} />
        <div>
          <div style={{ fontFamily: "var(--font-impact)", fontSize: 26, letterSpacing: "0.1em", color: "var(--white)", lineHeight: 1 }}>FRESH CUTZ</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chrome)", lineHeight: 1 }}>Barbershop</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
        {links.slice(0,-1).map(l => (
          <a key={l} href={"#" + l.toLowerCase().replace(" ","-")} style={{ fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--chrome-light)", textDecoration: "none", transition: "color 0.2s", fontWeight: 600 }}
            onMouseEnter={e => e.target.style.color = "var(--red-light)"}
            onMouseLeave={e => e.target.style.color = "var(--chrome-light)"}
          >{l}</a>
        ))}
        <a href="#book-now" style={{ padding: "12px 28px", background: "var(--red)", color: "var(--white)", fontFamily: "var(--font-impact)", fontSize: 16, letterSpacing: "0.1em", textDecoration: "none", transition: "background 0.2s", borderRadius: 2 }}
          onMouseEnter={e => e.target.style.background = "var(--red-light)"}
          onMouseLeave={e => e.target.style.background = "var(--red)"}
        >BOOK NOW</a>
      </div>
    </nav>
  )
}
