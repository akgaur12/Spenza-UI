import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChatList } from '@/features/assistant/components/chat-list'
import { useCreateChat } from '@/features/assistant/hooks/use-chat-mutations'

interface ChatSidebarProps {
  activeChatId: string | null
  onSelectChat: (chatId: string) => void
}

/** Column 2 of the full assistant layout — chat history only. Column 1 (AssistantNavRail) holds the Spenza app nav. */
export function ChatSidebar({ activeChatId, onSelectChat }: ChatSidebarProps) {
  const [search, setSearch] = useState('')
  const createChat = useCreateChat()

  function handleNewChat() {
    if (createChat.isPending) return
    createChat.mutate({}, { onSuccess: (chat) => onSelectChat(chat.id) })
  }

  return (
    <div className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-4">
        {/* PageHeader hides itself below `md` — this fallback keeps the header non-blank on phone-width drawers (floating panel, /assistant's mobile Sheet). */}
        <p className="text-sm font-semibold md:hidden">Chats</p>
        <PageHeader />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleNewChat}
          disabled={createChat.isPending}
          className="justify-start gap-2 border-sidebar-border bg-transparent hover:bg-accent"
        >
          <Plus className="size-4" /> New Chat
        </Button>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search conversations..."
            aria-label="Search conversations"
            className="border-sidebar-border bg-transparent pl-8"
          />
        </div>
      </div>
      <div className="mx-3 border-t border-sidebar-border" />
      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto">
        <ChatList search={search} activeChatId={activeChatId} onSelect={onSelectChat} />
      </div>
    </div>
  )
}
