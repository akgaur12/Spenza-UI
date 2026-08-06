import { Progress } from '@/components/ui/progress'
import { DownloadTemplateButton } from '@/features/import-export/components/download-template-button'
import { FileDropzone } from '@/features/import-export/components/file-dropzone'

interface UploadStepProps {
  onFileSelected: (file: File) => void
  isUploading: boolean
  uploadPercent: number
  selectedFileName: string | null
}

export function UploadStep({ onFileSelected, isUploading, uploadPercent, selectedFileName }: UploadStepProps) {
  return (
    <div className="space-y-4">
      <FileDropzone onFileSelected={onFileSelected} disabled={isUploading} />

      {isUploading && selectedFileName && (
        <div className="space-y-2 rounded-lg border p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="truncate font-medium">{selectedFileName}</span>
            <span className="tabular-nums text-muted-foreground">{uploadPercent}%</span>
          </div>
          <Progress value={uploadPercent} />
          <p className="text-xs text-muted-foreground">Uploading and validating…</p>
        </div>
      )}

      <div className="flex flex-col items-start justify-between gap-2 border-t pt-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">Need the right format?</p>
        <DownloadTemplateButton />
      </div>
    </div>
  )
}
