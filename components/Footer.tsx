export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px", textAlign: "center" }}>
      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.8 }}>
        <strong style={{ color: "var(--text-secondary)" }}>ToS Red Flag Detector</strong>
        {" · "}Built with GPT-4o
        {" · "}
        <span style={{ color: "var(--red-secondary)" }}>⚖️ Not legal advice</span>
      </p>
      <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px" }}>
        Your pasted text is processed by OpenAI and is not stored on our servers.
      </p>
    </footer>
  );
}
