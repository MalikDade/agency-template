const ADMIN_PASSWORD = 'MPM2026Admin'

export function verifyAdmin(req, res) {
  const password = req.headers['x-admin-password']
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}
