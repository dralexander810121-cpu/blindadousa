import Anthropic from '@anthropic-ai/sdk'
export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
export async function askClaude(system: string, user: string, maxTokens = 2000): Promise<string> {
  const msg = await anthropic.messages.create({ model: 'claude-sonnet-4-20250514', max_tokens: maxTokens, system, messages: [{ role: 'user', content: user }] })
  const b = msg.content[0]; return b.type === 'text' ? b.text : ''
}
