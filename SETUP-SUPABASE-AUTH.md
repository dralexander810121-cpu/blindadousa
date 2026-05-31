# Supabase Auth — blindadousa.com

Configura esto en [Supabase Dashboard](https://supabase.com/dashboard) → tu proyecto → **Authentication** → **URL Configuration**.

## Site URL

```
https://blindadousa.com
```

## Redirect URLs (añade todas)

```
https://blindadousa.com/**
https://blindadousa.com/bienvenido
https://blindadousa.com/nueva-contrasena
https://blindadousa.com/dashboard
https://blindadousa.com/auth/callback
http://localhost:3000/**
http://localhost:3000/bienvenido
http://localhost:3000/nueva-contrasena
http://localhost:3000/dashboard
```

## Email templates (opcional)

- **Confirm signup** / **Magic link** — en español si quieres mejor conversión.
- **Reset password** — debe enlazar a `https://blindadousa.com/nueva-contrasena`.

## Prueba rápida

1. Abre `https://blindadousa.com/trial` con un email real.
2. Confirma el correo (revisa spam).
3. Entra al dashboard.
4. Prueba **Recuperar contraseña** en `/recuperar`.

Si el enlace del correo va a `localhost` o falla, revisa Site URL y Redirect URLs arriba.

## Variables en Vercel

Deben existir (Production):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (solo servidor / webhooks)

Ver también `BLOCKERS.md`.
