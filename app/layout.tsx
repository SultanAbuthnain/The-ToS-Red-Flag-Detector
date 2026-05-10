import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "ToS Red Flag Detector — Instantly Spot Predatory Clauses",
  description:
    "Paste any Terms of Service or Privacy Policy and instantly get a plain-English warning summary of dangerous clauses — data selling, auto-renewals, copyright surrender, and more.",
  keywords: [
    "terms of service analyzer",
    "privacy policy red flags",
    "ToS checker",
    "legal document AI",
    "privacy policy analyzer",
  ],
  openGraph: {
    title: "ToS Red Flag Detector",
    description: "Paste any ToS. In 10 seconds, know exactly what you're agreeing to.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">
        <div className="glow-blob glow-blob-1" />
        <div className="glow-blob glow-blob-2" />
        <div className="bg-grid" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
