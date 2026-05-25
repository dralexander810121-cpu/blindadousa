import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://blindadousa.com'
  return [
    { url: base, priority: 1.0, changeFrequency: 'daily', lastModified: new Date() },
    { url: `${base}/inicio`, priority: 1.0, changeFrequency: 'daily', lastModified: new Date() },
    { url: `${base}/como-funciona`, priority: 0.8, changeFrequency: 'weekly', lastModified: new Date() },
    { url: `${base}/precios`, priority: 0.9, changeFrequency: 'weekly', lastModified: new Date() },
    { url: `${base}/trial`, priority: 0.9, changeFrequency: 'weekly', lastModified: new Date() },
    { url: `${base}/entrar`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/registrarse`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
  ]
}
