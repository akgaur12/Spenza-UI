import { UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ACCEPTED_EXTENSIONS = ['.csv', '.xlsx']
const ACCEPTED_INPUT_TYPES =
  '.csv,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

interface FileDropzoneProps {
  onFileSelected: (file: File) => void
  disabled?: boolean
}

export function FileDropzone({ onFileSelected, disabled }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [rejectionError, setRejectionError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function isAcceptedFile(file: File) {
    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    return ACCEPTED_EXTENSIONS.includes(extension)
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return
    if (!isAcceptedFile(file)) {
      setRejectionError(`"${file.name}" isn't a CSV or XLSX file.`)
      return
    }
    setRejectionError(null)
    onFileSelected(file)
  }

  function openPicker() {
    if (!disabled) inputRef.current?.click()
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-label="Upload a CSV or XLSX file"
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openPicker()
          }
        }}
        onDragOver={(event) => {
          event.preventDefault()
          if (!disabled) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          if (!disabled) handleFiles(event.dataTransfer.files)
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
          disabled && 'pointer-events-none opacity-50',
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-accent">
          <UploadCloud className="size-6 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">Drag your CSV or XLSX file here</p>
          <p className="mt-1 text-xs text-muted-foreground">or browse your files below</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation()
            openPicker()
          }}
        >
          Browse Files
        </Button>
        <p className="text-xs text-muted-foreground">Accepted formats: CSV, XLSX</p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_INPUT_TYPES}
          className="sr-only"
          aria-label="File input"
          disabled={disabled}
          onChange={(event) => handleFiles(event.target.files)}
          onClick={(event) => {
            // Without this, re-selecting the same file after a rejection doesn't fire onChange.
            event.currentTarget.value = ''
          }}
        />
      </div>
      {rejectionError && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {rejectionError}
        </p>
      )}
    </div>
  )
}
