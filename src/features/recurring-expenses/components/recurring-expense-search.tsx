import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

interface RecurringExpenseSearchProps {
  value: string
  onChange: (value: string) => void
}

export function RecurringExpenseSearch({ value, onChange }: RecurringExpenseSearchProps) {
  const [raw, setRaw] = useState(value)
  const debounced = useDebounce(raw, 350)

  useEffect(() => {
    onChange(debounced)
  }, [debounced, onChange])

  function clear() {
    setRaw('')
    onChange('')
  }

  return (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
        placeholder="Search recurring expenses…"
        className="pl-9 pr-9"
        aria-label="Search recurring expenses"
      />
      {raw && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute top-1/2 right-1 -translate-y-1/2"
          aria-label="Clear search"
          onClick={clear}
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  )
}
