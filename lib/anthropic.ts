import Anthropic from '@anthropic-ai/sdk'

export type ClaudeContentBlock = Anthropic.Messages.ContentBlockParam[]

export function hasAnthropicKey() {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim())
}

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey?.trim()) {
    throw new Error('ANTHROPIC_API_KEY_MISSING')
  }
  return new Anthropic({ apiKey })
}

function textFromMessage(msg: Anthropic.Message) {
  const first = msg.content[0]
  return first?.type === 'text' ? first.text : ''
}

export async function askClaude(system: string, user: string, maxTokens = 2000): Promise<string> {
  const anthropic = getClient()
  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: user }],
  })
  return textFromMessage(msg)
}

export async function askClaudeWithContent(
  system: string,
  content: ClaudeContentBlock,
  maxTokens = 2800,
): Promise<string> {
  const anthropic = getClient()
  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content }],
  })
  return textFromMessage(msg)
}
