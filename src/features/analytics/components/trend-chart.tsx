import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TrendDataPoint, TrendInterval } from '@/features/analytics/types'
import { trendPointLabel } from '@/features/analytics/utils/trend-period'
import { formatCurrency } from '@/lib/format'

interface TrendChartProps {
  interval: TrendInterval
  data: TrendDataPoint[]
  isMobile: boolean
  onPointClick: (point: TrendDataPoint) => void
}

const tooltipProps = {
  cursor: { fill: 'var(--accent)', opacity: 0.4 },
  contentStyle: {
    background: 'var(--popover)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 12,
  },
  labelStyle: { color: 'var(--popover-foreground)' },
  itemStyle: { color: 'var(--popover-foreground)' },
  formatter: (value: unknown) => formatCurrency(Number(value)),
}

export function TrendChart({ interval, data, isMobile, onPointClick }: TrendChartProps) {
  const chartData = data.map((point) => ({ label: trendPointLabel(interval, point), total: Number(point.total), point }))
  const height = isMobile ? 240 : 300
  const margin = { left: isMobile ? 0 : 4, right: 8, top: 8 }

  function handleClick(state: { activeTooltipIndex?: number | string | null }) {
    if (state?.activeTooltipIndex == null) return
    const clicked = chartData[Number(state.activeTooltipIndex)]
    if (clicked) onPointClick(clicked.point)
  }

  const axisProps = (
    <>
      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
      <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
      <YAxis
        hide={isMobile}
        tickLine={false}
        axisLine={false}
        width={56}
        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
        tickFormatter={(value: number) => formatCurrency(value)}
      />
      <Tooltip {...tooltipProps} />
    </>
  )

  return (
    <ResponsiveContainer width="100%" height={height}>
      {interval === 'daily' ? (
        <LineChart data={chartData} margin={margin} onClick={handleClick} className="cursor-pointer">
          {axisProps}
          <Line type="linear" dataKey="total" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3, fill: 'var(--primary)' }} />
        </LineChart>
      ) : interval === 'weekly' ? (
        <AreaChart data={chartData} margin={margin} onClick={handleClick} className="cursor-pointer">
          {axisProps}
          <Area
            type="linear"
            dataKey="total"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="var(--primary)"
            fillOpacity={0.18}
          />
        </AreaChart>
      ) : interval === 'monthly' ? (
        <LineChart data={chartData} margin={margin} onClick={handleClick} className="cursor-pointer">
          {axisProps}
          <Line type="monotone" dataKey="total" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3, fill: 'var(--primary)' }} />
        </LineChart>
      ) : (
        <BarChart data={chartData} margin={margin} onClick={handleClick} className="cursor-pointer">
          {axisProps}
          <Bar dataKey="total" fill="var(--primary)" radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      )}
    </ResponsiveContainer>
  )
}
