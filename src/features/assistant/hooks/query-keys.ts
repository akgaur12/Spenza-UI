import type { ChatListParams } from '@/features/assistant/types/chat.types'

export const assistantKeys = {
  all: ['assistant'] as const,
  chats: (params: ChatListParams = {}) => [...assistantKeys.all, 'chats', params] as const,
  chat: (chatId: string) => [...assistantKeys.all, 'chat', chatId] as const,
  messages: (chatId: string) => [...assistantKeys.all, 'messages', chatId] as const,
  messagesMeta: (chatId: string) => [...assistantKeys.all, 'messages-meta', chatId] as const,
}
