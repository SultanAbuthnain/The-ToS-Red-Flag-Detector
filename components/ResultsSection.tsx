"use client";

import { useEffect, useState } from "react";
import type { ScanResult, RedFlag } from "@/lib/types";

interface ResultsSectionProps {
  result: ScanResult | null;
  loading: boolean;
  onReset: () => void;
  onCopy: () => void;
}

const SEVERITY_CONFIG = {
  critical: {
    label: "Critical",
    icon: "🔴",
    color: "var(--red-primary)",
    bg: "var(--red-bg)",
    border: "var(--red-border)",
    textColor: "var(--red-secondary)",
  },
  warning: {
    label: "Warning",
    icon: "🟡",
    color: "var(--yellow-primary)",
    bg: "var(--yellow-bg)",
    border: "var(--yellow-border)",
    textColor: "var(--yellow-secondary)",
  },
  info: {
    label: "Info",
    icon: "🔵",
    color: "var(--accent-primary)",
    bg: "rgba(124,110,242,0.06)",
    border: "rgba(124,110,242,0.2)",
    textColor: "var(--accent-secondary)",
  },
};

function DangerMeter({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setDisplayed(score), 200);
    return () => clearTimeout(timeout);
  }, [score]);

  const color =
    score < 30 ? "var(--green-primary)"
    : score < 60 ? "var(--yellow-primary)"
    : "var(--red-primary)";

  const label =
    score < 30 ? "Low Risk"
    : score < 60 ? "Moderate Risk"
    : score < 80 ? "High Risk"
    : "Extremely Predatory";

  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Danger Score
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "28px", fontWeight: 800, color }}>{score}</span>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>/100</span>
          <span className="badge" style={{ background: color + "20", border: `1px solid ${color}40`, color, fontSize: "11px" }}>
            {label}
          </span>
        </div>
      </div>
      <div style={{ height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "999px", overflow: "hidden" }}>
        <div
          className="danger-meter-fill"
          style={{ width: `${displayed}%`, background: `linear-gradient(90deg, var(--green-primary) 0%, var(--yellow-primary) 50%, var(--red-primary) 100%)` }}
        />
      </div>
    </div>
  );
}

function RedFlagCard({ flag, index }: { flag: RedFlag; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = SEVERITY_CONFIG[flag.severity] || SEVERITY_CONFIG.info;

  return (
    <div
      className={`animate-fade-in-up delay-${(index + 1) * 100}`}
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "var(--radius-md)",
        padding: "20px",
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "1px" }}>{cfg.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
            <span className="badge" style={{ background: cfg.color + "20", border: `1px solid ${cfg.color}40`, color: cfg.textColor, fontSize: "10px" }}>
              {cfg.label}
            </span>
            <span style={{ fontWeight: 700, fontSize: "14px", color: cfg.textColor }}>{flag.category}</span>
            {flag.section_reference && (
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "monospace", marginLeft: "auto" }}>
                {flag.section_reference}
              </span>
            )}
          </div>

          <p style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.6, marginBottom: flag.quoted_excerpt ? "0" : "0" }}>
            {flag.plain_english_summary}
          </p>

          {flag.quoted_excerpt && (
            <div style={{ marginTop: "10px", overflow: "hidden", maxHeight: expanded ? "200px" : "0", transition: "max-height 0.3s ease" }}>
              <div className="quoted-text">
                &ldquo;{flag.quoted_excerpt}&rdquo;
              </div>
            </div>
          )}

          {flag.quoted_excerpt && (
            <button
              style={{ marginTop: "10px", fontSize: "12px", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "4px" }}
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            >
              {expanded ? "▲ Hide" : "▼ Show"} original quote
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <div className="skeleton" style={{ height: "100px" }} />
        </div>
      ))}
    </div>
  );
}

export default function ResultsSection({ result, loading, onReset, onCopy }: ResultsSectionProps) {
  const handleCopy = () => {
    if (!result) return;
    const lines = [
      `ToS Red Flag Report — ${result.doc_type}`,
      `Danger Score: ${result.danger_score}/100`,
      `Words scanned: ${result.word_count?.toLocaleString()}`,
      "",
      ...result.red_flags.map((f, i) =>
        `${i + 1}. [${f.severity.toUpperCase()}] ${f.category}\n   ${f.plain_english_summary}\n   Quote: "${f.quoted_excerpt}"`
      ),
      "",
      "⚖️ Not legal advice. Generated by ToS Red Flag Detector.",
    ];
    navigator.clipboard.writeText(lines.join("\n")).then(onCopy);
  };

  const criticalCount = result?.red_flags.filter((f) => f.severity === "critical").length ?? 0;
  const warningCount = result?.red_flags.filter((f) => f.severity === "warning").length ?? 0;

  return (
    <section style={{ padding: "0 24px 80px", maxWidth: "860px", margin: "0 auto" }}>
      <div className="glass-card" style={{ padding: "36px" }}>

        {/* Results header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
          <div>
            {loading ? (
              <div>
                <div className="skeleton" style={{ width: "200px", height: "24px", marginBottom: "8px" }} />
                <div className="skeleton" style={{ width: "140px", height: "16px" }} />
              </div>
            ) : result?.clean_bill ? (
              <div className="animate-bounce-in">
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--green-primary)", marginBottom: "4px" }}>
                  ✅ No Major Red Flags Found
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                  This document appears relatively user-friendly.
                </p>
              </div>
            ) : (
              <div className="animate-bounce-in">
                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--red-primary)", marginBottom: "6px" }}>
                  🚨 {result?.red_flags.length} Red Flag{result?.red_flags.length !== 1 ? "s" : ""} Detected
                </h2>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {criticalCount > 0 && (
                    <span style={{ fontSize: "13px", color: "var(--red-secondary)" }}>🔴 {criticalCount} Critical</span>
                  )}
                  {warningCount > 0 && (
                    <span style={{ fontSize: "13px", color: "var(--yellow-secondary)" }}>🟡 {warningCount} Warning</span>
                  )}
                  {result && (
                    <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                      · {result.word_count?.toLocaleString()} words scanned
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {!loading && result && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn-ghost" onClick={handleCopy} id="copy-results-btn">
                📋 Copy
              </button>
              <button className="btn-ghost" onClick={onReset} id="new-scan-btn">
                ↩ New Scan
              </button>
            </div>
          )}
        </div>

        {/* Danger meter */}
        {!loading && result && !result.clean_bill && (
          <DangerMeter score={result.danger_score} />
        )}

        {/* Content */}
        {loading ? (
          <div>
            <div style={{ textAlign: "center", padding: "20px 0 30px", color: "var(--text-secondary)" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔍</div>
              <p style={{ fontWeight: 600, marginBottom: "6px" }}>Scanning your document…</p>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Reading every clause with GPT-4o</p>
            </div>
            <LoadingSkeleton />
          </div>
        ) : result?.clean_bill ? (
          <div className="animate-fade-in" style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🛡️</div>
            <p style={{ color: "var(--text-secondary)", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6, fontSize: "15px" }}>
              We didn&apos;t detect any major predatory clauses. This doesn&apos;t mean the document is perfect — always read important sections yourself.
            </p>
            <button className="btn-ghost" onClick={onReset} style={{ marginTop: "24px" }}>
              ↩ Scan another document
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {result?.red_flags.map((flag, i) => (
              <RedFlagCard key={i} flag={flag} index={i} />
            ))}

            <div style={{ marginTop: "10px", padding: "14px 16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>
              ⚖️ <strong style={{ color: "var(--text-secondary)" }}>Disclaimer:</strong> This analysis is for informational purposes only and does not constitute legal advice. Consult a licensed attorney for legal guidance.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
