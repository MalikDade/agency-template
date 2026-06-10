import { verifyAdmin } from '../_lib/adminAuth.js'
import { isSupabaseConfigured } from '../_lib/supabase.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  if (!verifyAdmin(req, res)) return

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
  })
}
