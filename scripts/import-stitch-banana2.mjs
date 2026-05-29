#!/usr/bin/env node
/**
 * Importa fondos temáticos desde exports Stitch (screen.png) → banana2pro.
 * Usar mientras la API Banana 2 propaga billing o como respaldo.
 */
import { copyFile, access, mkdir } from 'node:fs/promises'
import { constants } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const STITCH = join(ROOT, 'stitch_instant_delivery_system')
const OUT = join(ROOT, 'public/images/banana2pro')

/** slug → carpeta Stitch (sin ruta, solo nombre de directorio) */
const MAP = {
  hero: 'blindadousa_landing_page',
  'ia-dios': 'blindadousa_asistente_ia_blindado_1',
  problema: 'blindadousa_esc_ner_de_pr_stamos_predatorios_1',
  herramientas: 'blindadousa_dashboard_principal',
  precio: 'blindadousa_registro_y_trial_gratis',
  directorio: 'blindadousa_directorio_de_expertos_verificados',
  testimonios: 'blindadousa_sistema_de_referidos_optimizado',
  'cta-final': 'blindadousa_landing_page_visual_clarity_update',
  auth: 'blindadousa_iniciar_sesi_n',
  pago: 'blindadousa_registro_y_trial_gratis',
  exito: 'email_bienvenida_post_pago_miembro_1',
  credito: 'blindadousa_panel_de_cr_dito_optimizado',
  casa: 'blindadousa_m_dulo_comprar_casa_2',
  carro: 'blindadousa_calculadora_automotriz_optimizada',
  remesas: 'blindadousa_m_dulo_remesas_2026_optimizado',
  prestamos: 'blindadousa_esc_ner_de_pr_stamos_predatorios_sem_foro',
  jubilacion: 'blindadousa_m_dulo_jubilaci_n_y_retiro_3',
  banco: 'blindadousa_m_dulo_mi_primera_cuenta_bancaria_1',
  trabajo: 'blindadousa_m_dulo_derechos_laborales_estrategia_y_protecci_n',
  taxes: 'blindadousa_m_dulo_taxes_e_itin_1',
  emergencia: 'blindadousa_p_gina_de_mantenimiento',
  derechos: 'blindadotx_derechos_laborales_y_protecci_n',
  subsidios: 'blindadousa_m_dulo_ayudas_y_subsidios_adaptado_por_estado_1',
  asistente: 'blindadousa_asistente_ia_con_adjuntos',
  seguros: 'blindadousa_m_dulo_salud_y_seguros',
  referidos: 'blindadousa_sistema_de_referidos_2',
  blog: 'blindadousa_blog_y_recursos_educativos',
  'como-funciona': 'blindadousa_onboarding_personalizado',
  legal: 'blindadousa_configuraci_n_y_ajustes',
  trial: 'blindadousa_registro_y_trial_gratis',
  negocios: 'blindadousa_panel_de_control_b2b_principal',
  documentos: 'blindadousa_mis_cartas_legales_claridad_y_gu_a_paso_a_paso',
  'dir-abogados': 'blindadousa_directorio_de_abogados_verificados',
  'dir-notarios': 'blindadousa_directorio_de_notarios_verificados',
  'dir-dealers': 'blindadousa_directorio_de_dealers_de_carros',
  'dir-bancos': 'blindadousa_directorio_de_bancos_e_itin_2',
  'dir-taxes': 'blindadousa_formulario_w_7_generado',
  'dir-clinicas': 'blindadousa_directorio_de_cl_nicas_comunitarias_1',
  'dir-seguros': 'blindadousa_directorio_de_seguros_m_dicos_1',
  'dir-realtors': 'blindadousa_directorio_de_realtors_verificados',
}

async function exists(p) {
  try {
    await access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function main() {
  await mkdir(OUT, { recursive: true })
  let ok = 0
  let miss = 0

  for (const [slug, folder] of Object.entries(MAP)) {
    const src = join(STITCH, folder, 'screen.png')
    const dest = join(OUT, `${slug}-4k.png`)
    if (!(await exists(src))) {
      console.warn(`⚠  Sin screen.png: ${folder}`)
      miss++
      continue
    }
    await copyFile(src, dest)
    console.log(`✓  ${slug}-4k.png ← ${folder}`)
    ok++
  }

  console.log(`\nImportados: ${ok} · faltantes: ${miss}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
