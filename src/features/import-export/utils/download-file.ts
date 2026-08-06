/** Triggers a browser download for an in-memory blob — shared by export, the sample template, and the error report. */
export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function downloadCsv(rows: string[][], fileName: string) {
  const csv = rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n')
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), fileName)
}

function escapeCsvCell(cell: string): string {
  if (!/[",\r\n]/.test(cell)) return cell
  return `"${cell.replace(/"/g, '""')}"`
}
