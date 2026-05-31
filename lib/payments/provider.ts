export type PaymentProvider = 'lemonsqueezy' | 'stripe' | 'paypal' | 'klarna'

/** Proveedor por defecto del checkout con tarjeta (fallback). */
export function getPaymentProvider(): PaymentProvider {
  const forced = process.env.PAYMENT_PROVIDER?.toLowerCase()
  if (forced === 'stripe' || forced === 'lemonsqueezy') return forced

  const lsKey = process.env.LEMONSQUEEZY_API_KEY?.trim()
  if (lsKey && !lsKey.includes('placeholder')) return 'lemonsqueezy'

  return 'stripe'
}

export function paymentProviderLabel(provider: PaymentProvider): string {
  switch (provider) {
    case 'paypal':
      return 'PayPal'
    case 'klarna':
      return 'Klarna'
    case 'lemonsqueezy':
      return 'Lemon Squeezy'
    default:
      return 'Stripe'
  }
}

/** Detecta cómo pagó el usuario a partir del ID guardado en BD. */
export function detectUserPaymentProvider(
  subscriptionId: string | null | undefined,
): PaymentProvider {
  const id = subscriptionId?.trim() || ''
  if (id.startsWith('klarna_')) return 'klarna'
  if (id.startsWith('I-') || id.startsWith('I')) return 'paypal'
  if (getPaymentProvider() === 'lemonsqueezy') return 'lemonsqueezy'
  return 'stripe'
}
