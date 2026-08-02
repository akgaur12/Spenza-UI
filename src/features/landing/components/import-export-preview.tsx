import { Download, FileSpreadsheet, Upload } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const MOCK_ROWS = [
  { date: '2026-07-28', description: 'Grocery run', category: 'Food & Dining', amount: '₹1,240.00' },
  { date: '2026-07-27', description: 'Metro card top-up', category: 'Transport', amount: '₹500.00' },
  { date: '2026-07-25', description: 'Electricity bill', category: 'Bills & Utilities', amount: '₹2,100.00' },
]

export function ImportExportPreview() {
  return (
    <Card className="border-border/70 shadow-none">
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-8 text-center">
          <span className="flex size-11 items-center justify-center rounded-lg bg-accent">
            <Upload className="size-5 text-accent-foreground" />
          </span>
          <p className="text-sm font-medium">Drop a CSV or XLSX file</p>
          <p className="text-xs text-muted-foreground">or click to browse</p>
          <Button size="sm" variant="outline" className="mt-1">
            Choose file
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm font-medium">
              <FileSpreadsheet className="size-4 text-muted-foreground" />
              expenses_july.csv
            </span>
            <Button size="sm">
              <Download className="size-4" />
              Export
            </Button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondary/60 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Description</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">Category</th>
                  <th className="px-3 py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ROWS.map((row) => (
                  <tr key={row.date + row.description} className="border-t border-border">
                    <td className="px-3 py-2 whitespace-nowrap text-muted-foreground">{row.date}</td>
                    <td className="px-3 py-2">{row.description}</td>
                    <td className="hidden px-3 py-2 text-muted-foreground sm:table-cell">{row.category}</td>
                    <td className="px-3 py-2 text-right font-medium whitespace-nowrap">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
