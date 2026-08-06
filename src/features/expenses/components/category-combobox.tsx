import { Check, ChevronsUpDown, Plus, Tag } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { CategoryListItem } from '@/features/categories/types'
import { cn } from '@/lib/utils'

interface CategoryComboboxProps {
  categories: CategoryListItem[]
  search: string
  onSearchChange: (value: string) => void
  selectedId: string | null
  onSelect: (category: CategoryListItem | null) => void
  /** Renders an "All Categories" item that calls onSelect(null) — used for the filter, never the add/edit form. */
  includeAllOption?: boolean
  /** Renders a "Create <text>" item when the search text doesn't match an existing category. */
  allowCreate?: boolean
  onCreateRequest?: (name: string) => void
  placeholder?: string
  /** Overrides the trigger label/icon — used to show a not-yet-created category picked via onCreateRequest. */
  displayName?: string
  displayIcon?: string | null
  className?: string
  disabled?: boolean
  /** Pass true when this combobox is rendered inside a Dialog — see PopoverContent's `portal` prop. */
  avoidPortal?: boolean
}

export function CategoryCombobox({
  categories,
  search,
  onSearchChange,
  selectedId,
  onSelect,
  includeAllOption = false,
  allowCreate = false,
  onCreateRequest,
  placeholder = 'Select category',
  displayName,
  displayIcon,
  className,
  disabled,
  avoidPortal = false,
}: CategoryComboboxProps) {
  const [open, setOpen] = useState(false)

  const selectedCategory = categories.find((category) => category.id === selectedId) ?? null
  const label = displayName ?? selectedCategory?.name ?? (includeAllOption && !selectedId ? 'All Categories' : placeholder)
  const icon = displayName ? displayIcon : selectedCategory?.icon

  const trimmedSearch = search.trim()
  const hasExactMatch = categories.some((category) => category.name.toLowerCase() === trimmedSearch.toLowerCase())

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={includeAllOption && selectedId ? 'secondary' : 'outline'}
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('justify-between font-normal', className)}
        >
          <span className="flex min-w-0 items-center gap-2 truncate">
            {icon ? (
              <span aria-hidden>{icon}</span>
            ) : (
              <Tag className="size-4 shrink-0 text-muted-foreground" />
            )}
            <span className="truncate">{label}</span>
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start" portal={!avoidPortal}>
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search categories…" value={search} onValueChange={onSearchChange} />
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {includeAllOption && (
                <CommandItem
                  value="__all__"
                  onSelect={() => {
                    onSelect(null)
                    setOpen(false)
                  }}
                >
                  <Check className={cn('size-4', selectedId ? 'opacity-0' : 'opacity-100')} />
                  All Categories
                </CommandItem>
              )}
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.id}
                  onSelect={() => {
                    onSelect(category)
                    setOpen(false)
                  }}
                >
                  <Check className={cn('size-4', selectedId === category.id ? 'opacity-100' : 'opacity-0')} />
                  <span aria-hidden>{category.icon ?? '📁'}</span>
                  {category.name}
                </CommandItem>
              ))}
              {allowCreate && trimmedSearch && !hasExactMatch && (
                <CommandItem
                  value={`__create__${trimmedSearch}`}
                  onSelect={() => {
                    onCreateRequest?.(trimmedSearch)
                    setOpen(false)
                  }}
                >
                  <Plus className="size-4" />
                  Create "{trimmedSearch}"
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
