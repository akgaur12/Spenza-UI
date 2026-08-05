import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const OPTIONS = [5, 10, 15, 20]

interface TopCategoriesSelectorProps {
  value: number
  onChange: (value: number) => void
}

export function TopCategoriesSelector({ value, onChange }: TopCategoriesSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          Top {value}
          <ChevronDown className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={String(value)} onValueChange={(next) => onChange(Number(next))}>
          {OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option} value={String(option)}>
              Top {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
