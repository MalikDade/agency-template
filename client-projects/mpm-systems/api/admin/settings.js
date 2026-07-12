import { verifyAdmin } from '../_lib/adminAuth.js'
import { isSupabaseConfigured } from '../_lib/supabase.js'
import { getSettings, upsertSettings } from '../_supabase.js'

const DEFAULTS = {
  business_hours: 'Mon–Fri 9am–6pm CST',
  dan_title: 'Director of Client Solutions',
  contact_email: 'makingpowermovesllc@gmail.com',
  contact_phone: '',
  vapi_available: 'true',
  accepting_new_leads: 'true',
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (!verifyAdmin(req, res)) return

  if (req.method === 'POST') {
    if (!isSupabaseConfigured()) return res.status(500).json({ error: 'Supabase not configured' })
    try {
      const allowed = Object.keys(DEFAULTS)
      const body = req.body || {}
      const toSave = {}
      for (const k of allowed) {
        if (body[k] !== undefined) toSave[k] = body[k]
      }
      if (Object.keys(toSave).length === 0) return res.status(400).json({ error: 'No valid settings provided' })
      await upsertSettings(toSave)
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error('[admin/settings POST]', err)
      return res.status(500).json({ error: 'Failed to save settings' })
    }
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const business = isSupabaseConfigured() ? { ...DEFAULTS, ...(await getSettings()) } : DEFAULTS

  return res.status(200).json({
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    variables: {
      ANTHROPIC_API_KEY: Boolean(process.env.ANTHROPIC_API_KEY),
      RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
      RESEND_FROM_EMAIL: Boolean(process.env.RESEND_FROM_EMAIL),
      SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
      SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    },
    services: {
      supabase: isSupabaseConfigured(),
      resend: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL),
      anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
    },
    business,
  })
}
