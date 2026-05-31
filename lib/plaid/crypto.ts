/**
 * Cifrado AES-256-GCM para Plaid access tokens.
 * Los tokens dan acceso permanente a cuentas bancarias — nunca en texto plano.
 *
 * Requiere: PLAID_TOKEN_ENCRYPTION_KEY (32 bytes hex, 64 chars)
 * Generar: openssl rand -hex 32
 */
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ALGO = 'aes-256-gcm'
const IV_LEN = 16
const TAG_LEN = 16

function getKey(): Buffer {
  const key = process.env.PLAID_TOKEN_ENCRYPTION_KEY?.trim()
  if (!key || key.length !== 64) {
    throw new Error('PLAID_TOKEN_ENCRYPTION_KEY debe ser 64 caracteres hex (openssl rand -hex 32)')
  }
  return Buffer.from(key, 'hex')
}

/** Cifra un Plaid access token. Devuelve string "iv:tag:ciphertext" en hex. */
export function encryptPlaidToken(plaintext: string): string {
  const key = getKey()
  const iv = randomBytes(IV_LEN)
  const cipher = createCipheriv(ALGO, key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`
}

/** Descifra un Plaid access token cifrado con encryptPlaidToken. */
export function decryptPlaidToken(ciphertext: string): string {
  const [ivHex, tagHex, dataHex] = ciphertext.split(':')
  if (!ivHex || !tagHex || !dataHex) throw new Error('Formato de token cifrado inválido')
  const key = getKey()
  const iv = Buffer.from(ivHex, 'hex')
  const tag = Buffer.from(tagHex, 'hex')
  const data = Buffer.from(dataHex, 'hex')
  const decipher = createDecipheriv(ALGO, key, iv)
  decipher.setAuthTag(tag)
  return decipher.update(data).toString('utf8') + decipher.final('utf8')
}

/** Detecta si un token ya está cifrado (contiene el formato iv:tag:data). */
export function isEncrypted(token: string): boolean {
  return token.split(':').length === 3 && token.length > 100
}
