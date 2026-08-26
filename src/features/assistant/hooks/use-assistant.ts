import { createContext, use } from 'react'
import type { UseChatStreamingResult } from '@/features/assistant/hooks/use-chat-streaming'

export interface AssistantContextValue {
  activeChatId: string | null
  setActiveChatId: (chatId: string | null) => void
  isPanelOpen: boolean
  openPanel: () => void
  closePanel: () => void
  streaming: UseChatStreamingResult
}

export const AssistantContext = createContext<AssistantContextValue | null>(null)

export function useAssistant(): AssistantContextValue {
  const context = use(AssistantContext)
  if (!context) throw new Error('useAssistant must be used within an AssistantProvider')
  return context
}
