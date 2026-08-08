import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ReportType } from '@/features/reports/types'

const REPORT_TYPES: { value: ReportType; label: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'custom', label: 'Custom' },
]

interface ReportTypeSelectorProps {
  value: ReportType
  onChange: (type: ReportType) => void
}

export function ReportTypeSelector({ value, onChange }: ReportTypeSelectorProps) {
  return (
    <Tabs value={value} onValueChange={(next) => onChange(next as ReportType)}>
      <TabsList className="grid w-full grid-cols-4">
        {REPORT_TYPES.map((type) => (
          <TabsTrigger key={type.value} value={type.value}>
            {type.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
