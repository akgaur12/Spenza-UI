import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CategoryFilterValue = 'all' | 'default' | 'my'

const FILTER_OPTIONS: { value: CategoryFilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'default', label: 'Default' },
  { value: 'my', label: 'My Categories' },
]

interface CategoryFilterProps {
  value: CategoryFilterValue
  onChange: (value: CategoryFilterValue) => void
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div role="radiogroup" aria-label="Filter categories" className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          variant="outline"
          size="sm"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(value === option.value && 'border-primary bg-accent text-foreground')}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
