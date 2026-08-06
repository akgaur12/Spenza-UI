import { createFileRoute } from '@tanstack/react-router'
import { ImportExportPage } from '@/features/import-export/import-export-page'

/** Lets other pages (e.g. Overview's Quick Actions) deep-link straight into a tab. */
export interface ImportExportSearch {
  tab?: 'import' | 'export'
}

export const Route = createFileRoute('/_app/import-export')({
  validateSearch: (search: Record<string, unknown>): ImportExportSearch => ({
    tab: search.tab === 'import' || search.tab === 'export' ? search.tab : undefined,
  }),
  component: ImportExportPage,
})
