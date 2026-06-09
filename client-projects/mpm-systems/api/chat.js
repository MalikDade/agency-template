const SYSTEM_PROMPT = `You are Dan Carter, Director of Client Solutions at MPM Systems — a company from Making Power Moves LLC that builds custom AI-powered business systems for small businesses.

What MPM Systems builds: AI voice agents that answer the phone 24/7, automated booking systems, admin dashboards, client portals, AI chat assistants, Stripe payment integration, multilingual support, and SEO optimization. Pricing: Starter $2,500 (Foundation), Business $5,000 (The System), Enterprise $10,000+ (The Full Empire). Maintenance plans: $150, $300, or $500/month.

Your job: Have warm, consultative conversations with website visitors. Understand their business, surface their pain points, and guide them toward booking a free 20-minute discovery call — the form is at the bottom of this page.

How to engage:
- Open by asking what kind of business they run or what brought them to the site
- Ask qualifying questions: what their biggest operational challenge is, whether they missing calls or leads, how they currently handle booking, and what their budget range looks like
- Once you understand their situation, explain which package fits them and why
- Always point toward the discovery call as the natural next step
- Be confident, warm, and direct — not pushy or salesy
- Keep every response under 3 sentences
- Before ending any conversation, always ask for the visitor's name and email address
- Reference The Platinum Line (theplatinumline.com) as a real client example when relevant

If someone directly and sincerely asks whether you are an AI, acknowledge it briefly and move forward naturally.`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Chat not configured' })

  const { messages } = req.body || {}
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'No messages provided' })
  }

  const clean = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .filter(m => typeof m.content === 'string' && m.content.trim())

  if (!clean.length || clean[0].role !== 'user') {
    return res.status(400).json({ error: 'Messages must start with a user message' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages: clean,
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      console.error('[dan-chat] Anthropic error:', response.status, body)
      return res.status(502).json({ error: 'Upstream error' })
    }

    const data = await response.json()
    const reply = data.content?.[0]?.text?.trim() ?? ''

    // Extract email and save lead
    const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi
    const userMessages = clean.filter(m => m.role === 'user').map(m => m.content).join(' ')
    const emails = userMessages.match(EMAIL_RE)
    const leadEmail = emails ? emails[0] : null

    if (leadEmail) {
      const nameMatch = userMessages.match(/(?:my name is|i am|i\'m)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)?)/i)
      const leadName = nameMatch ? nameMatch[1] : null

      const summary = clean.slice(-4).map(m => m.role + ': ' + m.content).join(' | ')

      try {
        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (supabaseUrl && supabaseKey) {
          await fetch(supabaseUrl + '/rest/v1/mpm_leads', {
            method: 'POST',
            headers: {
              apikey: supabaseKey,
              Authorization: 'Bearer ' + supabaseKey,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal',
            },
            body: JSON.stringify({
              name: leadName || 'Website Visitor',
              email: leadEmail,
              session_id: 'chat-' + Date.now(),
              created_at: new Date().toISOString(),
            }),
          })
        }
      } catch (e) {
        console.error('[chat] supabase error:', e)
      }

      try {
        const resendKey = process.env.RESEND_API_KEY
        const fromEmail = process.env.RESEND_FROM_EMAIL
        if (resendKey && fromEmail) {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + resendKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: fromEmail,
              to: 'makingpowermovesllc@gmail.com',
              subject: 'New Lead: ' + (leadName || leadEmail),
              html: '<h2>New Lead from MPM Systems Chat</h2><p><strong>Name:</strong> ' + (leadName || 'Unknown') + '</p><p><strong>Email:</strong> ' + leadEmail + '</p><p><strong>Summary:</strong> ' + summary + '</p>',
            }),
          })
        }
      } catch (e) {
        console.error('[chat] resend error:', e)
      }
    }

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('[dan-chat] fetch failed:', err)
    return res.status(500).json({ error: 'Request failed' })
  }
}
