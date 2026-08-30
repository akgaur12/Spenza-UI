import type { InfiniteData } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useRef, useState } from 'react'
import { cancelMessage, getChat } from '@/features/assistant/api/chatApi'
import type { Chat, ChatMessageListResponse, ChatStreamState, OptimisticChatMessage } from '@/features/assistant/types/chat.types'
import { describeAssistantErrorCode } from '@/features/assistant/utils/error-messages'
import { SSEBuffer } from '@/features/assistant/utils/sse-parser'
import { API_ENDPOINTS, env } from '@/config'
import { getErrorMessage } from '@/lib/errors'
import { assistantKeys } from './query-keys'

const GENERIC_STREAM_ERROR = 'Something went wrong while generating the response.'

/**
 * The backend generates a chat's title asynchronously (a background LLM call) after the
 * first run completes, so the immediate post-run refetch below often still sees the old
 * placeholder title. Poll a few times over ~10s and resync every cached view once the
 * title actually changes, instead of leaving it stale until the user reloads the page.
 */
const TITLE_POLL_DELAYS_MS = [1500, 2500, 4000, 4000]

function initialState(): ChatStreamState {
  return {
    isStreaming: false,
    activeChatId: null,
    activeRunId: null,
    activeMessageId: null,
    streamingContent: '',
    toolLog: [],
    error: null,
    wasCancelled: false,
    lastMessageText: null,
  }
}

async function readErrorResponse(response: Response): Promise<string> {
  try {
    const body = (await response.clone().json()) as { message?: string; error_code?: string }
    return describeAssistantErrorCode(body.error_code) ?? body.message ?? GENERIC_STREAM_ERROR
  } catch {
    return GENERIC_STREAM_ERROR
  }
}

/**
 * Owns transient SSE streaming state — deliberately kept out of TanStack Query
 * (spec: token-by-token updates shouldn't ripple through the query cache). The
 * cache is only touched at the boundaries: an optimistic user-message insert on
 * send, and a refetch-from-truth invalidation once the run reaches a terminal
 * event (completed/failed/cancelled).
 */
export function useChatStreaming() {
  const queryClient = useQueryClient()
  const [state, setState] = useState<ChatStreamState>(initialState)
  const abortRef = useRef<AbortController | null>(null)

  const insertOptimisticUserMessage = useCallback(
    (chatId: string, content: string) => {
      const optimisticMessage: OptimisticChatMessage = {
        id: `optimistic-${crypto.randomUUID()}`,
        role: 'user',
        content,
        sequence: Number.MAX_SAFE_INTEGER,
        created_at: new Date().toISOString(),
        isPending: true,
      }

      queryClient.setQueryData<InfiniteData<ChatMessageListResponse>>(assistantKeys.messages(chatId), (data) => {
        if (!data) return data
        const pages = [...data.pages]
        const lastIndex = pages.length - 1
        if (lastIndex < 0) return data
        pages[lastIndex] = {
          ...pages[lastIndex],
          items: [...pages[lastIndex].items, optimisticMessage],
          total: pages[lastIndex].total + 1,
        }
        return { ...data, pages }
      })

      return optimisticMessage.id
    },
    [queryClient],
  )

  /** Rolls back the optimistic insert when the backend rejected the send before persisting anything (e.g. access disabled, a limit was hit). */
  const removeOptimisticMessage = useCallback(
    (chatId: string, messageId: string) => {
      queryClient.setQueryData<InfiniteData<ChatMessageListResponse>>(assistantKeys.messages(chatId), (data) => {
        if (!data) return data
        return {
          ...data,
          pages: data.pages.map((page) => ({ ...page, items: page.items.filter((item) => item.id !== messageId) })),
        }
      })
    },
    [queryClient],
  )

  /** Retries a few times over ~12s until the title differs from what it was before this run, then resyncs every cached view. */
  const pollForTitleUpdate = useCallback(
    async (chatId: string, titleBeforeSend: string | undefined) => {
      for (const delay of TITLE_POLL_DELAYS_MS) {
        await new Promise((resolve) => setTimeout(resolve, delay))
        try {
          const chat = await getChat(chatId)
          if (chat.title !== titleBeforeSend) {
            // Scoped to title-bearing queries only — never messages/messagesMeta, which
            // would race a message the user might already be sending in this chat by now.
            queryClient.invalidateQueries({ queryKey: assistantKeys.chats() })
            queryClient.invalidateQueries({ queryKey: assistantKeys.chat(chatId) })
            return
          }
        } catch {
          return
        }
      }
    },
    [queryClient],
  )

  const settle = useCallback(
    (chatId: string, titleBeforeSend?: string) => {
      queryClient.invalidateQueries({ queryKey: assistantKeys.messages(chatId) })
      queryClient.invalidateQueries({ queryKey: assistantKeys.messagesMeta(chatId) })
      queryClient.invalidateQueries({ queryKey: assistantKeys.chats() })
      queryClient.invalidateQueries({ queryKey: assistantKeys.chat(chatId) })
      if (titleBeforeSend !== undefined) void pollForTitleUpdate(chatId, titleBeforeSend)
    },
    [queryClient, pollForTitleUpdate],
  )

  const sendMessage = useCallback(
    async (chatId: string, message: string) => {
      const trimmed = message.trim()
      if (!trimmed) return

      const controller = new AbortController()
      abortRef.current = controller

      const titleBeforeSend = queryClient.getQueryData<Chat>(assistantKeys.chat(chatId))?.title

      setState({ ...initialState(), isStreaming: true, activeChatId: chatId, lastMessageText: trimmed })
      const optimisticMessageId = insertOptimisticUserMessage(chatId, trimmed)

      try {
        const response = await fetch(`${env.apiUrl}${API_ENDPOINTS.chats.messages(chatId)}`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed }),
          signal: controller.signal,
        })

        if (!response.ok || !response.body) {
          const description = await readErrorResponse(response)
          removeOptimisticMessage(chatId, optimisticMessageId)
          setState((current) => ({ ...current, isStreaming: false, error: description }))
          return
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        const sseBuffer = new SSEBuffer()
        let reachedTerminalEvent = false

        for (;;) {
          const { value, done } = await reader.read()
          if (done) break

          for (const event of sseBuffer.push(decoder.decode(value, { stream: true }))) {
            switch (event.event) {
              case 'run_started':
                setState((current) => ({ ...current, activeRunId: event.data.run_id }))
                break
              case 'message_started':
                setState((current) => ({ ...current, activeMessageId: event.data.message_id, streamingContent: '' }))
                break
              case 'tool_started':
                setState((current) => ({
                  ...current,
                  toolLog: [...current.toolLog, { tool: event.data.tool, status: 'running' }],
                }))
                break
              case 'tool_result':
                setState((current) => ({
                  ...current,
                  toolLog: current.toolLog.map((entry) =>
                    entry.tool === event.data.tool && entry.status === 'running'
                      ? { ...entry, status: event.data.status }
                      : entry,
                  ),
                }))
                break
              case 'message_delta':
                setState((current) => ({ ...current, streamingContent: current.streamingContent + event.data.content }))
                break
              case 'message_completed':
                setState((current) => ({ ...current, streamingContent: event.data.content }))
                break
              case 'run_completed':
                reachedTerminalEvent = true
                setState((current) => ({ ...current, isStreaming: false }))
                settle(chatId, titleBeforeSend)
                break
              case 'run_failed':
                reachedTerminalEvent = true
                setState((current) => ({ ...current, isStreaming: false, error: event.data.error || GENERIC_STREAM_ERROR }))
                settle(chatId)
                break
              case 'run_cancelled':
                reachedTerminalEvent = true
                setState((current) => ({ ...current, isStreaming: false, wasCancelled: true }))
                settle(chatId)
                break
            }
          }
        }

        if (!reachedTerminalEvent) {
          setState((current) => ({
            ...current,
            isStreaming: false,
            error: current.error ?? 'Connection lost while generating the response.',
          }))
        }
      } catch (error) {
        if (controller.signal.aborted) return
        setState((current) => ({ ...current, isStreaming: false, error: getErrorMessage(error, GENERIC_STREAM_ERROR) }))
      }
    },
    [insertOptimisticUserMessage, removeOptimisticMessage, settle, queryClient],
  )

  const cancel = useCallback(async () => {
    const { activeChatId, activeMessageId } = state
    if (!activeChatId || !activeMessageId) return
    try {
      await cancelMessage(activeChatId, activeMessageId)
    } catch (error) {
      setState((current) => ({ ...current, error: getErrorMessage(error, GENERIC_STREAM_ERROR) }))
    }
  }, [state])

  const retry = useCallback(() => {
    if (!state.activeChatId || !state.lastMessageText) return
    void sendMessage(state.activeChatId, state.lastMessageText)
  }, [sendMessage, state.activeChatId, state.lastMessageText])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setState(initialState())
  }, [])

  return { state, sendMessage, cancel, retry, reset }
}

export type UseChatStreamingResult = ReturnType<typeof useChatStreaming>
