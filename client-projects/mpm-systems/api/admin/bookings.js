import { verifyAdmin } from '../_lib/adminAuth.js'
import { getSupabase } from '../_supabase.js'
import { isSlotAvailable, SLOT_MINUTES } from '../_lib/availability.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (!verifyAdmin(req, res)) return

  const sb = getSupabase()

  if (req.method === 'GET') {
    try {
      const now = new Date()
      const { start, end } = req.query || {}
      const minTime = start ? new Date(start).toISOString() : new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const maxTime = end ? new Date(end).toISOString() : new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

      const { data, error } = await sb
        .from('mpm_appointments')
        .select('*')
        .gte('scheduled_at', minTime)
        .lt('scheduled_at', maxTime)
        .neq('status', 'cancelled')
        .order('scheduled_at', { ascending: true })
      if (error) throw error

      const events = (data || []).map(a => ({
        id: a.id,
        name: a.business_type ? `${a.name} — ${a.business_type}` : a.name,
        status: a.status,
        start_time: a.scheduled_at,
        end_time: new Date(new Date(a.scheduled_at).getTime() + (a.duration_minutes || SLOT_MINUTES) * 60000).toISOString(),
        location: null,
        invitee_name: a.name,
        invitee_email: a.email,
        invitee_phone: a.phone,
        notes: a.notes,
        source: a.source,
        cancelled: false,
      }))

      return res.status(200).json({ events, configured: true })
    } catch (err) {
      console.error('[admin/bookings GET]', err.message)
      return res.status(500).json({ error: 'Failed to load bookings', detail: err.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, businessType, scheduledAt, notes } = req.body || {}
      if (!name || !scheduledAt) return res.status(400).json({ error: 'Name and time are required.' })

      const available = await isSlotAvailable(scheduledAt, SLOT_MINUTES)
      if (!available) return res.status(409).json({ error: 'That time overlaps an existing booking or is outside business hours.' })

      const { data, error } = await sb
        .from('mpm_appointments')
        .insert({
          name, email: email || null, phone: phone || null,
          business_type: businessType || null,
          scheduled_at: new Date(scheduledAt).toISOString(),
          duration_minutes: SLOT_MINUTES,
          status: 'scheduled',
          notes: notes || null,
          source: 'admin',
        })
        .select('id')
        .single()
      if (error) throw error
      return res.status(200).json({ ok: true, id: data.id })
    } catch (err) {
      console.error('[admin/bookings POST]', err.message)
      return res.status(500).json({ error: 'Failed to create booking', detail: err.message })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, action, scheduledAt } = req.body || {}
      if (!id || !action) return res.status(400).json({ error: 'id and action are required' })

      if (action === 'cancel') {
        const { error } = await sb.from('mpm_appointments').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('id', id)
        if (error) throw error
        return res.status(200).json({ ok: true })
      }

      if (action === 'complete') {
        const { error } = await sb.from('mpm_appointments').update({ status: 'completed', updated_at: new Date().toISOString() }).eq('id', id)
        if (error) throw error
        return res.status(200).json({ ok: true })
      }

      if (action === 'no_show') {
        const { error } = await sb.from('mpm_appointments').update({ status: 'no_show', updated_at: new Date().toISOString() }).eq('id', id)
        if (error) throw error
        return res.status(200).json({ ok: true })
      }

      if (action === 'reschedule') {
        if (!scheduledAt) return res.status(400).json({ error: 'scheduledAt is required to reschedule' })
        const { data: existing } = await sb.from('mpm_appointments').select('duration_minutes').eq('id', id).maybeSingle()
        const duration = existing?.duration_minutes || SLOT_MINUTES
        const available = await isSlotAvailable(scheduledAt, duration)
        if (!available) return res.status(409).json({ error: 'That new time is not available.' })
        const { error } = await sb.from('mpm_appointments').update({ scheduled_at: new Date(scheduledAt).toISOString(), updated_at: new Date().toISOString() }).eq('id', id)
        if (error) throw error
        return res.status(200).json({ ok: true })
      }

      return res.status(400).json({ error: 'Unknown action' })
    } catch (err) {
      console.error('[admin/bookings PATCH]', err.message)
      return res.status(500).json({ error: 'Failed to update booking', detail: err.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
