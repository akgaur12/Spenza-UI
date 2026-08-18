import { useNavigate } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Maximize2 } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CalendarHeatmapSkeleton } from '@/features/analytics/components/calendar-heatmap-skeleton'
import { ChartWrapper } from '@/features/analytics/components/chart-wrapper'
import { YearDropdown } from '@/features/analytics/components/year-dropdown'
import { useCalendarHeatmap } from '@/features/analytics/hooks/use-calendar-heatmap'
import type { CalendarHeatmapDay } from '@/features/analytics/types'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'

const INTENSITY_OPACITY = [0.18, 0.4, 0.62, 0.84, 1]
/** Cells at this intensity level or above are dark enough that the printed value needs light text. */
const LIGHT_TEXT_THRESHOLD = 2

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS_IN_GRID = 31
const EMPTY_DAYS: CalendarHeatmapDay[] = []

function intensityFor(total: number, max: number): number {
  if (total <= 0 || max <= 0) return -1
  const ratio = total / max
  return Math.min(INTENSITY_OPACITY.length - 1, Math.floor(ratio * INTENSITY_OPACITY.length))
}

interface HoveredCell {
  day: CalendarHeatmapDay
  rect: DOMRect
}

interface HeatmapGridProps {
  dayByMonthAndDate: Map<string, CalendarHeatmapDay>
  maxDaily: number
  onHover: (day: CalendarHeatmapDay, target: HTMLElement) => void
  onLeave: (date: string) => void
  onSelect: (day: CalendarHeatmapDay) => void
}

function HeatmapGrid({ dayByMonthAndDate, maxDaily, onHover, onLeave, onSelect }: HeatmapGridProps) {
  return (
    <div className="scrollbar-thin overflow-x-auto pb-2">
      <div className="grid w-fit" style={{ gridTemplateColumns: `3rem repeat(${DAYS_IN_GRID}, 2.75rem)` }}>
        <div />
        {Array.from({ length: DAYS_IN_GRID }, (_, index) => (
          <div key={index} className="pb-1 text-center text-[11px] text-muted-foreground">
            {index + 1}
          </div>
        ))}

        {MONTH_LABELS.map((monthLabel, monthIndex) => (
          <Fragment key={monthLabel}>
            <div className="flex items-center pr-2 text-xs text-muted-foreground">{monthLabel}</div>
            {Array.from({ length: DAYS_IN_GRID }, (_, dayIndex) => {
              const day = dayByMonthAndDate.get(`${monthIndex + 1}-${dayIndex + 1}`)
              if (!day) return <div key={`${monthLabel}-${dayIndex}`} className="m-px" />

              const level = day.is_future ? -1 : intensityFor(Number(day.total), maxDaily)
              const hasValue = level >= 0

              return (
                <button
                  key={day.date}
                  type="button"
                  disabled={day.is_future}
                  onMouseEnter={(event) => onHover(day, event.currentTarget)}
                  onMouseLeave={() => onLeave(day.date)}
                  onFocus={(event) => onHover(day, event.currentTarget)}
                  onClick={() => onSelect(day)}
                  aria-label={`${format(new Date(day.date), 'd MMM yyyy')}: ${formatCurrency(day.total)}, ${day.expense_count} expenses`}
                  className={cn(
                    'm-px flex h-8 items-center justify-center rounded-sm border border-border/60 px-0.5 text-[10px] tabular-nums',
                    day.is_future ? 'cursor-default' : 'cursor-pointer hover:ring-1 hover:ring-ring',
                    hasValue && level >= LIGHT_TEXT_THRESHOLD ? 'text-white' : 'text-foreground',
                  )}
                  style={hasValue ? { backgroundColor: 'var(--primary)', opacity: INTENSITY_OPACITY[level] } : undefined}
                >
                  {hasValue && <span className="truncate">{formatCurrency(day.total).replace(/^₹/, '')}</span>}
                </button>
              )
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function HeatmapLegend() {
  return (
    <div className="mt-2 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
      <span>Less</span>
      <span className="size-3 rounded-sm border border-border/60" />
      {INTENSITY_OPACITY.map((opacity) => (
        <span key={opacity} className="size-3 rounded-sm" style={{ backgroundColor: 'var(--primary)', opacity }} />
      ))}
      <span>More</span>
    </div>
  )
}

/** Defaults to the current year — independent of the page's global date-range filter, matching the other pattern charts. */
export function CalendarHeatmapCard() {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const [hovered, setHovered] = useState<HoveredCell | null>(null)
  const [year, setYear] = useState(() => new Date().getFullYear())
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const heatmapQuery = useCalendarHeatmap({ year })

  const maxDaily = heatmapQuery.data ? Number(heatmapQuery.data.max_daily_spending) : 0
  const days = heatmapQuery.data?.data ?? EMPTY_DAYS

  const dayByMonthAndDate = useMemo(() => {
    const map = new Map<string, CalendarHeatmapDay>()
    days.forEach((day) => map.set(`${day.month}-${day.day}`, day))
    return map
  }, [days])

  function showTooltip(day: CalendarHeatmapDay, target: HTMLElement) {
    setHovered({ day, rect: target.getBoundingClientRect() })
  }

  function selectDay(day: CalendarHeatmapDay) {
    if (isMobile) return
    navigate({ to: '/expenses', search: { start_date: day.date, end_date: day.date } })
  }

  return (
    <ChartWrapper
      title="Calendar Heatmap"
      compactHeader
      action={
        <div className="flex items-center gap-2">
          <YearDropdown year={year} onChange={setYear} />
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label="Expand heatmap"
            onClick={() => setExpanded(true)}
            className="hidden sm:inline-flex"
          >
            <Maximize2 className="size-3.5" />
          </Button>
        </div>
      }
      isPending={heatmapQuery.isPending}
      isError={heatmapQuery.isError}
      onRetry={heatmapQuery.refetch}
      errorMessage="Unable to load the calendar heatmap."
      isEmpty={heatmapQuery.data?.expense_count === 0}
      emptyMessage="No spending recorded this year yet."
      skeleton={<CalendarHeatmapSkeleton />}
    >
      <HeatmapGrid
        dayByMonthAndDate={dayByMonthAndDate}
        maxDaily={maxDaily}
        onHover={showTooltip}
        onLeave={(date) => setHovered((current) => (current?.day.date === date ? null : current))}
        onSelect={selectDay}
      />
      <HeatmapLegend />

      <Dialog
        open={expanded}
        onOpenChange={(open) => {
          setExpanded(open)
          if (!open) setHovered(null)
        }}
      >
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-[min(1500px,calc(100vw-4rem))]">
          <DialogHeader>
            <DialogTitle>Calendar Heatmap — {year}</DialogTitle>
          </DialogHeader>
          <HeatmapGrid
            dayByMonthAndDate={dayByMonthAndDate}
            maxDaily={maxDaily}
            onHover={showTooltip}
            onLeave={(date) => setHovered((current) => (current?.day.date === date ? null : current))}
            onSelect={selectDay}
          />
          <HeatmapLegend />
        </DialogContent>
      </Dialog>

      {hovered &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 w-max -translate-x-1/2 -translate-y-full rounded-md border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md"
            style={{ left: hovered.rect.left + hovered.rect.width / 2, top: hovered.rect.top - 8 }}
          >
            <p className="font-medium">{format(new Date(hovered.day.date), 'd MMM yyyy')}</p>
            <p>{formatCurrency(hovered.day.total)}</p>
            <p className="text-muted-foreground">
              {hovered.day.expense_count} {hovered.day.expense_count === 1 ? 'Expense' : 'Expenses'}
            </p>
          </div>,
          document.body,
        )}
    </ChartWrapper>
  )
}
