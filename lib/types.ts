export interface RedFlag {
  category: string;
  severity: "critical" | "warning" | "info";
  plain_english_summary: string;
  quoted_excerpt: string;
  section_reference: string;
}

export interface ScanResult {
  success: boolean;
  clean_bill: boolean;
  danger_score: number;
  red_flags: RedFlag[];
  word_count: number;
  doc_type: string;
  error?: string;
}
