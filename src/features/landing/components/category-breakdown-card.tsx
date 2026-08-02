import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CATEGORIES = [
  { name: 'Food & Dining', value: 32, color: 'var(--color-chart-1)' },
  { name: 'Transport', value: 22, color: 'var(--color-chart-2)' },
  { name: 'Shopping', value: 18, color: 'var(--color-chart-3)' },
  { name: 'Bills & Utilities', value: 16, color: 'var(--color-chart-4)' },
  { name: 'Other', value: 12, color: 'var(--color-chart-5)' },
]

function buildConicGradient() {
  let cursor = 0
  const stops = CATEGORIES.map((category) => {
    const start = cursor
    cursor += category.value
    return `${category.color} ${start}% ${cursor}%`
  })
  return `conic-gradient(${stops.join(', ')})`
}

export function CategoryBreakdownCard() {
  return (
    <Card className="border-border/70 shadow-none">
      <CardHeader>
        <CardTitle className="text-base">Spending by category</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row">
        <div
          className="relative size-28 shrink-0 rounded-full"
          style={{ backgroundImage: buildConicGradient() }}
          aria-hidden
        >
          <div className="absolute inset-3 rounded-full bg-card" />
        </div>
        <ul className="w-full space-y-2">
          {CATEGORIES.map((category) => (
            <li key={category.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: category.color }} />
                {category.name}
              </span>
              <span className="font-medium">{category.value}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
