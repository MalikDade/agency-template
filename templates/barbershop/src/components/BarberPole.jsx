
export default function BarberPole({ height = 120, width = 32 }) {
  return (
    <div style={{ position: "relative", width: width, height: height, borderRadius: width / 2, overflow: "hidden", border: "3px solid var(--chrome-light)", boxShadow: "0 0 12px rgba(0,0,0,0.3), inset 0 0 8px rgba(255,255,255,0.2)" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(170deg, var(--red) 0px, var(--red) 10px, var(--white) 10px, var(--white) 20px, var(--blue) 20px, var(--blue) 30px, var(--white) 30px, var(--white) 40px)",
        backgroundSize: "100% 60px",
        animation: "barberSpin 1.5s linear infinite",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.15) 100%)", borderRadius: width / 2 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "var(--chrome-light)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 8, background: "var(--chrome-light)", borderRadius: "50%" }} />
    </div>
  )
}
