export const PROVIDER_LABELS: Record<string, string> = {
  ollama: 'Ollama',
  aws_bedrock: 'AWS Bedrock',
  groq: 'Groq',
  nvidia: 'NVIDIA',
  openai: 'OpenAI',
  huggingface: 'Hugging Face',
  open_router: 'OpenRouter',
}

export function formatLatency(value: number | null): string {
  if (value === null) return '—'
  return value < 1000 ? `${Math.round(value)}ms` : `${(value / 1000).toFixed(1)}s`
}
