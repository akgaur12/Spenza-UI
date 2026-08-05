import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MIN_YEAR = 2000

interface YearSelectorProps {
  year: number
  onChange: (year: number) => void
}

export function YearSelector({ year, onChange }: YearSelectorProps) {
  const maxYear = new Date().getFullYear()

  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Previous year"
        disabled={year <= MIN_YEAR}
        onClick={() => onChange(year - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <span className="w-12 text-center text-sm font-medium tabular-nums">{year}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Next year"
        disabled={year >= maxYear}
        onClick={() => onChange(year + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
