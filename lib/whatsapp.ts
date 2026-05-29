/** Envío de alertas vía Twilio WhatsApp (opcional). */

export function isWhatsAppConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
      process.env.TWILIO_AUTH_TOKEN?.trim() &&
      process.env.TWILIO_WHATSAPP_FROM?.trim(),
  )
}

export function normalizePhoneE164(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  if (raw.startsWith('+')) return `+${digits}`
  return `+${digits}`
}

export async function sendWhatsAppAlert(toPhone: string, body: string): Promise<boolean> {
  if (!isWhatsAppConfigured()) return false

  const sid = process.env.TWILIO_ACCOUNT_SID!
  const token = process.env.TWILIO_AUTH_TOKEN!
  const from = process.env.TWILIO_WHATSAPP_FROM!.startsWith('whatsapp:')
    ? process.env.TWILIO_WHATSAPP_FROM!
    : `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`

  const to = toPhone.startsWith('whatsapp:')
    ? toPhone
    : `whatsapp:${normalizePhoneE164(toPhone)}`

  const params = new URLSearchParams()
  params.set('From', from)
  params.set('To', to)
  params.set('Body', body.slice(0, 1500))

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('twilio_whatsapp_failed', err)
    return false
  }
  return true
}
