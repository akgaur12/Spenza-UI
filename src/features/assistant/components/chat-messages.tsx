import { ArrowDown } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { AssistantMessage } from '@/features/assistant/components/assistant-message'
import { useAssistant } from '@/features/assistant/hooks/use-assistant'
import { ChatError } from '@/features/assistant/components/chat-error'
import { ChatMessagesSkeleton } from '@/features/assistant/components/chat-loading-skeleton'
import { EmptyChat } from '@/features/assistant/components/empty-chat'
import { UserMessage } from '@/features/assistant/components/user-message'
import { useChatMessages, useChatMessagesMeta } from '@/features/assistant/hooks/use-chat-messages'
import type { OptimisticChatMessage } from '@/features/assistant/types/chat.types'

const NEAR_BOTTOM_THRESHOLD_PX = 80
const LOAD_OLDER_THRESHOLD_PX = 60

interface ChatMessagesProps {
  chatId: string
  onSelectPrompt: (prompt: string) => void
  compactEmptyState?: boolean
}

export function ChatMessages({ chatId, onSelectPrompt, compactEmptyState }: ChatMessagesProps) {
  const { streaming } = useAssistant()
  const metaQuery = useChatMessagesMeta(chatId)
  const totalPages = metaQuery.data?.total_pages ?? 0
  const messagesQuery = useChatMessages(chatId, totalPages)

  const containerRef = useRef<HTMLDivElement>(null)
  const prevScrollHeightRef = useRef(0)
  const [isNearBottom, setIsNearBottom] = useState(true)
  const [hasNewMessages, setHasNewMessages] = useState(false)

  const messages = (messagesQuery.data?.pages.flatMap((page) => page.items) ?? []) as OptimisticChatMessage[]
  const isLive = streaming.state.activeChatId === chatId
  const showLiveBubble = isLive && (streaming.state.isStreaming || messagesQuery.isFetching)
  const lastMessageId = messages[messages.length - 1]?.id

  function scrollToBottom() {
    const el = containerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
    setHasNewMessages(false)
  }

  function handleScroll() {
    const el = containerRef.current
    if (!el) return

    if (el.scrollTop < LOAD_OLDER_THRESHOLD_PX && messagesQuery.hasPreviousPage && !messagesQuery.isFetchingPreviousPage) {
      prevScrollHeightRef.current = el.scrollHeight
      messagesQuery.fetchPreviousPage()
    }

    setIsNearBottom(el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM_THRESHOLD_PX)
  }

  // Preserve scroll position when older messages are prepended above the current viewport.
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el || !prevScrollHeightRef.current) return
    el.scrollTop += el.scrollHeight - prevScrollHeightRef.current
    prevScrollHeightRef.current = 0
  }, [messagesQuery.data?.pages.length])

  // Follow new content to the bottom only if the reader is already near it — otherwise surface a "new messages" pill.
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (isNearBottom) el.scrollTop = el.scrollHeight
    else if (lastMessageId || streaming.state.streamingContent) setHasNewMessages(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessageId, streaming.state.streamingContent])

  if (metaQuery.isLoading) return <ChatMessagesSkeleton />

  if (totalPages === 0 && !showLiveBubble) {
    return <EmptyChat onSelectPrompt={onSelectPrompt} compact={compactEmptyState} />
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div ref={containerRef} onScroll={handleScroll} className="scrollbar-thin flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
          {messagesQuery.isFetchingPreviousPage && <p className="text-center text-xs text-muted-foreground">Loading older messages...</p>}

          {messages.map((message) => {
            // The backend can create this run's assistant row (and return it from a GET) before the generated
            // text is written back to it — a mount-time fetch for a brand-new chat, or the post-completion
            // refetch below, can both land in that gap. Identify "this run's" row by message id (set from the
            // `message_started` SSE event) rather than position, since a fresh chat's list can include it from
            // the very first fetch.
            const isActiveLiveMessage = isLive && message.role === 'assistant' && message.id === streaming.state.activeMessageId

            // While the live bubble below is showing (streaming, or its post-completion refetch is still in
            // flight), let it own the rendering entirely — otherwise this static, still-empty row would flash
            // "No response generated." next to (or instead of) the smoothly streaming content.
            if (isActiveLiveMessage && showLiveBubble) return null

            // Once the live bubble hands off, fall back to what we already streamed if the persisted content
            // hasn't caught up yet, instead of showing "No response generated." for an answer we already have.
            const content = isActiveLiveMessage && !message.content && streaming.state.streamingContent ? streaming.state.streamingContent : message.content

            return message.role === 'assistant' ? (
              <AssistantMessage key={message.id} content={content} />
            ) : message.role === 'user' ? (
              <UserMessage key={message.id} content={message.content} isPending={message.isPending} />
            ) : null
          })}

          {showLiveBubble && (
            <div className="space-y-2">
              <AssistantMessage
                content={streaming.state.streamingContent}
                toolLog={streaming.state.toolLog}
                isStreaming={streaming.state.isStreaming}
              />
              {streaming.state.wasCancelled && <p className="pl-8 text-xs text-muted-foreground">Generation stopped.</p>}
            </div>
          )}

          {isLive && !streaming.state.isStreaming && streaming.state.error && (
            <ChatError message={streaming.state.error} onRetry={streaming.retry} />
          )}
        </div>
      </div>

      {hasNewMessages && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-md"
        >
          <ArrowDown className="size-3" /> New messages
        </button>
      )}
    </div>
  )
}
