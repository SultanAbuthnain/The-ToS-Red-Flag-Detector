"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { loadHistory, type HistoryItem } from "@/lib/history";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Load initial state
  useEffect(() => {
    // History
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setHistory(loadHistory());

    // Dark mode
    const stored = localStorage.getItem("tos_theme");
    if (stored === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (stored === "light") {
      setDarkMode(false);
      document.documentElement.removeAttribute("data-theme");
    } else {
      // System preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDarkMode(true);
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }

    // Listen for history updates from other parts of the app
    const handleStorageChange = () => {
      setHistory(loadHistory());
    };
    window.addEventListener("storage", handleStorageChange);
    // Custom event to trigger updates within the same tab
    window.addEventListener("history_updated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("history_updated", handleStorageChange);
    };
  }, []);

  const handleToggleDark = () => {
    setDarkMode((prev) => {
      const newVal = !prev;
      if (newVal) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("tos_theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("tos_theme", "light");
      }
      return newVal;
    });
  };

  const handleClearHistory = () => {
    localStorage.removeItem("tos_analysis_history");
    setHistory([]);
    window.dispatchEvent(new Event("history_updated"));
  };

  // Select history is tricky since we are in the shell, but the /analyze page 
  // needs to react. A simple way is to pass via localStorage and redirect.
  const handleSelectHistory = (item: HistoryItem) => {
    localStorage.setItem("tos_current_view", JSON.stringify(item));
    // Then navigate to /analyze (which happens naturally because the Sidebar Link takes care of it? No, Sidebar button is separate)
    window.location.href = "/analyze?load=" + item.id;
  };

  return (
    <div className="app-container">
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 40,
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
          display: "none", // Will be shown via CSS media query if we implement it, but for now inline style override:
        }}
        className="mobile-menu-btn"
      >
        ☰ Menu
      </button>

      <style jsx>{`
        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>

      <Sidebar
        darkMode={darkMode}
        onToggleDark={handleToggleDark}
        history={history}
        onSelectHistory={handleSelectHistory}
        onClearHistory={handleClearHistory}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
