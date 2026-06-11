import { getSupabase } from './_supabase.js'

const SYSTEM_PROMPT = `You are Dan Carter, Director of Client Solutions at MPM Systems — a company from Making Power Moves LLC that builds custom AI-powered business systems for small businesses.

What MPM Systems builds: AI voice agents that answer the phone 24/7, automated booking systems, admin dashboards, client portals, AI chat assistants, Stripe payment integration, multilingual support, and SEO optimization. Pricing: Starter $2,500 (Foundation), Business $5,000 (The System), Enterprise $10,000+ (The Full Empire). Maintenance plans: $150, $300, or $500/month.

Flagship case study — The Platinum Line: MPM Systems built a complete AI-powered system for The Platinum Line, a luxury nail studio in Stringer, Mississippi. The system includes: Selena, a 24/7 AI voice agent who answers every call, books appointments, logs callbacks, and notifies the owner in real time; a full booking system with calendar sync; a branded client portal; an admin dashboard; live social media feed integration; multilingual support; and full SEO + AIOS optimization. This is our proof-of-concept for service businesses — a real, deployed system running today. When a visitor asks if we've done this before or wants to see proof, reference The Platinum Line by name.

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

function extractLead(messages) {
  const userText = messages
    .filter(m => m.role === 'user')
    .map(m => m.content)
    .join('\n')

  const email = (userText.match(/[\w.+-]+@[\w-]+\.[a-zA-Z]{2,6}/) || [])[0] || null
  const phone = (userText.match(/\+?1?[-.\s]?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/) || [])[0] || null
  const nameM = userText.match(
    /(?:i'?m|my name(?:'s)? is|name'?s|call me|this is)\s+([A-Z][a-z]+(?: [A-Z][a-z]+)?)/i
  )
  const name = nameM ? nameM[1] : null
  const budgetM = userText.match(/\$[\d,]+(?:k)?|\b\d[\d,]*k?\s*(?:dollar|budget)/i)
  const budget = budgetM ? budgetM[0] : null

  const bizKeywords = [
    'salon', 'nail', 'barber', 'barbershop', 'restaurant', 'cafe', 'clinic',
    'dental', 'spa', 'gym', 'fitness', 'real estate', 'law firm', 'attorney',
    'shop', 'boutique', 'studio', 'agency', 'consulting', 'retail',
    'plumb', 'landscap', 'clean', 'auto', 'repair', 'church', 'school',
  ]
  const lower = userText.toLowerCase()
  const business_type = bizKeywords.find(b => lower.includes(b)) || null

  return { name, phone, email, business_type, budget }
}

async function sendLeadEmail(lead, sessionId) {
  const key = process.env.RESEND_API_KEY
  if (!key) return
  const biz = lead.business_type || 'Unknown Business'
  const from = process.env.RESEND_FROM_EMAIL || 'MPM Systems <onboarding@resend.dev>'
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: ['makingpowermovesllc@gmail.com'],
      subject: `New MPM Systems Lead - ${biz}`,
      html: `
        <h2 style="color:#0D1B2A">New Lead — MPM Systems Chat</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 16px 6px 0;color:#888">Name</td><td style="padding:6px 0"><strong>${lead.name || '—'}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Phone</td><td style="padding:6px 0"><strong>${lead.phone || '—'}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Email</td><td style="padding:6px 0"><strong>${lead.email || '—'}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Business</td><td style="padding:6px 0"><strong>${biz}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Budget</td><td style="padding:6px 0"><strong>${lead.budget || '—'}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Session</td><td style="padding:6px 0;color:#aaa">${sessionId}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#aaa">Sent from MPM Systems chat widget</p>
      `,
    }),
  })
  if (!emailRes.ok) {
    const body = await emailRes.text()
    console.error('[resend lead email]', emailRes.status, body.slice(0, 200))
  }
}

async function persistData(sessionId, allMessages) {
  try {
    const sb = getSupabase()

    // Upsert chat log
    await sb.from('mpm_chats').upsert(
      { session_id: sessionId, messages: allMessages, updated_at: new Date().toISOString() },
      { onConflict: 'session_id' }
    )

    // Extract lead info
    const lead = extractLead(allMessages)
    const hasContact = lead.name || lead.phone || lead.email
    if (!hasContact) return

    // Check if this session already has a lead row
    const { data: existing } = await sb
      .from('mpm_leads')
      .select('id')
      .eq('session_id', sessionId)
      .maybeSingle()

    await sb.from('mpm_leads').upsert(
      {
        session_id: sessionId,
        ...lead,
        message: allMessages
          .filter(m => m.role === 'user')
          .map(m => m.content)
          .join(' ')
          .slice(0, 600),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'session_id' }
    )

    // Only email on first detection
    if (!existing) {
      await sendLeadEmail(lead, sessionId)
    }
  } catch (err) {
    console.error('[chat persist]', err.message)
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Chat not configured' })

  const { messages, sessionId } = req.body || {}
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

    // Persist chat + lead in background (fire and forget, don't block reply)
    if (sessionId && process.env.SUPABASE_URL) {
      const fullHistory = [...clean, { role: 'assistant', content: reply }]
      persistData(sessionId, fullHistory).catch(() => {})
    }

    return res.status(200).json({ reply })
  } catch (err) {
    console.error('[dan-chat] fetch failed:', err)
    return res.status(500).json({ error: 'Request failed' })
  }
}
