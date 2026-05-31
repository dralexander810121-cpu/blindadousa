import { Resend } from 'resend'

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim()
  return key ? new Resend(key) : null
}

export const FROM = `${process.env.RESEND_FROM_NAME || 'BlindadoUSA'} <${process.env.RESEND_FROM_EMAIL || 'hola@blindadousa.com'}>`
