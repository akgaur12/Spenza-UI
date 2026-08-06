import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { downloadSampleTemplate } from '@/features/import-export/utils/template'

export function DownloadTemplateButton() {
  return (
    <Button type="button" variant="ghost" size="sm" onClick={downloadSampleTemplate}>
      <Download />
      Download Sample Template
    </Button>
  )
}
