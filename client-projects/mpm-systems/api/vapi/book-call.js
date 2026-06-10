import {
  getUser,
  getEventTypes,
  getAvailableSlots,
  fmtVoice,
  isoDateCST,
  parseVapiArgs,
  vapiResponse,
} from './_calendly.js'
import { getSupabase } from '../_supabase.js'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

async function sendBookingEmail({ to, name, email, phone, chosenTime, formattedTime, bookingUrl }) {
  const key = process.env.RESEND_API_KEY
  if (!key) { console.error('[book-call] RESEND_API_KEY not set'); return }

  const from = process.env.RESEND_FROM_EMAIL || 'MPM Systems <onboarding@resend.dev>'
  const dateStr = isoDateCST(chosenTime)
  const month = dateStr.slice(0, 7) // YYYY-MM

  // Personalized Calendly link with pre-filled name, email, and date
  const personalizedUrl = `${bookingUrl}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&month=${month}&date=${dateStr}`

  // Email to the caller
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
              Thanks for calling in. Dan Carter is holding a discovery call spot for you on
              <strong>${formattedTime}</strong>.
            </p>
            <p style="color:#444;line-height:1.6;margin:0 0 28px">
              Click the button below to lock in your spot — it takes about 30 seconds.
            </p>
            <a href="${personalizedUrl}"
               style="display:inline-block;background:#D4882A;color:#fff;padding:14px 28px;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.04em">
              CONFIRM MY SPOT →
            </a>
            <hr style="border:none;border-top:1px solid #eee;margin:32px 0" />
            <p style="font-size:12px;color:#888;margin:0">
              Questions? Reply to this email or call Dan directly at
              <a href="tel:+16015318139" style="color:#D4882A">+1 (601) 531-8139</a>
            </p>
          </div>
        </div>
      `,
  }).catch(e => console.error('[resend caller email]', e.message))

  // Notification to owner
  await resendSend(key, {
    from,
    to: [OWNER_EMAIL],
    subject: `Call Booked via VAPI — ${name} — ${formattedTime}`,
    html: `
      <h2 style="font-family:sans-serif;color:#0D1B2A">Incoming Discovery Call</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#888">Name</td><td><strong>${name}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Email</td><td><strong>${email}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Phone</td><td><strong>${phone || '—'}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Requested slot</td><td><strong>${formattedTime}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Source</td><td>VAPI voice call</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:12px;color:#aaa;margin-top:24px">
        Confirmation email sent to ${email}. Awaiting their click to finalize in Calendly.
      </p>
    `,
  }).catch(e => console.error('[resend owner email]', e.message))
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v))
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).end()

  const args = parseVapiArgs(req.body || {})
  const toolCallId = args._toolCallId

  const { name, email, phone, chosen_time, notes } = args

  // Validate required fields
  if (!name || !email || !chosen_time) {
    const msg = 'I need the caller\'s name, email address, and their chosen time slot to book a call. Could you confirm those details?'
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }

  if (!/^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) {
    const msg = `That email address doesn't look right. Could you ask the caller to repeat it? I heard: ${email}`
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }

  const token = process.env.CALENDLY_TOKEN
  if (!token) {
    // Fallback — save intent and email without slot verification
    await saveLead({ name, email, phone, notes, chosen_time, verified: false })
    const msg = `I've noted your information, ${name}. Dan will follow up at ${email} to confirm the booking. You can also call him directly at 6 0 1, 5 3 1, 8 1 3 9.`
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }

  try {
    const user = await getUser(token)
    const eventTypes = await getEventTypes(token, user.uri)
    if (!eventTypes.length) throw new Error('No event types found')

    const eventType = eventTypes[0]

    // Verify the chosen slot is still available within a 30-min window around the requested time
    const slotTime = new Date(chosen_time)
    if (isNaN(slotTime.getTime())) {
      const msg = `I couldn't parse the chosen time "${chosen_time}". Please make sure it's a valid date and time in ISO format like 2026-06-09T10:00:00Z.`
      return res.status(200).json(vapiResponse(msg, toolCallId))
    }

    const windowStart = new Date(slotTime.getTime() - 15 * 60 * 1000).toISOString()
    const windowEnd = new Date(slotTime.getTime() + 15 * 60 * 1000).toISOString()
    const nearbySlots = await getAvailableSlots(token, eventType.uri, windowStart, windowEnd)

    const formattedTime = fmtVoice(chosen_time)

    if (!nearbySlots.length) {
      // Slot taken — offer a fresh availability check
      const freshStart = new Date().toISOString()
      const freshEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      const freshSlots = await getAvailableSlots(token, eventType.uri, freshStart, freshEnd)
      const nextSlot = freshSlots[0]

      if (nextSlot) {
        const msg = `That slot at ${formattedTime} is no longer available — someone just booked it. The next open time is ${fmtVoice(nextSlot.start_time)}. Would that work for ${name}?`
        return res.status(200).json({
          ...vapiResponse(msg, toolCallId),
          next_available: { start_time: nextSlot.start_time, formatted: fmtVoice(nextSlot.start_time) },
        })
      } else {
        const msg = `That slot is no longer available and I don't see any open times in the next 7 days. Please have ${name} visit mpmsystems.net/book to find a future slot.`
        return res.status(200).json(vapiResponse(msg, toolCallId))
      }
    }

    // Slot confirmed available — save and send email
    const bookingUrl = eventType.scheduling_url
    await Promise.all([
      saveLead({ name, email, phone, notes, chosen_time, business_type: args.business_type || null, verified: true }),
      sendBookingEmail({ to: email, name, email, phone, chosenTime: chosen_time, formattedTime, bookingUrl }),
    ])

    const msg = `Perfect, ${name}! I've confirmed that ${formattedTime} is available. I just sent a booking confirmation email to ${email} — it includes a one-click link to lock in the slot. Check your inbox in the next minute. Dan looks forward to speaking with you!`

    return res.status(200).json({
      ...vapiResponse(msg, toolCallId),
      booking: {
        name,
        email,
        phone: phone || null,
        chosen_time,
        formatted_time: formattedTime,
        status: 'pending_confirmation',
        email_sent: true,
      },
    })
  } catch (err) {
    console.error('[vapi/book-call]', err.message)
    // Degrade gracefully — save what we have and let caller know
    await saveLead({ name, email, phone, notes, chosen_time, verified: false }).catch(() => {})
    const msg = `I've recorded your information, ${name}. Dan will follow up at ${email} within the hour to confirm your slot. You can also reach him directly at 6 0 1, 5 3 1, 8 1 3 9.`
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }
}

async function saveLead({ name, email, phone, notes, chosen_time, business_type, verified }) {
  try {
    const sb = getSupabase()
    await sb.from('mpm_leads').upsert(
      {
        session_id: `vapi_${email}_${Date.now()}`,
        name,
        email,
        phone: phone || null,
        business_type: business_type || 'discovery call',
        message: [
          notes ? `Notes: ${notes}` : '',
          `Requested slot: ${chosen_time}`,
          `Slot verified: ${verified}`,
          `Source: VAPI voice call`,
        ].filter(Boolean).join(' | ').slice(0, 600),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'session_id' }
    )
  } catch (e) {
    console.error('[vapi/book-call saveLead]', e.message)
  }
}
