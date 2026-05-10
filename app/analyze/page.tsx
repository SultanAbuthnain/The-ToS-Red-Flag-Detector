"use client";

import { useState, useEffect, useRef } from "react";
import ScanSection from "@/components/ScanSection";
import ResultsSection from "@/components/ResultsSection";
import Footer from "@/components/Footer";
import type { ScanResult } from "@/lib/types";
import { saveToHistory, type HistoryItem } from "@/lib/history";

const FREE_SCAN_LIMIT = 5;
const STORAGE_KEY = "tos_scan_count";

export default function AnalyzePage() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanCount, setScanCount] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load initial scan count
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setScanCount(parseInt(stored, 10));

    // Check if we need to load a specific history item
    const currentView = localStorage.getItem("tos_current_view");
    if (currentView) {
      try {
        const item: HistoryItem = JSON.parse(currentView);
        if (item && item.result) {
          setResult(item.result as ScanResult);
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
        // Don't remove it here so refresh keeps it? Or remove it so it's one-time?
        // Better to remove it so "new scan" isn't blocked on refresh
        localStorage.removeItem("tos_current_view");
      } catch {
        // Ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update history panel when we add a new scan
  const notifyHistoryUpdated = () => {
    window.dispatchEvent(new Event("history_updated"));
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleScan = async (text: string, docType: string) => {
    if (scanCount >= FREE_SCAN_LIMIT) {
      setError(`You've used all ${FREE_SCAN_LIMIT} free scans. Refresh or clear your scan history to reset.`);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, doc_type: docType }),
      });

      const data: ScanResult = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Scan failed. Please try again.");
      }

      setResult(data);

      const newCount = scanCount + 1;
      setScanCount(newCount);
      localStorage.setItem(STORAGE_KEY, String(newCount));

      // Save to history
      const historyItem: HistoryItem = {
        id: crypto.randomUUID(),
        preview: text.slice(0, 40).trim() + "...",
        date: new Date().toISOString(),
        doc_type: data.doc_type,
        danger_score: data.danger_score,
        red_flags_count: data.red_flags?.length || 0,
        result: data,
      };
      saveToHistory(historyItem);
      notifyHistoryUpdated();

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setScanCount(0);
    showToast("Scan limit reset!");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, padding: "40px 0" }}>
        {/* Header Title for the tool */}
        <div style={{ textAlign: "center", marginBottom: "40px", padding: "0 24px" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: "12px", letterSpacing: "-0.02em" }}>
            Analyze <span className="gradient-text-red">Document</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Paste the Terms of Service or Privacy Policy text below to instantly detect potentially dangerous clauses.
          </p>
        </div>

        <ScanSection
          onScan={handleScan}
          loading={loading}
          scanCount={scanCount}
          freeLimit={FREE_SCAN_LIMIT}
          onClearHistory={handleClearHistory}
          error={error}
        />

        <div ref={resultsRef}>
          {(result || loading) && (
            <ResultsSection
              result={result}
              loading={loading}
              onReset={handleReset}
              onCopy={() => showToast("Results copied to clipboard!")}
            />
          )}
        </div>
      </div>

      <Footer />

      {toast && (
        <div className="toast" style={{ borderColor: toast.type === "error" ? "var(--red-border)" : "var(--border-hover)" }}>
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          {toast.message}
        </div>
      )}
    </div>
  );
}
