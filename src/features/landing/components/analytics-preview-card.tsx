import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TREND_POINTS = [40, 55, 48, 62, 58, 74, 68, 82, 76, 90]

function buildLinePath(points: number[], width: number, height: number) {
  const max = Math.max(...points)
  const step = width / (points.length - 1)
  return points
    .map((point, index) => {
      const x = index * step
      const y = height - (point / max) * height
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export function AnalyticsLineChartCard({ compact = false }: { compact?: boolean }) {
  const width = 280
  const height = 100
  const linePath = buildLinePath(TREND_POINTS, width, height)
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`

  return (
    <Card className={compact ? 'border-border/70 py-5 shadow-none' : 'border-border/70 shadow-none'}>
      <CardHeader className={compact ? 'pb-0' : undefined}>
        <CardTitle className="text-base">Monthly spending trend</CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className={compact ? 'h-24 w-full overflow-visible' : 'h-32 w-full overflow-visible'}
          aria-hidden
        >
          <defs>
            <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#trend-fill)" />
          <path d={linePath} fill="none" stroke="var(--color-primary)" strokeWidth={2.5} strokeLinecap="round" />
        </svg>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
        </div>
      </CardContent>
    </Card>
  )
}
