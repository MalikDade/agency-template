import {
  getUser,
  getEventTypes,
  getAvailableSlots,
  fmtVoice,
  parseVapiArgs,
  vapiResponse,
} from './_calendly.js'
import { getSetting } from '../_supabase.js'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v))
  if (req.method === 'OPTIONS') return res.status(204).end()

  const args = parseVapiArgs(req.body || {})
  const toolCallId = args._toolCallId

  const vapiOn = await getSetting('vapi_available', 'true')
  if (vapiOn === 'false') {
    const msg = 'Our AI booking assistant is offline right now. Please ask the caller to visit mpmsystems.net/book or call back later.'
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }

  const token = process.env.CALENDLY_TOKEN
  if (!token) {
    const msg = 'Calendly is not configured. Please ask the caller to visit mpmsystems.net to book a call.'
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }

  const daysAhead = Math.min(parseInt(args.days) || 7, 7) // Calendly max window = 7 days

  try {
    const user = await getUser(token)
    const eventTypes = await getEventTypes(token, user.uri)

    if (!eventTypes.length) {
      return res.status(200).json(vapiResponse(
        'No active event types found on the Calendly account. Please ask the caller to visit mpmsystems.net to book a call.',
        toolCallId
      ))
    }

    // Use the first active event type (typically the primary discovery call)
    const eventType = eventTypes[0]

    // Calendly requires start_time to be in the future — use 1 hour from now as buffer
    const startTime = new Date(Date.now() + 60 * 60 * 1000).toISOString()
    const endTime = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000).toISOString()

    const slots = await getAvailableSlots(token, eventType.uri, startTime, endTime)

    if (!slots.length) {
      const msg = `No available slots for ${eventType.name} in the next ${daysAhead} days. Please ask the caller to check back soon or visit mpmsystems.net to see future availability.`
      return res.status(200).json(vapiResponse(msg, toolCallId))
    }

    // Return up to 8 slots — enough options without overwhelming the caller
    const display = slots.slice(0, 8)
    const formatted = display.map((s, i) => `Option ${i + 1}: ${fmtVoice(s.start_time)}`)

    const result = [
      `Here are the available times for a ${eventType.name} in the next ${daysAhead} days:`,
      ...formatted,
      `Which of these works best for you?`,
    ].join('\n')

    return res.status(200).json({
      ...vapiResponse(result, toolCallId),
      // Raw data for direct callers / debugging
      slots: display.map(s => ({
        start_time: s.start_time,
        formatted: fmtVoice(s.start_time),
        scheduling_url: s.scheduling_url,
      })),
      event_type: {
        name: eventType.name,
        uri: eventType.uri,
        scheduling_url: eventType.scheduling_url,
        slug: eventType.slug,
      },
    })
  } catch (err) {
    console.error('[vapi/check-availability]', err.message)
    const msg = 'I had trouble checking availability right now. Please ask the caller to visit mpmsystems.net/book or call back in a few minutes.'
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }
}
