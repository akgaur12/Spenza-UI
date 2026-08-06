import { ImportExportTabs } from '@/features/import-export/components/import-export-tabs'

export function ImportExportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Import / Export</h1>
      <ImportExportTabs />
    </div>
  )
}
