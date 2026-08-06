import { useState } from 'react'
import type { ImportHistoryEntry } from '@/features/import-export/types'

/**
 * The backend has no import-history endpoint, so recent imports are remembered in this browser
 * only (not synced across devices) — a reasonable stopgap per the module's "future ready" scope.
 */
const STORAGE_KEY = 'spenza:import-history'
const MAX_ENTRIES = 5

function readHistory(): ImportHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ImportHistoryEntry[]) : []
  } catch {
    return []
  }
}

function writeHistory(entries: ImportHistoryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // Private browsing / storage disabled — history just won't persist across reloads.
  }
}

export function useImportHistory() {
  const [history, setHistory] = useState<ImportHistoryEntry[]>(readHistory)

  function addEntry(entry: Omit<ImportHistoryEntry, 'id'>) {
    setHistory((current) => {
      const next = [{ ...entry, id: crypto.randomUUID() }, ...current].slice(0, MAX_ENTRIES)
      writeHistory(next)
      return next
    })
  }

  return { history, addEntry }
}
