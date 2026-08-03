import { Check, ChevronsUpDown, Tag } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { CategoryListItem } from '@/features/categories/types'
import { cn } from '@/lib/utils'

interface CategoryMultiComboboxProps {
  categories: CategoryListItem[]
  search: string
  onSearchChange: (value: string) => void
  selectedIds: string[]
  onChange: (categoryIds: string[]) => void
  className?: string
}

export function CategoryMultiCombobox({
  categories,
  search,
  onSearchChange,
  selectedIds,
  onChange,
  className,
}: CategoryMultiComboboxProps) {
  const [open, setOpen] = useState(false)

  const selectedNames = categories
    .filter((category) => selectedIds.includes(category.id))
    .map((category) => category.name)
  const label =
    selectedIds.length === 0
      ? 'All Categories'
      : selectedIds.length === 1
        ? (selectedNames[0] ?? 'All Categories')
        : `${selectedIds.length} categories`

  function toggle(categoryId: string) {
    onChange(
      selectedIds.includes(categoryId) ? selectedIds.filter((id) => id !== categoryId) : [...selectedIds, categoryId],
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('justify-between font-normal', selectedIds.length > 0 && 'text-foreground', className)}
        >
          <span className="flex min-w-0 items-center gap-2 truncate">
            <Tag className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{label}</span>
          </span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search categories…" value={search} onValueChange={onSearchChange} />
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              <CommandItem value="__all__" onSelect={() => onChange([])}>
                <Check className={cn('size-4', selectedIds.length === 0 ? 'opacity-100' : 'opacity-0')} />
                All Categories
              </CommandItem>
              {categories.map((category) => (
                <CommandItem key={category.id} value={category.id} onSelect={() => toggle(category.id)}>
                  <Check className={cn('size-4', selectedIds.includes(category.id) ? 'opacity-100' : 'opacity-0')} />
                  <span aria-hidden>{category.icon ?? '📁'}</span>
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
