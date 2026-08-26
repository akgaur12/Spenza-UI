import { useState } from 'react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { AssistantHeader } from '@/features/assistant/components/assistant-header'
import { ChatComposer } from '@/features/assistant/components/chat-composer'
import { ChatMessages } from '@/features/assistant/components/chat-messages'
import { ChatSidebar } from '@/features/assistant/components/chat-sidebar'
import { EmptyChat } from '@/features/assistant/components/empty-chat'
import { FinancialDisclaimer } from '@/features/assistant/components/financial-disclaimer'
import { useAssistant } from '@/features/assistant/hooks/use-assistant'
import { useChat } from '@/features/assistant/hooks/use-chat'
import { useSendToAssistant } from '@/features/assistant/hooks/use-send-to-assistant'

export function AIChatPanel() {
  const { isPanelOpen, closePanel, activeChatId, setActiveChatId, streaming } = useAssistant()
  const sendMessage = useSendToAssistant()
  const { data: activeChat } = useChat(activeChatId)
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  if (!isPanelOpen) return null

  const isStreamingHere = streaming.state.isStreaming && streaming.state.activeChatId === activeChatId

  function handleSelectChat(chatId: string) {
    setActiveChatId(chatId)
    setDrawerOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Spenza AI assistant"
      className="animate-in fade-in-0 fixed inset-0 z-50 flex flex-col bg-background md:inset-y-0 md:right-0 md:left-auto md:w-[420px] md:max-w-[90vw] md:slide-in-from-right md:rounded-l-2xl md:border-l md:border-border md:shadow-2xl"
    >
      <AssistantHeader
        title={activeChat?.title ?? 'Spenza AI'}
        subtitle={activeChatId ? undefined : 'Your expense assistant'}
        onOpenSidebar={() => setDrawerOpen(true)}
        onClose={closePanel}
        showFullAssistantLink
      />
      <div className="flex min-h-0 flex-1 flex-col">
        {activeChatId ? (
          <ChatMessages chatId={activeChatId} onSelectPrompt={sendMessage} compactEmptyState />
        ) : (
          <EmptyChat onSelectPrompt={sendMessage} compact />
        )}
      </div>
      <div className="flex flex-col gap-2 border-t border-border p-3">
        <ChatComposer onSend={sendMessage} onStop={() => void streaming.cancel()} isStreaming={isStreamingHere} autoFocus />
        <FinancialDisclaimer />
      </div>

      <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Conversations</SheetTitle>
          <ChatSidebar activeChatId={activeChatId} onSelectChat={handleSelectChat} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
