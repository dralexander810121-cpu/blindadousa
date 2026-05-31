/** Mensajes de auth en español para la UI. */
export function mapAuthError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('already registered') || m.includes('user already registered')) {
    return 'Este email ya está registrado. Entra o recupera tu contraseña.'
  }
  if (m.includes('invalid login credentials')) {
    return 'Email o contraseña incorrectos.'
  }
  if (m.includes('email not confirmed')) {
    return 'Confirma tu email antes de entrar. Revisa tu bandeja de entrada.'
  }
  if (m.includes('password should be at least')) {
    return 'La contraseña debe tener al menos 6 caracteres.'
  }
  if (m.includes('invalid email')) {
    return 'El email no es válido.'
  }
  if (m.includes('rate limit')) {
    return 'Demasiados intentos. Espera un minuto e intenta de nuevo.'
  }
  if (m.includes('same as the old password')) {
    return 'La nueva contraseña debe ser distinta a la anterior.'
  }
  return 'No se pudo completar la acción. Intenta de nuevo.'
}
