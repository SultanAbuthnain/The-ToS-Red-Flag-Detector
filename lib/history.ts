// lib/history.ts — shared types and localStorage helpers

export interface HistoryItem {
  id: string;
  preview: string;      // first 40 chars of pasted text
  date: string;         // ISO date string
  doc_type: string;
  danger_score: number;
  red_flags_count: number;
  result: object;       // full ScanResult stored for replay
}

const HISTORY_KEY = "tos_analysis_history";
const MAX_ITEMS = 10;

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(item: HistoryItem): HistoryItem[] {
  const existing = loadHistory();
  const updated = [item, ...existing].slice(0, MAX_ITEMS);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
