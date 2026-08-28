import { Check, ChevronsUpDown, User, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAiAssistantUserUsage } from '@/features/admin/hooks/use-ai-assistant-stats'
import { cn } from '@/lib/utils'

interface UserFilterComboboxProps {
  selectedUserId: string | null
  onSelect: (userId: string | null) => void
}

/** Bounded fetch (like the admin email recipient picker) — the ai-assistant/users list only ever contains users who've actually used the assistant, so 100 comfortably covers this app's user base. */
export function UserFilterCombobox({ selectedUserId, onSelect }: UserFilterComboboxProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { data } = useAiAssistantUserUsage({ page: 1, page_size: 100, sort_by: 'messages_sent', order: 'desc' })

  const users = data?.items ?? []
  const selectedUser = users.find((user) => user.user_id === selectedUserId) ?? null
  const query = search.trim().toLowerCase()
  const filtered = query
    ? users.filter((user) => user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
    : users

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" role="combobox" aria-expanded={open} className="w-64 justify-between font-normal">
            <span className="flex min-w-0 items-center gap-2 truncate">
              <User className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{selectedUser ? selectedUser.username : 'All Users'}</span>
            </span>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput placeholder="Search users…" value={search} onValueChange={setSearch} />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="__all__"
                  onSelect={() => {
                    onSelect(null)
                    setOpen(false)
                  }}
                >
                  <Check className={cn('size-4', selectedUserId ? 'opacity-0' : 'opacity-100')} />
                  All Users
                </CommandItem>
                {filtered.map((user) => (
                  <CommandItem
                    key={user.user_id}
                    value={user.user_id}
                    onSelect={() => {
                      onSelect(user.user_id)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn('size-4', selectedUserId === user.user_id ? 'opacity-100' : 'opacity-0')} />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate">{user.username}</span>
                      <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedUserId && (
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Clear user filter" onClick={() => onSelect(null)}>
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}
