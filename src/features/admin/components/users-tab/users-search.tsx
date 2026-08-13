import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface UsersSearchProps {
  value: string
  onChange: (value: string) => void
}

export function UsersSearch({ value, onChange }: UsersSearchProps) {
  return (
    <div className="space-y-1">
      <div className="relative">
        <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Filter by username or email"
          className="pl-8"
        />
      </div>
      <p className="text-xs text-muted-foreground">Filtering current page only — use pagination to see other users.</p>
    </div>
  )
}
