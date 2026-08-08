import { downloadBlob } from '@/lib/download'

export function downloadCsv(rows: string[][], fileName: string) {
  const csv = rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n')
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), fileName)
}

function escapeCsvCell(cell: string): string {
  if (!/[",\r\n]/.test(cell)) return cell
  return `"${cell.replace(/"/g, '""')}"`
}
