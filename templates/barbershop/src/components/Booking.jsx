import { useState } from "react"
import BarberPole from "./BarberPole"

export default function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setSubmitted(true); setLoading(false) }, 1200)
  }

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(192,192,192,0.2)",
    color: "var(--white)", fontFamily: "var(--font-body)", fontSize: 14,
    padding: "14px 16px", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
  }

  const services = ["Classic Cut", "Skin Fade", "Beard Trim", "Straight Razor Shave", "Cut & Beard Combo", "Kids Cut"]
  const times = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM"]

  return (
    <section id="book-now" style={{ padding: "120px 48px", background: "var(--black-mid)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, var(--red), var(--blue), var(--red))" }} />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 24 }}>
            <BarberPole height={60} width={20} />
            <BarberPole height={80} width={28} />
            <BarberPole height={60} width={20} />
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--red)", marginBottom: 16, fontWeight: 700 }}>Reserve Your Seat</div>
          <h2 style={{ fontFamily: "var(--font-impact)", fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "0.05em", color: "var(--white)", marginBottom: 20 }}>
            BOOK YOUR <span style={{ color: "var(--red)" }}>CUT</span>
          </h2>
        </div>
        {submitted ? (
          <div className="reveal" style={{ textAlign: "center", padding: "80px 40px", border: "2px solid var(--red)", background: "rgba(196,30,58,0.05)" }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>💈</div>
            <h3 style={{ fontFamily: "var(--font-impact)", fontSize: 48, letterSpacing: "0.05em", color: "var(--white)", marginBottom: 16 }}>YOU'RE BOOKED</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--chrome)", lineHeight: 1.7 }}>
              See you soon, {form.name}. We'll confirm your appointment shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="reveal">
            <div style={{ display: "grid", gridTemplaColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <input name="name" placeholder="Full Name" value={form.name} onChange={handle} required style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--red)"} onBlur={e => e.target.style.borderColor = "rgba(192,192,192,0.2)"} />
              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handle} required style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--red)"} onBlur={e => e.target.style.borderColor = "rgba(192,192,192,0.2)"} />
              <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handle} style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--red)"} onBlur={e => e.target.style.borderColor = "rgba(192,192,192,0.2)"} />
              <select name="service" value={form.service} onChange={handle} required style={{ ...inputStyle, appearance: "none" }}>
                <option value="">Select Service</option>
                {services.map(s => <option key={s}>{s}</option>)}
              </select>
              <input name="date" type="date" value={form.date} onChange={handle} required style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--red)"} onBlur={e => e.target.style.borderColor = "rgba(192,192,192,0.2)"} />
              <select name="time" value={form.time} onChange={handle} required style={{ ...inputStyle, appearance: "none" }}>
                <option value="">Select Time</option>
                {times.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <textarea name="notes" placeholder="Any special requests or notes for your barber..." value={form.notes} onChange={handle} rows={4} style={{ ...inputStyle, resize: "vertical", marginBottom: 20 }} onFocus={e => e.target.style.borderColor = "var(--red)"} onBlur={e => e.target.style.borderColor = "rgba(192,192,192,0.2)"} />
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "20px", background: "var(--red)", border: "none", color: "var(--white)", fontFamily: "var(--font-impact)", fontSize: 24, letterSpacing: "0.1em", cursor: "pointer", opacity: loading ? 0.7 : 1, transition: "background 0.2s" }}
              onMouseEnter={e => !loading && (e.target.style.background = "var(--red-light)")}
              onMouseLeave={e => (e.target.style.background = "var(--red)")}
            >
              {loading ? "BOOKING..." : "CONFIRM MY APPOINTMENT"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
