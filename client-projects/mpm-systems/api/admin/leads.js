import { verifyAdmin } from '../_lib/adminAuth.js'
import { isSupabaseConfigured, supabaseRequest } from '../_lib/supabase.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  if (!verifyAdmin(req, res)) return

  if (!isSupabaseConfigured()) {
    return res.status(500).json({ error: 'Supabase not configured' })
  }

  try {
    const leads = await supabaseRequest('mpm_leads', {
      query: '?select=*&order=created_at.desc&limit=200',
    })
    return res.status(200).json({ leads: leads || [] })
  } catch (err) {
    console.error('[admin/leads]', err)
    return res.status(500).json({ error: 'Failed to load leads' })
  }
}
