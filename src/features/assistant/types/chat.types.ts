export type LLMProvider = 'ollama' | 'aws_bedrock' | 'groq' | 'nvidia' | 'openai' | 'huggingface' | 'open_router'

export type ChatMessageRole = 'user' | 'assistant' | 'system' | 'tool'

export interface Chat {
  id: string
  title: string
  provider: LLMProvider
  model: string
  created_at: string
  updated_at: string
}

export interface ChatListItem extends Chat {
  message_count: number
}

export interface ChatListResponse {
  items: ChatListItem[]
  total: number
}

export interface ChatListParams {
  search?: string
  page?: number
  page_size?: number
}

export interface ChatCreateRequest {
  title?: string
  provider?: LLMProvider
  model?: string
}

export interface ChatMessage {
  id: string
  role: ChatMessageRole
  content: string
  sequence: number
  created_at: string
}

export interface ChatMessageListResponse {
  items: ChatMessage[]
  page: number
  page_size: number
  total: number
  total_pages: number
}

/** Client-only marker for the user message rendered immediately on send, before the backend confirms it. */
export interface OptimisticChatMessage extends ChatMessage {
  isPending?: boolean
}

export type ToolActivityStatus = 'running' | 'ok' | 'error'

export interface ToolActivity {
  tool: string
  status: ToolActivityStatus
}

export type SSEEvent =
  | { event: 'run_started'; data: { run_id: string; chat_id: string } }
  | { event: 'message_started'; data: { message_id: string } }
  | { event: 'tool_started'; data: { tool: string } }
  | { event: 'tool_result'; data: { tool: string; status: 'ok' | 'error' } }
  | { event: 'message_delta'; data: { content: string } }
  | { event: 'message_completed'; data: { message_id: string; content: string } }
  | { event: 'run_completed'; data: { run_id: string; status: 'completed' } }
  | { event: 'run_failed'; data: { run_id: string; status: 'failed'; error: string } }
  | { event: 'run_cancelled'; data: { run_id: string; status: 'cancelled' } }

export interface ChatStreamState {
  isStreaming: boolean
  activeChatId: string | null
  activeRunId: string | null
  activeMessageId: string | null
  streamingContent: string
  toolLog: ToolActivity[]
  error: string | null
  wasCancelled: boolean
  /** Kept so a failed run's "Try Again" can resend without the user retyping. */
  lastMessageText: string | null
}

export class ChatStreamError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ChatStreamError'
  }
}
