import { fmtVoice, parseVapiArgs, vapiResponse } from './_calendly.js'
import { getSetting } from '../_supabase.js'
import { getAvailableSlots, SLOT_MINUTES } from '../_lib/availability.js'

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

  const daysAhead = Math.min(parseInt(args.days) || 7, 14)

  try {
    const rangeStart = new Date()
    const rangeEnd = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
    const slots = await getAvailableSlots(rangeStart, rangeEnd)

    if (!slots.length) {
      const msg = `No available discovery call times in the next ${daysAhead} days. Please ask the caller to check back soon or visit mpmsystems.net/book.`
      return res.status(200).json(vapiResponse(msg, toolCallId))
    }

    // Return up to 8 slots — enough options without overwhelming the caller
    const display = slots.slice(0, 8)
    const formatted = display.map((s, i) => `Option ${i + 1}: ${fmtVoice(s.toISOString())}`)

    const result = [
      `Here are the available times for a ${SLOT_MINUTES}-minute discovery call in the next ${daysAhead} days:`,
      ...formatted,
      `Which of these works best for you?`,
    ].join('\n')

    return res.status(200).json({
      ...vapiResponse(result, toolCallId),
      slots: display.map(s => ({ start_time: s.toISOString(), formatted: fmtVoice(s.toISOString()) })),
    })
  } catch (err) {
    console.error('[vapi/check-availability]', err.message)
    const msg = 'I had trouble checking availability right now. Please ask the caller to visit mpmsystems.net/book or call back in a few minutes.'
    return res.status(200).json(vapiResponse(msg, toolCallId))
  }
}
