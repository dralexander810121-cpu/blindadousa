/** Plaid env helpers — used by API routes and dashboard copy. */

export function isPlaidConfigured(): boolean {
  const encKey = process.env.PLAID_TOKEN_ENCRYPTION_KEY?.trim()
  return Boolean(
    process.env.PLAID_CLIENT_ID?.trim() &&
      process.env.PLAID_SECRET?.trim() &&
      encKey &&
      encKey.length === 64,
  )
}

/** User-facing message when Plaid keys are missing (prod vs local). */
export function plaidNotConfiguredMessage(): string {
  const isVercel = Boolean(process.env.VERCEL)
  if (isVercel) {
    return (
      'Plaid no está configurado en el servidor. En Vercel → proyecto blindadousa → ' +
      'Settings → Environment Variables, añade PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV=sandbox y ' +
      'PLAID_TOKEN_ENCRYPTION_KEY (64 hex: openssl rand -hex 32), luego redeploy.'
    )
  }
  return 'Plaid no configurado. Añade PLAID_CLIENT_ID, PLAID_SECRET y PLAID_TOKEN_ENCRYPTION_KEY en .env.local (ver SETUP-PLAID.md).'
}
