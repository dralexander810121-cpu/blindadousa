/** Emails con acceso a herramientas internas (lista separada por comas en ADMIN_EMAILS). */

export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  const admins = getAdminEmails()
  if (!admins.length) return false
  return admins.includes(email.toLowerCase())
}
