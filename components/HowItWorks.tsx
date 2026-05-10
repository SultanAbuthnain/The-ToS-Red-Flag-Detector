const steps = [
  {
    icon: "📋",
    title: "Paste the document",
    desc: "Copy any ToS, Privacy Policy, or EULA and paste it into the text box below.",
  },
  {
    icon: "🤖",
    title: "AI scans for red flags",
    desc: "Our GPT-4o powered engine reads every clause looking for user-hostile language.",
  },
  {
    icon: "🚨",
    title: "Get your warning report",
    desc: "Receive 3–7 plain-English red flags with direct quotes and severity ratings.",
  },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "0 24px 80px", maxWidth: "860px", margin: "0 auto" }}>
      <div className="glass-card" style={{ padding: "40px" }}>
        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "28px" }}>
          How it works
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div className="step-number">{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "18px" }}>{step.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: "15px" }}>{step.title}</span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
