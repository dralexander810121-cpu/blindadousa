-- BlindadoUSA Schema v1.0

CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  nombre TEXT,
  estado TEXT DEFAULT 'TX',
  stripe_customer_id TEXT,
  trial_activo BOOLEAN DEFAULT FALSE,
  trial_inicio TIMESTAMPTZ,
  trial_fin TIMESTAMPTZ,
  trial_usado BOOLEAN DEFAULT FALSE,
  acceso_pagado BOOLEAN DEFAULT FALSE,
  fecha_pago TIMESTAMPTZ,
  precio_pagado DECIMAL(6,2),
  codigo_usado TEXT,
  mi_codigo TEXT UNIQUE,
  referidos_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS referidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT NOT NULL,
  referidor_id UUID REFERENCES usuarios(id),
  referido_id UUID REFERENCES usuarios(id),
  precio_pagado DECIMAL(6,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS perfil_financiero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id) UNIQUE,
  credit_score INTEGER,
  ingreso_mensual DECIMAL(10,2),
  gastos_mensuales DECIMAL(10,2),
  deuda_total DECIMAL(10,2),
  tiene_ssn BOOLEAN,
  tiene_itin BOOLEAN,
  tiene_cuenta_banco BOOLEAN,
  envia_remesas BOOLEAN,
  monto_remesas DECIMAL(10,2),
  pais_remesas TEXT,
  tiene_carro BOOLEAN,
  tiene_casa BOOLEAN,
  mayor_preocupacion TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cuentas_conectadas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  plaid_account_id TEXT UNIQUE NOT NULL,
  plaid_item_id TEXT NOT NULL,
  plaid_access_token TEXT NOT NULL,
  institucion TEXT,
  nombre_cuenta TEXT,
  tipo TEXT,
  mask TEXT,
  balance_actual DECIMAL(10,2) DEFAULT 0,
  credito_disponible DECIMAL(10,2) DEFAULT 0,
  limite_credito DECIMAL(10,2) DEFAULT 0,
  pago_minimo DECIMAL(10,2) DEFAULT 0,
  fecha_pago DATE,
  fecha_corte DATE,
  apr DECIMAL(5,2) DEFAULT 0,
  utilizacion DECIMAL(5,2) DEFAULT 0,
  last_sync TIMESTAMPTZ,
  activa BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recomendaciones_pago (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cuenta_id UUID REFERENCES cuentas_conectadas(id),
  monto_recomendado DECIMAL(10,2),
  fecha_optima DATE,
  utilizacion_proyectada DECIMAL(5,2),
  impacto_score_estimado INTEGER,
  razonamiento TEXT,
  estado TEXT DEFAULT 'pendiente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alertas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  tipo TEXT,
  titulo TEXT,
  mensaje TEXT,
  nivel TEXT DEFAULT 'amarillo',
  leida BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS disputas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  buro TEXT,
  cuenta TEXT,
  tipo_disputa TEXT,
  descripcion TEXT,
  ley_aplicable TEXT,
  severidad TEXT DEFAULT 'media',
  estado TEXT DEFAULT 'identificada',
  carta_id UUID,
  impacto_estimado INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cartas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  disputa_id UUID REFERENCES disputas(id),
  tipo TEXT,
  destinatario TEXT,
  direccion_destinatario TEXT,
  asunto TEXT,
  cuerpo TEXT,
  citas_legales TEXT[],
  estado TEXT DEFAULT 'borrador',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  enviada_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS prestamistas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  tipo TEXT, producto TEXT,
  score_minimo INTEGER,
  apr_min DECIMAL(5,2), apr_max DECIMAL(5,2),
  monto_min DECIMAL(10,2), monto_max DECIMAL(10,2),
  soft_pull BOOLEAN DEFAULT FALSE,
  url_aplicacion TEXT,
  match_score INTEGER DEFAULT 0,
  razonamiento TEXT,
  encontrado_at TIMESTAMPTZ DEFAULT NOW(),
  activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS escaneos_prestamos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  monto DECIMAL(10,2),
  tasa_ofrecida DECIMAL(5,2),
  plazo_meses INTEGER,
  pago_mensual DECIMAL(10,2),
  apr_real DECIMAL(5,2),
  total_a_pagar DECIMAL(10,2),
  veredicto TEXT,
  exceso_vs_justo DECIMAL(10,2),
  analisis_ia TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS estrategias_deuda (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  escenario TEXT,
  ingreso_mensual DECIMAL(10,2),
  gastos_mensuales DECIMAL(10,2),
  deuda_total DECIMAL(10,2),
  dti DECIMAL(5,2),
  resumen TEXT,
  pasos JSONB DEFAULT '[]',
  nivel_riesgo TEXT DEFAULT 'medio',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS simulaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  escenario TEXT,
  score_actual INTEGER,
  score_proyectado INTEGER,
  delta INTEGER,
  factores JSONB DEFAULT '[]',
  tiempo_impacto TEXT,
  confianza TEXT DEFAULT 'media',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calculos_guardados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  tipo TEXT, nombre TEXT, datos JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_historial (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  modulo TEXT DEFAULT 'asistente',
  rol TEXT, mensaje TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agente_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agente TEXT, accion TEXT, resultado TEXT,
  items INTEGER DEFAULT 0, error TEXT, duracion_ms INTEGER,
  ran_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS directorio_negocios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  categoria TEXT,
  descripcion TEXT,
  direccion TEXT, ciudad TEXT, estado TEXT DEFAULT 'TX',
  telefono TEXT, email TEXT, website TEXT,
  idiomas TEXT[],
  acepta_itin BOOLEAN DEFAULT FALSE,
  acepta_sin_ssn BOOLEAN DEFAULT FALSE,
  plan TEXT DEFAULT 'basico',
  stripe_subscription_id TEXT,
  verificado BOOLEAN DEFAULT FALSE,
  activo BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS afiliado_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  servicio TEXT,
  negocio_id UUID REFERENCES directorio_negocios(id),
  url_destino TEXT,
  converted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  descripcion TEXT, contenido TEXT, categoria TEXT,
  imagen_url TEXT,
  publicado BOOLEAN DEFAULT FALSE,
  publicado_at TIMESTAMPTZ,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE referidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfil_financiero ENABLE ROW LEVEL SECURITY;
ALTER TABLE cuentas_conectadas ENABLE ROW LEVEL SECURITY;
ALTER TABLE recomendaciones_pago ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputas ENABLE ROW LEVEL SECURITY;
ALTER TABLE cartas ENABLE ROW LEVEL SECURITY;
ALTER TABLE escaneos_prestamos ENABLE ROW LEVEL SECURITY;
ALTER TABLE estrategias_deuda ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculos_guardados ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_historial ENABLE ROW LEVEL SECURITY;
ALTER TABLE afiliado_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "propio" ON usuarios FOR ALL USING (auth.uid() = auth_user_id);
CREATE POLICY "propio" ON perfil_financiero FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON cuentas_conectadas FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON alertas FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON disputas FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON cartas FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON escaneos_prestamos FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON estrategias_deuda FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON simulaciones FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON calculos_guardados FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON chat_historial FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "propio" ON afiliado_clicks FOR ALL USING (auth.uid()=(SELECT auth_user_id FROM usuarios WHERE id=usuario_id));
CREATE POLICY "publico" ON directorio_negocios FOR SELECT USING (activo=TRUE AND verificado=TRUE);
CREATE POLICY "publico" ON blog_posts FOR SELECT USING (publicado=TRUE);
CREATE POLICY "publico" ON prestamistas FOR SELECT USING (activo=TRUE);
