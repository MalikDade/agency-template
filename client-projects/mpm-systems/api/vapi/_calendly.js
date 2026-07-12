const BASE = 'https://api.calendly.com'

async function cal(path, token) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Calendly ${path} → ${res.status}: ${text.slice(0, 120)}`)
  }
  return res.json()
}

export async function getUser(token) {
  const { resource } = await cal('/users/me', token)
  return resource
}

export async function getEventTypes(token, userUri) {
  const { collection } = await cal(
    `/event_types?user=${encodeURIComponent(userUri)}&active=true&count=20`,
    token
  )
  return collection || []
}

// Returns available time slots for an event type within [startTime, endTime].
// Calendly requires the window to be ≤ 7 days.
export async function getAvailableSlots(token, eventTypeUri, startTime, endTime) {
  const { collection } = await cal(
    `/event_type_available_times?event_type=${encodeURIComponent(eventTypeUri)}&start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}`,
    token
  )
  return (collection || []).filter(s => s.status === 'available' && s.invitees_remaining > 0)
}

// Format an ISO UTC timestamp for natural voice output in CST/CDT.
export function fmtVoice(iso) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(iso))
}

// Format ISO timestamp as YYYY-MM-DD in CST for Calendly URL params.
export function isoDateCST(iso) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date(iso)) // en-CA gives YYYY-MM-DD
}

// Returns all active scheduled events for a user within [minTime, maxTime], paginated.
export async function getScheduledEvents(token, userUri, minTime, maxTime) {
  let events = []
  let pageToken = null
  do {
    const params = new URLSearchParams({
      user: userUri,
      min_start_time: minTime,
      max_start_time: maxTime,
      status: 'active',
      sort: 'start_time:asc',
      count: '100',
    })
    if (pageToken) params.set('page_token', pageToken)
    const { collection, pagination } = await cal(`/scheduled_events?${params.toString()}`, token)
    events = events.concat(collection || [])
    pageToken = pagination?.next_page_token || null
  } while (pageToken)
  return events
}

// Returns invitees (name/email/etc.) for a single scheduled event.
export async function getEventInvitees(token, eventUri) {
  const eventUuid = eventUri.split('/').pop()
  const { collection } = await cal(`/scheduled_events/${eventUuid}/invitees?count=10`, token)
  return collection || []
}

// Extract args from either a direct REST body or a VAPI tool-call message body.
export function parseVapiArgs(body) {
  const toolCall = body?.message?.toolCallList?.[0]
  if (toolCall) {
    const raw = toolCall.function?.arguments
    const args = typeof raw === 'string' ? JSON.parse(raw || '{}') : (raw || {})
    return { ...args, _toolCallId: toolCall.id }
  }
  return body || {}
}

// Shape a response compatible with VAPI's tool-call result contract.
export function vapiResponse(result, toolCallId) {
  return {
    results: [{ toolCallId: toolCallId || 'direct', result: String(result) }],
  }
}
