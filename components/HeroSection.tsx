export default function HeroSection() {
  return (
    <section style={{ padding: "100px 24px 60px", textAlign: "center", maxWidth: "860px", margin: "0 auto" }}>
      {/* Badge */}
      <div className="animate-fade-in-up" style={{ marginBottom: "28px" }}>
        <span className="badge" style={{ background: "var(--red-bg)", border: "1px solid var(--red-border)", color: "var(--red-secondary)" }}>
          <span style={{ animation: "pulse-ring 2s infinite", width: 8, height: 8, background: "var(--red-primary)", borderRadius: "50%", display: "inline-block" }} />
          AI-Powered Legal Analysis
        </span>
      </div>

      {/* Headline */}
      <h1 className="animate-fade-in-up delay-100" style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.08, marginBottom: "24px", letterSpacing: "-0.03em" }}>
        Stop Blindly Clicking{" "}
        <span className="gradient-text-red">&ldquo;I Agree&rdquo;</span>
      </h1>

      <p className="animate-fade-in-up delay-200" style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto 40px" }}>
        Paste any Terms of Service or Privacy Policy. Our AI scans it in seconds and surfaces only the{" "}
        <strong style={{ color: "var(--text-primary)" }}>dangerous clauses</strong> — data selling, copyright grabs, auto-renewal traps, and more.
      </p>

      {/* Stats row */}
      <div className="animate-fade-in-up delay-300" style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
        {[
          { num: "10s", label: "Scan time" },
          { num: "10+", label: "Red flag types" },
          { num: "100%", label: "Plain English" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-number gradient-text">{stat.num}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
