import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { UserMe } from '@/features/auth/types'

function getInitials(user: UserMe | null): string {
  const source = user?.full_name || user?.username || '?'
  const initials = source
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return initials || '?'
}

export function ProfileAvatar({ user, className }: { user: UserMe | null; className?: string }) {
  return (
    <Avatar className={className}>
      <AvatarFallback>{getInitials(user)}</AvatarFallback>
    </Avatar>
  )
}
