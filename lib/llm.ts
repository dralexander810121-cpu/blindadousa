import { askClaude, askClaudeWithContent, hasAnthropicKey, type ClaudeContentBlock } from '@/lib/anthropic'
import { askGemini, hasGeminiKey } from '@/lib/gemini-llm'

export function hasLlmKey() {
  return hasAnthropicKey() || hasGeminiKey()
}

export function llmMissingMessage() {
  return 'Configura ANTHROPIC_API_KEY o GEMINI_API_KEY en Vercel (Production) para usar esta función.'
}

export async function askLlm(system: string, user: string, maxTokens = 2000): Promise<string> {
  if (hasAnthropicKey()) return askClaude(system, user, maxTokens)
  if (hasGeminiKey()) return askGemini(system, user, maxTokens)
  throw new Error('NO_LLM_KEY')
}

export async function askLlmWithContent(
  system: string,
  content: ClaudeContentBlock,
  maxTokens = 2800,
): Promise<string> {
  if (hasAnthropicKey()) return askClaudeWithContent(system, content, maxTokens)
  const textPart = content.find((b) => b.type === 'text')
  const text = textPart && 'text' in textPart ? String(textPart.text) : ''
  if (!text.trim()) throw new Error('NO_LLM_KEY')
  return askGemini(system, text, maxTokens)
}
