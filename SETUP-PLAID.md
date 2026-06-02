# Configurar Plaid en blindadousa.com (5 minutos)

El error **"Plaid no configurado"** en producción significa que faltan variables en **Vercel**, no solo en tu PC.

## 1. Obtener claves (sandbox gratis)

1. Entra a https://dashboard.plaid.com/team/keys  
2. Copia **client_id** y **sandbox secret** (para pruebas).  
3. Para usuarios reales más adelante: solicita **Production** en Plaid.

## 2. Variables en Vercel

Proyecto **blindadousa** → **Settings** → **Environment Variables** → Production (y Preview si quieres):

| Variable | Valor ejemplo |
|----------|----------------|
| `PLAID_CLIENT_ID` | tu client_id de Plaid |
| `PLAID_SECRET` | tu **sandbox** secret |
| `PLAID_ENV` | `sandbox` |
| `PLAID_TOKEN_ENCRYPTION_KEY` | ya debería existir (32 bytes hex) |

## 3. Redeploy

Después de guardar variables:

```powershell
cd C:\Users\Alex\Desktop\blindadousa
npx vercel deploy --prod --yes
```

## 4. Probar

1. https://blindadousa.com/dashboard/onboarding → completar paso 5 (ya no debe fallar el perfil).  
2. https://blindadousa.com/dashboard/credito/tarjetas → **Conectar con Plaid**.  
3. En sandbox usa el banco de prueba **First Platypus Bank** y credenciales que muestra Plaid.

## Local (opcional)

Copia las mismas tres variables en `.env.local` y reinicia `npm run dev`.
