import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createChat, deleteChat, renameChat } from '@/features/assistant/api/chatApi'
import type { ChatCreateRequest } from '@/features/assistant/types/chat.types'
import { getErrorMessage } from '@/lib/errors'
import { assistantKeys } from './query-keys'

export function useCreateChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ChatCreateRequest = {}) => createChat(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assistantKeys.all })
    },
    onError: (error) => {
      toast.error('Could not start a new chat', { description: getErrorMessage(error) })
    },
  })
}

export function useRenameChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: { chatId: string; title: string }) => renameChat(variables.chatId, variables.title),
    onSuccess: (chat) => {
      queryClient.invalidateQueries({ queryKey: assistantKeys.all })
      queryClient.setQueryData(assistantKeys.chat(chat.id), chat)
    },
    onError: (error) => {
      toast.error('Could not rename chat', { description: getErrorMessage(error) })
    },
  })
}

export function useDeleteChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (chatId: string) => deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assistantKeys.all })
      toast.success('Conversation deleted')
    },
    onError: (error) => {
      toast.error('Could not delete conversation', { description: getErrorMessage(error) })
    },
  })
}
