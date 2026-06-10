import { checkAuth } from './_auth.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (!checkAuth(req, res)) return
  if (req.method !== 'GET') return res.status(405).end()

  const token = process.env.CALENDLY_TOKEN
  if (!token) {
    return res.status(200).json({ bookings: [], warning: 'CALENDLY_TOKEN env var not set' })
  }

  try {
    // Get user URI
    const meRes = await fetch('https://api.calendly.com/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!meRes.ok) throw new Error(`Calendly /users/me failed: ${meRes.status}`)
    const { resource: user } = await meRes.json()

    // Get upcoming active events
    const now = new Date().toISOString()
    const eventsRes = await fetch(
      `https://api.calendly.com/scheduled_events?user=${encodeURIComponent(user.uri)}&status=active&min_start_time=${now}&sort=start_time:asc&count=20`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!eventsRes.ok) throw new Error(`Calendly /scheduled_events failed: ${eventsRes.status}`)
    const { collection: events } = await eventsRes.json()

    // Fetch invitees for each event in parallel (limit 15 events)
    const slice = (events || []).slice(0, 15)
    const bookings = await Promise.all(
      slice.map(async event => {
        try {
          const uuid = event.uri.split('/').pop()
          const invRes = await fetch(
            `https://api.calendly.com/scheduled_events/${uuid}/invitees?count=1`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          const { collection: invitees } = await invRes.json()
          const inv = invitees?.[0]
          return {
            name: event.name,
            start_time: event.start_time,
            end_time: event.end_time,
            status: event.status,
            invitee_name: inv?.name || null,
            invitee_email: inv?.email || null,
          }
        } catch {
          return {
            name: event.name,
            start_time: event.start_time,
            end_time: event.end_time,
            status: event.status,
            invitee_name: null,
            invitee_email: null,
          }
        }
      })
    )

    return res.status(200).json({ bookings })
  } catch (err) {
    console.error('[calendly]', err.message)
    return res.status(500).json({ error: err.message })
  }
}
