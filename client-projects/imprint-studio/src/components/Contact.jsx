import { useState } from "react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", product: "", quantity: "", deadline: "", details: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setSubmitted(true); setLoading(false) }, 1200)
  }

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    color: "var(--platinum)", fontFamily: "var(--font-body)", fontSize: 14,
    padding: "14px 16px", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s"
  }

  const products = ["T-Shirts / Apparel", "Cups / Drinkware", "Event Backdrops / Banners", "Rugs / Floor Mats", "Seat Covers", "Napkins / Table Covers", "Bags / Accessories", "Other / Multiple Items"]

  return (
    <section id="contact" style={{ padding: "120px 48px", background: "var(--black)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)" }} />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }} className="reveal">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "var(--electric)", marginBottom: 16 }}>Start Your Order</div>
          <h2 style={{ fontFamily: "var(--font-impact)", fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "0.05em", color: "var(--white)", marginBottom: 20 }}>
            GET A <span style={{ color: "var(--electric)" }}>QUOTE</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>
            Tell us what you need. We will get back to you within 24 hours with pricing and timeline.
          </p>
        </div>
        {submitted ? (
          <div className="reveal" style={{ textAlign: "center", padding: "80px 40px", border: "1px solid rgba(0,229,255,0.3)", background: "rgba(0,229,255,0.03)" }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>🎨</div>
            <h3 style={{ fontFamily: "var(--font-impact)", fontSize: 48, letterSpacing: "0.05em", color: "var(--white)", marginBottom: 16 }}>QUOTE RECEIVED</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--muted)", lineHeight: 1.7 }}>
              Thanks {form.name}. We got your request and will hit you back within 24 hours with pricing and next steps.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="reveal">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, mginBottom: 12 }}>
              <input name="name" placeholder="Full Name" value={form.name} onChange={handle} required style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(0,229,255,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
              <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handle} required style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(0,229,255,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handle} style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(0,229,255,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
              <select name="product" value={form.product} onChange={handle} style={{ ...inputStyle, appearance: "none" }}>
                <option value="">Select Product Type</option>
                {products.map(p => <option key={p}>{p}</option>)}
              </select>
              <input name="quantity" placeholder="Estimated Quantity" value={form.quantity} onChange={handle} style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(0,229,255,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
              <input name="deadline" placeholder="Deadline / Needed By" value={form.deadline} onChange={handle} style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(0,229,255,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
            </div>
            <textarea name="details" placeholder="Describe your design, colors, logo, or any special requirements..." value={form.details} onChange={handle} rows={5} style={{ ...inputStyle, resize: "vertical", marginBottom: 20 }} onFocus={e => e.target.style.borderColor = "rgba(0,229,255,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "20px", background: "var(--electric)", border: "none", color: "var(--black)", fontFamily: "var(--font-impact)", fontSize: 24, letterSpacing: "0.1em", cursor: "pointer", opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}>
              {loading ? "SENDING..." : "SEND MY QUOTE REQUEST"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
