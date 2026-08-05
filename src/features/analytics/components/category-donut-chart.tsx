import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

export interface CategoryAnalysisItem {
  category_id: string
  name: string
  icon: string | null
  total: string
  percentage: number
  expense_count: number
  color: string
}

interface CategoryDonutChartProps {
  categories: CategoryAnalysisItem[]
  activeIndex: number | null
  onActiveIndexChange: (index: number | null) => void
  isMobile: boolean
}

export function CategoryDonutChart({ categories, activeIndex, onActiveIndexChange, isMobile }: CategoryDonutChartProps) {
  const size = isMobile ? 140 : 160
  const data = categories.map((category) => ({ ...category, totalValue: Number(category.total) }))

  return (
    <ResponsiveContainer width={size} height={size} className="shrink-0">
      <PieChart>
        <Pie
          data={data}
          dataKey="totalValue"
          nameKey="name"
          innerRadius={isMobile ? 38 : 42}
          outerRadius={isMobile ? 68 : 78}
          paddingAngle={2}
          strokeWidth={0}
          onMouseEnter={(_, index) => onActiveIndexChange(index)}
          onMouseLeave={() => onActiveIndexChange(null)}
          onTouchStart={(_, index) => onActiveIndexChange(index)}
        >
          {data.map((category, index) => (
            <Cell
              key={category.category_id}
              fill={category.color}
              fillOpacity={activeIndex === null || activeIndex === index ? 0.8 : 0.35}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
