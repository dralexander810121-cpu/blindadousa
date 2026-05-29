import { createAdmin } from '@/lib/supabase/server'
import { listNegocios, NEGOCIOS_SEED, type NegocioDirectorio } from '@/lib/directorio/seed'

export async function fetchNegocioById(id: string): Promise<NegocioDirectorio | null> {
  const seed = NEGOCIOS_SEED.find((n) => n.id === id)
  if (seed) return seed

  try {
    const db = createAdmin()
    const { data, error } = await db
      .from('directorio_negocios')
      .select(
        'id, nombre, categoria, descripcion, ciudad, estado, telefono, email, website, idiomas, acepta_itin, verificado, featured',
      )
      .eq('id', id)
      .eq('activo', true)
      .eq('verificado', true)
      .maybeSingle()

    if (error || !data) return null

    return {
      id: String(data.id),
      nombre: String(data.nombre),
      categoria: String(data.categoria ?? 'otro'),
      descripcion: String(data.descripcion ?? ''),
      ciudad: String(data.ciudad ?? 'TX'),
      estado: String(data.estado ?? 'TX'),
      telefono: data.telefono ? String(data.telefono) : undefined,
      email: data.email ? String(data.email) : undefined,
      website: data.website ? String(data.website) : undefined,
      idiomas: (data.idiomas as string[]) ?? ['es'],
      acepta_itin: Boolean(data.acepta_itin),
      verificado: Boolean(data.verificado),
      featured: Boolean(data.featured),
    }
  } catch {
    return null
  }
}

export async function fetchDirectorioNegocios(
  categoria?: string | null,
  ciudad?: string | null,
): Promise<NegocioDirectorio[]> {
  try {
    const db = createAdmin()
    let q = db
      .from('directorio_negocios')
      .select(
        'id, nombre, categoria, descripcion, ciudad, estado, telefono, idiomas, acepta_itin, verificado, featured',
      )
      .eq('activo', true)
      .eq('verificado', true)

    if (categoria) q = q.eq('categoria', categoria)
    if (ciudad) q = q.ilike('ciudad', `%${ciudad}%`)

    const { data, error } = await q.order('featured', { ascending: false }).limit(50)
    if (error || !data?.length) return listNegocios(categoria, ciudad)

    return data.map((row: Record<string, unknown>) => ({
      id: String(row.id),
      nombre: String(row.nombre),
      categoria: String(row.categoria ?? 'otro'),
      descripcion: String(row.descripcion ?? ''),
      ciudad: String(row.ciudad ?? 'TX'),
      estado: String(row.estado ?? 'TX'),
      telefono: row.telefono ? String(row.telefono) : undefined,
      idiomas: (row.idiomas as string[]) ?? ['es'],
      acepta_itin: Boolean(row.acepta_itin),
      verificado: Boolean(row.verificado),
      featured: Boolean(row.featured),
    }))
  } catch {
    return listNegocios(categoria, ciudad)
  }
}
