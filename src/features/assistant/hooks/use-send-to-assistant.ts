import { useCallback } from 'react'
import { useAssistant } from '@/features/assistant/hooks/use-assistant'
import { useCreateChat } from '@/features/assistant/hooks/use-chat-mutations'

/** Sends a message to the active chat, transparently creating a new chat first if none is selected yet. */
export function useSendToAssistant() {
  const { activeChatId, setActiveChatId, streaming } = useAssistant()
  const createChat = useCreateChat()

  return useCallback(
    async (text: string) => {
      let chatId = activeChatId
      if (!chatId) {
        const chat = await createChat.mutateAsync({})
        chatId = chat.id
        setActiveChatId(chatId)
      }
      void streaming.sendMessage(chatId, text)
    },
    [activeChatId, createChat, setActiveChatId, streaming],
  )
}
