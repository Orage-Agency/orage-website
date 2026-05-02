"use client"

import React, { useState, useEffect, useMemo } from "react"

// ── Projects ──────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "boomer-ai",
    title: "BOOMER AI",
    subtitle: "AI Education",
    footerText: "AI EDUCATION — COMMUNITY",
    logo: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69270a5b63b30fdd4c7b60de.png",
    images: [
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3f8749814b17d8a255fc.jpg",  // left (was right)
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bd71444865cd7a2b3fc292.jpg",  // center (new)
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3f870d06db84c1d0fc4e.jpg",  // right (was left)
    ],
  },
  {
    id: "lifetime",
    title: "LIFETIME",
    subtitle: "Global Media Network",
    footerText: "GLOBAL MEDIA NETWORK",
    logo: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3917a37cc2a398ef82c0.webp",
    images: [
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3b0a0d06db99ddd09ccc.jpg",  // left
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3bca2da5554e2d8ebb04.jpg",  // center
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb3a6f0d06db9aadd08ce3.png",  // right
    ],
  },
  {
    id: "quintessa",
    title: "QUINTESSA",
    subtitle: "100M+ ARR",
    footerText: "INCREASE EFFICIENCY · REDUCE WASTE",
    logo: "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb45a70d06db5124d1961f.png",
    images: [
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb449a49814b1db9a2d1b6.png",  // left
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb4627aaac0f402f7b06f8.jpeg", // center
      "https://assets.cdn.filesafe.space/651kIrlKk834C2FEl66i/media/69bb411849814b1134a27b61.jpg",  // right
    ],
  },
]

// ── 50 businesses (5 groups of 10) ───────────────────────────────────────────
const BUSINESSES: string[][] = [
  [
    "Marketing Agencies", "Consulting Firms", "Coaching Businesses", "Law Firms",
    "Accounting Practices", "Real Estate Brokerages", "Med Spas", "Recruiting Firms",
    "IT Services", "PR Agencies",
  ],
  [
    "Financial Advisors", "Insurance Agencies", "Home Services", "E-Commerce Brands",
    "SaaS Companies", "Healthcare Clinics", "Event Companies", "Construction Firms",
    "Logistics Providers", "Digital Studios",
  ],
  [
    "Photography Studios", "Dental Practices", "Landscaping Companies", "Auto Dealerships",
    "Franchise Groups", "Staffing Agencies", "Supplement Brands", "Solar Companies",
    "Interior Design Firms", "Mortgage Brokers",
  ],
  [
    "Fitness Studios", "Roofing Companies", "Catering Businesses", "Travel Agencies",
    "Software Development Shops", "Tutoring Centers", "Pet Care Services", "Cleaning Companies",
    "Food & Beverage Brands", "Architecture Firms",
  ],
  [
    "Chiropractic Clinics", "Music Production Studios", "Investment Groups", "Therapy Practices",
    "Retail Chains", "Restaurant Groups", "Wholesale Distributors", "Influencer Agencies",
    "Cybersecurity Firms", "Nonprofit Organizations",
  ],
]

// ── Phase timing ──────────────────────────────────────────────────────────────
const TRUSTED_BY_DURATION = 8000   // 8s — show folders
const INDUSTRIES_DURATION  = 10000  // 10s — show industries (per group, then loops back)

// ── SMB Bubble ────────────────────────────────────────────────────────────────
function SMBBubble({ label, delay }: { label: string; delay: number }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "7px 15px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.58)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: "1px solid rgba(182,128,57,0.2)",
        boxShadow: hovered ? "0 8px 32px rgba(182,128,57,0.18), inset 0 1px 0 rgba(255,255,255,0.85)" : "0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: "#0a0a0a",
        fontFamily: "var(--font-main)",
        whiteSpace: "nowrap",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-2px) scale(1.3)" : "translateY(0) scale(1)") : "translateY(10px) scale(0.88)",
        transformOrigin: "center center",
        transition: `opacity 0.45s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease`,
        cursor: "pointer",
        zIndex: hovered ? 10 : 1,
        position: "relative",
      }}
    >
      {label}
    </span>
  )
}

// ── ProjectFolder ─────────────────────────────────────────────────────────────
function ProjectFolder({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false)

  const positions = useMemo(() => {
    const spread = 72
    return [
      { x: -spread / 2, rotate: -7 },
      { x: 0,           rotate:  0 },
      { x:  spread / 2, rotate:  7 },
    ]
  }, [])

  return (
    <div
      style={{
        width: 196,
        flexShrink: 0,
        position: "relative",
        zIndex: hovered ? 50 : 1,
        perspective: 900,
        transform: hovered ? "scale(1.3)" : "scale(1)",
        transformOrigin: "center bottom",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image fan */}
      <div
        style={{
          position: "relative",
          height: 156,
          borderRadius: 14,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 0 16px rgba(255,255,255,0.18)",
          overflow: "hidden",
          transformOrigin: "center bottom",
          transform: `rotateX(${hovered ? 10 : 0}deg)`,
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* shimmer */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(255,255,255,0.4) 0%,transparent 55%)", pointerEvents: "none", borderRadius: 14, zIndex: 20 }} />

        {project.images.map((src, i) => {
          const pos = positions[i]
          const isMid = i === 1
          const dist = Math.abs(i - 1)
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                transform: `translate(calc(-50% + ${hovered ? pos.x * 1.25 : pos.x}px), ${hovered ? -8 : 6}px) rotate(${hovered ? pos.rotate * 1.3 : pos.rotate}deg) scale(${isMid ? (hovered ? 1.08 : 1.03) : hovered ? 0.93 : 0.88})`,
                zIndex: isMid ? 10 : 5 - dist,
                transition: `transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${dist * 0.06}s`,
              }}
            >
              <div style={{ width: 68, height: 104, borderRadius: 10, overflow: "hidden", boxShadow: "0 6px 18px rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.3)" }}>
                <img
                  src={src}
                  alt=""
                  aria-hidden
                  crossOrigin="anonymous"
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: `brightness(${hovered ? 1 : 0.82}) blur(${hovered ? 0 : dist * 0.5}px)`, transition: "filter 0.3s" }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Info panel */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          borderRadius: 14,
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          transformOrigin: "center bottom",
          transform: `rotateX(${hovered ? -18 : 0}deg)`,
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          zIndex: 22,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(255,255,255,0.4) 0%,transparent 55%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px 6px", position: "relative" }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, overflow: "hidden", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(255,255,255,0.5)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={project.logo} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} crossOrigin="anonymous" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0a0a0a", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "var(--font-main)" }}>
              {project.title}
            </p>
            <p style={{ fontSize: 7.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(0,0,0,0.45)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "var(--font-main)" }}>
              {project.subtitle}
            </p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.4)", padding: "5px 10px", position: "relative" }}>
          <p style={{ fontSize: 6.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(0,0,0,0.28)", fontFamily: "var(--font-main)" }}>
            {project.footerText}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── TrustedBy ─────────────────────────────────────────────────────────────────
export function TrustedBy() {
  const [phase, setPhase] = useState<0 | 1>(0)
  const [groupIndex, setGroupIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => { const t = setTimeout(() => setMounted(true), 200); return () => clearTimeout(t) }, [])

  function crossFade(cb: () => void, then: () => void) {
    setFading(true)
    setTimeout(() => { cb(); setFading(false) }, 450)
    setTimeout(then, 450)
  }

  useEffect(() => {
    // On mobile: just show "Trusted by" + folders, no animation
    if (isMobile) return

    let timer: ReturnType<typeof setTimeout>
    let currentPhase: 0 | 1 = 0
    let currentGroup = 0

    function tick() {
      if (currentPhase === 0) {
        // show folders for 8s, then show industries
        timer = setTimeout(() => {
          crossFade(
            () => { currentPhase = 1; setPhase(1) },
            () => {
              timer = setTimeout(() => {
                // after industries, go back to folders
                crossFade(
                  () => {
                    currentPhase = 0
                    setPhase(0)
                    // advance group for next industries cycle
                    currentGroup = (currentGroup + 1) % BUSINESSES.length
                    setGroupIndex(currentGroup)
                  },
                  tick
                )
              }, INDUSTRIES_DURATION)
            }
          )
        }, TRUSTED_BY_DURATION)
      }
    }

    tick()
    return () => clearTimeout(timer)
  }, [isMobile])

  const currentBubbles = BUSINESSES[groupIndex] ?? []

  return (
    <div
      style={{
        paddingTop: 12,
        paddingBottom: 12,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Label */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(-4px)" : "translateY(0)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(0,0,0,0.38)", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "var(--font-main)", whiteSpace: "nowrap" }}>
          {phase === 0 ? "Trusted by" : "Transforming SMB's"}
        </p>
      </div>

      {/* Content */}
      <div
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          minHeight: isMobile ? 80 : 200,
        }}
      >
        {phase === 0 ? (
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: isMobile ? 2 : 12,
            flexWrap: "nowrap",
            overflow: "visible",
            justifyContent: isMobile ? "center" : "flex-start",
            transform: isMobile ? "scale(0.58)" : "scale(1)",
            transformOrigin: "top center",
          }}>
            {PROJECTS.map((p) => <ProjectFolder key={p.id} project={p} />)}
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 660 }}>
            {currentBubbles.map((label, i) => (
              <SMBBubble key={`${groupIndex}-${label}`} label={label} delay={i * 100} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
