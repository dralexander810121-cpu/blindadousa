/** Texto vía Gemini cuando no hay ANTHROPIC_API_KEY (mismo uso que askClaude). */

export function hasGeminiKey() {
  return Boolean(process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim())
}

function apiKey() {
  return process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim() || ''
}

const MODEL = 'gemini-2.0-flash'

export async function askGemini(system: string, user: string, maxTokens = 2200): Promise<string> {
  const key = apiKey()
  if (!key) throw new Error('GEMINI_API_KEY_MISSING')

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: user }] }],
      generationConfig: { maxOutputTokens: maxTokens, temperature: 0.4 },
    }),
  })

  const json = await res.json()
  if (!res.ok) {
    const msg = json.error?.message || res.statusText
    throw new Error(msg)
  }

  const text = json.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join('') || ''
  if (!text.trim()) throw new Error('Gemini devolvió respuesta vacía')
  return text
}

