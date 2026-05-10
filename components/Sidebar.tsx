"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HistoryItem } from "@/lib/history";

interface SidebarProps {
  darkMode: boolean;
  onToggleDark: () => void;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  darkMode,
  onToggleDark,
  history,
  onSelectHistory,
  onClearHistory,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Introduction", icon: "🏠" },
    { href: "/analyze", label: "Analyzer", icon: "🔍" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 49,
            display: "none",
          }}
          className="sidebar-overlay"
        />
      )}

      <aside
        className={`sidebar${mobileOpen ? " sidebar-open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "260px",
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          zIndex: 50,
          transition: "transform 0.3s ease",
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "22px" }}>🛡️</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.2 }}>
                ToS Detector
              </div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Red Flag AI
              </div>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle"
            onClick={onToggleDark}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "6px 10px",
              cursor: "pointer",
              fontSize: "16px",
              lineHeight: 1,
              transition: "all 0.2s ease",
              color: "var(--text-primary)",
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "16px 12px 0" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", paddingLeft: "8px" }}>
            Navigation
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onCloseMobile}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  marginBottom: "4px",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
                  background: isActive ? "var(--accent-glow)" : "transparent",
                  border: isActive ? "1px solid var(--accent-border)" : "1px solid transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
                {isActive && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "var(--accent-primary)" }} />}
              </Link>
            );
          })}
        </nav>

        {/* History */}
        <div style={{ flex: 1, padding: "20px 12px 0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", paddingLeft: "8px" }}>
            <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Recent Analyses
            </div>
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  transition: "color 0.15s",
                }}
                title="Clear history"
              >
                Clear all
              </button>
            )}
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "4px" }}>
            {history.length === 0 ? (
              <div style={{ textAlign: "center", padding: "24px 8px", color: "var(--text-muted)", fontSize: "12px", lineHeight: 1.6 }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>📂</div>
                No analyses yet.
                <br />
                Run your first scan!
              </div>
            ) : (
              history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onSelectHistory(item); onCloseMobile(); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                    <span style={{ fontSize: "10px" }}>
                      {item.danger_score >= 60 ? "🔴" : item.danger_score >= 30 ? "🟡" : "🟢"}
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>
                      {item.preview}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                      {item.doc_type}
                    </span>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", fontSize: "11px", color: "var(--text-muted)", lineHeight: 1.5 }}>
          ⚖️ Not legal advice.
          <br />
          Powered by Gemini AI.
        </div>
      </aside>
    </>
  );
}
