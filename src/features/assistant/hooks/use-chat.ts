import { useQuery } from '@tanstack/react-query'
import { getChat } from '@/features/assistant/api/chatApi'
import { assistantKeys } from './query-keys'

export function useChat(chatId: string | null) {
  return useQuery({
    queryKey: assistantKeys.chat(chatId ?? ''),
    queryFn: () => getChat(chatId as string),
    enabled: Boolean(chatId),
    staleTime: 30 * 1000,
  })
}
