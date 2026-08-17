import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnalyticsDateRangeFilter } from '@/features/analytics/components/analytics-date-range-filter'
import type { AnalyticsFiltersState } from '@/features/analytics/hooks/use-analytics-filters'

interface AnalyticsFiltersBarProps {
  filters: AnalyticsFiltersState
}

export function AnalyticsFiltersBar({ filters }: AnalyticsFiltersBarProps) {
  return (
    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
      <Button
        type="button"
        variant={filters.dateRange.preset === 'month' ? 'secondary' : 'outline'}
        className="shrink-0"
        onClick={() => filters.setPreset('month')}
      >
        This Month
      </Button>
      <Button
        type="button"
        variant={filters.dateRange.preset === 'year' ? 'secondary' : 'outline'}
        className="shrink-0"
        onClick={() => filters.setPreset('year')}
      >
        This Year
      </Button>
      <AnalyticsDateRangeFilter
        value={filters.dateRange}
        onPresetChange={filters.setPreset}
        onMonthYearChange={filters.setMonthYear}
        onYearChange={filters.setYear}
        onCustomRangeChange={filters.setCustomRange}
        className="shrink-0"
      />
      {!filters.isDefault && (
        <Button type="button" variant="ghost" size="sm" onClick={filters.reset} className="ml-auto shrink-0">
          <RotateCcw />
          <span className="hidden sm:inline">Reset Filters</span>
        </Button>
      )}
    </div>
  )
}
