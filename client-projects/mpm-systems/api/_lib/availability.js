import { getSupabase } from '../_supabase.js'

// Native scheduling engine — replaces Calendly. Weekly hours are configurable
// via mpm_settings.weekly_hours (JSON array, one entry per weekday), with
// one-off blocked/open time ranges layered on top via mpm_availability_blocks.
export const TIMEZONE = 'America/Chicago'
export const SLOT_MINUTES = 30
export const MIN_NOTICE_MINUTES = 60 // no booking within the next hour

const DEFAULT_WEEKLY_HOURS = [
  { day: 0, enabled: false, start: 9, end: 18 }, // Sun
  { day: 1, enabled: true, start: 9, end: 18 },  // Mon
  { day: 2, enabled: true, start: 9, end: 18 },
  { day: 3, enabled: true, start: 9, end: 18 },
  { day: 4, enabled: true, start: 9, end: 18 },
  { day: 5, enabled: true, start: 9, end: 18 },
  { day: 6, enabled: false, start: 9, end: 18 }, // Sat
]

async function loadWeeklyHours() {
  try {
    const sb = getSupabase()
    const { data, error } = await sb.from('mpm_settings').select('value').eq('key', 'weekly_hours').maybeSingle()
    if (error || !data?.value) return DEFAULT_WEEKLY_HOURS
    const parsed = JSON.parse(data.value)
    if (!Array.isArray(parsed) || parsed.length !== 7) return DEFAULT_WEEKLY_HOURS
    return parsed
  } catch (e) {
    console.error('[availability] loadWeeklyHours', e.message)
    return DEFAULT_WEEKLY_HOURS
  }
}

async function loadBlocks(rangeStart, rangeEnd) {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('mpm_availability_blocks')
    .select('id, type, start_time, end_time, label')
    .lt('start_time', rangeEnd.toISOString())
    .gt('end_time', rangeStart.toISOString())
  if (error) { console.error('[availability] loadBlocks', error.message); return [] }
  return (data || []).map(b => ({ ...b, start: new Date(b.start_time), end: new Date(b.end_time) }))
}

// Returns the UTC offset (in minutes, negative for west of UTC) for America/Chicago
// on a given civil date, using a noon-UTC probe to avoid DST-transition ambiguity.
function chicagoOffsetMinutes(year, month, day) {
  const probe = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, timeZoneName: 'shortOffset' }).formatToParts(probe)
  const tzPart = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT-6'
  const match = tzPart.match(/GMT([+-]\d+)/)
  const offsetHours = match ? parseInt(match[1], 10) : -6
  return offsetHours * 60
}

// Converts a Chicago-local wall-clock time to the correct UTC instant (DST-aware).
function chicagoWallTimeToUTC(year, month, day, hour, minute) {
  const offsetMinutes = chicagoOffsetMinutes(year, month, day)
  const utcMs = Date.UTC(year, month - 1, day, hour, minute, 0) - offsetMinutes * 60000
  return new Date(utcMs)
}

function weekdayIndexInChicago(date) {
  const short = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, weekday: 'short' }).format(date)
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(short)
}

function overlapsAny(slotStart, slotEnd, ranges) {
  return ranges.some(r => slotStart < r.end && slotEnd > r.start)
}

// Generates all slot start times (UTC Date objects) within [rangeStart, rangeEnd) based on
// configured weekly hours plus any one-off 'open' blocks — does NOT remove 'block' ranges,
// callers decide whether to filter or just tag them (see generateCandidateSlots vs getDaySchedule).
function rawCandidateSlots(rangeStart, rangeEnd, weeklyHours, openRanges) {
  const slots = []
  const byDay = new Map(weeklyHours.map(w => [w.day, w]))

  const get = (parts, t) => parts.find(p => p.type === t)?.value
  const startCivil = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(rangeStart)
  let guard = new Date(Date.UTC(parseInt(get(startCivil, 'year'), 10), parseInt(get(startCivil, 'month'), 10) - 1, parseInt(get(startCivil, 'day'), 10)))
  const endCivil = new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(rangeEnd)
  const endGuard = new Date(Date.UTC(parseInt(get(endCivil, 'year'), 10), parseInt(get(endCivil, 'month'), 10) - 1, parseInt(get(endCivil, 'day'), 10)))

  let iterations = 0
  while (guard.getTime() <= endGuard.getTime() && iterations < 400) {
    iterations++
    const gy = guard.getUTCFullYear(), gm = guard.getUTCMonth() + 1, gd = guard.getUTCDate()
    const noonThatDay = chicagoWallTimeToUTC(gy, gm, gd, 12, 0)
    const dow = weekdayIndexInChicago(noonThatDay)
    const hours = byDay.get(dow)

    if (hours && hours.enabled) {
      for (let h = hours.start; h < hours.end; h++) {
        for (let mm = 0; mm < 60; mm += SLOT_MINUTES) {
          const slotStart = chicagoWallTimeToUTC(gy, gm, gd, h, mm)
          if (slotStart >= rangeStart && slotStart < rangeEnd) slots.push(slotStart)
        }
      }
    }
    guard = new Date(guard.getTime() + 24 * 60 * 60 * 1000)
  }

  // Layer in one-off 'open' windows regardless of weekly hours / weekday.
  for (const open of openRanges) {
    let cursor = new Date(Math.max(open.start.getTime(), rangeStart.getTime()))
    const stop = new Date(Math.min(open.end.getTime(), rangeEnd.getTime()))
    while (cursor.getTime() + SLOT_MINUTES * 60000 <= stop.getTime()) {
      slots.push(new Date(cursor))
      cursor = new Date(cursor.getTime() + SLOT_MINUTES * 60000)
    }
  }

  const seen = new Set()
  return slots
    .filter(s => { const k = s.getTime(); if (seen.has(k)) return false; seen.add(k); return true })
    .sort((a, b) => a - b)
}

// Candidate slots with 'block' ranges removed entirely — used for actual availability checks.
function generateCandidateSlots(rangeStart, rangeEnd, weeklyHours, blocks) {
  const blockRanges = blocks.filter(b => b.type === 'block')
  const openRanges = blocks.filter(b => b.type === 'open')
  const raw = rawCandidateSlots(rangeStart, rangeEnd, weeklyHours, openRanges)
  return raw.filter(s => {
    const slotEnd = new Date(s.getTime() + SLOT_MINUTES * 60000)
    return !overlapsAny(s, slotEnd, blockRanges)
  })
}

// Returns all open (unbooked, in-hours, future) slots in [rangeStart, rangeEnd).
export async function getAvailableSlots(rangeStart, rangeEnd) {
  const sb = getSupabase()
  const [weeklyHours, blocks, bookedResult] = await Promise.all([
    loadWeeklyHours(),
    loadBlocks(rangeStart, rangeEnd),
    sb.from('mpm_appointments').select('scheduled_at, duration_minutes').eq('status', 'scheduled')
      .gte('scheduled_at', rangeStart.toISOString()).lt('scheduled_at', rangeEnd.toISOString()),
  ])
  if (bookedResult.error) throw bookedResult.error

  const bookedRanges = (bookedResult.data || []).map(b => {
    const start = new Date(b.scheduled_at)
    const end = new Date(start.getTime() + (b.duration_minutes || SLOT_MINUTES) * 60000)
    return { start, end }
  })

  const minStart = new Date(Date.now() + MIN_NOTICE_MINUTES * 60000)
  const candidates = generateCandidateSlots(rangeStart, rangeEnd, weeklyHours, blocks)

  return candidates.filter(slot => {
    if (slot < minStart) return false
    const slotEnd = new Date(slot.getTime() + SLOT_MINUTES * 60000)
    return !overlapsAny(slot, slotEnd, bookedRanges)
  })
}

// Validates a specific requested slot is still bookable right now (race-safe check
// to run again just before insert).
export async function isSlotAvailable(slotIso, durationMinutes = SLOT_MINUTES) {
  const slot = new Date(slotIso)
  if (isNaN(slot.getTime())) return false

  const minStart = new Date(Date.now() + MIN_NOTICE_MINUTES * 60000)
  if (slot < minStart) return false

  const slotEnd = new Date(slot.getTime() + durationMinutes * 60000)
  const windowStart = new Date(slot.getTime() - 60000)
  const windowEnd = new Date(slotEnd.getTime() + 60000)

  const [weeklyHours, blocks] = await Promise.all([loadWeeklyHours(), loadBlocks(windowStart, windowEnd)])
  const openRanges = blocks.filter(b => b.type === 'open')
  const blockRanges = blocks.filter(b => b.type === 'block')

  const dow = weekdayIndexInChicago(slot)
  const hours = weeklyHours.find(w => w.day === dow)
  const hour = parseInt(new Intl.DateTimeFormat('en-US', { timeZone: TIMEZONE, hour: 'numeric', hour12: false }).format(slot), 10)

  const withinWeeklyHours = hours && hours.enabled && hour >= hours.start && hour < hours.end
  const withinOpenWindow = openRanges.some(o => slot >= o.start && slotEnd <= o.end)
  if (!withinWeeklyHours && !withinOpenWindow) return false
  if (overlapsAny(slot, slotEnd, blockRanges)) return false

  const sb = getSupabase()
  const { data: booked, error } = await sb
    .from('mpm_appointments')
    .select('scheduled_at, duration_minutes')
    .eq('status', 'scheduled')
    .gte('scheduled_at', new Date(slot.getTime() - 4 * 60 * 60000).toISOString())
    .lt('scheduled_at', new Date(slot.getTime() + 4 * 60 * 60000).toISOString())
  if (error) throw error

  const bookedRanges = (booked || []).map(b => {
    const bStart = new Date(b.scheduled_at)
    return { start: bStart, end: new Date(bStart.getTime() + (b.duration_minutes || SLOT_MINUTES) * 60000) }
  })
  return !overlapsAny(slot, slotEnd, bookedRanges)
}

// Full 30-min breakdown of a single civil date (YYYY-MM-DD, interpreted in Chicago time),
// tagging every slot as open / booked / blocked — this is the admin day view, so unlike
// getAvailableSlots it does NOT hide past or booked slots, it shows everything.
export async function getDaySchedule(dateStr) {
  const [y, m, d] = dateStr.split('-').map(n => parseInt(n, 10))
  const dayStart = chicagoWallTimeToUTC(y, m, d, 0, 0)
  const dayEnd = chicagoWallTimeToUTC(y, m, d + 1, 0, 0)

  const sb = getSupabase()
  const [weeklyHours, blocks, bookedResult] = await Promise.all([
    loadWeeklyHours(),
    loadBlocks(dayStart, dayEnd),
    sb.from('mpm_appointments').select('*').neq('status', 'cancelled')
      .gte('scheduled_at', dayStart.toISOString()).lt('scheduled_at', dayEnd.toISOString()),
  ])
  if (bookedResult.error) throw bookedResult.error

  const openRanges = blocks.filter(b => b.type === 'open')
  const blockRanges = blocks.filter(b => b.type === 'block')
  const raw = rawCandidateSlots(dayStart, dayEnd, weeklyHours, openRanges)

  const bookedList = (bookedResult.data || []).map(a => {
    const start = new Date(a.scheduled_at)
    return { start, end: new Date(start.getTime() + (a.duration_minutes || SLOT_MINUTES) * 60000), appt: a }
  })

  return raw.map(slotStart => {
    const slotEnd = new Date(slotStart.getTime() + SLOT_MINUTES * 60000)
    const bookedHit = bookedList.find(b => slotStart < b.end && slotEnd > b.start)
    const blockedHit = !bookedHit && blockRanges.find(b => slotStart < b.end && slotEnd > b.start)
    return {
      start: slotStart.toISOString(),
      end: slotEnd.toISOString(),
      status: bookedHit ? 'booked' : blockedHit ? 'blocked' : 'open',
      appointment: bookedHit ? {
        id: bookedHit.appt.id, name: bookedHit.appt.name, email: bookedHit.appt.email,
        phone: bookedHit.appt.phone, status: bookedHit.appt.status,
      } : null,
      label: blockedHit ? blockedHit.label : null,
    }
  })
}

// Short, chat-friendly summary of upcoming open slots — queried fresh on every
// call (no caching), so Dan always reflects whatever hours/blocks are current
// the moment Malik changes them.
export async function getAvailabilitySummary(daysAhead = 7, limit = 5) {
  const rangeStart = new Date()
  const rangeEnd = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000)
  const slots = await getAvailableSlots(rangeStart, rangeEnd)
  const fmt = d => new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE, weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  }).format(d)
  return {
    count: slots.length,
    next: slots.slice(0, limit).map(fmt),
  }
}
