import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useAssistant } from '@/features/assistant/hooks/use-assistant'
import { useDeleteChat } from '@/features/assistant/hooks/use-chat-mutations'
import type { ChatListItem } from '@/features/assistant/types/chat.types'

interface DeleteChatDialogProps {
  chat: ChatListItem | null
  onOpenChange: (open: boolean) => void
}

export function DeleteChatDialog({ chat, onOpenChange }: DeleteChatDialogProps) {
  const deleteMutation = useDeleteChat()
  const { activeChatId, setActiveChatId } = useAssistant()

  function handleDelete() {
    if (!chat) return
    deleteMutation.mutate(chat.id)
    if (activeChatId === chat.id) setActiveChatId(null)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={Boolean(chat)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete conversation?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete "{chat?.title}" and its messages. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
