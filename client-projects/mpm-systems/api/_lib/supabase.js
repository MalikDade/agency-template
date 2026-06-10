export function getSupabaseConfig() {
  return {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }
}

export function isSupabaseConfigured() {
  const { url, key } = getSupabaseConfig()
  return Boolean(url && key)
}

export async function supabaseRequest(path, { method = 'GET', body, headers = {}, query = '' } = {}) {
  const { url, key } = getSupabaseConfig()
  if (!url || !key) throw new Error('Supabase not configured')

  const res = await fetch(`${url}/rest/v1/${path}${query}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase ${res.status}: ${text}`)
  }

  if (res.status === 204) return null
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export async function getChatBySession(sessionId) {
  const rows = await supabaseRequest('mpm_chats', {
    query: `?session_id=eq.${encodeURIComponent(sessionId)}&select=*&limit=1`,
  })
  return rows?.[0] ?? null
}

export async function upsertChat({ sessionId, leadName, leadEmail, summary, messages }) {
  const existing = await getChatBySession(sessionId)
  const payload = {
    session_id: sessionId,
    lead_name: leadName,
    lead_email: leadEmail,
    summary,
    messages,
    updated_at: new Date().toISOString(),
  }

  if (existing) {
    return supabaseRequest('mpm_chats', {
      method: 'PATCH',
      query: `?session_id=eq.${encodeURIComponent(sessionId)}`,
      headers: { Prefer: 'return=representation' },
      body: payload,
    })
  }

  return supabaseRequest('mpm_chats', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: { ...payload, created_at: new Date().toISOString(), lead_notified: false },
  })
}

export async function markChatNotified(sessionId) {
  return supabaseRequest('mpm_chats', {
    method: 'PATCH',
    query: `?session_id=eq.${encodeURIComponent(sessionId)}`,
    body: { lead_notified: true, updated_at: new Date().toISOString() },
  })
}

export async function insertLead({ sessionId, name, email, summary }) {
  return supabaseRequest('mpm_leads', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: {
      session_id: sessionId,
      name,
      email,
      summary,
      source: 'chat',
      created_at: new Date().toISOString(),
    },
  })
}
