import { supabaseRequest } from '../_lib/supabase.js'
import { getAvailabilitySummary } from '../_lib/availability.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.headers['x-admin-password'] !== 'MPM2026Admin') return res.status(401).json({ error: 'Unauthorized' })
  const sessionId = 'malik-admin-session'
  if (req.method === 'GET') {
    try {
      const data = await supabaseRequest('mpm_admin_chats', { method: 'GET', query: '?session_id=eq.malik-admin-session&order=created_at.asc&limit=50' })
      return res.status(200).json({ messages: data || [] })
    } catch (err) {
      return res.status(500).json({ error: 'Failed to load history' })
    }
  }
  if (req.method === 'POST') {
    const { message } = req.body || {}
    if (!message) return res.status(400).json({ error: 'No message' })
    const [historyData, leadsData, avail] = await Promise.all([
      supabaseRequest('mpm_admin_chats', { method: 'GET', query: '?session_id=eq.malik-admin-session&order=created_at.asc&limit=20' }).catch(() => []),
      supabaseRequest('mpm_leads', { method: 'GET', query: '?order=created_at.desc&limit=20' }).catch(() => []),
      getAvailabilitySummary(7, 6).catch(() => ({ count: 0, next: [] })),
    ])
    const leads = leadsData || []
    const history = historyData || []
    const availText = avail.count > 0
      ? avail.next.join(', ') + (avail.count > avail.next.length ? ', and more after that' : '')
      : 'no open slots in the next 7 days'
    const sys = 'You are Dan Carter at MPM Systems talking to Malik Dade the founder. Never pitch calls to Malik. Be direct. Total Leads: ' + leads.length + '. Leads: ' + leads.slice(0,5).map(function(l){return (l.name||'Unknown')+' '+l.email}).join(', ') + '. Live open booking slots (next 7 days, refreshed every message): ' + availText + '.'
    const msgs = history.map(function(m){return{role:m.role,content:m.content}})
    msgs.push({role:'user',content:message})
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 400, system: sys, messages: msgs })
    })
    const d = await r.json()
    const reply = (d.content && d.content[0] && d.content[0].text) ? d.content[0].text.trim() : 'No response.'
    await supabaseRequest('mpm_admin_chats', { method: 'POST', body: { session_id: sessionId, role: 'user', content: message, created_at: new Date().toISOString() } }).catch(()=>{})
    await supabaseRequest('mpm_admin_chats', { method: 'POST', body: { session_id: sessionId, role: 'assistant', content: reply, created_at: new Date().toISOString() } }).catch(()=>{})
    return res.status(200).json({ reply: reply })
  }
  return res.status(405).json({ error: 'Method not allowed' })
}
