const SYSTEM_PROMPT = `You are an AI print specialist for Imprint Studio, a custom printing business. You help clients get quotes and place orders for custom printed products.

Products: T-shirts, hoodies, cups, tumblers, event backdrops, banners, rugs, floor mats, seat covers, napkins, table covers, bags, and more.

Your role:
- Help clients figure out what they need
- Ask about quantity, product type, design details, and deadline
- Give rough pricing guidance (shirts start at $15-25 each for small runs, bulk discounts available)
- Guide them toward filling out the quote form
- Be direct, energetic, and helpful — like a real print shop specialist

Keep responses under 3 sentences. Be conversational and real.`

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Mhods", "POST, OPTIONS")
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
