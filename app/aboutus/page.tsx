import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us — ORAGE AI AGENCY",
  description: "Meet the founders of ORAGE AI AGENCY. We operate at the crossroads of AI strategy, marketing operations, and business intelligence.",
}

export default function AboutUsPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
      padding: "80px 24px",
      fontFamily: "var(--font-main)",
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#64748b",
            textDecoration: "none",
            fontSize: "14px",
            marginBottom: "48px",
          }}
        >
          <span style={{ fontSize: "18px" }}>&larr;</span> Back to Home
        </Link>

        {/* Section label */}
        <div style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#B68039",
          marginBottom: "24px",
        }}>
          About Us
        </div>

        {/* Content */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "48px", flexWrap: "wrap" }}>
          {/* Founder image */}
          <div
            style={{
              flexShrink: 0,
              width: 280,
              borderRadius: 32,
              overflow: "hidden",
              position: "relative",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.55)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            {/* Diagonal shimmer */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 55%, rgba(255,255,255,0.12) 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }} />
            <img
              src="https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb60603147fd01594d365d.jpg"
              alt="Our Founders"
              style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "3/4" }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 240 }}>
            <h1 style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "#0f172a",
              marginBottom: "24px",
              lineHeight: 1.1,
            }}>
              Our Founders
            </h1>
            <p style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#334155",
            }}>
              We operate at the crossroads of AI strategy, marketing operations, and business
              intelligence. Our team has identified and closed over{" "}
              <span style={{ color: "#B68039", fontWeight: 700 }}>10+ million dollars</span> in
              operational gaps for service businesses — by finding the exact lever that unlocks
              growth and building custom AI systems to pull it. We don&apos;t sell software. We build
              the infrastructure that makes your business run without you running it.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
