import { getSupabase } from './_supabase.js'
import { checkAuth } from './_auth.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (!checkAuth(req, res)) return

  try {
    const sb = getSupabase()
    const { data, error } = await sb
      .from('mpm_chats')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(100)

    if (error) throw error
    return res.status(200).json({ chats: data })
  } catch (err) {
    console.error('[chats]', err.message)
    return res.status(500).json({ error: err.message })
  }
}
