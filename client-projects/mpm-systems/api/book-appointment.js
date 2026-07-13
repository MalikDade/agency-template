import { getSupabase } from './_supabase.js'
import { getAvailableSlots, isSlotAvailable, SLOT_MINUTES, TIMEZONE } from './_lib/availability.js'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const OWNER_EMAIL = 'makingpowermovesllc@gmail.com'

async function resendSend(key, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`)
  }
  return res.json()
}

function fmtVoice(iso) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
  }).format(new Date(iso))
}

async function sendConfirmationEmails({ name, email, phone, businessType, scheduledAt }) {
  const key = process.env.RESEND_API_KEY
  if (!key) { console.error('[book-appointment] RESEND_API_KEY not set'); return }
  const from = process.env.RESEND_FROM_EMAIL || 'MPM Systems <onboarding@resend.dev>'
  const formattedTime = fmtVoice(scheduledAt)

  await resendSend(key, {
    from,
    to: [email],
    subject: `Your Discovery Call with Dan Carter — ${formattedTime}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#0D1B2A">
        <div style="background:#0D1B2A;padding:24px 32px;margin-bottom:0">
          <div style="font-size:11px;letter-spacing:0.3em;color:#D4882A;font-weight:700">MPM SYSTEMS</div>
        </div>
        <div style="padding:32px;border:1px solid #e8e8e8;border-top:none">
          <h2 style="margin:0 0 8px;font-size:22px">Hi ${name},</h2>
          <p style="color:#444;line-height:1.6;margin:0 0 24px">
            You're booked for a discovery call with Dan Carter on <strong>${formattedTime}</strong>.
          </p>
          <p style="color:#444;line-height:1.6;margin:0 0 12px">
            Need to change the time? Just reply to this email or call Dan directly.
          </p>
          <hr style="border:none;border-top:1px solid #eee;margin:32px 0" />
          <p style="font-size:12px;color:#888;margin:0">
            Questions? Reply to this email or call Dan directly at
            <a href="tel:+16015318139" style="color:#D4882A">+1 (601) 531-8139</a>
          </p>
        </div>
      </div>
    `,
  }).catch(e => console.error('[resend caller email]', e.message))

  await resendSend(key, {
    from,
    to: [OWNER_EMAIL],
    subject: `New Booking — ${name} — ${formattedTime}`,
    html: `
      <h2 style="font-family:sans-serif;color:#0D1B2A">New Discovery Call Booked</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#888">Name</td><td><strong>${name}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Email</td><td><strong>${email}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Phone</td><td><strong>${phone || '—'}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Business Type</td><td><strong>${businessType || '—'}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Time</td><td><strong>${formattedTime}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Source</td><td>Site booking</td></tr>
      </table>
    `,
  }).catch(e => console.error('[resend owner email]', e.message))
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v))
  if (req.method === 'OPTIONS') return res.status(204).end()

  if (req.method === 'GET') {
    try {
      const { start, end } = req.query || {}
      const now = new Date()
      const rangeStart = start ? new Date(start) : now
      const rangeEnd = end ? new Date(end) : new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
      if (isNaN(rangeStart.getTime()) || isNaN(rangeEnd.getTime())) {
        return res.status(400).json({ error: 'Invalid start/end' })
      }
      const slots = await getAvailableSlots(rangeStart, rangeEnd)
      return res.status(200).json({
        slots: slots.map(s => s.toISOString()),
        durationMinutes: SLOT_MINUTES,
        timezone: TIMEZONE,
      })
    } catch (err) {
      console.error('[book-appointment GET]', err.message)
      return res.status(500).json({ error: 'Failed to load availability' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, businessType, scheduledAt } = req.body || {}
      if (!name || !email || !scheduledAt) {
        return res.status(400).json({ error: 'Name, email, and a selected time are required.' })
      }
      if (!/^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json({ error: 'That email address doesn\'t look valid.' })
      }

      const available = await isSlotAvailable(scheduledAt, SLOT_MINUTES)
      if (!available) {
        return res.status(409).json({ error: 'That time was just booked or is no longer available. Please pick another.' })
      }

      const sb = getSupabase()
      const { data: appt, error } = await sb
        .from('mpm_appointments')
        .insert({
          name, email, phone: phone || null,
          business_type: businessType || null,
          scheduled_at: new Date(scheduledAt).toISOString(),
          duration_minutes: SLOT_MINUTES,
          status: 'scheduled',
          source: 'site',
        })
        .select('id')
        .single()
      if (error || !appt) {
        console.error('[book-appointment insert]', error?.message)
        return res.status(500).json({ error: 'Could not save your booking. Please try again.' })
      }

      // Also drop a lead record so it shows up in the Leads tab / CRM.
      await sb.from('mpm_leads').insert({
        session_id: `booking_${appt.id}`,
        name, email, phone: phone || null,
        business_type: businessType || null,
        message: `Booked a discovery call for ${fmtVoice(scheduledAt)} via the site.`,
      }).then(() => {}).catch(e => console.error('[book-appointment lead insert]', e.message))

      await sendConfirmationEmails({ name, email, phone, businessType, scheduledAt })

      return res.status(200).json({
        ok: true,
        appointmentId: appt.id,
        scheduledAt: new Date(scheduledAt).toISOString(),
        formattedTime: fmtVoice(scheduledAt),
      })
    } catch (err) {
      console.error('[book-appointment POST]', err.message)
      return res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
