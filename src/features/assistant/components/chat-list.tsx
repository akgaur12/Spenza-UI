import { useState } from 'react'
import { ChatListItem } from '@/features/assistant/components/chat-list-item'
import { ChatListSkeleton } from '@/features/assistant/components/chat-loading-skeleton'
import { DeleteChatDialog } from '@/features/assistant/components/delete-chat-dialog'
import { useChats } from '@/features/assistant/hooks/use-chats'
import type { ChatListItem as ChatListItemType } from '@/features/assistant/types/chat.types'
import { groupChatsByDate } from '@/features/assistant/utils/chat-date-grouping'

interface ChatListProps {
  search: string
  activeChatId: string | null
  onSelect: (chatId: string) => void
}

export function ChatList({ search, activeChatId, onSelect }: ChatListProps) {
  const { data, isLoading } = useChats({ search: search || undefined, page_size: 100 })
  const [chatToDelete, setChatToDelete] = useState<ChatListItemType | null>(null)

  if (isLoading) return <ChatListSkeleton />

  const items = data?.items ?? []
  if (!items.length) {
    return <p className="px-3 py-6 text-center text-sm text-muted-foreground">{search ? 'No conversations found.' : 'No conversations yet.'}</p>
  }

  const groups = groupChatsByDate(items)

  return (
    <div className="flex flex-col gap-3 p-2">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-0.5">
          <p className="px-2.5 py-1 text-xs font-medium text-muted-foreground">{group.label}</p>
          {group.items.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
              onSelect={() => onSelect(chat.id)}
              onRequestDelete={() => setChatToDelete(chat)}
            />
          ))}
        </div>
      ))}
      <DeleteChatDialog chat={chatToDelete} onOpenChange={(open) => !open && setChatToDelete(null)} />
    </div>
  )
}
