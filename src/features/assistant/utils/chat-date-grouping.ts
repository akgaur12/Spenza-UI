import { isToday, isYesterday, isWithinInterval, subDays } from 'date-fns'
import type { ChatListItem } from '@/features/assistant/types/chat.types'

export type ChatGroupLabel = 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Previous 30 Days' | 'Older'

export interface ChatGroup {
  label: ChatGroupLabel
  items: ChatListItem[]
}

const GROUP_ORDER: ChatGroupLabel[] = ['Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days', 'Older']

function bucketFor(date: Date, now: Date): ChatGroupLabel {
  if (isToday(date)) return 'Today'
  if (isYesterday(date)) return 'Yesterday'
  if (isWithinInterval(date, { start: subDays(now, 7), end: now })) return 'Previous 7 Days'
  if (isWithinInterval(date, { start: subDays(now, 30), end: now })) return 'Previous 30 Days'
  return 'Older'
}

/** Groups chats by `updated_at` (most-recently-active first within each group), matching the sidebar mockup. */
export function groupChatsByDate(chats: ChatListItem[], now = new Date()): ChatGroup[] {
  const buckets = new Map<ChatGroupLabel, ChatListItem[]>()

  for (const chat of chats) {
    const label = bucketFor(new Date(chat.updated_at), now)
    const bucket = buckets.get(label)
    if (bucket) bucket.push(chat)
    else buckets.set(label, [chat])
  }

  return GROUP_ORDER.filter((label) => buckets.has(label)).map((label) => ({
    label,
    items: buckets.get(label) as ChatListItem[],
  }))
}
