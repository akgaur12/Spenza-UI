import { format } from 'date-fns'
import { CalendarIcon, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCategories } from '@/features/categories/hooks/use-categories'
import { CategoryMultiCombobox } from '@/features/expenses/components/category-multi-combobox'
import type { ExportDateRange, ExportDateRangePreset } from '@/features/import-export/types'
import { EXPORT_DATE_RANGE_LABELS, resolveExportDateRangePreset } from '@/features/import-export/utils/export-date-range'
import { useDebounce } from '@/hooks/use-debounce'

const PRESET_OPTIONS: ExportDateRangePreset[] = ['month', 'year', 'last_year', 'all']

interface PresetDropdownProps {
  preset: ExportDateRangePreset
  onSelect: (preset: ExportDateRangePreset) => void
}

/** Filter 1 — the four fixed date presets. Selecting one always clears a custom range (filter 2). */
function PresetDropdown({ preset, onSelect }: PresetDropdownProps) {
  const isActive = preset !== 'custom'
  const label = isActive ? EXPORT_DATE_RANGE_LABELS[preset] : 'Preset'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant={isActive ? 'secondary' : 'outline'}
          className="justify-between font-normal sm:w-40"
        >
          <span className="truncate">{label}</span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={preset} onValueChange={(value) => onSelect(value as ExportDateRangePreset)}>
          {PRESET_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option} value={option}>
              {EXPORT_DATE_RANGE_LABELS[option]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface CustomRangeFilterProps {
  dateRange: ExportDateRange
  onSelect: (startDate: string, endDate: string) => void
}

/** Filter 2 — an explicit custom range, mutually exclusive with the preset dropdown (filter 1). */
function CustomRangeFilter({ dateRange, onSelect }: CustomRangeFilterProps) {
  const [open, setOpen] = useState(false)
  const isActive = dateRange.preset === 'custom'
  const label =
    isActive && dateRange.startDate && dateRange.endDate
      ? `${format(new Date(dateRange.startDate), 'd MMM yyyy')} – ${format(new Date(dateRange.endDate), 'd MMM yyyy')}`
      : 'Custom Range'

  function handleSelect(range: DateRange | undefined) {
    if (!range?.from) return
    onSelect(format(range.from, 'yyyy-MM-dd'), format(range.to ?? range.from, 'yyyy-MM-dd'))
    if (range.to) setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={isActive ? 'secondary' : 'outline'}
          className="justify-start font-normal sm:w-56"
        >
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit max-w-[calc(100vw-2rem)] p-3" align="start" collisionPadding={16}>
        <Calendar
          mode="range"
          selected={
            isActive && dateRange.startDate && dateRange.endDate
              ? { from: new Date(dateRange.startDate), to: new Date(dateRange.endDate) }
              : undefined
          }
          onSelect={handleSelect}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  )
}

interface ExportFiltersProps {
  dateRange: ExportDateRange
  onDateRangeChange: (range: ExportDateRange) => void
  categoryIds: string[]
  onCategoryChange: (categoryIds: string[]) => void
}

export function ExportFilters({ dateRange, onDateRangeChange, categoryIds, onCategoryChange }: ExportFiltersProps) {
  const [categorySearch, setCategorySearch] = useState('')
  const debouncedCategorySearch = useDebounce(categorySearch, 250)
  const categoriesQuery = useCategories({ search: debouncedCategorySearch || undefined })

  function selectPreset(preset: ExportDateRangePreset) {
    const resolved = resolveExportDateRangePreset(preset)
    if (resolved) onDateRangeChange({ preset, ...resolved })
  }

  function selectCustomRange(startDate: string, endDate: string) {
    onDateRangeChange({ preset: 'custom', startDate, endDate })
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <PresetDropdown preset={dateRange.preset} onSelect={selectPreset} />
      <CustomRangeFilter dateRange={dateRange} onSelect={selectCustomRange} />
      <CategoryMultiCombobox
        categories={categoriesQuery.data?.items ?? []}
        search={categorySearch}
        onSearchChange={setCategorySearch}
        selectedIds={categoryIds}
        onChange={onCategoryChange}
        className="sm:w-56"
      />
    </div>
  )
}
