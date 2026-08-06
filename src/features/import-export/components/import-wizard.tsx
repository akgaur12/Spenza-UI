import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImportHistory } from '@/features/import-export/components/import-history'
import { ImportProgress } from '@/features/import-export/components/import-progress'
import { ImportResult } from '@/features/import-export/components/import-result'
import { ImportSkeleton } from '@/features/import-export/components/import-skeleton'
import { PreviewStep } from '@/features/import-export/components/preview-step'
import { UploadStep } from '@/features/import-export/components/upload-step'
import { ValidationStep } from '@/features/import-export/components/validation-step'
import { useImportConfirmMutation } from '@/features/import-export/hooks/use-import-confirm-mutation'
import { useImportHistory } from '@/features/import-export/hooks/use-import-history'
import { useImportPreviewMutation } from '@/features/import-export/hooks/use-import-preview-mutation'
import type { ImportPreviewResponse, ImportWizardStep } from '@/features/import-export/types'
import { cn } from '@/lib/utils'

const STEPS: { key: ImportWizardStep; label: string }[] = [
  { key: 'upload', label: 'Upload' },
  { key: 'preview', label: 'Preview' },
  { key: 'validate', label: 'Validate' },
  { key: 'import', label: 'Import' },
  { key: 'complete', label: 'Complete' },
]

function StepIndicator({ current }: { current: ImportWizardStep }) {
  const currentIndex = STEPS.findIndex((step) => step.key === current)

  return (
    <ol className="flex items-center overflow-x-auto pb-1">
      {STEPS.map((step, index) => {
        const state = index < currentIndex ? 'done' : index === currentIndex ? 'current' : 'upcoming'
        return (
          <li key={step.key} className="flex shrink-0 items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium',
                  state === 'upcoming' ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground',
                )}
              >
                {state === 'done' ? <Check className="size-3.5" /> : index + 1}
              </div>
              <span className={cn('text-sm whitespace-nowrap', state === 'upcoming' ? 'text-muted-foreground' : 'font-medium')}>
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && <div className="mx-2 h-px w-6 shrink-0 bg-border sm:w-10" />}
          </li>
        )
      })}
    </ol>
  )
}

export function ImportWizard() {
  const [currentStep, setCurrentStep] = useState<ImportWizardStep>('upload')
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [preview, setPreview] = useState<ImportPreviewResponse | null>(null)
  const [importPercent, setImportPercent] = useState(0)

  const previewMutation = useImportPreviewMutation()
  const confirmMutation = useImportConfirmMutation()
  const { history, addEntry } = useImportHistory()

  // Simulated ramp for the confirm step — that call carries no file bytes and returns almost
  // instantly, so there's no real progress signal to report (unlike the upload step above it).
  useEffect(() => {
    if (!confirmMutation.isPending) return
    setImportPercent(15)
    const interval = setInterval(() => {
      setImportPercent((current) => (current >= 90 ? current : current + Math.random() * 15))
    }, 300)
    return () => clearInterval(interval)
  }, [confirmMutation.isPending])

  function resetWizard() {
    setCurrentStep('upload')
    setSelectedFileName(null)
    setPreview(null)
    setImportPercent(0)
    previewMutation.reset()
    confirmMutation.reset()
  }

  function handleFileSelected(file: File) {
    setSelectedFileName(file.name)
    setPreview(null)
    setCurrentStep('preview')
    previewMutation.mutate(file, {
      onSuccess: (data) => setPreview(data),
      onError: () => setCurrentStep('upload'),
    })
  }

  function handleImport() {
    if (!preview) return
    setCurrentStep('import')
    confirmMutation.mutate(
      { import_token: preview.import_token },
      {
        onSuccess: (result) => {
          addEntry({
            importedAt: new Date().toISOString(),
            fileName: preview.file_name,
            totalRows: preview.total_rows,
            importedCount: result.imported_count,
            failedCount: result.failed_count,
            status: 'completed',
            durationMs: result.durationMs,
          })
          setImportPercent(100)
          setTimeout(() => setCurrentStep('complete'), 400)
        },
        onError: () => setCurrentStep('validate'),
      },
    )
  }

  return (
    <div className="space-y-6">
      <StepIndicator current={currentStep} />

      <Card>
        <CardContent>
          {currentStep === 'upload' && (
            <UploadStep
              onFileSelected={handleFileSelected}
              isUploading={previewMutation.isPending}
              uploadPercent={previewMutation.uploadPercent}
              selectedFileName={selectedFileName}
            />
          )}

          {currentStep === 'preview' &&
            (previewMutation.isPending || !preview ? (
              <ImportSkeleton />
            ) : (
              <div className="space-y-4">
                <PreviewStep preview={preview} />
                <div className="flex justify-end border-t pt-4">
                  <Button type="button" onClick={() => setCurrentStep('validate')}>
                    Continue to Validation
                  </Button>
                </div>
              </div>
            ))}

          {currentStep === 'validate' && preview && (
            <ValidationStep preview={preview} onImport={handleImport} onChooseDifferentFile={resetWizard} />
          )}

          {currentStep === 'import' && (
            <ImportProgress percent={Math.min(100, Math.round(importPercent))} fileName={selectedFileName ?? ''} />
          )}

          {currentStep === 'complete' && confirmMutation.data && (
            <ImportResult result={confirmMutation.data} onImportAnother={resetWizard} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Import History</CardTitle>
        </CardHeader>
        <CardContent>
          <ImportHistory history={history} />
        </CardContent>
      </Card>
    </div>
  )
}
