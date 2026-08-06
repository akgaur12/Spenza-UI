import { getRouteApi } from '@tanstack/react-router'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ExportPanel } from '@/features/import-export/components/export-panel'
import { ImportWizard } from '@/features/import-export/components/import-wizard'

type ImportExportTab = 'import' | 'export'

const routeApi = getRouteApi('/_app/import-export')

export function ImportExportTabs() {
  const { tab } = routeApi.useSearch()
  const [activeTab, setActiveTab] = useState<ImportExportTab>(tab ?? 'import')

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ImportExportTab)}>
      <TabsList>
        <TabsTrigger value="import">Import</TabsTrigger>
        <TabsTrigger value="export">Export</TabsTrigger>
      </TabsList>

      {/* Both panels stay mounted (toggled via `hidden`, not conditional rendering) so switching
          tabs never resets an in-progress import wizard or the export filter selections. */}
      <div className="mt-4" hidden={activeTab !== 'import'}>
        <ImportWizard />
      </div>
      <div className="mt-4" hidden={activeTab !== 'export'}>
        <ExportPanel />
      </div>
    </Tabs>
  )
}
