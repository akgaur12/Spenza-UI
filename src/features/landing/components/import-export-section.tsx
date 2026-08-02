import { SectionTitle } from '@/components/common/section-title'
import { ImportExportPreview } from '@/features/landing/components/import-export-preview'

export function ImportExportSection() {
  return (
    <section id="import-export" className="mx-auto max-w-6xl px-6 py-24">
      <SectionTitle
        eyebrow="Import & Export"
        title="Your data, portable by default"
        description="Bring in expenses from a spreadsheet, or take your data with you — anytime."
      />

      <div className="mt-14">
        <ImportExportPreview />
      </div>
    </section>
  )
}
