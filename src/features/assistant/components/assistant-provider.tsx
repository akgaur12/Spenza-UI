import { useLocation } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AIChatPanel } from '@/features/assistant/components/ai-chat-panel'
import { FloatingAIButton } from '@/features/assistant/components/floating-ai-button'
import { AssistantContext } from '@/features/assistant/hooks/use-assistant'
import { useChatMessagesMeta } from '@/features/assistant/hooks/use-chat-messages'
import { useChatStreaming } from '@/features/assistant/hooks/use-chat-streaming'
import { cn } from '@/lib/utils'

const LAST_CHAT_ID_STORAGE_KEY = 'spenza:assistant:lastChatId'

function readStoredChatId(): string | null {
  try {
    return localStorage.getItem(LAST_CHAT_ID_STORAGE_KEY)
  } catch {
    return null
  }
}

/** Mounted once at the app-shell level (mirrors AddExpenseProvider) so the floating button/panel render on every authenticated page and the active chat + live stream survive navigating to /assistant. */
export function AssistantProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [activeChatId, setActiveChatIdState] = useState<string | null>(readStoredChatId)
  const [isPanelOpen, setPanelOpen] = useState(false)
  const streaming = useChatStreaming()

  const setActiveChatId = useCallback((chatId: string | null) => {
    setActiveChatIdState(chatId)
    try {
      if (chatId) localStorage.setItem(LAST_CHAT_ID_STORAGE_KEY, chatId)
      else localStorage.removeItem(LAST_CHAT_ID_STORAGE_KEY)
    } catch {
      // Best-effort persistence only — losing the last-chat memory across a refresh isn't fatal.
    }
  }, [])

  const openPanel = useCallback(() => setPanelOpen(true), [])
  const closePanel = useCallback(() => setPanelOpen(false), [])

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') setPanelOpen(false)
    }
    if (isPanelOpen) document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [isPanelOpen])

  // The full /assistant page is its own complete chat experience — close the quick-chat
  // panel whenever navigation lands there, however that navigation happened (menu, sidebar
  // rail, "Open full assistant" link, direct URL), so the two never sit open at once.
  useEffect(() => {
    if (pathname.startsWith('/assistant')) setPanelOpen(false)
  }, [pathname])

  // A chat restored from localStorage might be one the user abandoned before ever sending a
  // message (e.g. clicked "+ New Chat" then closed the panel). Showing that stale empty chat
  // on the next visit looks like a leftover "old new chat" rather than a fresh start, so check
  // it once on mount and fall back to no chat selected if it's still empty. Runs only for the
  // restored id — chats created during normal use afterward are expected to start empty.
  const restoreCheckedRef = useRef(false)
  const activeChatMeta = useChatMessagesMeta(activeChatId)
  useEffect(() => {
    if (restoreCheckedRef.current || !activeChatId) return
    if (activeChatMeta.isSuccess) {
      restoreCheckedRef.current = true
      if (activeChatMeta.data.total_pages === 0) setActiveChatId(null)
    } else if (activeChatMeta.isError) {
      restoreCheckedRef.current = true
      setActiveChatId(null)
    }
  }, [activeChatId, activeChatMeta.isSuccess, activeChatMeta.isError, activeChatMeta.data, setActiveChatId])

  return (
    <AssistantContext value={{ activeChatId, setActiveChatId, isPanelOpen, openPanel, closePanel, streaming }}>
      {/* Pushes the page content out of the way of the desktop quick-chat panel instead of letting it sit underneath. Mobile's panel is a full-screen overlay, so no push there. */}
      <div className={cn('transition-[margin-right] duration-300 ease-in-out', isPanelOpen && 'md:mr-[420px]')}>
        {children}
      </div>
      <FloatingAIButton />
      <AIChatPanel />
    </AssistantContext>
  )
}
