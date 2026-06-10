import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Products from "./components/Products"
import Gallery from "./components/Gallery"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ChatWidget from "./components/ChatWidget"

export default function App() {
  useEffect(() => {
    const classes = ["reveal", "reveal-left", "reveal-right"]
    const selectors = classes.map(c => "." + c).join(",")
    const els = document.querySelectorAll(selectors)
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: "var(--black)", minHeight: "100vh" }}>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
