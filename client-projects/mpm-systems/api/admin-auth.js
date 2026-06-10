import { ADMIN_PASSWORD, ADMIN_TOKEN } from './_auth.js'

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body || {}
  if (password === ADMIN_PASSWORD) {
    return res.status(200).json({ token: ADMIN_TOKEN })
  }
  return res.status(401).json({ error: 'Invalid password' })
}
