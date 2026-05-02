import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — Orage AI Agency",
  description: "How Orage AI Agency collects, uses, and protects your information.",
}

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "80px 24px 120px", color: "#1a1a1a", fontFamily: "var(--font-main)", lineHeight: 1.65 }}>
      <h1 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "0.01em", marginBottom: "8px" }}>Privacy Policy</h1>
      <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "40px" }}>Last updated: May 2, 2026</p>

      <section style={{ marginBottom: "32px" }}>
        <p>Orage AI Agency LLC ("Orage," "we," "us") respects your privacy. This policy explains what we collect, why, and what you can do about it.</p>
      </section>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>1. What we collect</h2>
      <ul style={{ paddingLeft: "22px", marginBottom: "20px" }}>
        <li><strong>Information you give us</strong> — when you fill out a form or chat with our website assistant ("Stacy"), we collect what you share: name, email, phone, company, and the content of your messages.</li>
        <li><strong>Automatic information</strong> — basic web analytics (page views, approximate location, device/browser type) via Vercel Analytics.</li>
        <li><strong>Cookies</strong> — only the minimum needed for the site to function and for analytics. We do not sell cookie data.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>2. How we use it</h2>
      <ul style={{ paddingLeft: "22px", marginBottom: "20px" }}>
        <li>To respond to your inquiry and follow up by email or SMS.</li>
        <li>To schedule and confirm strategy sessions on our calendar.</li>
        <li>To improve our website and the assistant's helpfulness.</li>
        <li>We do <strong>not</strong> sell your personal information.</li>
      </ul>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>3. Where it lives</h2>
      <p style={{ marginBottom: "20px" }}>Chat messages and contact info are stored securely in our CRM (HighLevel) and in our database (Supabase). We use OpenAI to generate the assistant's replies — your messages are sent to OpenAI under their <a href="https://openai.com/policies/business-terms/" target="_blank" rel="noopener noreferrer" style={{ color: "#B68039" }}>business terms</a> and are not used to train their models.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>4. Retention</h2>
      <p style={{ marginBottom: "20px" }}>We keep chat transcripts and contact records for as long as we have an active business relationship with you, or up to 24 months from your last interaction — whichever is longer. After that we delete or anonymize.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>5. Your rights</h2>
      <p style={{ marginBottom: "20px" }}>You can ask us to access, correct, or delete the information we hold about you. Email <a href="mailto:team@orage.agency" style={{ color: "#B68039" }}>team@orage.agency</a> and we'll respond within 30 days.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>6. Children</h2>
      <p style={{ marginBottom: "20px" }}>This site is not directed at children under 13. If you believe a child has provided us with information, contact us and we will delete it.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>7. Changes</h2>
      <p style={{ marginBottom: "20px" }}>If we change this policy materially, we'll update the date above and, where appropriate, notify you.</p>

      <h2 style={{ fontSize: "20px", fontWeight: 700, marginTop: "32px", marginBottom: "12px" }}>8. Contact</h2>
      <p>Orage AI Agency LLC · Oklahoma · <a href="mailto:team@orage.agency" style={{ color: "#B68039" }}>team@orage.agency</a></p>

      <p style={{ marginTop: "48px" }}>
        <a href="/" style={{ color: "#64748b", textDecoration: "none" }}>← Back to home</a>
      </p>
    </main>
  )
}
