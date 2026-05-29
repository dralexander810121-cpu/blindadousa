# Si blindadousa.com “no abre” en tu navegador

## Comprobado desde tu PC (2026-05-28)

- DNS → Cloudflare (`104.21.84.184`, `172.67.195.182`) ✓  
- `https://blindadousa.com` → **200** ✓  
- `https://blindadousa.com/robots.txt` → **200** ✓  
- `https://blindadousa.com/sitemap.xml` → **200** ✓  

Si el navegador falla pero PowerShell responde 200, casi siempre es **caché DNS/SSL del navegador** o estás usando **`http://`** (redirige 308; algunos clientes lo muestran como error).

## Abre exactamente estas URLs (copiar/pegar)

```
https://blindadousa.com/inicio
https://blindadousa.com/trial
https://blindadousa.com/precios
```

No uses `http://` ni solo `blindadousa.com` sin `https`.

## Arreglo rápido Windows

PowerShell **como administrador**:

```powershell
ipconfig /flushdns
```

Luego:

1. Cierra Chrome/Edge por completo.  
2. Abre ventana **InPrivate / Incógnito**.  
3. Pega `https://blindadousa.com/inicio`.

## Ver en local (desarrollo)

En la carpeta del proyecto:

```powershell
cd C:\Users\Alex\Desktop\blindadousa
npm run dev
```

Abre: **http://localhost:3000/inicio** (con el servidor encendido).

## Si sigue sin abrir

Envía captura o texto de:

```powershell
nslookup blindadousa.com
curl.exe -I https://blindadousa.com/inicio
```

Y dime **qué navegador** y si el error dice DNS, timeout, o certificado SSL.

## Sitemap con `<loc>` vacíos

Si `sitemap.xml` muestra etiquetas vacías, es un deploy viejo o el generador `sitemap.ts` de Next en ese host. El fix actual usa **`app/sitemap.xml/route.ts`** con XML escrito a mano. Tras deploy deberías ver URLs completas, por ejemplo:

```xml
<loc>https://blindadousa.com/inicio</loc>
```

## Deploy pendiente

Los cambios SEO (sitemap, robots, metadata blog) **solo están en tu carpeta local** hasta deploy en Vercel.
