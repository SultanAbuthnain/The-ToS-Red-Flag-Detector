"use client";

import { useState } from "react";

interface ScanSectionProps {
  onScan: (text: string, docType: string) => void;
  loading: boolean;
  scanCount: number;
  freeLimit: number;
  onClearHistory: () => void;
  error: string | null;
}

const DOC_TYPES = [
  "Terms of Service",
  "Privacy Policy",
  "EULA",
  "Cookie Policy",
  "Data Processing Agreement",
  "Other Legal Document",
];

const EXAMPLE_TEXT = `EXAMPLE — Terms of Service (Condensed)
By using our services, you agree to the following:

Section 4.2 — Data Sharing: We may share your personal information, including browsing habits, location data, and purchase history, with our trusted advertising partners and affiliated third parties for targeted marketing purposes without requiring additional consent beyond this agreement.

Section 7 — User Content: You hereby grant Company a perpetual, irrevocable, worldwide, royalty-free, sublicensable license to use, reproduce, modify, adapt, publish, translate, distribute, and display any content you submit through our platform.

Section 12.1 — Auto-Renewal: Your subscription will automatically renew at the then-current rate unless you cancel at least 45 days prior to the end of the current billing period. No refunds will be issued for partial months.

Section 15 — Dispute Resolution: You waive your right to participate in class-action lawsuits. All disputes must be resolved through binding arbitration. You also waive your right to a jury trial.

Section 19 — Modifications: We reserve the right to modify these terms at any time without prior notice. Continued use of the service constitutes acceptance of the modified terms.`;

export default function ScanSection({ onScan, loading, scanCount, freeLimit, onClearHistory, error }: ScanSectionProps) {
  const [text, setText] = useState("");
  const [docType, setDocType] = useState(DOC_TYPES[0]);
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (val: string) => {
    setText(val);
    setCharCount(val.length);
  };

  const handleExample = () => {
    handleTextChange(EXAMPLE_TEXT);
  };

  const remaining = freeLimit - scanCount;
  const isLimitReached = scanCount >= freeLimit;

  return (
    <section id="scan" style={{ padding: "0 24px 60px", maxWidth: "860px", margin: "0 auto" }}>
      <div className="glass-card" style={{ padding: "36px" }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>Paste Your Document</h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Supports Terms of Service, Privacy Policies, EULAs, and more
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="scan-counter">
              <span style={{ color: remaining <= 1 ? "var(--red-primary)" : "var(--green-primary)", fontWeight: 700 }}>
                {remaining}
              </span>
              <span>/ {freeLimit} free scans left</span>
            </div>
            {scanCount > 0 && (
              <button className="btn-ghost" onClick={onClearHistory} title="Reset scan count">
                ↺ Reset
              </button>
            )}
          </div>
        </div>

        {/* Doc type + example row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
          <select
            className="doc-type-select"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
          >
            {DOC_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <button className="btn-ghost" onClick={handleExample} style={{ fontSize: "12px" }}>
            ✨ Load example
          </button>

          {text && (
            <button className="btn-ghost" onClick={() => handleTextChange("")} style={{ fontSize: "12px" }}>
              ✕ Clear
            </button>
          )}

          <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--text-muted)", fontFamily: "monospace" }}>
            {charCount.toLocaleString()} chars
          </span>
        </div>

        {/* Textarea */}
        <textarea
          className="tos-textarea"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={`Paste your ${docType} text here…\n\nTip: Copy the entire document from the company's website and paste it here. The longer the better — our AI reads it all.`}
          disabled={loading || isLimitReached}
          id="tos-input"
        />

        {/* Warning messages */}
        {error && (
          <div style={{
            marginTop: "14px",
            padding: "14px 16px",
            background: "var(--red-bg)",
            border: "1px solid var(--red-border)",
            borderRadius: "var(--radius-sm)",
            color: "var(--red-secondary)",
            fontSize: "14px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {isLimitReached && !error && (
          <div style={{
            marginTop: "14px",
            padding: "14px 16px",
            background: "var(--yellow-bg)",
            border: "1px solid var(--yellow-border)",
            borderRadius: "var(--radius-sm)",
            color: "var(--yellow-secondary)",
            fontSize: "14px",
          }}>
            🔒 You&apos;ve used all {freeLimit} free scans. Click &ldquo;↺ Reset&rdquo; above to start fresh.
          </div>
        )}

        {/* Submit */}
        <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <button
            id="scan-button"
            className="btn-primary btn-danger"
            onClick={() => onScan(text, docType)}
            disabled={loading || !text.trim() || isLimitReached}
            style={{ fontSize: "15px", padding: "14px 32px" }}
          >
            {loading ? (
              <>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                Analyzing…
              </>
            ) : (
              <>🔍 Scan for Red Flags</>
            )}
          </button>

          <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
            ⚖️ Not legal advice. For informational purposes only.
          </p>
        </div>
      </div>
    </section>
  );
}
