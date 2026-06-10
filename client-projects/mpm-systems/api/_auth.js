export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'MPM2026Admin'
export const ADMIN_TOKEN = 'mpm_admin_authorized_2026'

export function checkAuth(req, res) {
  const auth = req.headers.authorization
  if (auth !== `Bearer ${ADMIN_TOKEN}`) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}
