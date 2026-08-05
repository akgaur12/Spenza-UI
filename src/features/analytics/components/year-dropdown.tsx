import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { env } from '@/config'

interface YearDropdownProps {
  year: number
  onChange: (year: number) => void
}

export function YearDropdown({ year, onChange }: YearDropdownProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: env.analyticsYearFilterCount }, (_, index) => currentYear - index).filter(
    (y) => y >= env.analyticsYearFilterMinYear,
  )
  if (!years.includes(year)) years.unshift(year)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          {year}
          <ChevronDown className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={String(year)} onValueChange={(next) => onChange(Number(next))}>
          {years.map((option) => (
            <DropdownMenuRadioItem key={option} value={String(option)}>
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
