# Corte BlindadoUSA: Manus -> Vercel (sin downtime)

Este runbook reemplaza la web actual publicada desde Manus por la versión propia en `C:\Users\Alex\Desktop\blindadousa`.

## Estado técnico actual (local)

- Build local: `npm run build` -> OK
- Rutas SEO: `app/robots.ts` y `app/sitemap.ts` presentes
- Legal mínimo: `terminos`, `privacidad`, `descargo` actualizados

## Paso 1 - Deploy en Vercel (preview)

1. Entrar al proyecto local:
   ```bash
   cd "C:\Users\Alex\Desktop\blindadousa"
   ```
2. Verificar variables necesarias en `.env.local`/Vercel:
   - `NEXT_PUBLIC_APP_URL=https://blindadousa.com`
   - claves de Supabase/Stripe/Plaid/Twilio/Resend (solo si se usarán en producción inmediata)
3. Crear deploy preview:
   ```bash
   vercel
   ```
4. Validar preview:
   - `/`
   - `/robots.txt`
   - `/sitemap.xml`
   - `/precios`
   - `/terminos`, `/privacidad`, `/descargo`

## Paso 2 - Swap de dominio

1. En Vercel, añadir dominio:
   - `blindadousa.com`
   - `www.blindadousa.com`
2. En Cloudflare DNS:
   - Actualizar `A`/`CNAME` según instrucciones de Vercel
   - Mantener proxy naranja activo si Vercel lo permite para ese registro
3. Confirmar redirecciones:
   - `http://blindadousa.com` -> `https://blindadousa.com/`
   - `https://www.blindadousa.com` -> `https://blindadousa.com/`

## Paso 3 - Promover producción

Cuando preview esté verificado:
```bash
vercel --prod
```

## Paso 4 - Verificación post-corte

Comprobar:

1. `https://blindadousa.com` carga versión propia (no Manus).
2. `https://blindadousa.com/robots.txt` devuelve reglas válidas.
3. `https://blindadousa.com/sitemap.xml` devuelve XML válido.
4. No aparece copy o marcas de plataforma externa.
5. Home, precios y legal cargan en móvil (375px) sin rotura.

## Paso 5 - Retiro de versión Manus

Después de confirmar producción estable:

- Despublicar o desconectar dominio dentro de Manus para evitar conflicto.
- Mantener screenshot/backup de la versión previa por auditoría.

## Criterio de rollback

Si falla producción:

1. Revertir DNS a destino previo temporalmente.
2. Corregir en preview.
3. Reintentar corte.

