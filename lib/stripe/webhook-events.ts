/** Eventos que el endpoint /api/stripe/webhook debe recibir en Stripe Dashboard. */
export const STRIPE_WEBHOOK_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.deleted',
  'customer.subscription.updated',
  'invoice.payment_failed',
] as const

export const STRIPE_WEBHOOK_URL_PATH = '/api/stripe/webhook'
