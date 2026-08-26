import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { listChats } from '@/features/assistant/api/chatApi'
import type { ChatListParams } from '@/features/assistant/types/chat.types'
import { assistantKeys } from './query-keys'

export function useChats(params: ChatListParams = {}) {
  return useQuery({
    queryKey: assistantKeys.chats(params),
    queryFn: () => listChats(params),
    staleTime: 30 * 1000,
    placeholderData: keepPreviousData,
  })
}
