import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useRenameChat } from '@/features/assistant/hooks/use-chat-mutations'
import type { ChatListItem as ChatListItemType } from '@/features/assistant/types/chat.types'
import { cn } from '@/lib/utils'

interface ChatListItemProps {
  chat: ChatListItemType
  isActive: boolean
  onSelect: () => void
  onRequestDelete: () => void
}

export function ChatListItem({ chat, isActive, onSelect, onRequestDelete }: ChatListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(chat.title)
  const inputRef = useRef<HTMLInputElement>(null)
  const renameMutation = useRenameChat()

  function commitRename() {
    setIsEditing(false)
    const trimmed = title.trim()
    if (!trimmed || trimmed === chat.title) {
      setTitle(chat.title)
      return
    }
    renameMutation.mutate({ chatId: chat.id, title: trimmed })
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') inputRef.current?.blur()
    if (event.key === 'Escape') {
      setTitle(chat.title)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={commitRename}
        onKeyDown={handleKeyDown}
        className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    )
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm',
        isActive ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent/50',
      )}
    >
      <button type="button" onClick={onSelect} className="min-w-0 flex-1 truncate text-left">
        {chat.title}
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`More actions for ${chat.title}`}
            className="shrink-0 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
          >
            <MoreHorizontal className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => {
              setTitle(chat.title)
              setIsEditing(true)
            }}
          >
            <Pencil /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={onRequestDelete}>
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
