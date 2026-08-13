import { Check, ChevronsUpDown, Users } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { AdminUserResponse } from '@/features/admin/types'
import { cn } from '@/lib/utils'

interface UserMultiComboboxProps {
  users: AdminUserResponse[]
  selectedIds: string[]
  onChange: (userIds: string[]) => void
  className?: string
}

export function UserMultiCombobox({ users, selectedIds, onChange, className }: UserMultiComboboxProps) {
  const [open, setOpen] = useState(false)
  const allSelected = users.length > 0 && selectedIds.length === users.length

  const label = allSelected
    ? 'All users'
    : selectedIds.length === 0
      ? 'Select recipients'
      : selectedIds.length === 1
        ? (users.find((user) => user.id === selectedIds[0])?.username ?? '1 selected')
        : `${selectedIds.length} recipients`

  function toggle(userId: string) {
    onChange(selectedIds.includes(userId) ? selectedIds.filter((id) => id !== userId) : [...selectedIds, userId])
  }

  function toggleAll() {
    onChange(allSelected ? [] : users.map((user) => user.id))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between font-normal', selectedIds.length > 0 && 'text-foreground', className)}
        >
          <span className="flex min-w-0 items-center gap-2 truncate">
            <Users className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{label}</span>
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start" portal={false}>
        <Command>
          <CommandInput placeholder="Search users…" />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="__all__" onSelect={toggleAll}>
                <Check className={cn('size-4', allSelected ? 'opacity-100' : 'opacity-0')} />
                <Users className="size-4 text-muted-foreground" />
                All users ({users.length})
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={`${user.username} ${user.email}`}
                  onSelect={() => toggle(user.id)}
                >
                  <Check className={cn('size-4', selectedIds.includes(user.id) ? 'opacity-100' : 'opacity-0')} />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate">{user.username}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
