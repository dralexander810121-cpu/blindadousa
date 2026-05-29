import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/entrar',
          '/registrarse',
          '/pagar',
          '/bienvenido',
          '/recuperar',
          '/nueva-contrasena',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/entrar',
          '/registrarse',
          '/pagar',
          '/bienvenido',
          '/recuperar',
          '/nueva-contrasena',
        ],
      },
    ],
    sitemap: 'https://blindadousa.com/sitemap.xml',
    host: 'https://blindadousa.com',
  }
}
