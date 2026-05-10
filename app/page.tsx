import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        <HeroSection />
        
        {/* Why it matters */}
        <section style={{ padding: "0 24px 60px", maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>Why it matters</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "16px", lineHeight: 1.6 }}>
            Did you know <strong>91% of people</strong> consent to legal terms without reading them? Companies know this, hiding predatory clauses in walls of text.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>💸</div>
              <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Data Selling</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Your personal info, browsing habits, and location data are frequently sold to third-party data brokers.
              </p>
            </div>
            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔒</div>
              <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Copyright Traps</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Many platforms claim ownership or perpetual licenses over the photos and content you upload.
              </p>
            </div>
            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔄</div>
              <h3 style={{ fontWeight: 600, marginBottom: "8px" }}>Auto-Renewals</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Hidden terms often force you to pay for services you thought you cancelled by requiring 30+ days notice.
              </p>
            </div>
          </div>
        </section>

        <HowItWorks />

        {/* What we detect */}
        <section style={{ padding: "0 24px 80px", maxWidth: "860px", margin: "0 auto" }}>
          <div className="glass-card" style={{ padding: "40px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "28px" }}>
              What We Detect
            </h2>
            <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px" }}>
                <span>🔴</span> Selling data to third parties
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px" }}>
                <span>🔴</span> Automatic subscription renewals
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px" }}>
                <span>🔴</span> Broad arbitration clauses
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px" }}>
                <span>🟠</span> Surrendering copyright/content
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px" }}>
                <span>🟠</span> Changing terms without notice
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px" }}>
                <span>🔵</span> Location and behavioral tracking
              </li>
            </ul>
          </div>
        </section>

        <div style={{ textAlign: "center", paddingBottom: "80px" }}>
          <Link href="/analyze" className="btn-primary" style={{ fontSize: "16px", padding: "16px 36px" }}>
            Start Analysis Now →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
