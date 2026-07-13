import { fmtVoice, parseVapiArgs, vapiResponse } from './_calendly.js'
import { getSupabase, getSetting } from '../_supabase.js'
import { isSlotAvailable, getAvailableSlots, SLOT_MINUTES } from '../_lib/availability.js'

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

async function sendBookingEmail({ name, email, phone, formattedTime }) {
  const key = process.env.RESEND_API_KEY
  if (!key) { console.error('[book-call] RESEND_API_KEY not set'); return }

  const from = process.env.RESEND_FROM_EMAIL || 'MPM Systems <onboarding@resend.dev>'

  // Email to the caller — booking is already confirmed, no click-to-confirm link needed.
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
            You're booked! Dan Carter will call you for your discovery call on
            <strong>${formattedTime}</strong>.
          </p>
          <p style="color:#444;line-height:1.6;margin:0 0 12px">
            Need to change the time? Just reply to this email.
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

  // Notification to owner
  await resendSend(key, {
    from,
    to: [OWNER_EMAIL],
    subject: `Call Booked via VAPI — ${name} — ${formattedTime}`,
    html: `
      <h2 style="font-family:sans-serif;color:#0D1B2A">Discovery Call Booked</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#888">Name</td><td><strong>${name}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Email</td><td><strong>${email}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Phone</td><td><strong>${phone || '—'}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Time</td><td><strong>${formattedTime}</strong></td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#888">Source</td><td>VAPI voice call</td></tr>
      </table>
    `,
  }).catch(e => console.error('[resend owner email]', e.message))
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v))
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).end()

  const args = parseVapiArgs(req.body || {})
  const toolCallId = args._toolCallId

  const vapiOn = await getSetting('vapi_available', 'true')
  if (vapiOn === 'false') {
    const msg = 'Our AI booking assistant is offline right now. Please ask the caller to visit mpmsystems.net/book or call back later.'
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }

  const { name, email, phone, chosen_time, notes } = args

  if (!name || !email || !chosen_time) {
    const msg = 'I need the caller\'s name, email address, and their chosen time slot to book a call. Could you confirm those details?'
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }

  if (!/^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) {
    const msg = `That email address doesn't look right. Could you ask the caller to repeat it? I heard: ${email}`
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }

  const slotTime = new Date(chosen_time)
  if (isNaN(slotTime.getTime())) {
    const msg = `I couldn't parse the chosen time "${chosen_time}". Please make sure it's a valid date and time in ISO format like 2026-06-09T10:00:00Z.`
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }

  try {
    const formattedTime = fmtVoice(chosen_time)
    const available = await isSlotAvailable(slotTime.toISOString(), SLOT_MINUTES)

    if (!available) {
      const freshStart = new Date()
      const freshEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      const freshSlots = await getAvailableSlots(freshStart, freshEnd)
      const nextSlot = freshSlots[0]

      if (nextSlot) {
        const msg = `That slot at ${formattedTime} is no longer available — someone just booked it. The next open time is ${fmtVoice(nextSlot.toISOString())}. Would that work for ${name}?`
        return res.status(200).json({
          ...vapiResponse(msg, toolCallId),
          next_available: { start_time: nextSlot.toISOString(), formatted: fmtVoice(nextSlot.toISOString()) },
        })
      } else {
        const msg = `That slot is no longer available and I don't see any open times in the next 7 days. Please have ${name} visit mpmsystems.net/book to find a future slot.`
        return res.status(200).json(vapiResponse(msg, toolCallId))
      }
    }

    // Slot confirmed available — book it directly (native system, no click-to-confirm needed)
    const sb = getSupabase()
    const { data: appt, error } = await sb
      .from('mpm_appointments')
      .insert({
        name, email, phone: phone || null,
        business_type: args.business_type || null,
        scheduled_at: slotTime.toISOString(),
        duration_minutes: SLOT_MINUTES,
        status: 'scheduled',
        notes: notes || null,
        source: 'vapi',
      })
      .select('id')
      .single()
    if (error || !appt) throw new Error(error?.message || 'Insert failed')

    await Promise.all([
      saveLead({ name, email, phone, notes, chosen_time, business_type: args.business_type || null, verified: true }),
      sendBookingEmail({ name, email, phone, formattedTime }),
    ])

    const msg = `Perfect, ${name}! You're booked for ${formattedTime}. I just sent a confirmation email to ${email}. Dan looks forward to speaking with you!`

    return res.status(200).json({
      ...vapiResponse(msg, toolCallId),
      booking: {
        name, email, phone: phone || null,
        chosen_time, formatted_time: formattedTime,
        status: 'confirmed',
        appointment_id: appt.id,
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
