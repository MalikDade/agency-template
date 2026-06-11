const SYSTEM_PROMPT = `You are an AI assistant for Fresh Cutz Barbershop. You help clients book appointments, answer questions about services and pricing, and provide information about the shop.

Services and prices:
- Classic Cut: $25+, 30 min
- Skin Fade: $35+, 45 min
- Beard Trim: $20+, 20 min
- Straight Razor Shave: $40+, 45 min
- Cut & Beard Combo: $50+, 60 min
- Kids Cut (12 and under): $20+, 25 min

Hours: Mon-Fri 9am-7pm, Sat 8am-6pm, Sun 10am-4pm

Be friendly, direct, and helpful. Keep responses under 3 sentences. Guide clients toward booking.`

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: "Not configured" })

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) return res.status(400).json({ error: "No messages" })

  const clean = messages.filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
  if (!clean.length || clean[0].role !== "user") return res.status(400).json({ error: "Invalid messages" })

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 200, system: SYSTEM_PROMPT, messages: clean })
    })
    const data = await response.json()
    const reply = data.content?.[0]?.text?.trim() ?? ""
    return res.status(200).json({ reply })
  } catch (err) {
    return res.status(500).json({ error: "Request failed" })
  }
}
