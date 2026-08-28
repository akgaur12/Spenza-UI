import { useState } from 'react'
import { AiAssistantOverviewCards } from '@/features/admin/components/ai-assistant-tab/ai-assistant-overview-cards'
import {
  DateRangePresetSelect,
  presetToDateRange,
  type DateRangePreset,
} from '@/features/admin/components/ai-assistant-tab/date-range-preset-select'
import { ProviderUsageTable } from '@/features/admin/components/ai-assistant-tab/provider-usage-table'
import { RunStatusChart } from '@/features/admin/components/ai-assistant-tab/run-status-chart'
import { UsageTimeseriesChart } from '@/features/admin/components/ai-assistant-tab/usage-timeseries-chart'
import { UserFilterCombobox } from '@/features/admin/components/ai-assistant-tab/user-filter-combobox'
import { UserUsageTable } from '@/features/admin/components/ai-assistant-tab/user-usage-table'

export function AiAssistantTab() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [datePreset, setDatePreset] = useState<DateRangePreset>('30')
  const dateRange = presetToDateRange(datePreset)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Usage, performance, and adoption across every user.</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePresetSelect value={datePreset} onChange={setDatePreset} />
          <UserFilterCombobox selectedUserId={selectedUserId} onSelect={setSelectedUserId} />
        </div>
      </div>

      <AiAssistantOverviewCards userId={selectedUserId} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UsageTimeseriesChart userId={selectedUserId} dateRange={dateRange} />
        </div>
        <RunStatusChart userId={selectedUserId} />
      </div>

      <ProviderUsageTable userId={selectedUserId} dateRange={dateRange} />

      <UserUsageTable selectedUserId={selectedUserId} onSelectUser={setSelectedUserId} />
    </div>
  )
}
