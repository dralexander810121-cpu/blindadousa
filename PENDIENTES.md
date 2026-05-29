# PENDIENTES — blindadousa.com

## 1) Variables/credenciales faltantes o no verificables desde repo

- `ANTHROPIC_API_KEY` en producción (si falta, `/api/ai/asistente` devuelve `503` controlado).
- `STRIPE_WEBHOOK_SECRET` real en Vercel (debe coincidir con endpoint de Stripe Dashboard).
- Confirmación de credenciales live de Stripe en panel (no se almacenan en este documento).

## 2) Verificación E2E que requiere interacción real de usuario

- Flujo completo de recuperación de contraseña con click en email real (`/recuperar` → `/nueva-contrasena`).
- Flujo completo de pago real en Stripe + evento webhook en dashboard de Stripe.
- Validación manual UI en móvil real (<480px) para cada formulario crítico.

## 3) Cambios existentes previos no tocados por seguridad

- Archivo borrado ya presente en árbol al iniciar:
  - `stitch_instant_delivery_system/stitch_instant_delivery_system/blindadousa_prompt_definitivo.md`

No se revirtió para no alterar trabajo previo del usuario fuera del alcance funcional.

## 4) Próximos pasos exactos

1. Confirmar en Vercel que `ANTHROPIC_API_KEY` está definida en `Production`.
2. En Stripe, enviar evento de prueba `checkout.session.completed` al webhook de producción y validar respuesta `200`.
3. Ejecutar smoke final manual en dominio:
   - `/trial`
   - `/recuperar`
   - `/pagar`
   - `/blog`
   - `/directorio`
