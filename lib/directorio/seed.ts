export type NegocioDirectorio = {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  ciudad: string
  estado: string
  telefono?: string
  email?: string
  website?: string
  idiomas: string[]
  acepta_itin: boolean
  verificado: boolean
  featured: boolean
}

export const CATEGORIAS_DIRECTORIO = [
  { id: 'abogado', label: 'Abogados', icon: '⚖️' },
  { id: 'notario', label: 'Notarios', icon: '📜' },
  { id: 'dealer', label: 'Dealers de autos', icon: '🚗' },
  { id: 'banco', label: 'Bancos e ITIN', icon: '🏧' },
  { id: 'taxes', label: 'Taxes / CPA', icon: '📋' },
  { id: 'clinica', label: 'Clínicas', icon: '🏥' },
  { id: 'seguros', label: 'Seguros', icon: '🛡️' },
  { id: 'realtor', label: 'Realtors', icon: '🏠' },
  { id: 'tienda', label: 'Tiendas hispanas', icon: '🛒' },
] as const

/** Listings de demostración hasta que el negocio cargue datos en Supabase. */
export const NEGOCIOS_SEED: NegocioDirectorio[] = [
  {
    id: 'seed-abogado-1',
    nombre: 'García & Asociados — Inmigración',
    categoria: 'abogado',
    descripcion: 'Consultas en español. Familia, asilo y ajuste de estatus.',
    ciudad: 'Houston',
    estado: 'TX',
    telefono: '+17135550101',
    idiomas: ['es', 'en'],
    acepta_itin: true,
    verificado: true,
    featured: true,
  },
  {
    id: 'seed-notario-1',
    nombre: 'Notaría Express Houston',
    categoria: 'notario',
    descripcion: 'Poderes, affidavits y documentos para trámites en USA y México.',
    ciudad: 'Houston',
    estado: 'TX',
    telefono: '+17135550102',
    idiomas: ['es'],
    acepta_itin: true,
    verificado: true,
    featured: false,
  },
  {
    id: 'seed-dealer-1',
    nombre: 'Auto Latino Motors',
    categoria: 'dealer',
    descripcion: 'Financiamiento con ITIN. Inventario usado certificado.',
    ciudad: 'Dallas',
    estado: 'TX',
    telefono: '+12145550103',
    idiomas: ['es', 'en'],
    acepta_itin: true,
    verificado: true,
    featured: true,
  },
  {
    id: 'seed-banco-1',
    nombre: 'Community Credit Union — ITIN',
    categoria: 'banco',
    descripcion: 'Cuentas de cheques y ahorro con ITIN o SSN.',
    ciudad: 'San Antonio',
    estado: 'TX',
    telefono: '+12105550104',
    idiomas: ['es', 'en'],
    acepta_itin: true,
    verificado: true,
    featured: false,
  },
  {
    id: 'seed-taxes-1',
    nombre: 'TaxPro Hispano',
    categoria: 'taxes',
    descripcion: 'Declaración federal, ITIN y créditos EITC/CTC.',
    ciudad: 'Houston',
    estado: 'TX',
    telefono: '+17135550105',
    idiomas: ['es'],
    acepta_itin: true,
    verificado: true,
    featured: true,
  },
  {
    id: 'seed-clinica-1',
    nombre: 'Clínica Comunitaria Esperanza',
    categoria: 'clinica',
    descripcion: 'Tarifa escalonada y charity care. Intérprete gratis.',
    ciudad: 'Houston',
    estado: 'TX',
    telefono: '+17135550106',
    idiomas: ['es'],
    acepta_itin: true,
    verificado: true,
    featured: false,
  },
  {
    id: 'seed-seguros-1',
    nombre: 'Seguros Familia TX',
    categoria: 'seguros',
    descripcion: 'Seguro de auto y salud en español.',
    ciudad: 'El Paso',
    estado: 'TX',
    telefono: '+19155550107',
    idiomas: ['es', 'en'],
    acepta_itin: false,
    verificado: true,
    featured: false,
  },
  {
    id: 'seed-realtor-1',
    nombre: 'Casa Propia Realty',
    categoria: 'realtor',
    descripcion: 'Compra de casa FHA y convencional. Guía en español.',
    ciudad: 'Austin',
    estado: 'TX',
    telefono: '+15125550108',
    idiomas: ['es', 'en'],
    acepta_itin: true,
    verificado: true,
    featured: true,
  },
  {
    id: 'seed-tienda-1',
    nombre: 'Mercado La Plaza',
    categoria: 'tienda',
    descripcion: 'Remesas, recargas y productos de la comunidad.',
    ciudad: 'Houston',
    estado: 'TX',
    telefono: '+17135550109',
    idiomas: ['es'],
    acepta_itin: true,
    verificado: true,
    featured: false,
  },
]

export function listNegocios(categoria?: string | null, ciudad?: string | null) {
  return NEGOCIOS_SEED.filter((n) => {
    if (categoria && n.categoria !== categoria) return false
    if (ciudad && !n.ciudad.toLowerCase().includes(ciudad.toLowerCase())) return false
    return true
  })
}
