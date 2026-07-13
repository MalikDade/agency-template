import { verifyAdmin } from '../_lib/adminAuth.js'
import { getSupabase } from '../_supabase.js'

const DEFAULT_WEEKLY_HOURS = [
  { day: 0, enabled: false, start: 9, end: 18 },
  { day: 1, enabled: true, start: 9, end: 18 },
  { day: 2, enabled: true, start: 9, end: 18 },
  { day: 3, enabled: true, start: 9, end: 18 },
  { day: 4, enabled: true, start: 9, end: 18 },
  { day: 5, enabled: true, start: 9, end: 18 },
  { day: 6, enabled: false, start: 9, end: 18 },
]

function isValidWeeklyHours(arr) {
  if (!Array.isArray(arr) || arr.length !== 7) return false
  return arr.every(w =>
    typeof w.day === 'number' && w.day >= 0 && w.day <= 6 &&
    typeof w.enabled === 'boolean' &&
    typeof w.start === 'number' && typeof w.end === 'number' &&
    w.start >= 0 && w.end <= 24 && w.start < w.end
  )
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (!verifyAdmin(req, res)) return

  const sb = getSupabase()

  if (req.method === 'GET') {
    try {
      const [settingsResult, blocksResult] = await Promise.all([
        sb.from('mpm_settings').select('value').eq('key', 'weekly_hours').maybeSingle(),
        sb.from('mpm_availability_blocks').select('*').gte('end_time', new Date().toISOString()).order('start_time', { ascending: true }),
      ])
      let weeklyHours = DEFAULT_WEEKLY_HOURS
      if (settingsResult.data?.value) {
        try {
          const parsed = JSON.parse(settingsResult.data.value)
          if (isValidWeeklyHours(parsed)) weeklyHours = parsed
        } catch {}
      }
      return res.status(200).json({ weeklyHours, blocks: blocksResult.data || [] })
    } catch (err) {
      console.error('[admin/availability GET]', err.message)
      return res.status(500).json({ error: 'Failed to load availability settings' })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { weeklyHours } = req.body || {}
      if (!isValidWeeklyHours(weeklyHours)) return res.status(400).json({ error: 'Invalid weekly hours format' })
      const { error } = await sb.from('mpm_settings').upsert(
        { key: 'weekly_hours', value: JSON.stringify(weeklyHours), updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      )
      if (error) throw error
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error('[admin/availability PATCH]', err.message)
      return res.status(500).json({ error: 'Failed to save weekly hours' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { type, startTime, endTime, label } = req.body || {}
      if (!['block', 'open'].includes(type)) return res.status(400).json({ error: 'type must be "block" or "open"' })
      if (!startTime || !endTime) return res.status(400).json({ error: 'startTime and endTime are required' })
      const start = new Date(startTime), end = new Date(endTime)
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) return res.status(400).json({ error: 'Invalid time range' })

      const { data, error } = await sb
        .from('mpm_availability_blocks')
        .insert({ type, start_time: start.toISOString(), end_time: end.toISOString(), label: label || null })
        .select('id')
        .single()
      if (error) throw error
      return res.status(200).json({ ok: true, id: data.id })
    } catch (err) {
      console.error('[admin/availability POST]', err.message)
      return res.status(500).json({ error: 'Failed to add block' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query || {}
      if (!id) return res.status(400).json({ error: 'id is required' })
      const { error } = await sb.from('mpm_availability_blocks').delete().eq('id', id)
      if (error) throw error
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error('[admin/availability DELETE]', err.message)
      return res.status(500).json({ error: 'Failed to remove block' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
