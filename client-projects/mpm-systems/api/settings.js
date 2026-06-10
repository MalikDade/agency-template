import { getSupabase } from './_supabase.js'
import { checkAuth } from './_auth.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (!checkAuth(req, res)) return

  const sb = getSupabase()

  if (req.method === 'GET') {
    try {
      const { data, error } = await sb.from('mpm_settings').select('key, value')
      if (error) throw error
      const settings = Object.fromEntries((data || []).map(r => [r.key, r.value]))
      return res.status(200).json({ settings })
    } catch (err) {
      console.error('[settings GET]', err.message)
      return res.status(500).json({ error: err.message })
    }
  }

  if (req.method === 'PUT') {
    try {
      const updates = req.body || {}
      const rows = Object.entries(updates).map(([key, value]) => ({
        key,
        value: String(value),
        updated_at: new Date().toISOString(),
      }))
      const { error } = await sb
        .from('mpm_settings')
        .upsert(rows, { onConflict: 'key' })
      if (error) throw error
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error('[settings PUT]', err.message)
      return res.status(500).json({ error: err.message })
    }
  }

  return res.status(405).end()
}
