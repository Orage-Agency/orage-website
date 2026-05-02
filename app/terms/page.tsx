import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service — Orage AI Agency",
  description: "The terms that govern your use of orage.agency and our services.",
}

export default function TermsPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "80px 24px 120px", color: "#1a1a1a", fontFamily: "var(--font-main)", lineHeight: 1.65 }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "0.01em", marginBottom: "8px" }}>Terms of Service</h1>
      <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "40px" }}>Last updated: May 2, 2026</p>

      <section style={{ marginBottom: "32px" }}>
        <p>By using orage.agency, you agree to these terms. If you don't agree, please don't use the site.</p>
      </section>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>1. Who we are</h2>
      <p style={{ marginBottom: "20px" }}>Orage AI Agency LLC, an Oklahoma limited liability company. We build custom AI systems for service businesses.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>2. The website and chat assistant</h2>
      <p style={{ marginBottom: "20px" }}>The site, including our chat assistant ("Stacy"), is provided for informational and lead-generation purposes. Stacy is an AI; her replies are generated automatically and may occasionally be inaccurate. Anything that matters — pricing, scope, timelines — gets confirmed in writing on a strategy call.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>3. Acceptable use</h2>
      <p style={{ marginBottom: "20px" }}>Don't try to break, scrape, attack, or misuse the site. Don't submit illegal, harmful, or confidential information through the chat. We may rate-limit or block abusive use.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>4. Bookings and follow-up</h2>
      <p style={{ marginBottom: "20px" }}>If you book a strategy session, you'll receive a calendar invite and may receive follow-up SMS/email. You can opt out at any time by replying STOP (SMS) or by emailing <a href="mailto:team@orage.agency" style={{ color: "#B68039" }}>team@orage.agency</a>.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>5. Intellectual property</h2>
      <p style={{ marginBottom: "20px" }}>The site's content, design, and code are owned by Orage AI Agency LLC. You may share publicly visible content with attribution but you may not copy or rebrand it.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>6. Disclaimer</h2>
      <p style={{ marginBottom: "20px" }}>The site is provided "as is" without warranty. We do not guarantee specific business results. AI-generated content is informational, not professional advice.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>7. Limitation of liability</h2>
      <p style={{ marginBottom: "20px" }}>To the maximum extent allowed by law, Orage's total liability for any claim related to use of the site is limited to USD $100. We're not liable for indirect, incidental, or consequential damages.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>8. Governing law</h2>
      <p style={{ marginBottom: "20px" }}>These terms are governed by the laws of the State of Oklahoma. Disputes go to courts located in Oklahoma County, Oklahoma.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>9. Changes</h2>
      <p style={{ marginBottom: "20px" }}>We may update these terms. Material changes will be reflected in the date above and posted here.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>10. Contact</h2>
      <p>Questions: <a href="mailto:team@orage.agency" style={{ color: "#B68039" }}>team@orage.agency</a></p>

      <p style={{ marginTop: "48px" }}>
        <a href="/" style={{ color: "#64748b", textDecoration: "none" }}>← Back to home</a>
      </p>
    </main>
  )
}
