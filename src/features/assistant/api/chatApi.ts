import { API_ENDPOINTS } from '@/config'
import type {
  Chat,
  ChatCreateRequest,
  ChatListParams,
  ChatListResponse,
  ChatMessageListResponse,
} from '@/features/assistant/types/chat.types'
import { apiClient } from '@/services/api-client'
import type { ApiSuccessResponse } from '@/types/api'

export async function createChat(payload: ChatCreateRequest = {}): Promise<Chat> {
  const { data } = await apiClient.post<ApiSuccessResponse<Chat>>(API_ENDPOINTS.chats.list, payload)
  return data.data
}

export async function listChats(params: ChatListParams = {}): Promise<ChatListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<ChatListResponse>>(API_ENDPOINTS.chats.list, { params })
  return data.data
}

export async function getChat(chatId: string): Promise<Chat> {
  const { data } = await apiClient.get<ApiSuccessResponse<Chat>>(API_ENDPOINTS.chats.detail(chatId))
  return data.data
}

export async function renameChat(chatId: string, title: string): Promise<Chat> {
  const { data } = await apiClient.patch<ApiSuccessResponse<Chat>>(API_ENDPOINTS.chats.detail(chatId), { title })
  return data.data
}

export async function deleteChat(chatId: string): Promise<void> {
  await apiClient.delete(API_ENDPOINTS.chats.detail(chatId))
}

export async function getMessages(
  chatId: string,
  params: { page?: number; page_size?: number } = {},
): Promise<ChatMessageListResponse> {
  const { data } = await apiClient.get<ApiSuccessResponse<ChatMessageListResponse>>(
    API_ENDPOINTS.chats.messages(chatId),
    { params },
  )
  return data.data
}

export async function cancelMessage(chatId: string, messageId: string): Promise<void> {
  await apiClient.post(API_ENDPOINTS.chats.cancelMessage(chatId, messageId))
}
