export const PRECIOS = { normal: 2000, referido: 1500 }
export const CODIGO_FIJO = 'AETHERIS'
export function generarCodigo(nombre: string): string {
  const base = (nombre || 'USER').toUpperCase().replace(/[^A-Z]/g,'').slice(0,4).padEnd(4,'X')
  const num = Math.floor(1000 + Math.random() * 9000)
  return base + num
}
