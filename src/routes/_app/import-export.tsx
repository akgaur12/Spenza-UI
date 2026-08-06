import { createFileRoute } from '@tanstack/react-router'
import { ImportExportPage } from '@/features/import-export/import-export-page'

export const Route = createFileRoute('/_app/import-export')({
  component: ImportExportPage,
})
