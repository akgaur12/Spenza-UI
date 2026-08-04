import { Badge } from '@/components/ui/badge'

export function CategoryBadge({ isSystem }: { isSystem: boolean }) {
  return <Badge variant={isSystem ? 'secondary' : 'default'}>{isSystem ? 'Default' : 'My Category'}</Badge>
}
