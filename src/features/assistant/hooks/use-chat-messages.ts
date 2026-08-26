import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getMessages } from '@/features/assistant/api/chatApi'
import { assistantKeys } from './query-keys'

export const CHAT_MESSAGES_PAGE_SIZE = 50

/** Cheap lookup for how many pages a chat currently has, so the infinite query below can seed itself at the LAST page (newest messages) instead of the first. */
export function useChatMessagesMeta(chatId: string | null) {
  return useQuery({
    queryKey: assistantKeys.messagesMeta(chatId ?? ''),
    queryFn: () => getMessages(chatId as string, { page: 1, page_size: CHAT_MESSAGES_PAGE_SIZE }),
    enabled: Boolean(chatId),
    staleTime: 0,
  })
}

/**
 * Loads a chat's messages newest-page-first (spec: land on the latest messages, then
 * "load older" as the user scrolls up). `initialPageParam` is only known once
 * `useChatMessagesMeta` resolves `total_pages`, so callers must gate mounting this
 * hook's consumer until that meta query has data (see ChatMessages).
 */
export function useChatMessages(chatId: string | null, totalPages: number) {
  return useInfiniteQuery({
    queryKey: assistantKeys.messages(chatId ?? ''),
    queryFn: ({ pageParam }) => getMessages(chatId as string, { page: pageParam, page_size: CHAT_MESSAGES_PAGE_SIZE }),
    initialPageParam: totalPages,
    getPreviousPageParam: (firstPage) => (firstPage.page > 1 ? firstPage.page - 1 : undefined),
    getNextPageParam: () => undefined,
    enabled: Boolean(chatId) && totalPages > 0,
    staleTime: 0,
  })
}
