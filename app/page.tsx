"use client";

import { useState, useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import ScanSection from "@/components/ScanSection";
import ResultsSection from "@/components/ResultsSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

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

const FREE_SCAN_LIMIT = 5;
const STORAGE_KEY = "tos_scan_count";

export default function HomePage() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanCount, setScanCount] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setScanCount(parseInt(stored, 10));
  }, []);

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
  };

  const handleClearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setScanCount(0);
    showToast("Scan history cleared!");
  };

  return (
    <main style={{ minHeight: "100vh" }}>
      <HeroSection />
      <HowItWorks />

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

      <Footer />

      {toast && (
        <div className="toast" style={{ borderColor: toast.type === "error" ? "var(--red-border)" : "var(--border-hover)" }}>
          <span>{toast.type === "success" ? "✅" : "❌"}</span>
          {toast.message}
        </div>
      )}
    </main>
  );
}
