import { verifyAdmin } from '../_lib/adminAuth.js'
import { getUser, getScheduledEvents, getEventInvitees } from '../vapi/_calendly.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  if (!verifyAdmin(req, res)) return

  const token = process.env.CALENDLY_TOKEN
  if (!token) {
    return res.status(200).json({ events: [], configured: false })
  }

  try {
    const now = new Date()
    const { start, end } = req.query || {}
    const minTime = start ? new Date(start).toISOString() : new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const maxTime = end ? new Date(end).toISOString() : new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

    const user = await getUser(token)
    const rawEvents = await getScheduledEvents(token, user.uri, minTime, maxTime)

    const events = await Promise.all(rawEvents.map(async (ev) => {
      let invitee = null
      try {
        const invitees = await getEventInvitees(token, ev.uri)
        invitee = invitees[0] || null
      } catch (e) {
        console.error('[admin/bookings invitees]', e.message)
      }
      return {
        id: ev.uri.split('/').pop(),
        name: ev.name,
        status: ev.status,
        start_time: ev.start_time,
        end_time: ev.end_time,
        location: ev.location?.location || ev.location?.type || null,
        invitee_name: invitee?.name || null,
        invitee_email: invitee?.email || null,
        cancelled: invitee?.status === 'canceled' || false,
      }
    }))

    return res.status(200).json({ events, configured: true })
  } catch (err) {
    console.error('[admin/bookings]', err.message)
    return res.status(500).json({ error: 'Failed to load bookings', detail: err.message })
  }
}
